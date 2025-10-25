// Route preloader utility for better performance
// Preloads route components on hover or focus for faster navigation

export const preloadRoute = (routeName: string) => {
  switch (routeName) {
    case 'home':
      return import('../pages/HomePage');
    case 'about':
      return import('../pages/AboutPage');
    case 'services':
      return import('../pages/ServicesPage');
    case 'pricing':
      return import('../pages/PricingPage');
    case 'team':
      return import('../pages/TeamPage');
    case 'portfolio':
      return import('../pages/PortfolioPage');
    case 'contact':
      return import('../pages/ContactPage');
    case 'case-study':
      return import('../pages/CaseStudyPage');
    case 'index':
      return import('../pages/Index');
    default:
      return Promise.resolve();
  }
};

// Preload critical routes on app initialization
export const preloadCriticalRoutes = () => {
  // Preload home and portfolio pages as they're most commonly accessed
  preloadRoute('home');
  preloadRoute('portfolio');
  
  // Preload GSAP and animation utilities
  import('../utils/gsap-optimizer').catch(console.warn);
};

// Preload case study page when hovering over portfolio cards
export const preloadCaseStudy = () => {
  return preloadRoute('case-study');
};

// Preload specific case study data and images
export const preloadCaseStudyData = async (projectId: string) => {
  try {
    // Preload case study page component
    await preloadRoute('case-study');
    
    // Preload case study images
    const { preloadCaseStudyImages } = await import('../hooks/useImagePreloader');
    await preloadCaseStudyImages(projectId);
  } catch (error) {
    console.warn('Failed to preload case study data:', error);
  }
};

// Preload next/previous case studies for faster navigation
export const preloadAdjacentCaseStudies = async (nextId?: string, previousId?: string) => {
  const preloadPromises = [];
  
  if (nextId) {
    preloadPromises.push(preloadCaseStudyData(nextId));
  }
  
  if (previousId) {
    preloadPromises.push(preloadCaseStudyData(previousId));
  }
  
  if (preloadPromises.length > 0) {
    try {
      await Promise.allSettled(preloadPromises);
    } catch (error) {
      console.warn('Failed to preload adjacent case studies:', error);
    }
  }
};