import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Technology } from '@/types/caseStudy';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface TechnicalDetailsProps {
  technologies: Technology[];
  projectTitle: string;
}

const TechnicalDetails = ({ technologies, projectTitle }: TechnicalDetailsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const codeSnippetRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTech, setExpandedTech] = useState<string | null>(null);

  // Group technologies by category
  const techByCategory = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  const categories = ['all', ...Object.keys(techByCategory)];
  
  const filteredTechnologies = selectedCategory === 'all' 
    ? technologies 
    : techByCategory[selectedCategory] || [];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const techStack = techStackRef.current;
    const architecture = architectureRef.current;
    const codeSnippet = codeSnippetRef.current;

    if (!section || !title || !techStack) return;

    // Animate section title
    gsap.fromTo(title,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate tech stack with stagger
    const techItems = techStack.querySelectorAll('.tech-item');
    gsap.fromTo(techItems,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9,
        rotationY: 15
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: techStack,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate architecture diagram if present
    if (architecture) {
      gsap.fromTo(architecture,
        { opacity: 0, scale: 0.8, rotationX: 10 },
        {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: architecture,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Animate code snippet if present
    if (codeSnippet) {
      gsap.fromTo(codeSnippet,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: codeSnippet,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Add subtle parallax effect
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
            trigger.trigger === techStack ||
            trigger.trigger === architecture ||
            trigger.trigger === codeSnippet) {
          trigger.kill();
        }
      });
    };
  }, [filteredTechnologies]);

  const getCategoryIcon = (category: string) => {
    const icons = {
      frontend: '🎨',
      backend: '⚙️',
      database: '🗄️',
      tool: '🔧',
      design: '✨',
      all: '🚀'
    };
    return icons[category as keyof typeof icons] || '💻';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'from-[#01a99c] to-[#52c1c9]',
      backend: 'from-[#064e53] to-[#01a99c]',
      database: 'from-[#52c1c9] to-[#01a99c]',
      tool: 'from-[#01a99c] to-[#064e53]',
      design: 'from-[#52c1c9] to-[#01a99c]',
      all: 'from-[#064e53] to-[#01a99c]'
    };
    return colors[category as keyof typeof colors] || 'from-[#064e53] to-[#01a99c]';
  };

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
            Technical Details
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === category
                    ? `bg-gradient-to-r ${getCategoryColor(category)} text-white shadow-lg scale-105`
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <span>{getCategoryIcon(category)}</span>
                <span className="capitalize">{category}</span>
              </button>
            ))}
          </div>

          {/* Technology Stack Display */}
          <div 
            ref={techStackRef}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Technology Stack
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTechnologies.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="tech-item bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedTech(expandedTech === tech.name ? null : tech.name)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(tech.category)} rounded-xl flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">
                          {tech.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{tech.name}</h4>
                        <span className="text-sm text-gray-400 capitalize">{tech.category}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {expandedTech === tech.name ? '−' : '+'}
                    </span>
                  </div>
                  
                  {tech.description && expandedTech === tech.name && (
                    <div className="mt-4 p-4 bg-gray-700/30 rounded-xl animate-in slide-in-from-top-2 duration-300">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Diagram */}
          <div 
            ref={architectureRef}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Project Architecture
            </h3>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
              <div className="flex flex-col items-center space-y-8">
                {/* Frontend Layer */}
                <div className="w-full max-w-4xl">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-semibold text-[#01a99c]">Frontend Layer</h4>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {techByCategory.frontend?.map((tech, index) => (
                      <div key={index} className="bg-[#01a99c]/20 rounded-lg px-4 py-2 text-[#52c1c9] text-sm">
                        {tech.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-gray-400 text-2xl">↓</div>

                {/* Backend Layer */}
                {techByCategory.backend && (
                  <>
                    <div className="w-full max-w-4xl">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-[#52c1c9]">Backend Layer</h4>
                      </div>
                      <div className="flex justify-center space-x-4">
                        {techByCategory.backend.map((tech, index) => (
                          <div key={index} className="bg-[#52c1c9]/20 rounded-lg px-4 py-2 text-[#01a99c] text-sm">
                            {tech.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-gray-400 text-2xl">↓</div>
                  </>
                )}

                {/* Database Layer */}
                {techByCategory.database && (
                  <div className="w-full max-w-4xl">
                    <div className="text-center mb-4">
                      <h4 className="text-lg font-semibold text-[#01a99c]">Database Layer</h4>
                    </div>
                    <div className="flex justify-center space-x-4">
                      {techByCategory.database.map((tech, index) => (
                        <div key={index} className="bg-[#01a99c]/20 rounded-lg px-4 py-2 text-[#52c1c9] text-sm">
                          {tech.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Code Snippet Example */}
          <div 
            ref={codeSnippetRef}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Implementation Highlight
            </h3>
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm">Key Implementation</span>
              </div>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <div className="text-gray-300">
                  <span className="text-[#52c1c9]">// {projectTitle} - Core Implementation</span><br/>
                  <span className="text-[#01a99c]">const</span> <span className="text-[#52c1c9]">projectConfig</span> = {`{`}<br/>
                  &nbsp;&nbsp;<span className="text-[#01a99c]">technologies</span>: [<br/>
                  {filteredTechnologies.slice(0, 3).map((tech, index) => (
                    <span key={index}>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#52c1c9]">'{tech.name}'</span>{index < 2 ? ',' : ''}<br/>
                    </span>
                  ))}
                  &nbsp;&nbsp;],<br/>
                  &nbsp;&nbsp;<span className="text-[#01a99c]">category</span>: <span className="text-[#52c1c9]">'{selectedCategory}'</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[#01a99c]">performance</span>: <span className="text-[#52c1c9]">'optimized'</span><br/>
                  {`};`}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Technical Exploration */}
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Technical Highlights
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-16 h-16 bg-[#01a99c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Performance</h4>
                <p className="text-gray-300 text-sm">Optimized for speed and efficiency</p>
              </div>
              <div className="text-center p-6 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-16 h-16 bg-[#52c1c9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Security</h4>
                <p className="text-gray-300 text-sm">Built with security best practices</p>
              </div>
              <div className="text-center p-6 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-16 h-16 bg-[#01a99c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Responsive</h4>
                <p className="text-gray-300 text-sm">Seamless across all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalDetails;