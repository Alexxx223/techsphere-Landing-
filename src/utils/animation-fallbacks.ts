// Animation fallback utilities for graceful degradation

export const checkGSAPSupport = (): boolean => {
  try {
    // Check if GSAP is available
    return typeof window !== 'undefined' && 'gsap' in window;
  } catch {
    return false;
  }
};

export const checkWebAnimationsSupport = (): boolean => {
  try {
    return typeof window !== 'undefined' && 'animate' in document.createElement('div');
  } catch {
    return false;
  }
};

export const checkCSSAnimationSupport = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    
    const element = document.createElement('div');
    const prefixes = ['animation', 'webkitAnimation', 'mozAnimation', 'oAnimation'];
    
    return prefixes.some(prefix => prefix in element.style);
  } catch {
    return false;
  }
};

export const getAnimationCapabilities = () => {
  return {
    gsap: checkGSAPSupport(),
    webAnimations: checkWebAnimationsSupport(),
    cssAnimations: checkCSSAnimationSupport(),
    reducedMotion: typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  };
};

// Fallback animation implementations
export const fallbackAnimations = {
  fadeIn: (element: HTMLElement, duration: number = 300) => {
    if (checkCSSAnimationSupport()) {
      element.style.transition = `opacity ${duration}ms ease-in-out`;
      element.style.opacity = '0';
      
      requestAnimationFrame(() => {
        element.style.opacity = '1';
      });
    } else {
      // Immediate show for browsers without animation support
      element.style.opacity = '1';
    }
  },

  slideIn: (element: HTMLElement, direction: 'up' | 'down' | 'left' | 'right' = 'up', duration: number = 300) => {
    if (checkCSSAnimationSupport()) {
      const transforms = {
        up: 'translateY(20px)',
        down: 'translateY(-20px)',
        left: 'translateX(20px)',
        right: 'translateX(-20px)',
      };

      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      element.style.transform = transforms[direction];
      element.style.opacity = '0';
      
      requestAnimationFrame(() => {
        element.style.transform = 'translate(0, 0)';
        element.style.opacity = '1';
      });
    } else {
      element.style.opacity = '1';
    }
  },

  scaleIn: (element: HTMLElement, duration: number = 300) => {
    if (checkCSSAnimationSupport()) {
      element.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      element.style.transform = 'scale(0.9)';
      element.style.opacity = '0';
      
      requestAnimationFrame(() => {
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
      });
    } else {
      element.style.opacity = '1';
    }
  },
};

// Apply fallback animations to elements
export const applyFallbackAnimation = (
  element: HTMLElement | null,
  animationType: keyof typeof fallbackAnimations,
  ...args: any[]
) => {
  if (!element) return;

  try {
    fallbackAnimations[animationType](element, ...args);
  } catch (error) {
    console.warn('Fallback animation failed:', error);
    // Ensure element is visible even if animation fails
    element.style.opacity = '1';
    element.style.transform = 'none';
  }
};

// Initialize fallback animations for elements with specific classes
export const initializeFallbackAnimations = () => {
  if (typeof window === 'undefined') return;

  const capabilities = getAnimationCapabilities();
  
  // If GSAP is available and motion is not reduced, don't use fallbacks
  if (capabilities.gsap && !capabilities.reducedMotion) {
    return;
  }

  // Apply fallback animations to elements with animation classes
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach((element, index) => {
    const htmlElement = element as HTMLElement;
    
    // Stagger the animations slightly
    setTimeout(() => {
      applyFallbackAnimation(htmlElement, 'fadeIn', 600);
    }, index * 100);
  });
};

// Cleanup function for animations
export const cleanupAnimations = (container?: HTMLElement) => {
  const elements = container 
    ? container.querySelectorAll('[style*="transition"], [style*="transform"], [style*="opacity"]')
    : document.querySelectorAll('[style*="transition"], [style*="transform"], [style*="opacity"]');

  elements.forEach(element => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.transition = '';
    htmlElement.style.transform = '';
    htmlElement.style.opacity = '';
  });
};

// Error recovery for failed animations
export const recoverFromAnimationError = (error: Error, element?: HTMLElement) => {
  console.warn('Animation error occurred, falling back to static display:', error);
  
  if (element) {
    // Reset element to visible state
    element.style.opacity = '1';
    element.style.transform = 'none';
    element.style.transition = 'none';
  }
  
  // Add class to disable further animations
  if (typeof document !== 'undefined') {
    document.body.classList.add('animations-disabled');
  }
};