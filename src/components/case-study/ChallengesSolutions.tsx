import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChallengesSolutions as ChallengesSolutionsType } from '@/types/caseStudy';
import { useResponsive, useTouchDevice, getResponsiveSpacing, getResponsiveTextSize } from '@/hooks/useResponsive';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ChallengesSolutionsProps {
  challengesSolutions: ChallengesSolutionsType;
}

const ChallengesSolutions = ({ challengesSolutions }: ChallengesSolutionsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const [activeView, setActiveView] = useState<'challenge' | 'solution'>('challenge');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Responsive hooks
  const { isMobile, isTablet } = useResponsive();
  const isTouchDevice = useTouchDevice();

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const container = containerRef.current;
    const challenge = challengeRef.current;
    const solution = solutionRef.current;

    if (!section || !title || !container || !challenge || !solution) return;

    // Animate section title
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate container entrance
    gsap.fromTo(container,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Add parallax effect
    gsap.to(section, {
      yPercent: -5,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || 
            trigger.trigger === title || 
            trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  const switchView = (view: 'challenge' | 'solution') => {
    if (view === activeView || isTransitioning) return;

    setIsTransitioning(true);
    
    // Animate out current content
    const currentRef = activeView === 'challenge' ? challengeRef.current : solutionRef.current;
    const nextRef = view === 'challenge' ? challengeRef.current : solutionRef.current;

    if (currentRef && nextRef) {
      gsap.to(currentRef, {
        opacity: 0,
        x: activeView === 'challenge' ? -50 : 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveView(view);
          
          // Animate in new content
          gsap.fromTo(nextRef,
            { opacity: 0, x: view === 'challenge' ? 50 : -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              ease: 'power2.out',
              onComplete: () => setIsTransitioning(false)
            }
          );
        }
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative ${getResponsiveSpacing('lg')} bg-gradient-to-b from-black to-gray-900 overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#01a99c]/20 to-[#52c1c9]/20 transform rotate-12 scale-150" />
      </div>

      <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-4'} relative z-10`}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-6xl'} mx-auto`}>
          {/* Section Title */}
          <h2 
            ref={titleRef}
            className={`${getResponsiveTextSize('xl')} font-bold text-center ${isMobile ? 'mb-8' : 'mb-16'} bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}
          >
            Challenges & Solutions
          </h2>

          {/* Toggle Controls */}
          <div className={`flex justify-center ${isMobile ? 'mb-8' : 'mb-12'}`}>
            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-full ${isMobile ? 'p-1' : 'p-2'} border border-gray-700/50 ${isMobile ? 'w-full max-w-sm' : ''}`}>
              <button
                onClick={() => switchView('challenge')}
                className={`${isMobile ? 'flex-1 px-4 py-3 text-sm' : 'px-8 py-3'} rounded-full font-medium transition-all duration-300 ${isTouchDevice ? 'min-h-[44px]' : ''} ${
                  activeView === 'challenge'
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                disabled={isTransitioning}
              >
                {isMobile ? 'Challenge' : 'The Challenge'}
              </button>
              <button
                onClick={() => switchView('solution')}
                className={`${isMobile ? 'flex-1 px-4 py-3 text-sm' : 'px-8 py-3'} rounded-full font-medium transition-all duration-300 ${isTouchDevice ? 'min-h-[44px]' : ''} ${
                  activeView === 'solution'
                    ? 'bg-[#01a99c] text-white shadow-lg shadow-[#01a99c]/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                disabled={isTransitioning}
              >
                {isMobile ? 'Solution' : 'Our Solution'}
              </button>
            </div>
          </div>

          {/* Content Container */}
          <div 
            ref={containerRef}
            className={`relative ${isMobile ? 'min-h-[400px]' : 'min-h-[600px]'}`}
          >
            {/* Challenge Content */}
            <div
              ref={challengeRef}
              className={`absolute inset-0 transition-opacity duration-300 ${
                activeView === 'challenge' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className={`${isMobile ? 'space-y-6' : 'grid lg:grid-cols-2 gap-12 items-center'}`}>
                {/* Challenge Image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                    <img
                      src={challengesSolutions.challenge.image}
                      alt={challengesSolutions.challenge.title}
                      className={`w-full ${isMobile ? 'h-48' : 'h-80'} object-cover`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 text-red-400">
                        <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>⚠️</span>
                        <span className="font-medium">Challenge</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Challenge Content */}
                <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
                  <div>
                    <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white ${isMobile ? 'mb-3' : 'mb-4'}`}>
                      {challengesSolutions.challenge.title}
                    </h3>
                    <p className={`text-gray-300 ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
                      {challengesSolutions.challenge.description}
                    </p>
                  </div>

                  {/* Pain Points */}
                  <div>
                    <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-red-400 ${isMobile ? 'mb-3' : 'mb-4'}`}>Key Pain Points</h4>
                    <div className="space-y-3">
                      {challengesSolutions.challenge.painPoints.map((point, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-3 ${isMobile ? 'p-3' : 'p-4'} bg-red-500/10 border border-red-500/20 rounded-xl`}
                        >
                          <div className="w-6 h-6 bg-red-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-red-300 text-sm">×</span>
                          </div>
                          <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Content */}
            <div
              ref={solutionRef}
              className={`absolute inset-0 transition-opacity duration-300 ${
                activeView === 'solution' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <div className={`${isMobile ? 'space-y-6' : 'grid lg:grid-cols-2 gap-12 items-center'}`}>
                {/* Solution Content */}
                <div className={`${isMobile ? 'space-y-4 order-2' : 'space-y-6 lg:order-1'}`}>
                  <div>
                    <h3 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold text-white ${isMobile ? 'mb-3' : 'mb-4'}`}>
                      {challengesSolutions.solution.title}
                    </h3>
                    <p className={`text-gray-300 ${isMobile ? 'text-base' : 'text-lg'} leading-relaxed`}>
                      {challengesSolutions.solution.description}
                    </p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-[#01a99c] ${isMobile ? 'mb-3' : 'mb-4'}`}>Our Approach</h4>
                    <div className="space-y-3">
                      {challengesSolutions.solution.approach.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-start space-x-3 ${isMobile ? 'p-3' : 'p-4'} bg-[#01a99c]/10 border border-[#01a99c]/20 rounded-xl`}
                        >
                          <div className="w-6 h-6 bg-[#01a99c]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[#52c1c9] text-sm">✓</span>
                          </div>
                          <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <h4 className={`${isMobile ? 'text-lg' : 'text-xl'} font-semibold text-[#52c1c9] ${isMobile ? 'mb-3' : 'mb-4'}`}>Key Features</h4>
                    <div className="grid gap-3">
                      {challengesSolutions.solution.keyFeatures.map((feature, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 ${isMobile ? 'p-2' : 'p-3'} bg-[#52c1c9]/10 border border-[#52c1c9]/20 rounded-lg`}
                        >
                          <div className="w-2 h-2 bg-[#52c1c9] rounded-full flex-shrink-0" />
                          <p className="text-gray-300 text-sm leading-relaxed">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Solution Image */}
                <div className={`relative ${isMobile ? 'order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#01a99c]/10 to-[#52c1c9]/10 border border-[#01a99c]/20">
                    <img
                      src={challengesSolutions.solution.image}
                      alt={challengesSolutions.solution.title}
                      className={`w-full ${isMobile ? 'h-48' : 'h-80'} object-cover`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center space-x-2 text-[#01a99c]">
                        <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>💡</span>
                        <span className="font-medium">Solution</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className={`flex justify-center ${isMobile ? 'mt-8' : 'mt-12'}`}>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => switchView('challenge')}
                className={`${isTouchDevice ? 'w-4 h-4' : 'w-3 h-3'} rounded-full transition-all duration-300 ${
                  activeView === 'challenge' ? 'bg-red-500' : 'bg-gray-600'
                }`}
                aria-label="View challenge"
              />
              <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r from-red-500 to-[#01a99c] transition-transform duration-500 ${
                    activeView === 'challenge' ? 'translate-x-0' : 'translate-x-full'
                  }`}
                  style={{ width: '50%' }}
                />
              </div>
              <button
                onClick={() => switchView('solution')}
                className={`${isTouchDevice ? 'w-4 h-4' : 'w-3 h-3'} rounded-full transition-all duration-300 ${
                  activeView === 'solution' ? 'bg-[#01a99c]' : 'bg-gray-600'
                }`}
                aria-label="View solution"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSolutions;