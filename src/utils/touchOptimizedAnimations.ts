import { gsap } from 'gsap';

export interface TouchAnimationConfig {
  enableHoverEffects: boolean;
  touchFeedbackDuration: number;
  swipeThreshold: number;
  tapDelay: number;
}

// Get touch-optimized animation configuration
export const getTouchAnimationConfig = (): TouchAnimationConfig => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return {
    enableHoverEffects: !isTouchDevice,
    touchFeedbackDuration: 0.15,
    swipeThreshold: 50,
    tapDelay: 100
  };
};

// Touch-friendly button animation
export const createTouchFriendlyButton = (
  element: HTMLElement,
  config?: TouchAnimationConfig
): void => {
  const touchConfig = config || getTouchAnimationConfig();
  
  if (!touchConfig.enableHoverEffects) {
    // Touch device - use tap feedback instead of hover
    let tapTimeout: NodeJS.Timeout;
    
    const handleTouchStart = () => {
      clearTimeout(tapTimeout);
      gsap.to(element, {
        scale: 0.95,
        duration: touchConfig.touchFeedbackDuration,
        ease: 'power2.out'
      });
    };
    
    const handleTouchEnd = () => {
      tapTimeout = setTimeout(() => {
        gsap.to(element, {
          scale: 1,
          duration: touchConfig.touchFeedbackDuration * 2,
          ease: 'back.out(1.7)'
        });
      }, touchConfig.tapDelay);
    };
    
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    
    // Store cleanup function
    (element as any)._touchCleanup = () => {
      clearTimeout(tapTimeout);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchEnd);
    };
  } else {
    // Desktop - use hover effects
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    // Store cleanup function
    (element as any)._touchCleanup = () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }
};

// Swipe gesture handler for image galleries
export const createSwipeHandler = (
  element: HTMLElement,
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  config?: TouchAnimationConfig
): void => {
  const touchConfig = config || getTouchAnimationConfig();
  
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  
  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    startTime = Date.now();
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    const touch = e.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;
    const endTime = Date.now();
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = endTime - startTime;
    
    // Check if it's a valid swipe (horizontal movement > threshold, quick gesture)
    if (Math.abs(deltaX) > touchConfig.swipeThreshold && 
        Math.abs(deltaY) < touchConfig.swipeThreshold * 0.5 && 
        deltaTime < 500) {
      
      if (deltaX > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    }
  };
  
  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  // Store cleanup function
  (element as any)._swipeCleanup = () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchend', handleTouchEnd);
  };
};

// Optimized scroll-based animations for touch devices
export const createTouchOptimizedScrollAnimation = (
  element: HTMLElement,
  animationProps: gsap.TweenVars,
  config?: TouchAnimationConfig
): ScrollTrigger => {
  const touchConfig = config || getTouchAnimationConfig();
  const isTouchDevice = !touchConfig.enableHoverEffects;
  
  // Simplified animation for touch devices
  const optimizedProps = isTouchDevice ? {
    ...animationProps,
    duration: Math.min(animationProps.duration || 0.8, 0.5),
    ease: 'power1.out'
  } : animationProps;
  
  return ScrollTrigger.create({
    trigger: element,
    start: 'top 85%',
    toggleActions: 'play none none reverse',
    animation: gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      optimizedProps
    )
  });
};

// Performance-optimized image loading with touch feedback
export const createTouchOptimizedImageLoader = (
  img: HTMLImageElement,
  onLoad?: () => void
): void => {
  const config = getTouchAnimationConfig();
  
  // Add loading state
  gsap.set(img, { opacity: 0, scale: 0.9 });
  
  const handleLoad = () => {
    gsap.to(img, {
      opacity: 1,
      scale: 1,
      duration: config.enableHoverEffects ? 0.8 : 0.4,
      ease: 'power2.out',
      onComplete: onLoad
    });
  };
  
  if (img.complete) {
    handleLoad();
  } else {
    img.addEventListener('load', handleLoad, { once: true });
  }
};

// Cleanup function for touch-optimized elements
export const cleanupTouchOptimizedElement = (element: HTMLElement): void => {
  if ((element as any)._touchCleanup) {
    (element as any)._touchCleanup();
    delete (element as any)._touchCleanup;
  }
  
  if ((element as any)._swipeCleanup) {
    (element as any)._swipeCleanup();
    delete (element as any)._swipeCleanup;
  }
};

// Batch cleanup for multiple elements
export const cleanupTouchOptimizedElements = (elements: HTMLElement[]): void => {
  elements.forEach(cleanupTouchOptimizedElement);
};

// Create touch-optimized timeline with reduced complexity
export const createTouchOptimizedTimeline = (
  elements: HTMLElement[],
  config?: TouchAnimationConfig
): gsap.core.Timeline => {
  const touchConfig = config || getTouchAnimationConfig();
  const isTouchDevice = !touchConfig.enableHoverEffects;
  
  const timeline = gsap.timeline({
    defaults: {
      duration: isTouchDevice ? 0.4 : 0.8,
      ease: isTouchDevice ? 'power1.out' : 'power2.out'
    }
  });
  
  // Simplified stagger for touch devices
  const stagger = isTouchDevice ? 0.05 : 0.1;
  
  timeline.fromTo(elements,
    { opacity: 0, y: 20 },
    { 
      opacity: 1, 
      y: 0,
      stagger: stagger
    }
  );
  
  return timeline;
};