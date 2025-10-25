// GSAP optimization utilities for better performance and smaller bundle size

// Core GSAP imports - only import what we need
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register only the plugins we actually use
gsap.registerPlugin(ScrollTrigger);

// Performance optimization settings
export const initializeGSAP = () => {
  // Set global GSAP defaults for better performance
  gsap.defaults({
    duration: 0.6,
    ease: "power2.out",
  });

  // Configure ScrollTrigger for better performance
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  });

  // Batch ScrollTrigger refreshes for better performance
  ScrollTrigger.batch(".animate-on-scroll", {
    onEnter: (elements) => {
      gsap.from(elements, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    once: true,
  });
};

// Optimized animation presets
export const animationPresets = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: "power2.out" },
  },
  slideUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
  },
  slideInLeft: {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },
  slideInRight: {
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
  },
  staggerFadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
  },
};

// Optimized ScrollTrigger creation
export const createScrollTrigger = (
  element: string | Element,
  animation: gsap.core.Tween | gsap.core.Timeline,
  options: ScrollTrigger.Vars = {}
) => {
  const defaultOptions: ScrollTrigger.Vars = {
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    once: true, // Most animations should only play once for performance
  };

  return ScrollTrigger.create({
    ...defaultOptions,
    ...options,
    animation,
  });
};

// Performance monitoring
export const monitorAnimationPerformance = () => {
  if (typeof window !== 'undefined' && window.performance) {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkFrameRate = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          console.warn(`Low animation frame rate detected: ${fps}fps`);
          // Optionally disable complex animations on low-performance devices
          gsap.globalTimeline.timeScale(0.5); // Slow down animations
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFrameRate);
    };

    requestAnimationFrame(checkFrameRate);
  }
};

// Cleanup utility for component unmounting
export const cleanupGSAP = (selector?: string) => {
  if (selector) {
    // Kill specific animations
    gsap.killTweensOf(selector);
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger === selector || 
          (typeof trigger.trigger === 'string' && trigger.trigger.includes(selector))) {
        trigger.kill();
      }
    });
  } else {
    // Kill all animations and ScrollTriggers
    gsap.killTweensOf("*");
    ScrollTrigger.killAll();
  }
};

// Reduced motion support
export const respectsReducedMotion = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  return false;
};

// Apply reduced motion settings
export const applyReducedMotionSettings = () => {
  if (respectsReducedMotion()) {
    gsap.globalTimeline.timeScale(0.1); // Dramatically slow down animations
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "none", // Reduce refresh events
    });
  }
};

// Initialize performance optimizations
export const initializePerformanceOptimizations = () => {
  initializeGSAP();
  applyReducedMotionSettings();
  monitorAnimationPerformance();
};