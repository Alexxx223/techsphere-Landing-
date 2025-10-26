// Case Study Data Types and Interfaces
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  duration: string;
  client: string;
  heroImage: string;
  heroVideo?: string;
  overview: {
    challenge: string;
    solution: string;
    result: string;
    objectives: string[];
  };
  process: ProcessStep[];
  challengesSolutions: ChallengesSolutions;
  technologies: Technology[];
  metrics: ProjectMetric[];
  testimonial?: ClientTestimonial;
  gallery: ProjectImage[];
  nextProject?: string;
  previousProject?: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  tags: string[];
  animationConfig: AnimationConfig;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  images: string[];
  details: string[];
  order: number;
  icon: IconProp;
}

export interface ChallengesSolutions {
  challenge: {
    title: string;
    description: string;
    image: string;
    painPoints: string[];
  };
  solution: {
    title: string;
    description: string;
    image: string;
    approach: string[];
    keyFeatures: string[];
  };
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'design';
  icon?: string;
  description?: string;
}

export interface ProjectMetric {
  label: string;
  value: string | number;
  unit?: string;
  description: string;
  animationType: 'counter' | 'progress' | 'fade';
  previousValue?: number;
  improvement?: string;
}

export interface ClientTestimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
  rating?: number;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption?: string;
  type: 'hero' | 'process' | 'result' | 'gallery' | 'screenshot' | 'mockup' | 'diagram' | 'photo';
}

export interface AnimationConfig {
  enableParallax: boolean;
  enableScrollTrigger: boolean;
  reducedMotion: boolean;
}
