/**
 * Section navigation and URL management utilities for case study pages
 */

export interface SectionInfo {
  id: string;
  title: string;
  url: string;
  description?: string;
}

// Define available sections in case study pages
export const CASE_STUDY_SECTIONS: SectionInfo[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    url: '#overview',
    description: 'Project introduction and objectives'
  },
  {
    id: 'process',
    title: 'Process Breakdown',
    url: '#process',
    description: 'Step-by-step development process'
  },
  {
    id: 'challenges',
    title: 'Challenges & Solutions',
    url: '#challenges',
    description: 'Problems faced and solutions implemented'
  },
  {
    id: 'technical',
    title: 'Technical Details',
    url: '#technical',
    description: 'Technologies and implementation details'
  },
  {
    id: 'results',
    title: 'Results & Metrics',
    url: '#results',
    description: 'Project outcomes and performance metrics'
  },
  {
    id: 'testimonial',
    title: 'Client Testimonial',
    url: '#testimonial',
    description: 'Client feedback and testimonial'
  }
];

/**
 * Get section info by ID
 */
export const getSectionById = (sectionId: string): SectionInfo | undefined => {
  return CASE_STUDY_SECTIONS.find(section => section.id === sectionId);
};

/**
 * Generate clean URL for case study section
 */
export const generateSectionUrl = (projectId: string, sectionId?: string): string => {
  const baseUrl = `/portfolio/${projectId}/case-study`;
  return sectionId ? `${baseUrl}/${sectionId}` : baseUrl;
};

/**
 * Generate shareable URL for current section
 */
export const generateShareableUrl = (projectId: string, sectionId?: string): string => {
  const baseUrl = window.location.origin;
  const sectionUrl = generateSectionUrl(projectId, sectionId);
  return `${baseUrl}${sectionUrl}`;
};

/**
 * Extract section ID from current URL
 */
export const getCurrentSection = (): string | null => {
  const path = window.location.pathname;
  const match = path.match(/\/portfolio\/[^/]+\/case-study\/([^/]+)/);
  return match ? match[1] : null;
};

/**
 * Scroll to section with smooth animation
 */
export const scrollToSection = (sectionId: string, offset: number = 80): void => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Update URL without page reload
 */
export const updateUrlSection = (projectId: string, sectionId: string): void => {
  const newUrl = generateSectionUrl(projectId, sectionId);
  window.history.pushState({ section: sectionId }, '', newUrl);
};

/**
 * Handle browser back/forward navigation
 */
export const handlePopState = (callback: (sectionId: string | null) => void): (() => void) => {
  const handler = (event: PopStateEvent) => {
    const sectionId = getCurrentSection();
    callback(sectionId);
  };

  window.addEventListener('popstate', handler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handler);
  };
};

/**
 * Copy section URL to clipboard
 */
export const copyUrlToClipboard = async (projectId: string, sectionId?: string): Promise<boolean> => {
  try {
    const url = generateShareableUrl(projectId, sectionId);
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error('Failed to copy URL to clipboard:', error);
    return false;
  }
};

/**
 * Generate social sharing URLs
 */
export const generateSocialShareUrls = (projectId: string, title: string, sectionId?: string) => {
  const url = encodeURIComponent(generateShareableUrl(projectId, sectionId));
  const text = encodeURIComponent(`Check out this case study: ${title}`);
  
  return {
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    email: `mailto:?subject=${text}&body=${url}`
  };
};

/**
 * Validate section ID
 */
export const isValidSection = (sectionId: string): boolean => {
  return CASE_STUDY_SECTIONS.some(section => section.id === sectionId);
};