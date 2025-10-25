import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollTriggerConfig, AnimationType } from '../../types/animation';

gsap.registerPlugin(ScrollTrigger);

export class ScrollTriggerManager {
  private triggers: ScrollTrigger[] = [];

  /**
   * Create a scroll-triggered animation
   */
  create(config: ScrollTriggerConfig & { animation?: gsap.core.Timeline }): ScrollTrigger {
    const trigger = ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start,
      end: config.end,
      scrub: config.scrub,
      pin: config.pin,
      snap: config.snap,
      animation: config.animation,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
      markers: config.markers
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create fade-in animation with ScrollTrigger
   */
  createFadeIn(element: string | Element, options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    
    tl.fromTo(element, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0,
        duration: 1,
        ease: "power2.out"
      }
    );

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create slide-in animation with ScrollTrigger
   */
  createSlideIn(element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'up', options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    
    const fromVars: any = { opacity: 0 };
    const toVars: any = { 
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    };

    // Set initial position based on direction
    switch (direction) {
      case 'left':
        fromVars.x = -100;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = 100;
        toVars.x = 0;
        break;
      case 'up':
        fromVars.y = 100;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -100;
        toVars.y = 0;
        break;
    }

    tl.fromTo(element, fromVars, toVars);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create scale animation with ScrollTrigger
   */
  createScaleIn(element: string | Element, options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    
    tl.fromTo(element, 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }
    );

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create stagger animation for multiple elements
   */
  createStagger(elements: string | Element[], animationType: AnimationType = 'fadeIn', options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    const staggerDelay = 0.1;

    switch (animationType) {
      case 'fadeIn':
        tl.fromTo(elements,
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: staggerDelay
          }
        );
        break;
      case 'slideInLeft':
        tl.fromTo(elements,
          { opacity: 0, x: -50 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: staggerDelay
          }
        );
        break;
      case 'slideInRight':
        tl.fromTo(elements,
          { opacity: 0, x: 50 },
          { 
            opacity: 1, 
            x: 0,
            duration: 0.8,
            ease: "power2.out",
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
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: staggerDelay
          }
        );
        break;
    }

    const trigger = ScrollTrigger.create({
      trigger: typeof elements === 'string' ? elements : elements[0],
      start: options.start || "top 80%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create a parallax effect
   */
  createParallax(element: string | Element, speed: number = 0.5, options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    
    tl.to(element, {
      yPercent: -50 * speed,
      ease: "none"
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top bottom",
      end: options.end || "bottom top",
      scrub: options.scrub !== undefined ? options.scrub : true,
      animation: tl,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create smooth parallax for background elements
   */
  createSmoothParallax(element: string | Element, speed: number = 0.3, options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top bottom",
      end: options.end || "bottom top",
      scrub: options.scrub !== undefined ? options.scrub : 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(element, {
          y: progress * 100 * speed,
          duration: 0.3,
          ease: "none"
        });
      },
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create text reveal animation
   */
  createTextReveal(element: string | Element, options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();
    
    // Split text into words or characters for reveal effect
    const textElement = typeof element === 'string' ? document.querySelector(element) : element;
    if (!textElement) return null as any;

    const text = textElement.textContent || '';
    const words = text.split(' ');
    
    // Clear original text and create spans for each word
    textElement.innerHTML = words.map(word => 
      `<span class="word-reveal" style="display: inline-block; overflow: hidden;">
        <span style="display: inline-block; transform: translateY(100%);">${word}</span>
      </span>`
    ).join(' ');

    const wordSpans = textElement.querySelectorAll('.word-reveal span');
    
    tl.to(wordSpans, {
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.05
    });

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 80%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create section-based animations for case study components
   */
  createSectionAnimation(element: string | Element, animationType: AnimationType = 'fadeIn', options: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    const tl = gsap.timeline();

    switch (animationType) {
      case 'fadeIn':
        tl.fromTo(element, 
          { opacity: 0, y: 80 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
        );
        break;
      case 'slideInUp':
        tl.fromTo(element, 
          { opacity: 0, y: 100 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
        break;
      case 'slideInLeft':
        tl.fromTo(element, 
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        );
        break;
      case 'slideInRight':
        tl.fromTo(element, 
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
        );
        break;
      case 'scaleUp':
        tl.fromTo(element, 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
        );
        break;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options.start || "top 75%",
      end: options.end,
      animation: tl,
      scrub: options.scrub || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      markers: options.markers || false
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create a reveal animation on scroll
   */
  createReveal(element: string | Element, direction: 'up' | 'down' | 'left' | 'right' = 'up'): ScrollTrigger {
    const tl = gsap.timeline();
    
    const fromVars: any = { opacity: 0 };
    const toVars: any = { opacity: 1, duration: 1, ease: "power2.out" };

    switch (direction) {
      case 'up':
        fromVars.y = 50;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -50;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = 50;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -50;
        toVars.x = 0;
        break;
    }

    tl.fromTo(element, fromVars, toVars);

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      animation: tl
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Create a progress bar animation
   */
  createProgressBar(element: string | Element, maxWidth: number = 100): ScrollTrigger {
    const tl = gsap.timeline();
    
    tl.fromTo(element, 
      { width: "0%" },
      { width: `${maxWidth}%`, duration: 1, ease: "power2.out" }
    );

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      animation: tl
    });

    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Batch create multiple scroll triggers
   */
  batch(selector: string, config: Partial<ScrollTriggerConfig> = {}): ScrollTrigger {
    return ScrollTrigger.batch(selector, {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }
        );
      },
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
      start: config.start || "top 80%",
      end: config.end
    });
  }

  /**
   * Refresh all scroll triggers
   */
  refresh(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Kill all managed scroll triggers
   */
  killAll(): void {
    this.triggers.forEach(trigger => trigger.kill());
    this.triggers = [];
  }

  /**
   * Kill a specific scroll trigger
   */
  kill(trigger: ScrollTrigger): void {
    const index = this.triggers.indexOf(trigger);
    if (index > -1) {
      trigger.kill();
      this.triggers.splice(index, 1);
    }
  }

  /**
   * Get all active triggers
   */
  getTriggers(): ScrollTrigger[] {
    return [...this.triggers];
  }
}