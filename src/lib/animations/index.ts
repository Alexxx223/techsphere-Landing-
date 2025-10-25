// Animation utilities and configuration exports
export { AnimationController } from './AnimationController';
export { ScrollTriggerManager } from './ScrollTriggerManager';
export { CaseStudyAnimations } from './CaseStudyAnimations';
export { InteractiveAnimations } from './InteractiveAnimations';
export { TimelineAnimations } from './TimelineAnimations';
export { CaseStudyAnimationManager } from './CaseStudyAnimationManager';
export { animationConfig, easingPresets, scrollTriggerDefaults, performanceConfig } from './config';

// Re-export types for convenience
export type { 
  AnimationConfig, 
  ScrollTriggerConfig, 
  AnimationType,
  DeviceType,
  AnimationSettings,
  ResponsiveAnimationConfig
} from '../../types/animation';

export type {
  CaseStudy,
  ProcessStep,
  Technology,
  ProjectMetric,
  ClientTestimonial,
  ProjectImage
} from '../../types/caseStudy';