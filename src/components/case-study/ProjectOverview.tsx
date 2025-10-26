import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudy } from '@/types/caseStudy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faLightbulb, faRocket, faClipboardList } from '@fortawesome/free-solid-svg-icons';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ProjectOverviewProps {
  caseStudy: CaseStudy;
}

const ProjectOverview = ({ caseStudy }: ProjectOverviewProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const challengeRef = useRef<HTMLDivElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const objectivesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const challenge = challengeRef.current;
    const solution = solutionRef.current;
    const result = resultRef.current;
    const objectives = objectivesRef.current;

    if (!section || !title || !challenge || !solution || !result || !objectives) return;

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate title with text reveal effect
    tl.fromTo(title, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );

    // Animate content sections with stagger
    const contentElements = [challenge, solution, result, objectives];
    
    tl.fromTo(contentElements,
      {
        opacity: 0,
        y: 30,
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      },
      '-=0.4'
    );

    // Add subtle parallax effect to the section
    gsap.to(section, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Project Overview
          </h2>

          {/* Overview Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Challenge */}
            <div 
              ref={challengeRef}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mr-4">
                  <FontAwesomeIcon icon={faBullseye} className="text-2xl text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">The Challenge</h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {caseStudy.overview.challenge}
              </p>
            </div>

            {/* Solution */}
            <div 
              ref={solutionRef}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
            >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-[#01a99c]/20 rounded-xl flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faLightbulb} className="text-2xl text-[#01a99c]" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Our Solution</h3>
            </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                {caseStudy.overview.solution}
              </p>
            </div>
          </div>

          {/* Result */}
          <div 
            ref={resultRef}
            className="bg-gradient-to-r from-[#01a99c]/10 to-[#52c1c9]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#01a99c]/20 mb-16"
          >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-[#01a99c]/20 rounded-xl flex items-center justify-center mr-4">
              <FontAwesomeIcon icon={faRocket} className="text-2xl text-[#52c1c9]" />
            </div>
            <h3 className="text-2xl font-semibold text-white">The Result</h3>
          </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {caseStudy.overview.result}
            </p>
          </div>

          {/* Objectives */}
          <div 
            ref={objectivesRef}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30"
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-[#52c1c9]/20 rounded-xl flex items-center justify-center mr-4">
                <FontAwesomeIcon icon={faClipboardList} className="text-2xl text-[#52c1c9]" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Project Objectives</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {caseStudy.overview.objectives.map((objective, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="w-6 h-6 bg-[#52c1c9]/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#01a99c] text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{objective}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
