import { useState, useEffect } from 'react';

export interface BreakpointConfig {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isWide: boolean;
  screenWidth: number;
  orientation: 'portrait' | 'landscape';
}

const defaultBreakpoints: BreakpointConfig = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
  wide: 1920
};

export const useResponsive = (customBreakpoints?: Partial<BreakpointConfig>): ResponsiveState => {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };
  
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isWide: false,
        screenWidth: 1024,
        orientation: 'landscape'
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      isMobile: width < breakpoints.mobile,
      isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
      isDesktop: width >= breakpoints.tablet && width < breakpoints.wide,
      isWide: width >= breakpoints.wide,
      screenWidth: width,
      orientation: width > height ? 'landscape' : 'portrait'
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setResponsiveState({
        isMobile: width < breakpoints.mobile,
        isTablet: width >= breakpoints.mobile && width < breakpoints.tablet,
        isDesktop: width >= breakpoints.tablet && width < breakpoints.wide,
        isWide: width >= breakpoints.wide,
        screenWidth: width,
        orientation: width > height ? 'landscape' : 'portrait'
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Initial call to set correct state
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints.mobile, breakpoints.tablet, breakpoints.desktop, breakpoints.wide]);

  return responsiveState;
};

// Hook for touch device detection
export const useTouchDevice = (): boolean => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      );
    };

    checkTouchDevice();
  }, []);

  return isTouchDevice;
};

// Hook for reduced motion preference
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Utility function to get responsive classes
export const getResponsiveClasses = (
  mobile: string,
  tablet?: string,
  desktop?: string,
  wide?: string
): string => {
  const classes = [mobile];
  
  if (tablet) classes.push(`md:${tablet}`);
  if (desktop) classes.push(`lg:${desktop}`);
  if (wide) classes.push(`xl:${wide}`);
  
  return classes.join(' ');
};

// Utility function for responsive spacing
export const getResponsiveSpacing = (
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
): string => {
  const spacingMap = {
    xs: 'py-8 md:py-12',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-20',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-32',
    xxl: 'py-32 md:py-40'
  };
  
  return spacingMap[size];
};

// Utility function for responsive text sizes
export const getResponsiveTextSize = (
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
): string => {
  const textSizeMap = {
    xs: 'text-sm md:text-base',
    sm: 'text-base md:text-lg',
    md: 'text-lg md:text-xl lg:text-2xl',
    lg: 'text-xl md:text-2xl lg:text-3xl',
    xl: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    xxl: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
  };
  
  return textSizeMap[size];
};