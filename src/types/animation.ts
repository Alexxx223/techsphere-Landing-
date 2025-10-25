// Animation Configuration Types

export type AnimationType = 
  | 'fadeIn' 
  | 'slideInLeft' 
  | 'slideInRight' 
  | 'slideInUp' 
  | 'slideInDown'
  | 'scaleUp' 
  | 'scaleDown'
  | 'stagger'
  | 'parallax'
  | 'counter'
  | 'progress';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface AnimationConfig {
  trigger: string;
  start: string;
  end: string;
  scrub: boolean;
  animation: any; // GSAP Timeline type
  responsive: {
    mobile: Partial<AnimationConfig>;
    tablet: Partial<AnimationConfig>;
    desktop: Partial<AnimationConfig>;
  };
}

export interface ScrollTriggerConfig {
  trigger: string;
  start: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean | object;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  markers?: boolean;
}

export interface AnimationSettings {
  duration: number;
  ease: string;
  delay?: number;
  stagger?: number;
  repeat?: number;
  yoyo?: boolean;
}

export interface ResponsiveAnimationConfig {
  mobile: AnimationSettings;
  tablet: AnimationSettings;
  desktop: AnimationSettings;
}