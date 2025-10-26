import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProcessStep } from '@/types/caseStudy';
import { useResponsive, useTouchDevice, useReducedMotion, getResponsiveSpacing, getResponsiveTextSize } from '@/hooks/useResponsive';
import { getDeviceAnimationConfig, shouldEnableAnimation, createOptimizedTimeline, getOptimizedScrollTriggerConfig } from '@/utils/deviceAnimationConfig';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ProcessBreakdownProps {
  processSteps: ProcessStep[];
}

const ProcessBreakdown = ({ processSteps }: ProcessBreakdownProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});
  
  // Responsive hooks
  const { isMobile, isTablet } = useResponsive();
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();

  // Initialize image indices
  useEffect(() => {
    const initialIndices: { [key: string]: number } = {};
    processSteps.forEach(step => {
      initialIndices[step.id] = 0;
    });
    setCurrentImageIndex(initialIndices);
  }, [processSteps]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const timeline = timelineRef.current;

    if (!section || !title || !timeline) return;

    // Get device-optimized animation configuration
    const deviceConfig = getDeviceAnimationConfig();
    
    // Skip animations if reduced motion is preferred
    if (prefersReducedMotion || !shouldEnableAnimation('basic', deviceConfig)) {
      gsap.set([title, ...stepsRef.current.filter(Boolean)], { opacity: 1 });
      return;
    }

    // Animate section title with device optimization
    gsap.fromTo(title,
      { opacity: 0, y: isMobile ? 30 : 50 },
      {
        opacity: 1,
        y: 0,
        duration: deviceConfig.duration,
        ease: deviceConfig.ease,
        scrollTrigger: getOptimizedScrollTriggerConfig(title, deviceConfig)
      }
    );

    // Animate timeline progression (only on capable devices)
    const timelineLine = timeline.querySelector('.timeline-line');
    if (timelineLine && shouldEnableAnimation('complex', deviceConfig) && !isMobile) {
      gsap.fromTo(timelineLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: deviceConfig.duration * 2.5,
          ease: deviceConfig.ease,
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: deviceConfig.enableComplexAnimations ? 1 : false
          }
        }
      );
    }

    // Animate each step with device-optimized settings
    stepsRef.current.forEach((stepEl, index) => {
      if (!stepEl) return;

      const animationOffset = deviceConfig.enableComplexAnimations && !isMobile ? 
        (index % 2 === 0 ? -50 : 50) : 0;
      const yOffset = isMobile ? 30 : 0;

      gsap.fromTo(stepEl,
        { 
          opacity: 0, 
          x: animationOffset,
          y: yOffset,
          scale: deviceConfig.enableComplexAnimations ? 0.95 : 1
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: deviceConfig.duration,
          ease: deviceConfig.ease,
          delay: index * deviceConfig.stagger,
          scrollTrigger: getOptimizedScrollTriggerConfig(stepEl, deviceConfig)
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section || 
            trigger.trigger === title || 
            trigger.trigger === timeline ||
            stepsRef.current.includes(trigger.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, [processSteps, isMobile, prefersReducedMotion]);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const nextImage = (stepId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [stepId]: (prev[stepId] + 1) % totalImages
    }));
  };

  const prevImage = (stepId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [stepId]: prev[stepId] === 0 ? totalImages - 1 : prev[stepId] - 1
    }));
  };

  // Touch-friendly image navigation
  const handleImageSwipe = (stepId: string, totalImages: number, direction: 'left' | 'right') => {
    if (direction === 'left') {
      nextImage(stepId, totalImages);
    } else {
      prevImage(stepId, totalImages);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative ${getResponsiveSpacing('lg')} bg-gradient-to-b from-gray-900 to-black`}
    >
      <div className={`container mx-auto ${isMobile ? 'px-4' : 'px-4'}`}>
        <div className={`${isMobile ? 'max-w-full' : 'max-w-6xl'} mx-auto`}>
          {/* Section Title */}
          <h2 
            ref={titleRef}
            className={`${getResponsiveTextSize('xl')} font-bold text-center ${isMobile ? 'mb-12' : 'mb-16'} bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}
          >
            Process Breakdown
          </h2>

          {/* Timeline Container */}
          <div 
            ref={timelineRef}
            className="relative"
          >
            {/* Timeline Line - Hidden on mobile for cleaner layout */}
            {!isMobile && (
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#01a99c] to-[#52c1c9] timeline-line origin-top"
                style={{ height: `${(processSteps.length - 1) * 400 + 200}px` }}
              />
            )}

            {/* Process Steps */}
            <div className={`${isMobile ? 'space-y-8' : 'space-y-16'}`}>
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  ref={el => stepsRef.current[index] = el}
                  className={`relative ${isMobile ? 'flex flex-col' : `flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}`}
                >
                  {/* Timeline Node */}
                  {!isMobile && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#01a99c] to-[#52c1c9] rounded-full flex items-center justify-center z-10 shadow-lg">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                  )}

                  {/* Mobile Step Number */}
                  {isMobile && (
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#01a99c] to-[#52c1c9] rounded-full flex items-center justify-center mr-4">
                        <span className="text-xl">{step.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-[#52c1c9] uppercase tracking-wider">
                        Step {step.order}
                      </span>
                    </div>
                  )}

                  {/* Step Content */}
                  <div className={`${isMobile ? 'w-full' : `w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}`}>
                    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl ${isMobile ? 'p-6' : 'p-8'} border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300`}>
                      {/* Step Header */}
                      <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
                        {!isMobile && (
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-[#52c1c9] uppercase tracking-wider">
                              Step {step.order}
                            </span>
                            <span className="text-sm text-gray-400">
                              {step.duration}
                            </span>
                          </div>
                        )}
                        <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white ${isMobile ? 'mb-2' : 'mb-3'}`}>
                          {step.title}
                        </h3>
                        {isMobile && (
                          <span className="text-sm text-gray-400 block mb-3">
                            {step.duration}
                          </span>
                        )}
                        <p className="text-gray-300 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Image Gallery */}
                      {step.images.length > 0 && (
                        <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
                          <div className="relative rounded-xl overflow-hidden bg-gray-700/30">
                            <img
                              src={step.images[currentImageIndex[step.id] || 0]}
                              alt={`${step.title} - Image ${(currentImageIndex[step.id] || 0) + 1}`}
                              className={`w-full ${isMobile ? 'h-40' : 'h-48'} object-cover transition-all duration-500`}
                            />
                            
                            {/* Image Navigation - Touch-friendly on mobile */}
                            {step.images.length > 1 && (
                              <>
                                <button
                                  onClick={() => prevImage(step.id, step.images.length)}
                                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 ${isTouchDevice ? 'w-10 h-10' : 'w-8 h-8'} bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200`}
                                  aria-label="Previous image"
                                >
                                  ←
                                </button>
                                <button
                                  onClick={() => nextImage(step.id, step.images.length)}
                                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isTouchDevice ? 'w-10 h-10' : 'w-8 h-8'} bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-200`}
                                  aria-label="Next image"
                                >
                                  →
                                </button>
                                
                                {/* Image Indicators */}
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                  {step.images.map((_, imgIndex) => (
                                    <button
                                      key={imgIndex}
                                      onClick={() => setCurrentImageIndex(prev => ({ ...prev, [step.id]: imgIndex }))}
                                      className={`${isTouchDevice ? 'w-3 h-3' : 'w-2 h-2'} rounded-full transition-all duration-200 ${
                                        imgIndex === (currentImageIndex[step.id] || 0)
                                          ? 'bg-white'
                                          : 'bg-white/40'
                                      }`}
                                      aria-label={`Go to image ${imgIndex + 1}`}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Expandable Details */}
                      {step.details.length > 0 && (
                        <div>
                          <button
                            onClick={() => toggleStep(step.id)}
                            className={`flex items-center justify-between w-full text-left text-[#52c1c9] hover:text-[#01a99c] transition-colors duration-200 ${isMobile ? 'mb-3 py-2' : 'mb-4'} ${isTouchDevice ? 'min-h-[44px]' : ''}`}
                          >
                            <span className="font-medium">View Details</span>
                            <span className={`transform transition-transform duration-200 ${
                              expandedStep === step.id ? 'rotate-180' : ''
                            }`}>
                              ↓
                            </span>
                          </button>
                          
                          {expandedStep === step.id && (
                            <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                              {step.details.map((detail, detailIndex) => (
                                <div
                                  key={detailIndex}
                                  className={`flex items-start space-x-3 ${isMobile ? 'p-3' : 'p-3'} bg-gray-700/30 rounded-lg`}
                                >
                                  <div className="w-2 h-2 bg-[#01a99c] rounded-full flex-shrink-0 mt-2" />
                                  <p className="text-gray-300 text-sm leading-relaxed">
                                    {detail}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessBreakdown;