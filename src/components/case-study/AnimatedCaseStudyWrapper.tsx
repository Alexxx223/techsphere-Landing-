import { useEffect, useRef } from 'react';
import { CaseStudyAnimationManager } from '@/lib/animations';

interface AnimatedCaseStudyWrapperProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper component that automatically initializes all case study animations
 */
const AnimatedCaseStudyWrapper = ({ children, className = '' }: AnimatedCaseStudyWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationManagerRef = useRef<CaseStudyAnimationManager | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize animation manager
    animationManagerRef.current = new CaseStudyAnimationManager();
    
    // Initialize all animations for the case study
    animationManagerRef.current.initializeAll('.case-study-page');
    
    // Create hero animation if hero section exists
    const heroSection = containerRef.current.querySelector('.case-study-hero');
    if (heroSection) {
      animationManagerRef.current.createHeroAnimation();
    }

    // Create navigation animation if navigation exists
    const navigation = containerRef.current.querySelector('.project-navigation');
    if (navigation) {
      animationManagerRef.current.createNavigationAnimation();
    }

    // Create scroll progress indicator if it exists
    const scrollProgress = containerRef.current.querySelector('.scroll-progress');
    if (scrollProgress) {
      animationManagerRef.current.createScrollProgress();
    }

    // Create floating elements if they exist
    const floatingElements = containerRef.current.querySelectorAll('.floating-element');
    if (floatingElements.length > 0) {
      animationManagerRef.current.createFloatingElements();
    }

    // Cleanup function
    return () => {
      if (animationManagerRef.current) {
        animationManagerRef.current.destroy();
        animationManagerRef.current = null;
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (animationManagerRef.current) {
        animationManagerRef.current.refresh();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`case-study-page ${className}`}
    >
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div className="scroll-progress h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0"></div>
      </div>

      {/* Main Content */}
      {children}

      {/* Floating Elements for Visual Interest */}
      <div className="particle-container fixed inset-0 pointer-events-none z-10"></div>
      
      {/* Floating geometric shapes */}
      <div className="floating-element fixed top-20 right-20 w-4 h-4 bg-blue-500/20 rounded-full"></div>
      <div className="floating-element fixed top-40 left-20 w-6 h-6 bg-purple-500/20 rotate-45"></div>
      <div className="floating-element fixed bottom-40 right-40 w-3 h-3 bg-green-500/20 rounded-full"></div>
    </div>
  );
};

export default AnimatedCaseStudyWrapper;