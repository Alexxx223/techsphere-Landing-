import { AnimationSettings, ResponsiveAnimationConfig } from '../../types/animation';

// Default animation settings for different device types
export const animationConfig: ResponsiveAnimationConfig = {
  mobile: {
    duration: 0.6,
    ease: "power2.out",
    delay: 0,
    stagger: 0.1
  },
  tablet: {
    duration: 0.8,
    ease: "power2.out", 
    delay: 0,
    stagger: 0.15
  },
  desktop: {
    duration: 1,
    ease: "power2.out",
    delay: 0,
    stagger: 0.2
  }
};

// Animation easing presets
export const easingPresets = {
  smooth: "power2.out",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  sharp: "power4.out",
  gentle: "power1.out"
};

// Scroll trigger defaults
export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse"
};

// Performance settings
export const performanceConfig = {
  // Reduce animations on low-end devices
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  // Hardware acceleration
  force3D: true,
  // Batch DOM operations
  autoSleep: 60
};