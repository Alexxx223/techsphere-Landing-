import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class TimelineAnimations {
  private timelines: Map<string, gsap.core.Timeline> = new Map();

  /**
   * Create coordinated animation sequence for process timeline
   */
  createProcessTimelineSequence(timelineSelector: string, options: {
    staggerDelay?: number;
    lineAnimationDuration?: number;
    stepAnimationDuration?: number;
  } = {}): gsap.core.Timeline {
    const {
      staggerDelay = 0.2,
      lineAnimationDuration = 2,
      stepAnimationDuration = 0.8
    } = options;

    const timeline = document.querySelector(timelineSelector);
    if (!timeline) return gsap.timeline();

    const steps = timeline.querySelectorAll('.process-step, .timeline-step');
    const timelineLine = timeline.querySelector('.timeline-line');
    const stepIndicators = timeline.querySelectorAll('.step-indicator, .timeline-node');

    const masterTimeline = gsap.timeline();

    // Animate timeline line first
    if (timelineLine) {
      masterTimeline.fromTo(timelineLine,
        { scaleY: 0, transformOrigin: "top center" },
        { 
          scaleY: 1, 
          duration: lineAnimationDuration,
          ease: "power2.out"
        }
      );
    }

    // Animate steps with coordinated sequence
    steps.forEach((step, index) => {
      const stepContent = step.querySelector('.step-content, .content');
      const stepImage = step.querySelector('.step-image, img');
      const stepTitle = step.querySelector('.step-title, h3, h4');
      const stepDescription = step.querySelector('.step-description, p');

      // Create timeline for this step
      const stepTimeline = gsap.timeline();

      // Animate step indicator
      if (stepIndicators[index]) {
        stepTimeline.fromTo(stepIndicators[index],
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.5,
            ease: "back.out(1.7)"
          }
        );
      }

      // Animate step container
      stepTimeline.fromTo(step,
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: stepAnimationDuration,
          ease: "power2.out"
        },
        "-=0.3"
      );

      // Animate step content elements
      if (stepTitle) {
        stepTimeline.fromTo(stepTitle,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.4"
        );
      }

      if (stepDescription) {
        stepTimeline.fromTo(stepDescription,
          { opacity: 0, y: 15 },
          { 
            opacity: 1, 
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          "-=0.3"
        );
      }

      if (stepImage) {
        stepTimeline.fromTo(stepImage,
          { opacity: 0, scale: 0.9 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          },
          "-=0.5"
        );
      }

      // Add step timeline to master timeline with stagger
      masterTimeline.add(stepTimeline, index * staggerDelay);
    });

    // Add scroll trigger
    ScrollTrigger.create({
      trigger: timeline,
      start: "top 70%",
      animation: masterTimeline
    });

    this.timelines.set(timelineSelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Create animated metric counters with coordinated timing
   */
  createMetricCounterSequence(containerSelector: string, options: {
    duration?: number;
    staggerDelay?: number;
    easing?: string;
  } = {}): gsap.core.Timeline {
    const {
      duration = 2,
      staggerDelay = 0.3,
      easing = "power2.out"
    } = options;

    const container = document.querySelector(containerSelector);
    if (!container) return gsap.timeline();

    const counters = container.querySelectorAll('[data-counter]');
    const progressBars = container.querySelectorAll('[data-progress]');
    const metricCards = container.querySelectorAll('.metric-card');

    const masterTimeline = gsap.timeline();

    // Animate metric cards entrance
    if (metricCards.length > 0) {
      masterTimeline.fromTo(metricCards,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: staggerDelay / 2
        }
      );
    }

    // Animate counters
    counters.forEach((counter, index) => {
      const endValue = parseInt(counter.getAttribute('data-counter') || '0');
      const startValue = parseInt(counter.getAttribute('data-start') || '0');
      const unit = counter.getAttribute('data-unit') || '';
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0');

      const counterObj = { value: startValue };

      const counterTimeline = gsap.timeline();
      counterTimeline.to(counterObj, {
        value: endValue,
        duration: duration,
        ease: easing,
        onUpdate: () => {
          const currentValue = decimals > 0 
            ? counterObj.value.toFixed(decimals)
            : Math.round(counterObj.value);
          counter.textContent = `${currentValue}${unit}`;
        }
      });

      // Add counter animation to master timeline
      masterTimeline.add(counterTimeline, 0.5 + (index * staggerDelay));
    });

    // Animate progress bars
    progressBars.forEach((progressBar, index) => {
      const maxWidth = parseInt(progressBar.getAttribute('data-progress') || '100');
      
      const progressTimeline = gsap.timeline();
      progressTimeline.fromTo(progressBar,
        { width: "0%" },
        { 
          width: `${maxWidth}%`,
          duration: duration,
          ease: easing
        }
      );

      // Add progress animation to master timeline
      masterTimeline.add(progressTimeline, 0.8 + (index * staggerDelay));
    });

    // Add scroll trigger
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      animation: masterTimeline
    });

    this.timelines.set(containerSelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Create image gallery transition animations
   */
  createImageGallerySequence(gallerySelector: string, options: {
    transitionType?: 'fade' | 'slide' | 'scale' | 'flip';
    duration?: number;
    staggerDelay?: number;
  } = {}): gsap.core.Timeline {
    const {
      transitionType = 'fade',
      duration = 0.8,
      staggerDelay = 0.1
    } = options;

    const gallery = document.querySelector(gallerySelector);
    if (!gallery) return gsap.timeline();

    const images = gallery.querySelectorAll('img, .gallery-item');
    const masterTimeline = gsap.timeline();

    images.forEach((image, index) => {
      const imageTimeline = gsap.timeline();

      switch (transitionType) {
        case 'fade':
          imageTimeline.fromTo(image,
            { opacity: 0 },
            { 
              opacity: 1,
              duration: duration,
              ease: "power2.out"
            }
          );
          break;

        case 'slide':
          const direction = index % 2 === 0 ? -50 : 50;
          imageTimeline.fromTo(image,
            { opacity: 0, x: direction },
            { 
              opacity: 1,
              x: 0,
              duration: duration,
              ease: "power2.out"
            }
          );
          break;

        case 'scale':
          imageTimeline.fromTo(image,
            { opacity: 0, scale: 0.8 },
            { 
              opacity: 1,
              scale: 1,
              duration: duration,
              ease: "back.out(1.7)"
            }
          );
          break;

        case 'flip':
          imageTimeline.fromTo(image,
            { opacity: 0, rotationY: 90 },
            { 
              opacity: 1,
              rotationY: 0,
              duration: duration,
              ease: "power2.out"
            }
          );
          break;
      }

      // Add image animation to master timeline with stagger
      masterTimeline.add(imageTimeline, index * staggerDelay);
    });

    // Add scroll trigger
    ScrollTrigger.create({
      trigger: gallery,
      start: "top 85%",
      animation: masterTimeline
    });

    this.timelines.set(gallerySelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Create text reveal animations for content sections
   */
  createTextRevealSequence(containerSelector: string, options: {
    revealType?: 'words' | 'lines' | 'characters';
    duration?: number;
    staggerDelay?: number;
  } = {}): gsap.core.Timeline {
    const {
      revealType = 'words',
      duration = 0.8,
      staggerDelay = 0.05
    } = options;

    const container = document.querySelector(containerSelector);
    if (!container) return gsap.timeline();

    const textElements = container.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .text-reveal');
    const masterTimeline = gsap.timeline();

    textElements.forEach((textElement, elementIndex) => {
      const text = textElement.textContent || '';
      let textParts: string[] = [];

      // Split text based on reveal type
      switch (revealType) {
        case 'words':
          textParts = text.split(' ');
          break;
        case 'lines':
          textParts = text.split('\n');
          break;
        case 'characters':
          textParts = text.split('');
          break;
      }

      // Create spans for each text part
      const spans = textParts.map(part => {
        const span = document.createElement('span');
        span.style.cssText = `
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        `;
        
        const innerSpan = document.createElement('span');
        innerSpan.textContent = part + (revealType === 'words' ? ' ' : '');
        innerSpan.style.cssText = `
          display: inline-block;
          transform: translateY(100%);
        `;
        
        span.appendChild(innerSpan);
        return span;
      });

      // Replace original text with spans
      textElement.innerHTML = '';
      spans.forEach(span => textElement.appendChild(span));

      // Animate text reveal
      const textTimeline = gsap.timeline();
      const innerSpans = spans.map(span => span.querySelector('span'));

      textTimeline.to(innerSpans, {
        y: 0,
        duration: duration,
        ease: "power2.out",
        stagger: staggerDelay
      });

      // Add text animation to master timeline
      masterTimeline.add(textTimeline, elementIndex * 0.2);
    });

    // Add scroll trigger
    ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      animation: masterTimeline
    });

    this.timelines.set(containerSelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Create coordinated section entrance sequence
   */
  createSectionEntranceSequence(sectionSelector: string, options: {
    animateBackground?: boolean;
    animateContent?: boolean;
    duration?: number;
  } = {}): gsap.core.Timeline {
    const {
      animateBackground = true,
      animateContent = true,
      duration = 1.2
    } = options;

    const section = document.querySelector(sectionSelector);
    if (!section) return gsap.timeline();

    const masterTimeline = gsap.timeline();

    // Animate section background
    if (animateBackground) {
      const background = section.querySelector('.section-bg, .background');
      if (background) {
        masterTimeline.fromTo(background,
          { opacity: 0, scale: 1.1 },
          { 
            opacity: 1,
            scale: 1,
            duration: duration,
            ease: "power2.out"
          }
        );
      }
    }

    // Animate section content
    if (animateContent) {
      const title = section.querySelector('h1, h2, h3, .section-title');
      const subtitle = section.querySelector('.subtitle, .section-subtitle');
      const content = section.querySelector('.content, .section-content');
      const cards = section.querySelectorAll('.card, .item');

      if (title) {
        masterTimeline.fromTo(title,
          { opacity: 0, y: 50 },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          },
          0.2
        );
      }

      if (subtitle) {
        masterTimeline.fromTo(subtitle,
          { opacity: 0, y: 30 },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          },
          0.4
        );
      }

      if (content) {
        masterTimeline.fromTo(content,
          { opacity: 0, y: 30 },
          { 
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          },
          0.6
        );
      }

      if (cards.length > 0) {
        masterTimeline.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          { 
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            stagger: 0.1
          },
          0.8
        );
      }
    }

    // Add scroll trigger
    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      animation: masterTimeline
    });

    this.timelines.set(sectionSelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Create morphing animation between states
   */
  createMorphingSequence(containerSelector: string, states: string[], options: {
    duration?: number;
    autoPlay?: boolean;
    interval?: number;
  } = {}): gsap.core.Timeline {
    const {
      duration = 1,
      autoPlay = false,
      interval = 3
    } = options;

    const container = document.querySelector(containerSelector);
    if (!container || states.length < 2) return gsap.timeline();

    const stateElements = states.map(state => container.querySelector(state)).filter(Boolean);
    if (stateElements.length < 2) return gsap.timeline();

    const masterTimeline = gsap.timeline({ repeat: autoPlay ? -1 : 0 });

    // Initially hide all states except the first
    gsap.set(stateElements.slice(1), { opacity: 0, scale: 0.9 });

    stateElements.forEach((currentState, index) => {
      if (index === stateElements.length - 1) return; // Skip last element

      const nextState = stateElements[index + 1];
      
      masterTimeline
        .to(currentState, {
          opacity: 0,
          scale: 0.9,
          duration: duration / 2,
          ease: "power2.in"
        })
        .to(nextState, {
          opacity: 1,
          scale: 1,
          duration: duration / 2,
          ease: "power2.out"
        }, `-=${duration / 4}`)
        .to({}, { duration: interval }); // Pause between transitions
    });

    this.timelines.set(containerSelector, masterTimeline);
    return masterTimeline;
  }

  /**
   * Get timeline by selector
   */
  getTimeline(selector: string): gsap.core.Timeline | undefined {
    return this.timelines.get(selector);
  }

  /**
   * Play timeline
   */
  playTimeline(selector: string): void {
    const timeline = this.timelines.get(selector);
    if (timeline) {
      timeline.play();
    }
  }

  /**
   * Pause timeline
   */
  pauseTimeline(selector: string): void {
    const timeline = this.timelines.get(selector);
    if (timeline) {
      timeline.pause();
    }
  }

  /**
   * Restart timeline
   */
  restartTimeline(selector: string): void {
    const timeline = this.timelines.get(selector);
    if (timeline) {
      timeline.restart();
    }
  }

  /**
   * Destroy all timelines
   */
  destroy(): void {
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();
  }
}