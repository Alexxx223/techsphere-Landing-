import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudy } from '@/types/caseStudy';
import { useResponsive, useTouchDevice, useReducedMotion, getResponsiveSpacing, getResponsiveTextSize } from '@/hooks/useResponsive';
import { getDeviceAnimationConfig, shouldEnableAnimation, createOptimizedTimeline } from '@/utils/deviceAnimationConfig';
import SocialShare from '@/components/social/SocialShare';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy;
}

const CaseStudyHeader = ({ caseStudy }: CaseStudyHeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Responsive hooks
  const { isMobile, isTablet, screenWidth } = useResponsive();
  const isTouchDevice = useTouchDevice();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const header = headerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const metadata = metadataRef.current;
    const image = imageRef.current;

    if (!header || !title || !subtitle || !metadata || !image) return;

    // Get device-optimized animation configuration
    const deviceConfig = getDeviceAnimationConfig();
    
    // Skip animations if reduced motion is preferred
    if (prefersReducedMotion || !shouldEnableAnimation('basic', deviceConfig)) {
      gsap.set([title, subtitle, metadata, image], { opacity: 1 });
      return;
    }

    // Create optimized timeline
    const tl = createOptimizedTimeline(deviceConfig);

    // Set initial states with device-optimized values
    const initialOffset = isMobile ? 30 : 50;
    gsap.set([title, subtitle, metadata], { 
      opacity: 0, 
      y: initialOffset 
    });
    gsap.set(image, { 
      opacity: 0, 
      scale: deviceConfig.enableComplexAnimations ? 1.1 : 1
    });

    // Animate elements in sequence with device-optimized timing
    const imageDuration = deviceConfig.enableComplexAnimations ? deviceConfig.duration * 1.5 : deviceConfig.duration;
    
    tl.to(image, {
      opacity: 1,
      scale: 1,
      duration: imageDuration,
      ease: deviceConfig.ease
    })
    .to(title, {
      opacity: 1,
      y: 0,
      duration: deviceConfig.duration,
      ease: deviceConfig.ease
    }, `-=${deviceConfig.duration * 0.75}`)
    .to(subtitle, {
      opacity: 1,
      y: 0,
      duration: deviceConfig.duration,
      ease: deviceConfig.ease
    }, `-=${deviceConfig.duration * 0.5}`)
    .to(metadata, {
      opacity: 1,
      y: 0,
      duration: deviceConfig.duration,
      ease: deviceConfig.ease,
      stagger: deviceConfig.stagger
    }, `-=${deviceConfig.duration * 0.5}`);

    // Parallax effect for hero image (device-optimized)
    if (shouldEnableAnimation('parallax', deviceConfig) && 
        caseStudy.animationConfig.enableParallax && 
        !isMobile && 
        !isTouchDevice) {
      
      ScrollTrigger.create({
        trigger: header,
        start: "top top",
        end: "bottom top",
        scrub: deviceConfig.enableComplexAnimations ? 1 : false,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(image, {
            y: progress * deviceConfig.parallaxIntensity,
            duration: 0.1,
            ease: "none"
          });
        }
      });
    }

    // Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [caseStudy.animationConfig.enableParallax, isMobile, isTouchDevice, prefersReducedMotion]);

  return (
    <header 
      ref={headerRef}
      className="relative flex items-center justify-center overflow-hidden py-24 sm:py-32 md:py-40"
    >
      {/* Hero Image/Video Background */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        {caseStudy.heroVideo && !isMobile ? (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={caseStudy.heroImage}
          >
            <source src={caseStudy.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        )}
        {/* Responsive overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Project Title */}
          <h1 
            ref={titleRef}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight"
          >
            {caseStudy.title}
          </h1>

          {/* Project Subtitle */}
          <p 
            ref={subtitleRef}
            className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto"
          >
            {caseStudy.subtitle}
          </p>

          {/* Project Metadata */}
          <div 
            ref={metadataRef}
            className="mt-10 flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Category:</span>
              <span className="font-semibold text-white">{caseStudy.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Client:</span>
              <span className="font-semibold text-white">{caseStudy.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Duration:</span>
              <span className="font-semibold text-white">{caseStudy.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">Year:</span>
              <span className="font-semibold text-white">
                {new Date(caseStudy.date).getFullYear()}
              </span>
            </div>
          </div>
          
          {/* Social Sharing */}
          <div className="mt-10 flex justify-center">
            <SocialShare 
              caseStudy={caseStudy}
              variant="default"
              className="text-white/80 hover:text-white"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/70">
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="w-px h-8 bg-white/30 animate-pulse" />
      </div>
    </header>
  );
};

export default CaseStudyHeader;
