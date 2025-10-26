import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getCaseStudyById } from '@/data/caseStudies';
import { CaseStudy } from '@/types/caseStudy';
import PageLoading from '@/components/ui/page-loading';
import CaseStudyHeader from '@/components/case-study/CaseStudyHeader';
import ProjectNavigation from '@/components/case-study/ProjectNavigation';
import ProjectOverview from '@/components/case-study/ProjectOverview';
import ProcessBreakdown from '@/components/case-study/ProcessBreakdown';
import ChallengesSolutions from '@/components/case-study/ChallengesSolutions';
import TechnicalDetails from '@/components/case-study/TechnicalDetails';
import ResultsMetrics from '@/components/case-study/ResultsMetrics';
import ClientTestimonial from '@/components/case-study/ClientTestimonial';
import SectionNavigation from '@/components/case-study/SectionNavigation';
import CaseStudySEO from '@/components/seo/CaseStudySEO';
import SocialShare from '@/components/social/SocialShare';
import CaseStudyErrorBoundary from '@/components/error/CaseStudyErrorBoundary';
import CaseStudyNotFound from '@/components/error/CaseStudyNotFound';
import { CaseStudyPageLoading } from '@/components/ui/loading-states';
import { useCaseStudyPreloader, useAdjacentCaseStudyPreloader } from '@/hooks/useCaseStudyPreloader';
import { useCaseStudyErrorHandler } from '@/hooks/useErrorHandler';
import { initializePerformanceOptimizations, cleanupGSAP } from '@/utils/gsap-optimizer';
import { CaseStudyAnimations } from '@/lib/animations/CaseStudyAnimations';
import { initializeFallbackAnimations, recoverFromAnimationError } from '@/utils/animation-fallbacks';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from '@/components/ui/breadcrumb';
import { animatePageEnter, animateBreadcrumbEnter } from '@/utils/page-transitions';
import { 
  getSectionById, 
  scrollToSection, 
  handlePopState, 
  isValidSection,
  generateSectionUrl 
} from '@/utils/section-navigation';

const CaseStudyPage = () => {
  const { projectId, section } = useParams<{ projectId: string; section?: string }>();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<string | null>(section || null);
  const pageRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  
  // Use optimized case study preloader
  const { data: caseStudy, loading, error, imagesLoaded } = useCaseStudyPreloader(projectId);
  
  // Use error handler for better error management
  const { handleError, clearError } = useCaseStudyErrorHandler();
  
  // Preload adjacent case studies for faster navigation
  useAdjacentCaseStudyPreloader(caseStudy?.nextProject, caseStudy?.previousProject);

  // Initialize performance optimizations
  useEffect(() => {
    try {
      initializePerformanceOptimizations();
    } catch (error) {
      console.warn('Failed to initialize performance optimizations:', error);
      // Fall back to basic animations
      initializeFallbackAnimations();
    }

    return () => {
      try {
        cleanupGSAP();
      } catch (error) {
        console.warn('Error during GSAP cleanup:', error);
      }
    };
  }, []);

  // Handle section validation and navigation
  useEffect(() => {
    if (section && !isValidSection(section)) {
      // Invalid section, redirect to main case study page
      navigate(generateSectionUrl(projectId || ''), { replace: true });
      return;
    }
    
    setCurrentSection(section || null);
  }, [section, projectId, navigate]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const cleanup = handlePopState((sectionId) => {
      setCurrentSection(sectionId);
      if (sectionId) {
        scrollToSection(sectionId);
      }
    });

    return cleanup;
  }, []);

  // Scroll to section when URL changes
  useEffect(() => {
    if (currentSection && !loading) {
      // Small delay to ensure content is rendered
      setTimeout(() => {
        scrollToSection(currentSection);
      }, 100);
    }
  }, [currentSection, loading]);

  // Animate page entrance after content loads with error handling
  useEffect(() => {
    if (!loading && caseStudy && pageRef.current && breadcrumbRef.current) {
      try {
        animatePageEnter(pageRef.current);
        animateBreadcrumbEnter(breadcrumbRef.current);
        const caseStudyAnimations = new CaseStudyAnimations();
        caseStudyAnimations.createImageReveal('.case-study-image');

        return () => {
          caseStudyAnimations.destroy();
        };
      } catch (animationError) {
        recoverFromAnimationError(animationError as Error, pageRef.current);
        handleError(animationError as Error);
      }
    }
  }, [loading, caseStudy, handleError]);

  // Show loading state
  if (loading) {
    return <CaseStudyPageLoading />;
  }

  // Show error state for case study not found
  if (error || !caseStudy) {
    return <CaseStudyNotFound projectId={projectId} message={error || undefined} />;
  }

  return (
    <CaseStudyErrorBoundary
      onError={(error, errorInfo) => {
        handleError(error);
        console.error('CaseStudy component error:', error, errorInfo);
      }}
    >
      {/* Comprehensive SEO metadata */}
      <CaseStudySEO 
        caseStudy={caseStudy} 
        section={currentSection || undefined}
      />

      <div ref={pageRef} className="min-h-screen bg-black text-white">
        {/* Breadcrumb Navigation */}
        <div ref={breadcrumbRef} className="container mx-auto px-4 pt-8 pb-4">
          <Breadcrumb>
            <BreadcrumbList className="text-white/60">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to="/" 
                    className="hover:text-teal transition-colors duration-300"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link 
                    to="/portfolio" 
                    className="hover:text-teal transition-colors duration-300"
                  >
                    Portfolio
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  {caseStudy.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Project Navigation */}
        <ProjectNavigation 
          currentProject={caseStudy}
          nextProjectId={caseStudy.nextProject}
          previousProjectId={caseStudy.previousProject}
        />

        {/* Case Study Header */}
        <CaseStudyHeader caseStudy={caseStudy} />

        {/* Case Study Content */}
        <main className="relative">
          {/* Project Overview Section */}
          <section id="overview">
            <ProjectOverview caseStudy={caseStudy} />
          </section>

          {/* Process Breakdown Section */}
          <section id="process">
            <ProcessBreakdown processSteps={caseStudy.process} />
          </section>

          {/* Challenges & Solutions Section */}
          <section id="challenges">
            <ChallengesSolutions challengesSolutions={caseStudy.challengesSolutions} />
          </section>

          {/* Technical Details Section */}
          <section id="technical">
            <TechnicalDetails 
              technologies={caseStudy.technologies} 
              projectTitle={caseStudy.title}
            />
          </section>

          {/* Results & Metrics Section */}
          <section id="results">
            <ResultsMetrics metrics={caseStudy.metrics} caseStudyId={caseStudy.id} />
          </section>

          {/* Client Testimonial Section */}
          {caseStudy.testimonial && (
            <section id="testimonial">
              <ClientTestimonial testimonial={caseStudy.testimonial} caseStudyId={caseStudy.id} />
            </section>
          )}
        </main>

        {/* Section Navigation */}
        <SectionNavigation 
          caseStudy={caseStudy} 
          currentSection={currentSection}
        />
        
        {/* Floating Social Share - Hidden on mobile to avoid clutter */}
        {!loading && (
          <div className="hidden lg:block">
            <SocialShare 
              caseStudy={caseStudy}
              section={currentSection || undefined}
              variant="floating"
            />
          </div>
        )}
      </div>
    </CaseStudyErrorBoundary>
  );
};

export default CaseStudyPage;
