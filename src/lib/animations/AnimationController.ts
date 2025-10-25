import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimationType, DeviceType, ScrollTriggerConfig } from '../../types/animation';
import { animationConfig, performanceConfig } from './config';
import { InteractiveAnimations } from './InteractiveAnimations';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export class AnimationController {
  private device: DeviceType;
  private animations: gsap.core.Timeline[] = [];
  private scrollTriggers: ScrollTrigger[] = [];
  private interactiveAnimations: InteractiveAnimations;

  constructor() {
    this.device = this.detectDevice();
    this.interactiveAnimations = new InteractiveAnimations();
    this.initializeGSAP();
  }

  /**
   * Detect current device type based on screen width
   */
  private detectDevice(): DeviceType {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Initialize GSAP with performance optimizations
   */
  private initializeGSAP(): void {
    // Set GSAP defaults
    gsap.defaults({
      duration: animationConfig[this.device].duration,
      ease: animationConfig[this.device].ease
    });

    // Configure performance settings
    if (performanceConfig.force3D) {
      gsap.set("*", { force3D: true });
    }

    // Handle reduced motion preference
    if (performanceConfig.reducedMotion) {
      gsap.globalTimeline.timeScale(0.01);
    }
  }

  /**
   * Create a fade-in animation
   */
  fadeIn(element: string | Element, options: Partial<ScrollTriggerConfig> = {}): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    tl.fromTo(element, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0,
        duration: animationConfig[this.device].duration,
        ease: animationConfig[this.device].ease
      }
    );

    if (options.trigger) {
      this.addScrollTrigger(tl, options);
    }

    this.animations.push(tl);
    return tl;
  }

  /**
   * Create a slide-in animation
   */
  slideIn(element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'up', options: Partial<ScrollTriggerConfig> = {}): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    const fromVars: any = { opacity: 0 };
    const toVars: any = { 
      opacity: 1,
      duration: animationConfig[this.device].duration,
      ease: animationConfig[this.device].ease
    };

    // Set initial position based on direction
    switch (direction) {
      case 'left':
        fromVars.x = -50;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = 50;
        toVars.x = 0;
        break;
      case 'up':
        fromVars.y = 50;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -50;
        toVars.y = 0;
        break;
    }

    tl.fromTo(element, fromVars, toVars);

    if (options.trigger) {
      this.addScrollTrigger(tl, options);
    }

    this.animations.push(tl);
    return tl;
  }

  /**
   * Create a stagger animation for multiple elements
   */
  stagger(elements: string | Element[], animationType: AnimationType = 'fadeIn', options: Partial<ScrollTriggerConfig> = {}): gsap.core.Timeline {
    const tl = gsap.timeline();
    const staggerDelay = animationConfig[this.device].stagger || 0.1;

    switch (animationType) {
      case 'fadeIn':
        tl.fromTo(elements,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0,
            duration: animationConfig[this.device].duration,
            ease: animationConfig[this.device].ease,
            stagger: staggerDelay
          }
        );
        break;
      case 'slideInUp':
        tl.fromTo(elements,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            duration: animationConfig[this.device].duration,
            ease: animationConfig[this.device].ease,
            stagger: staggerDelay
          }
        );
        break;
      case 'scaleUp':
        tl.fromTo(elements,
          { opacity: 0, scale: 0.8 },
          { 
            opacity: 1, 
            scale: 1,
            duration: animationConfig[this.device].duration,
            ease: animationConfig[this.device].ease,
            stagger: staggerDelay
          }
        );
        break;
    }

    if (options.trigger) {
      this.addScrollTrigger(tl, options);
    }

    this.animations.push(tl);
    return tl;
  }

  /**
   * Add ScrollTrigger to an animation
   */
  private addScrollTrigger(animation: gsap.core.Timeline, config: Partial<ScrollTriggerConfig>): ScrollTrigger {
    const scrollTrigger = ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start || "top 80%",
      end: config.end || "bottom 20%",
      animation: animation,
      scrub: config.scrub || false,
      pin: config.pin || false,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
      markers: config.markers || false
    });

    this.scrollTriggers.push(scrollTrigger);
    return scrollTrigger;
  }

  /**
   * Create a counter animation
   */
  animateCounter(element: string | Element, endValue: number, options: { duration?: number; decimals?: number } = {}): gsap.core.Timeline {
    const tl = gsap.timeline();
    const obj = { value: 0 };
    
    tl.to(obj, {
      value: endValue,
      duration: options.duration || animationConfig[this.device].duration * 2,
      ease: "power2.out",
      onUpdate: () => {
        const currentValue = options.decimals ? obj.value.toFixed(options.decimals) : Math.round(obj.value);
        if (typeof element === 'string') {
          const el = document.querySelector(element);
          if (el) el.textContent = currentValue.toString();
        } else {
          element.textContent = currentValue.toString();
        }
      }
    });

    this.animations.push(tl);
    return tl;
  }

  /**
   * Refresh ScrollTrigger (useful for dynamic content)
   */
  refresh(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Initialize interactive animations for a container
   */
  initializeInteractiveAnimations(containerSelector: string = 'body'): void {
    this.interactiveAnimations.initializeInteractiveAnimations(containerSelector);
  }

  /**
   * Create button hover animation
   */
  createButtonHover(button: HTMLElement): void {
    this.interactiveAnimations.createButtonHover(button);
  }

  /**
   * Create card hover animation
   */
  createCardHover(card: HTMLElement): void {
    this.interactiveAnimations.createCardHover(card);
  }

  /**
   * Create click feedback animation
   */
  createClickFeedback(element: HTMLElement): void {
    this.interactiveAnimations.createClickFeedback(element);
  }

  /**
   * Create loading animation
   */
  createLoadingAnimation(element: HTMLElement): void {
    this.interactiveAnimations.createLoadingAnimation(element);
  }

  /**
   * Create page entrance animation
   */
  createPageEntrance(): void {
    this.interactiveAnimations.createPageEntrance();
  }

  /**
   * Create modal animation
   */
  createModalAnimation(modal: HTMLElement, isOpening: boolean = true): gsap.core.Timeline {
    return this.interactiveAnimations.createModalAnimation(modal, isOpening);
  }

  /**
   * Create tooltip animation
   */
  createTooltipAnimation(tooltip: HTMLElement, isShowing: boolean = true): gsap.core.Timeline {
    return this.interactiveAnimations.createTooltipAnimation(tooltip, isShowing);
  }

  /**
   * Clean up all animations and scroll triggers
   */
  destroy(): void {
    this.animations.forEach(animation => animation.kill());
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.interactiveAnimations.destroy();
    this.animations = [];
    this.scrollTriggers = [];
  }

  /**
   * Update device type and refresh animations
   */
  updateDevice(): void {
    this.device = this.detectDevice();
    this.refresh();
  }
}