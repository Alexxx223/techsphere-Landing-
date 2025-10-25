import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollTriggerManager } from './ScrollTriggerManager';
import { AnimationController } from './AnimationController';
import { TimelineAnimations } from './TimelineAnimations';

gsap.registerPlugin(ScrollTrigger);

export class CaseStudyAnimations {
  private scrollTriggerManager: ScrollTriggerManager;
  private animationController: AnimationController;
  private timelineAnimations: TimelineAnimations;

  constructor() {
    this.scrollTriggerManager = new ScrollTriggerManager();
    this.animationController = new AnimationController();
    this.timelineAnimations = new TimelineAnimations();
  }

  /**
   * Initialize all case study section animations
   */
  initializeSectionAnimations(containerSelector: string = '.case-study-container'): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Animate section headers
    this.animateSectionHeaders(container);
    
    // Animate content blocks
    this.animateContentBlocks(container);
    
    // Animate image galleries
    this.animateImageGalleries(container);
    
    // Animate metrics and counters
    this.animateMetrics(container);
    
    // Add parallax effects
    this.addParallaxEffects(container);
  }

  /**
   * Animate section headers with stagger effect
   */
  private animateSectionHeaders(container: Element): void {
    const headers = container.querySelectorAll('h1, h2, h3');
    
    headers.forEach((header, index) => {
      this.scrollTriggerManager.createTextReveal(header, {
        start: "top 85%",
        markers: false
      });
    });
  }

  /**
   * Animate content blocks with various entrance animations
   */
  private animateContentBlocks(container: Element): void {
    // Fade in content sections
    const contentSections = container.querySelectorAll('.content-section, .case-study-section');
    contentSections.forEach((section, index) => {
      const animationType = index % 2 === 0 ? 'slideInLeft' : 'slideInRight';
      this.scrollTriggerManager.createSectionAnimation(section, animationType, {
        start: "top 80%"
      });
    });

    // Animate cards with stagger
    const cards = container.querySelectorAll('.card, .metric-card, .process-card');
    if (cards.length > 0) {
      this.scrollTriggerManager.createStagger(Array.from(cards), 'scaleUp', {
        start: "top 85%"
      });
    }

    // Animate list items
    const listItems = container.querySelectorAll('li, .list-item');
    if (listItems.length > 0) {
      this.scrollTriggerManager.createStagger(Array.from(listItems), 'fadeIn', {
        start: "top 90%"
      });
    }
  }

  /**
   * Animate image galleries and media content
   */
  private animateImageGalleries(container: Element): void {
    const images = container.querySelectorAll('img, .image-container');
    
    images.forEach((image, index) => {
      // Alternate between different entrance animations
      const animations = ['fadeIn', 'scaleUp', 'slideInUp'];
      const animationType = animations[index % animations.length];
      
      this.scrollTriggerManager.createSectionAnimation(image, animationType as any, {
        start: "top 85%"
      });
    });

    // Special animation for hero images
    const heroImages = container.querySelectorAll('.hero-image, .case-study-hero');
    heroImages.forEach(heroImage => {
      this.scrollTriggerManager.createScaleIn(heroImage, {
        start: "top 90%"
      });
    });
  }

  /**
   * Animate metrics, counters, and progress bars
   */
  private animateMetrics(container: Element): void {
    // Animate counter elements
    const counters = container.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
      const endValue = parseInt(counter.getAttribute('data-counter') || '0');
      
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          this.animationController.animateCounter(counter, endValue);
        }
      });
    });

    // Animate progress bars
    const progressBars = container.querySelectorAll('.progress-bar, [data-progress]');
    progressBars.forEach(progressBar => {
      const maxWidth = parseInt(progressBar.getAttribute('data-progress') || '100');
      this.scrollTriggerManager.createProgressBar(progressBar, maxWidth);
    });

    // Animate metric cards
    const metricCards = container.querySelectorAll('.metric-card, .results-card');
    if (metricCards.length > 0) {
      this.scrollTriggerManager.createStagger(Array.from(metricCards), 'scaleUp', {
        start: "top 85%"
      });
    }
  }

  /**
   * Add parallax effects to background elements
   */
  private addParallaxEffects(container: Element): void {
    // Background parallax elements
    const parallaxElements = container.querySelectorAll('.parallax-bg, .background-element');
    parallaxElements.forEach((element, index) => {
      const speed = 0.3 + (index * 0.1); // Varying speeds for depth
      this.scrollTriggerManager.createSmoothParallax(element, speed);
    });

    // Section backgrounds
    const sectionBgs = container.querySelectorAll('.section-bg');
    sectionBgs.forEach(bg => {
      this.scrollTriggerManager.createSmoothParallax(bg, 0.2);
    });
  }

  /**
   * Create timeline animation for process steps using TimelineAnimations
   */
  createProcessTimeline(timelineSelector: string, options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createProcessTimelineSequence(timelineSelector, options);
  }

  /**
   * Create metric counter sequence
   */
  createMetricCounterSequence(containerSelector: string, options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createMetricCounterSequence(containerSelector, options);
  }

  /**
   * Create image gallery sequence
   */
  createImageGallerySequence(gallerySelector: string, options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createImageGallerySequence(gallerySelector, options);
  }

  /**
   * Create text reveal sequence
   */
  createTextRevealSequence(containerSelector: string, options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createTextRevealSequence(containerSelector, options);
  }

  /**
   * Create section entrance sequence
   */
  createSectionEntranceSequence(sectionSelector: string, options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createSectionEntranceSequence(sectionSelector, options);
  }

  /**
   * Create morphing sequence for before/after comparisons
   */
  createMorphingSequence(containerSelector: string, states: string[], options = {}): gsap.core.Timeline {
    return this.timelineAnimations.createMorphingSequence(containerSelector, states, options);
  }

  /**
   * Create before/after comparison animations
   */
  createBeforeAfterAnimation(containerSelector: string): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const beforeElement = container.querySelector('.before, .challenge');
    const afterElement = container.querySelector('.after, .solution');

    if (beforeElement && afterElement) {
      const tl = gsap.timeline();

      // Initial state
      gsap.set([beforeElement, afterElement], { opacity: 0, x: 50 });

      tl.to(beforeElement, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(afterElement, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        animation: tl
      });
    }
  }

  /**
   * Create image reveal animations with mask effect
   */
  createImageReveal(imageSelector: string): void {
    const images = document.querySelectorAll(imageSelector);
    
    images.forEach(image => {
      // Create mask overlay
      const mask = document.createElement('div');
      mask.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, white, transparent);
        z-index: 1;
        transform: translateX(-100%);
      `;
      
      const parent = image.parentElement;
      if (parent) {
        parent.style.position = 'relative';
        parent.style.overflow = 'hidden';
        parent.appendChild(mask);
      }

      const tl = gsap.timeline();
      
      tl.fromTo(image, 
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
      .to(mask, {
        x: "100%",
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.8")
      .to(mask, {
        opacity: 0,
        duration: 0.3
      });

      ScrollTrigger.create({
        trigger: image,
        start: "top 80%",
        animation: tl
      });
    });
  }

  /**
   * Refresh all animations (useful for dynamic content)
   */
  refresh(): void {
    this.scrollTriggerManager.refresh();
    this.animationController.refresh();
  }

  /**
   * Destroy all animations
   */
  destroy(): void {
    this.scrollTriggerManager.killAll();
    this.animationController.destroy();
    this.timelineAnimations.destroy();
  }
}