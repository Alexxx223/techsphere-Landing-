import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, ChevronLeft, ChevronRight, Grid3X3, Menu, X } from 'lucide-react';
import { CaseStudy } from '@/types/caseStudy';
import { getCaseStudyById } from '@/data/caseStudies';
import { useResponsive, useTouchDevice } from '@/hooks/useResponsive';

interface ProjectNavigationProps {
  currentProject: CaseStudy;
  nextProjectId?: string;
  previousProjectId?: string;
}

const ProjectNavigation = ({ 
  currentProject, 
  nextProjectId, 
  previousProjectId 
}: ProjectNavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const nextProject = nextProjectId ? getCaseStudyById(nextProjectId) : null;
  const previousProject = previousProjectId ? getCaseStudyById(previousProjectId) : null;
  
  // Responsive hooks
  const { isMobile, isTablet } = useResponsive();
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Initial animation
    gsap.fromTo(nav, 
      { 
        opacity: 0, 
        y: -20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.5
      }
    );

    // Hover animations for navigation items
    const navItems = nav.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const handleMouseEnter = () => {
        gsap.to(item, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10"
    >
      <div className={`container mx-auto ${isMobile ? 'px-4 py-3' : 'px-4 py-4'}`}>
        <div className="flex items-center justify-between">
          {/* Back to Portfolio */}
          <Link
            to="/portfolio"
            className={`nav-item flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-300 ${isTouchDevice ? 'min-h-[44px] min-w-[44px] justify-center' : ''}`}
            aria-label="Back to Portfolio"
          >
            <ArrowLeft size={isMobile ? 18 : 20} />
            <span className={`${isMobile ? 'hidden' : 'hidden sm:inline'}`}>Back to Portfolio</span>
            {isMobile && <span className="sr-only">Back to Portfolio</span>}
          </Link>

          {/* Current Project Info */}
          <div className={`flex-1 text-center ${isMobile ? 'px-2' : 'px-4'}`}>
            <h2 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white truncate`}>
              {currentProject.title}
            </h2>
            {!isMobile && (
              <p className="text-sm text-gray-400 hidden sm:block">
                {currentProject.category} • {currentProject.client}
              </p>
            )}
          </div>

          {/* Previous/Next Navigation */}
          <div className="flex items-center gap-1">
            {/* Previous Project */}
            {previousProject ? (
              <Link
                to={`/portfolio/${previousProject.id}/case-study`}
                className={`nav-item group flex items-center gap-2 ${isMobile ? 'p-2' : 'px-3 py-2'} rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${isTouchDevice ? 'min-h-[44px] min-w-[44px]' : ''}`}
                title={`Previous: ${previousProject.title}`}
                aria-label={`Previous project: ${previousProject.title}`}
              >
                <ChevronLeft size={isMobile ? 18 : 20} className="text-white group-hover:text-gray-300" />
                {!isMobile && (
                  <div className="hidden lg:block text-left">
                    <p className="text-xs text-gray-400">Previous</p>
                    <p className="text-sm text-white truncate max-w-24">
                      {previousProject.title}
                    </p>
                  </div>
                )}
              </Link>
            ) : (
              <div className={`${isMobile ? 'p-2' : 'px-3 py-2'} opacity-50 cursor-not-allowed`}>
                <ChevronLeft size={isMobile ? 18 : 20} className="text-gray-600" />
              </div>
            )}

            {/* Next Project */}
            {nextProject ? (
              <Link
                to={`/portfolio/${nextProject.id}/case-study`}
                className={`nav-item group flex items-center gap-2 ${isMobile ? 'p-2' : 'px-3 py-2'} rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${isTouchDevice ? 'min-h-[44px] min-w-[44px]' : ''}`}
                title={`Next: ${nextProject.title}`}
                aria-label={`Next project: ${nextProject.title}`}
              >
                {!isMobile && (
                  <div className="hidden lg:block text-right">
                    <p className="text-xs text-gray-400">Next</p>
                    <p className="text-sm text-white truncate max-w-24">
                      {nextProject.title}
                    </p>
                  </div>
                )}
                <ChevronRight size={isMobile ? 18 : 20} className="text-white group-hover:text-gray-300" />
              </Link>
            ) : (
              <div className={`${isMobile ? 'p-2' : 'px-3 py-2'} opacity-50 cursor-not-allowed`}>
                <ChevronRight size={isMobile ? 18 : 20} className="text-gray-600" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Project Navigation - Improved */}
        {isMobile && (previousProject || nextProject) && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              {previousProject ? (
                <Link
                  to={`/portfolio/${previousProject.id}/case-study`}
                  className="nav-item flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px]"
                >
                  <ChevronLeft size={16} />
                  <span className="truncate max-w-[120px]">{previousProject.title}</span>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              
              {nextProject ? (
                <Link
                  to={`/portfolio/${nextProject.id}/case-study`}
                  className="nav-item flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-white/5 min-h-[44px]"
                >
                  <span className="truncate max-w-[120px]">{nextProject.title}</span>
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ProjectNavigation;