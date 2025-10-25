/**
 * Page transition utilities for smooth navigation between portfolio and case studies
 */

import { gsap } from 'gsap';

export interface TransitionConfig {
  duration?: number;
  ease?: string;
  delay?: number;
}

const defaultConfig: TransitionConfig = {
  duration: 0.6,
  ease: 'power2.out',
  delay: 0
};

/**
 * Animate page entrance with fade and slide up effect
 */
export const animatePageEnter = (element: HTMLElement, config: TransitionConfig = {}) => {
  const { duration, ease, delay } = { ...defaultConfig, ...config };
  
  gsap.fromTo(element, 
    {
      opacity: 0,
      y: 30,
      scale: 0.98
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      ease,
      delay
    }
  );
};

/**
 * Animate page exit with fade and slide down effect
 */
export const animatePageExit = (element: HTMLElement, config: TransitionConfig = {}) => {
  const { duration, ease } = { ...defaultConfig, ...config };
  
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    scale: 0.98,
    duration: duration * 0.8,
    ease
  });
};

/**
 * Animate breadcrumb entrance
 */
export const animateBreadcrumbEnter = (element: HTMLElement) => {
  gsap.fromTo(element,
    {
      opacity: 0,
      y: -10
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      delay: 0.2
    }
  );
};

/**
 * Animate portfolio card hover effect enhancement
 */
export const enhanceCardHover = (card: HTMLElement, isEntering: boolean) => {
  if (isEntering) {
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
  } else {
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

/**
 * Stagger animation for portfolio grid
 */
export const animatePortfolioGrid = (cards: HTMLElement[]) => {
  gsap.fromTo(cards,
    {
      opacity: 0,
      y: 40,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    }
  );
};