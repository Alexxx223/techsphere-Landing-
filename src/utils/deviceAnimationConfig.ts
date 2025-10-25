import { gsap } from 'gsap';

export interface DeviceAnimationConfig {
  duration: number;
  ease: string;
  stagger: number;
  parallaxIntensity: number;
  enableComplexAnimations: boolean;
  enableParallax: boolean;
  enableParticles: boolean;
  frameRate: number;
  reducedMotion: boolean;
}

export interface DeviceCapabilities {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

// Detect device capabilities
export const detectDeviceCapabilities = (): DeviceCapabilities => {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isDesktop = window.innerWidth >= 1024;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Detect low-end devices based on hardware concurrency and memory
  const isLowEndDevice = (() => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 1;
    // @ts-ignore - deviceMemory is not in all browsers
    const deviceMemory = navigator.deviceMemory || 4;
    
    // Consider device low-end if it has <= 2 cores or <= 2GB RAM
    return hardwareConcurrency <= 2 || deviceMemory <= 2;
  })();
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Detect connection speed (simplified)
  const connectionSpeed = (() => {
    // @ts-ignore - connection is not in all browsers
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!connection) return 'unknown';
    
    const effectiveType = connection.effectiveType;
    if (effectiveType === 'slow-2g' || effectiveType === '2g') return 'slow';
    if (effectiveType === '3g') return 'fast';
    if (effectiveType === '4g') return 'fast';
    
    return 'unknown';
  })();
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isLowEndDevice,
    prefersReducedMotion,
    connectionSpeed
  };
};

// Get optimized animation configuration based on device capabilities
export const getDeviceAnimationConfig = (capabilities?: DeviceCapabilities): DeviceAnimationConfig => {
  const caps = capabilities || detectDeviceCapabilities();
  
  // Base configuration for high-end desktop
  let config: DeviceAnimationConfig = {
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.1,
    parallaxIntensity: 100,
    enableComplexAnimations: true,
    enableParallax: true,
    enableParticles: true,
    frameRate: 60,
    reducedMotion: caps.prefersReducedMotion
  };
  
  // Reduced motion configuration
  if (caps.prefersReducedMotion) {
    return {
      ...config,
      duration: 0.3,
      ease: 'none',
      stagger: 0,
      parallaxIntensity: 0,
      enableComplexAnimations: false,
      enableParallax: false,
      enableParticles: false,
      frameRate: 30,
      reducedMotion: true
    };
  }
  
  // Low-end device optimizations
  if (caps.isLowEndDevice || caps.connectionSpeed === 'slow') {
    config = {
      ...config,
      duration: 0.5,
      ease: 'power1.out',
      stagger: 0.05,
      parallaxIntensity: 30,
      enableComplexAnimations: false,
      enableParallax: false,
      enableParticles: false,
      frameRate: 30
    };
  }
  
  // Mobile optimizations
  if (caps.isMobile) {
    config = {
      ...config,
      duration: Math.min(config.duration, 0.6),
      stagger: Math.min(config.stagger, 0.08),
      parallaxIntensity: Math.min(config.parallaxIntensity, 50),
      enableComplexAnimations: !caps.isLowEndDevice,
      enableParallax: !caps.isLowEndDevice && !caps.isTouchDevice,
      enableParticles: false,
      frameRate: caps.isLowEndDevice ? 30 : 60
    };
  }
  
  // Tablet optimizations
  if (caps.isTablet) {
    config = {
      ...config,
      duration: Math.min(config.duration, 0.7),
      stagger: Math.min(config.stagger, 0.09),
      parallaxIntensity: Math.min(config.parallaxIntensity, 75),
      enableComplexAnimations: true,
      enableParallax: !caps.isTouchDevice,
      enableParticles: !caps.isLowEndDevice,
      frameRate: 60
    };
  }
  
  return config;
};

// Apply device-specific GSAP settings
export const applyDeviceGSAPSettings = (config: DeviceAnimationConfig): void => {
  // Set GSAP ticker frame rate
  gsap.ticker.fps(config.frameRate);
  
  // Configure GSAP for performance
  if (config.reducedMotion || !config.enableComplexAnimations) {
    // Disable unnecessary GSAP features for better performance
    gsap.config({
      force3D: false,
      nullTargetWarn: false
    });
  } else {
    // Enable hardware acceleration for smooth animations
    gsap.config({
      force3D: true,
      nullTargetWarn: false
    });
  }
};

// Create device-optimized animation timeline
export const createOptimizedTimeline = (config?: DeviceAnimationConfig): gsap.core.Timeline => {
  const animConfig = config || getDeviceAnimationConfig();
  
  const timeline = gsap.timeline({
    defaults: {
      duration: animConfig.duration,
      ease: animConfig.ease
    }
  });
  
  return timeline;
};

// Device-optimized scroll trigger configuration
export const getOptimizedScrollTriggerConfig = (
  trigger: string | Element,
  config?: DeviceAnimationConfig
): ScrollTrigger.StaticVars => {
  const animConfig = config || getDeviceAnimationConfig();
  
  const baseConfig: ScrollTrigger.StaticVars = {
    trigger,
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  };
  
  // Disable scrub animations on low-end devices
  if (!animConfig.enableComplexAnimations) {
    return baseConfig;
  }
  
  // Add scrub for smooth scrolling on capable devices
  return {
    ...baseConfig,
    scrub: animConfig.enableParallax ? 1 : false
  };
};

// Utility to check if animation should be enabled
export const shouldEnableAnimation = (
  animationType: 'basic' | 'complex' | 'parallax' | 'particles',
  config?: DeviceAnimationConfig
): boolean => {
  const animConfig = config || getDeviceAnimationConfig();
  
  if (animConfig.reducedMotion) return false;
  
  switch (animationType) {
    case 'basic':
      return true;
    case 'complex':
      return animConfig.enableComplexAnimations;
    case 'parallax':
      return animConfig.enableParallax;
    case 'particles':
      return animConfig.enableParticles;
    default:
      return true;
  }
};

// Performance monitoring utilities
export const createPerformanceMonitor = () => {
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 60;
  
  const updateFPS = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // Automatically reduce animation quality if FPS drops below 30
      if (fps < 30) {
        console.warn('Low FPS detected, consider reducing animation complexity');
        // You could automatically adjust animation settings here
      }
    }
    
    requestAnimationFrame(updateFPS);
  };
  
  updateFPS();
  
  return {
    getFPS: () => fps,
    isPerformanceGood: () => fps >= 45
  };
};

// Adaptive animation quality based on performance
export const createAdaptiveAnimationManager = () => {
  const monitor = createPerformanceMonitor();
  let currentConfig = getDeviceAnimationConfig();
  
  const adaptQuality = () => {
    const fps = monitor.getFPS();
    
    if (fps < 30 && currentConfig.enableComplexAnimations) {
      // Reduce animation quality
      currentConfig = {
        ...currentConfig,
        enableComplexAnimations: false,
        enableParallax: false,
        duration: Math.min(currentConfig.duration, 0.4),
        frameRate: 30
      };
      
      applyDeviceGSAPSettings(currentConfig);
      console.log('Reduced animation quality due to low FPS');
    } else if (fps > 50 && !currentConfig.enableComplexAnimations) {
      // Restore animation quality if performance improves
      currentConfig = getDeviceAnimationConfig();
      applyDeviceGSAPSettings(currentConfig);
      console.log('Restored animation quality due to improved FPS');
    }
  };
  
  // Check performance every 5 seconds
  setInterval(adaptQuality, 5000);
  
  return {
    getCurrentConfig: () => currentConfig,
    getMonitor: () => monitor
  };
};