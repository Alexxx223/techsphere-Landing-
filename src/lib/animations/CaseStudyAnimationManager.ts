import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudyAnimations } from './CaseStudyAnimations';
import { InteractiveAnimations } from './InteractiveAnimations';
import { TimelineAnimations } from './TimelineAnimations';

gsap.registerPlugin(ScrollTrigger);

/**
 * Comprehensive animation manager for case study pages
 * Provides a unified interface for all animation types
 */
export class CaseStudyAnimationManager {
  private caseStudyAnimations: CaseStudyAnimations;
  private interactiveAnimations: InteractiveAnimations;
  private timelineAnimations: TimelineAnimations;
  private isInitialized: boolean = false;

  constructor() {
    this.caseStudyAnimations = new CaseStudyAnimations();
    this.interactiveAnimations = new InteractiveAnimations();
    this.timelineAnimations = new TimelineAnimations();
  }

  /**
   * Initialize all animations for a case study page
   */
  initializeAll(containerSelector: string = '.case-study-page'): void {
    if (this.isInitialized) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Add case study page class for styling
    container.classList.add('case-study-container');

    // Initialize all animation systems
    this.caseStudyAnimations.initializeSectionAnimations(containerSelector);
    this.interactiveAnimations.initializeInteractiveAnimations(containerSelector);

    // Initialize specific case study animations
    this.initializeCaseStudySpecificAnimations(container);

    this.isInitialized = true;
  }

  /**
   * Initialize case study specific animations
   */
  private initializeCaseStudySpecificAnimations(container: Element): void {
    // Process timeline animations
    const processTimeline = container.querySelector('.process-timeline, .timeline-container');
    if (processTimeline) {
      this.timelineAnimations.createProcessTimelineSequence('.process-timeline, .timeline-container');
    }

    // Metrics animations
    const metricsSection = container.querySelector('.metrics-section, .results-metrics');
    if (metricsSection) {
      this.timelineAnimations.createMetricCounterSequence('.metrics-section, .results-metrics');
    }

    // Image galleries
    const galleries = container.querySelectorAll('.image-gallery, .gallery');
    galleries.forEach((gallery, index) => {
      const selector = `.image-gallery:nth-child(${index + 1}), .gallery:nth-child(${index + 1})`;
      this.timelineAnimations.createImageGallerySequence(selector, {
        transitionType: index % 2 === 0 ? 'scale' : 'slide'
      });
    });

    // Text reveal for main content
    const textSections = container.querySelectorAll('.text-content, .content-section');
    textSections.forEach((section, index) => {
      const selector = `.text-content:nth-child(${index + 1}), .content-section:nth-child(${index + 1})`;
      this.timelineAnimations.createTextRevealSequence(selector, {
        revealType: 'words'
      });
    });

    // Section entrances
    const sections = container.querySelectorAll('section, .case-study-section');
    sections.forEach((section, index) => {
      if (section.id) {
        this.timelineAnimations.createSectionEntranceSequence(`#${section.id}`);
      } else {
        section.id = `case-study-section-${index}`;
        this.timelineAnimations.createSectionEntranceSequence(`#${section.id}`);
      }
    });

    // Before/after comparisons
    const comparisons = container.querySelectorAll('.before-after, .comparison');
    comparisons.forEach((comparison, index) => {
      const beforeElement = comparison.querySelector('.before, .challenge');
      const afterElement = comparison.querySelector('.after, .solution');
      
      if (beforeElement && afterElement) {
        const states = ['.before, .challenge', '.after, .solution'];
        this.timelineAnimations.createMorphingSequence(
          `.before-after:nth-child(${index + 1}), .comparison:nth-child(${index + 1})`,
          states,
          { autoPlay: false }
        );
      }
    });
  }

  /**
   * Create hero section animation
   */
  createHeroAnimation(heroSelector: string = '.case-study-hero'): gsap.core.Timeline {
    const hero = document.querySelector(heroSelector);
    if (!hero) return gsap.timeline();

    const tl = gsap.timeline();
    
    const title = hero.querySelector('h1, .hero-title');
    const subtitle = hero.querySelector('.subtitle, .hero-subtitle');
    const image = hero.querySelector('.hero-image, img');
    const metadata = hero.querySelector('.metadata, .hero-metadata');

    // Set initial states
    if (image) gsap.set(image, { opacity: 0, scale: 1.1 });
    if (title) gsap.set(title, { opacity: 0, y: 50 });
    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 30 });
    if (metadata) gsap.set(metadata, { opacity: 0, y: 20 });

    // Animate elements in sequence
    if (image) {
      tl.to(image, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out"
      });
    }

    if (title) {
      tl.to(title, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=1");
    }

    if (subtitle) {
      tl.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");
    }

    if (metadata) {
      tl.to(metadata, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");
    }

    return tl;
  }

  /**
   * Create navigation animation
   */
  createNavigationAnimation(navSelector: string = '.project-navigation'): void {
    const nav = document.querySelector(navSelector);
    if (!nav) return;

    const navItems = nav.querySelectorAll('.nav-item, .nav-button');
    
    navItems.forEach(item => {
      this.interactiveAnimations.createButtonHover(item as HTMLElement);
    });

    // Animate navigation entrance
    gsap.fromTo(nav,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      }
    );
  }

  /**
   * Create scroll progress indicator
   */
  createScrollProgress(progressSelector: string = '.scroll-progress'): void {
    const progressBar = document.querySelector(progressSelector);
    if (!progressBar) return;

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress * 100;
        gsap.to(progressBar, {
          width: `${progress}%`,
          duration: 0.3,
          ease: "none"
        });
      }
    });
  }

  /**
   * Create floating elements animation
   */
  createFloatingElements(elementsSelector: string = '.floating-element'): void {
    const elements = document.querySelectorAll(elementsSelector);
    
    elements.forEach((element, index) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      
      tl.to(element, {
        y: -10 - (index * 5),
        rotation: 2 - (index * 1),
        duration: 2 + (index * 0.5),
        ease: "power2.inOut"
      });
    });
  }

  /**
   * Create particle effect animation
   */
  createParticleEffect(containerSelector: string = '.particle-container'): void {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Create particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(59, 130, 246, 0.6);
        border-radius: 50%;
        pointer-events: none;
      `;
      
      container.appendChild(particle);

      // Animate particle
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      });

      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(particle, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      })
      .to(particle, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        duration: 4,
        ease: "none"
      }, 0)
      .to(particle, {
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      }, 3);
    }
  }

  /**
   * Refresh all animations
   */
  refresh(): void {
    ScrollTrigger.refresh();
    this.caseStudyAnimations.refresh();
  }

  /**
   * Destroy all animations
   */
  destroy(): void {
    this.caseStudyAnimations.destroy();
    this.interactiveAnimations.destroy();
    this.timelineAnimations.destroy();
    this.isInitialized = false;
  }

  /**
   * Get animation instances for direct access
   */
  getAnimationInstances() {
    return {
      caseStudyAnimations: this.caseStudyAnimations,
      interactiveAnimations: this.interactiveAnimations,
      timelineAnimations: this.timelineAnimations
    };
  }
}