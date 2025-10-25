import { useEffect, useRef, useCallback } from 'react';
import { AnimationController, ScrollTriggerManager, CaseStudyAnimations } from '../lib/animations';
import { AnimationType } from '../types/animation';

/**
 * Custom hook for managing GSAP animations in React components
 */
export const useAnimations = () => {
  const animationController = useRef<AnimationController | null>(null);
  const scrollTriggerManager = useRef<ScrollTriggerManager | null>(null);
  const caseStudyAnimations = useRef<CaseStudyAnimations | null>(null);

  useEffect(() => {
    // Initialize animation controllers
    animationController.current = new AnimationController();
    scrollTriggerManager.current = new ScrollTriggerManager();
    caseStudyAnimations.current = new CaseStudyAnimations();

    // Handle window resize
    const handleResize = () => {
      animationController.current?.updateDevice();
      scrollTriggerManager.current?.refresh();
      caseStudyAnimations.current?.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      animationController.current?.destroy();
      scrollTriggerManager.current?.killAll();
      caseStudyAnimations.current?.destroy();
    };
  }, []);

  // Animation methods
  const fadeIn = useCallback((element: string | Element, options = {}) => {
    return animationController.current?.fadeIn(element, options);
  }, []);

  const slideIn = useCallback((element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'up', options = {}) => {
    return animationController.current?.slideIn(element, direction, options);
  }, []);

  const stagger = useCallback((elements: string | Element[], animationType: any = 'fadeIn', options = {}) => {
    return animationController.current?.stagger(elements, animationType, options);
  }, []);

  const animateCounter = useCallback((element: string | Element, endValue: number, options = {}) => {
    return animationController.current?.animateCounter(element, endValue, options);
  }, []);

  const createScrollTrigger = useCallback((config: any) => {
    return scrollTriggerManager.current?.create(config);
  }, []);

  const createParallax = useCallback((element: string | Element, speed = 0.5) => {
    return scrollTriggerManager.current?.createParallax(element, speed);
  }, []);

  const createReveal = useCallback((element: string | Element, direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
    return scrollTriggerManager.current?.createReveal(element, direction);
  }, []);

  // New ScrollTrigger methods
  const createFadeIn = useCallback((element: string | Element, options = {}) => {
    return scrollTriggerManager.current?.createFadeIn(element, options);
  }, []);

  const createSlideIn = useCallback((element: string | Element, direction: 'left' | 'right' | 'up' | 'down' = 'up', options = {}) => {
    return scrollTriggerManager.current?.createSlideIn(element, direction, options);
  }, []);

  const createScaleIn = useCallback((element: string | Element, options = {}) => {
    return scrollTriggerManager.current?.createScaleIn(element, options);
  }, []);

  const createStaggerAnimation = useCallback((elements: string | Element[], animationType: AnimationType = 'fadeIn', options = {}) => {
    return scrollTriggerManager.current?.createStagger(elements, animationType, options);
  }, []);

  const createSectionAnimation = useCallback((element: string | Element, animationType: AnimationType = 'fadeIn', options = {}) => {
    return scrollTriggerManager.current?.createSectionAnimation(element, animationType, options);
  }, []);

  const createTextReveal = useCallback((element: string | Element, options = {}) => {
    return scrollTriggerManager.current?.createTextReveal(element, options);
  }, []);

  const createSmoothParallax = useCallback((element: string | Element, speed = 0.3, options = {}) => {
    return scrollTriggerManager.current?.createSmoothParallax(element, speed, options);
  }, []);

  // Case Study specific animations
  const initializeCaseStudyAnimations = useCallback((containerSelector = '.case-study-container') => {
    return caseStudyAnimations.current?.initializeSectionAnimations(containerSelector);
  }, []);

  const createProcessTimeline = useCallback((timelineSelector: string) => {
    return caseStudyAnimations.current?.createProcessTimeline(timelineSelector);
  }, []);

  const createBeforeAfterAnimation = useCallback((containerSelector: string) => {
    return caseStudyAnimations.current?.createBeforeAfterAnimation(containerSelector);
  }, []);

  const createImageReveal = useCallback((imageSelector: string) => {
    return caseStudyAnimations.current?.createImageReveal(imageSelector);
  }, []);

  // Timeline and sequence animations
  const createMetricCounterSequence = useCallback((containerSelector: string, options = {}) => {
    return caseStudyAnimations.current?.createMetricCounterSequence(containerSelector, options);
  }, []);

  const createImageGallerySequence = useCallback((gallerySelector: string, options = {}) => {
    return caseStudyAnimations.current?.createImageGallerySequence(gallerySelector, options);
  }, []);

  const createTextRevealSequence = useCallback((containerSelector: string, options = {}) => {
    return caseStudyAnimations.current?.createTextRevealSequence(containerSelector, options);
  }, []);

  const createSectionEntranceSequence = useCallback((sectionSelector: string, options = {}) => {
    return caseStudyAnimations.current?.createSectionEntranceSequence(sectionSelector, options);
  }, []);

  const createMorphingSequence = useCallback((containerSelector: string, states: string[], options = {}) => {
    return caseStudyAnimations.current?.createMorphingSequence(containerSelector, states, options);
  }, []);

  // Interactive animations
  const initializeInteractiveAnimations = useCallback((containerSelector = 'body') => {
    return animationController.current?.initializeInteractiveAnimations(containerSelector);
  }, []);

  const createButtonHover = useCallback((button: HTMLElement) => {
    return animationController.current?.createButtonHover(button);
  }, []);

  const createCardHover = useCallback((card: HTMLElement) => {
    return animationController.current?.createCardHover(card);
  }, []);

  const createClickFeedback = useCallback((element: HTMLElement) => {
    return animationController.current?.createClickFeedback(element);
  }, []);

  const createLoadingAnimation = useCallback((element: HTMLElement) => {
    return animationController.current?.createLoadingAnimation(element);
  }, []);

  const createPageEntrance = useCallback(() => {
    return animationController.current?.createPageEntrance();
  }, []);

  const createModalAnimation = useCallback((modal: HTMLElement, isOpening = true) => {
    return animationController.current?.createModalAnimation(modal, isOpening);
  }, []);

  const createTooltipAnimation = useCallback((tooltip: HTMLElement, isShowing = true) => {
    return animationController.current?.createTooltipAnimation(tooltip, isShowing);
  }, []);

  const refresh = useCallback(() => {
    animationController.current?.refresh();
    scrollTriggerManager.current?.refresh();
    caseStudyAnimations.current?.refresh();
  }, []);

  return {
    // Original methods
    fadeIn,
    slideIn,
    stagger,
    animateCounter,
    createScrollTrigger,
    createParallax,
    createReveal,
    
    // New ScrollTrigger methods
    createFadeIn,
    createSlideIn,
    createScaleIn,
    createStaggerAnimation,
    createSectionAnimation,
    createTextReveal,
    createSmoothParallax,
    
    // Case Study specific methods
    initializeCaseStudyAnimations,
    createProcessTimeline,
    createBeforeAfterAnimation,
    createImageReveal,
    
    // Timeline and sequence animations
    createMetricCounterSequence,
    createImageGallerySequence,
    createTextRevealSequence,
    createSectionEntranceSequence,
    createMorphingSequence,
    
    // Interactive animation methods
    initializeInteractiveAnimations,
    createButtonHover,
    createCardHover,
    createClickFeedback,
    createLoadingAnimation,
    createPageEntrance,
    createModalAnimation,
    createTooltipAnimation,
    
    // Utility methods
    refresh,
    
    // Direct access to controllers
    animationController: animationController.current,
    scrollTriggerManager: scrollTriggerManager.current,
    caseStudyAnimations: caseStudyAnimations.current
  };
};