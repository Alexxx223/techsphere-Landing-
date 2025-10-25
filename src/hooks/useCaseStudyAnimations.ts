import { useEffect, useRef, useCallback } from 'react';
import { CaseStudyAnimationManager } from '@/lib/animations';
import { 
  getDeviceAnimationConfig, 
  applyDeviceGSAPSettings, 
  createAdaptiveAnimationManager,
  DeviceAnimationConfig 
} from '@/utils/deviceAnimationConfig';

/**
 * Custom hook for managing case study animations with device optimization
 * Provides a simplified interface for case study specific animations
 */
export const useCaseStudyAnimations = (containerSelector: string = '.case-study-page') => {
  const animationManagerRef = useRef<CaseStudyAnimationManager | null>(null);
  const deviceConfigRef = useRef<DeviceAnimationConfig | null>(null);
  const adaptiveManagerRef = useRef<ReturnType<typeof createAdaptiveAnimationManager> | null>(null);

  useEffect(() => {
    // Get device-optimized animation configuration
    deviceConfigRef.current = getDeviceAnimationConfig();
    
    // Apply device-specific GSAP settings
    applyDeviceGSAPSettings(deviceConfigRef.current);
    
    // Initialize adaptive animation manager for performance monitoring
    adaptiveManagerRef.current = createAdaptiveAnimationManager();
    
    // Initialize animation manager
    animationManagerRef.current = new CaseStudyAnimationManager();
    
    // Wait for DOM to be ready
    const initializeAnimations = () => {
      if (animationManagerRef.current && deviceConfigRef.current) {
        animationManagerRef.current.initializeAll(containerSelector);
      }
    };

    // Initialize immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeAnimations);
    } else {
      // Small delay to ensure all components are mounted
      setTimeout(initializeAnimations, 100);
    }

    // Handle window resize with device config update
    const handleResize = () => {
      // Update device configuration on resize
      const newConfig = getDeviceAnimationConfig();
      deviceConfigRef.current = newConfig;
      applyDeviceGSAPSettings(newConfig);
      
      if (animationManagerRef.current) {
        animationManagerRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      document.removeEventListener('DOMContentLoaded', initializeAnimations);
      window.removeEventListener('resize', handleResize);
      
      if (animationManagerRef.current) {
        animationManagerRef.current.destroy();
        animationManagerRef.current = null;
      }
      
      deviceConfigRef.current = null;
      adaptiveManagerRef.current = null;
    };
  }, [containerSelector]);

  // Animation control methods
  const initializeHeroAnimation = useCallback((heroSelector?: string) => {
    return animationManagerRef.current?.createHeroAnimation(heroSelector);
  }, []);

  const initializeNavigationAnimation = useCallback((navSelector?: string) => {
    return animationManagerRef.current?.createNavigationAnimation(navSelector);
  }, []);

  const initializeScrollProgress = useCallback((progressSelector?: string) => {
    return animationManagerRef.current?.createScrollProgress(progressSelector);
  }, []);

  const initializeFloatingElements = useCallback((elementsSelector?: string) => {
    return animationManagerRef.current?.createFloatingElements(elementsSelector);
  }, []);

  const initializeParticleEffect = useCallback((containerSelector?: string) => {
    return animationManagerRef.current?.createParticleEffect(containerSelector);
  }, []);

  const refresh = useCallback(() => {
    return animationManagerRef.current?.refresh();
  }, []);

  const getAnimationInstances = useCallback(() => {
    return animationManagerRef.current?.getAnimationInstances();
  }, []);

  // Get current device configuration
  const getDeviceConfig = useCallback(() => {
    return deviceConfigRef.current || getDeviceAnimationConfig();
  }, []);

  // Get performance metrics
  const getPerformanceMetrics = useCallback(() => {
    return adaptiveManagerRef.current?.getMonitor() || null;
  }, []);

  return {
    // Animation initialization methods
    initializeHeroAnimation,
    initializeNavigationAnimation,
    initializeScrollProgress,
    initializeFloatingElements,
    initializeParticleEffect,
    
    // Utility methods
    refresh,
    getAnimationInstances,
    
    // Device optimization methods
    getDeviceConfig,
    getPerformanceMetrics,
    
    // Direct access to animation manager
    animationManager: animationManagerRef.current
  };
};