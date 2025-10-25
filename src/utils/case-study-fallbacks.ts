import { CaseStudy, ProcessStep, ProjectMetric, Technology, ClientTestimonial } from '@/types/caseStudy';

// Fallback data for missing case study content
export const fallbackCaseStudyData: Partial<CaseStudy> = {
  title: 'Project Case Study',
  subtitle: 'Detailed project breakdown and results',
  category: 'Design',
  date: new Date().toISOString().split('T')[0],
  duration: 'N/A',
  client: 'Client',
  heroImage: '/placeholder.svg',
  overview: {
    challenge: 'Project challenge information is currently unavailable.',
    solution: 'Solution details are being updated.',
    result: 'Results and outcomes will be available soon.',
    objectives: ['Objective information pending']
  },
  process: [],
  technologies: [],
  metrics: [],
  gallery: [],
  tags: ['case-study'],
  animationConfig: {
    enableParallax: false,
    enableScrollTrigger: false,
    reducedMotion: true
  }
};

// Generate fallback process steps
export const generateFallbackProcessSteps = (count: number = 4): ProcessStep[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `step-${index + 1}`,
    title: `Process Step ${index + 1}`,
    description: 'Process details are currently being updated. Please check back later for complete information.',
    duration: 'TBD',
    images: ['/placeholder.svg'],
    details: ['Process information pending'],
    order: index + 1,
    icon: '⚙️'
  }));
};

// Generate fallback metrics
export const generateFallbackMetrics = (): ProjectMetric[] => {
  return [
    {
      label: 'Project Completion',
      value: 100,
      unit: '%',
      description: 'Project successfully completed',
      animationType: 'progress' as const,
      previousValue: 0,
      improvement: 'Completed'
    },
    {
      label: 'Client Satisfaction',
      value: 'High',
      description: 'Positive client feedback received',
      animationType: 'fade' as const,
      improvement: 'Satisfied'
    }
  ];
};

// Generate fallback technologies
export const generateFallbackTechnologies = (): Technology[] => {
  return [
    { name: 'Design Tools', category: 'design', description: 'Professional design software' },
    { name: 'Development Tools', category: 'development', description: 'Modern development stack' }
  ];
};

// Generate fallback testimonial
export const generateFallbackTestimonial = (): ClientTestimonial => {
  return {
    quote: 'We are pleased with the project outcome and the professional approach taken throughout the development process.',
    author: 'Client Representative',
    position: 'Project Manager',
    company: 'Client Organization',
    rating: 5
  };
};

// Validate and fill missing case study data
export const validateAndFillCaseStudy = (caseStudy: Partial<CaseStudy>): CaseStudy => {
  const filled: CaseStudy = {
    ...fallbackCaseStudyData,
    ...caseStudy,
    id: caseStudy.id || 'unknown',
    title: caseStudy.title || fallbackCaseStudyData.title!,
    subtitle: caseStudy.subtitle || fallbackCaseStudyData.subtitle!,
    category: caseStudy.category || fallbackCaseStudyData.category!,
    date: caseStudy.date || fallbackCaseStudyData.date!,
    duration: caseStudy.duration || fallbackCaseStudyData.duration!,
    client: caseStudy.client || fallbackCaseStudyData.client!,
    heroImage: caseStudy.heroImage || fallbackCaseStudyData.heroImage!,
    overview: {
      ...fallbackCaseStudyData.overview!,
      ...caseStudy.overview
    },
    process: caseStudy.process && caseStudy.process.length > 0 
      ? caseStudy.process 
      : generateFallbackProcessSteps(),
    technologies: caseStudy.technologies && caseStudy.technologies.length > 0
      ? caseStudy.technologies
      : generateFallbackTechnologies(),
    metrics: caseStudy.metrics && caseStudy.metrics.length > 0
      ? caseStudy.metrics
      : generateFallbackMetrics(),
    gallery: caseStudy.gallery || fallbackCaseStudyData.gallery!,
    tags: caseStudy.tags || fallbackCaseStudyData.tags!,
    seoTitle: caseStudy.seoTitle || `${caseStudy.title || 'Case Study'} | Portfolio`,
    seoDescription: caseStudy.seoDescription || `Detailed case study for ${caseStudy.title || 'this project'}.`,
    ogImage: caseStudy.ogImage || caseStudy.heroImage || fallbackCaseStudyData.heroImage!,
    animationConfig: {
      ...fallbackCaseStudyData.animationConfig!,
      ...caseStudy.animationConfig
    }
  };

  return filled;
};

// Check if case study has sufficient content
export const validateCaseStudyContent = (caseStudy: CaseStudy): {
  isValid: boolean;
  missingFields: string[];
  warnings: string[];
} => {
  const missingFields: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!caseStudy.title || caseStudy.title === fallbackCaseStudyData.title) {
    missingFields.push('title');
  }

  if (!caseStudy.overview?.challenge || caseStudy.overview.challenge === fallbackCaseStudyData.overview?.challenge) {
    missingFields.push('overview.challenge');
  }

  if (!caseStudy.overview?.solution || caseStudy.overview.solution === fallbackCaseStudyData.overview?.solution) {
    missingFields.push('overview.solution');
  }

  if (!caseStudy.heroImage || caseStudy.heroImage === '/placeholder.svg') {
    warnings.push('Using placeholder hero image');
  }

  if (!caseStudy.process || caseStudy.process.length === 0) {
    warnings.push('No process steps defined');
  }

  if (!caseStudy.metrics || caseStudy.metrics.length === 0) {
    warnings.push('No metrics defined');
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    warnings
  };
};

// Safe getter functions with fallbacks
export const safeGetCaseStudyField = <T>(
  caseStudy: CaseStudy | null,
  field: keyof CaseStudy,
  fallback: T
): T => {
  if (!caseStudy || !caseStudy[field]) {
    return fallback;
  }
  return caseStudy[field] as T;
};

export const safeGetProcessSteps = (caseStudy: CaseStudy | null): ProcessStep[] => {
  if (!caseStudy?.process || caseStudy.process.length === 0) {
    return generateFallbackProcessSteps();
  }
  return caseStudy.process;
};

export const safeGetMetrics = (caseStudy: CaseStudy | null): ProjectMetric[] => {
  if (!caseStudy?.metrics || caseStudy.metrics.length === 0) {
    return generateFallbackMetrics();
  }
  return caseStudy.metrics;
};

export const safeGetTechnologies = (caseStudy: CaseStudy | null): Technology[] => {
  if (!caseStudy?.technologies || caseStudy.technologies.length === 0) {
    return generateFallbackTechnologies();
  }
  return caseStudy.technologies;
};