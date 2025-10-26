import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClientTestimonial as ClientTestimonialType } from '@/types/caseStudy';
import ShareableHighlight from '@/components/social/ShareableHighlight';
import { getCaseStudyById } from '@/data/caseStudies';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ClientTestimonialProps {
  testimonial: ClientTestimonialType;
  caseStudyId?: string;
}

const ClientTestimonial = ({ testimonial, caseStudyId }: ClientTestimonialProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const author = authorRef.current;
    const avatar = avatarRef.current;
    const stars = starsRef.current;

    if (!section || !quote || !author) return;

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate quote with typewriter-like effect
    tl.fromTo(quote,
      { 
        opacity: 0,
        scale: 0.95,
        y: 30
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }
    );

    // Animate avatar with scale and rotation
    if (avatar) {
      tl.fromTo(avatar,
        { 
          opacity: 0,
          scale: 0.5,
          rotation: -10
        },
        { 
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)'
        },
        '-=0.5'
      );
    }

    // Animate author info
    tl.fromTo(author,
      { 
        opacity: 0,
        x: -30
      },
      { 
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.4'
    );

    // Animate stars with stagger
    if (stars) {
      const starElements = stars.querySelectorAll('.star');
      tl.fromTo(starElements,
        { 
          opacity: 0,
          scale: 0,
          rotation: 180
        },
        { 
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        },
        '-=0.3'
      );
    }

    // Add floating animation to the entire testimonial
    gsap.to(section, {
      y: -10,
      duration: 3,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1
    });

    // Add subtle parallax effect
    gsap.to(section, {
      yPercent: -15,
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
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`star text-2xl transition-all duration-300 ${
          index < rating 
            ? 'text-yellow-400 drop-shadow-lg' 
            : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Decorative Quote Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#01a99c]/20 to-[#52c1c9]/20 rounded-full border border-[#01a99c]/30">
              <span className="text-4xl text-[#01a99c]">💬</span>
            </div>
          </div>

          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl">
            {/* Quote */}
            <div 
              ref={quoteRef}
              className="text-center mb-8"
            >
              <div className="relative">
                {/* Opening Quote Mark */}
                <div className="absolute -top-4 -left-4 text-6xl text-[#01a99c]/30 font-serif">
                  "
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-100 leading-relaxed font-light italic relative z-10">
                  {testimonial.quote}
                </blockquote>
                
                {/* Closing Quote Mark */}
                <div className="absolute -bottom-8 -right-4 text-6xl text-[#01a99c]/30 font-serif">
                  "
                </div>
              </div>
            </div>

            {/* Rating Stars */}
            {testimonial.rating && (
              <div 
                ref={starsRef}
                className="flex justify-center space-x-1 mb-8"
              >
                {renderStars(testimonial.rating)}
              </div>
            )}

            {/* Author Information */}
            <div className="flex items-center justify-center space-x-6">
              {/* Avatar */}
              <div 
                ref={avatarRef}
                className="flex-shrink-0"
              >
                {testimonial.avatar ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-600/50 shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-br from-[#01a99c] to-[#52c1c9] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {getInitials(testimonial.author)}
                    </span>
                  </div>
                )}
              </div>

              {/* Author Details */}
              <div 
                ref={authorRef}
                className="text-center md:text-left"
              >
                <h3 className="text-xl font-semibold text-white mb-1">
                  {testimonial.author}
                </h3>
                <p className="text-gray-400 text-sm mb-1">
                  {testimonial.position}
                </p>
                <p className="text-[#01a99c] text-sm font-medium">
                  {testimonial.company}
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-[#01a99c]/10 to-[#52c1c9]/10 rounded-full blur-xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-[#52c1c9]/10 to-[#01a99c]/10 rounded-full blur-xl" />
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
              <div className="w-12 h-12 bg-[#01a99c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Verified Client</h4>
              <p className="text-gray-300 text-sm">Authenticated testimonial from real project client</p>
            </div>

            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
              <div className="w-12 h-12 bg-[#52c1c9]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Long-term Partnership</h4>
              <p className="text-gray-300 text-sm">Ongoing collaboration and continued trust</p>
            </div>

            <div className="text-center p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30">
              <div className="w-12 h-12 bg-[#01a99c]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Results Delivered</h4>
              <p className="text-gray-300 text-sm">Measurable outcomes and exceeded expectations</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#01a99c]/10 to-[#52c1c9]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#01a99c]/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Create Your Success Story?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join our satisfied clients and experience the same level of dedication, 
                expertise, and results-driven approach that made this project a success.
              </p>
              <button className="bg-gradient-to-r from-[#01a99c] to-[#52c1c9] hover:from-[#064e53] hover:to-[#01a99c] text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                Start Your Project
              </button>
            </div>
          </div>
          
          {/* Shareable Testimonial */}
          {caseStudyId && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                Share This Testimonial
              </h3>
              <div className="max-w-2xl mx-auto">
                {(() => {
                  const caseStudy = getCaseStudyById(caseStudyId);
                  if (!caseStudy) return null;
                  
                  return (
                    <ShareableHighlight
                      caseStudy={caseStudy}
                      type="quote"
                      content={{
                        text: testimonial.quote,
                        author: `${testimonial.author}, ${testimonial.position} at ${testimonial.company}`
                      }}
                      className="transform hover:scale-105 transition-transform duration-300"
                    />
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonial;