
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Hero = () => {
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    wordsRef.current.forEach((word, index) => {
      if (word) {
        word.style.setProperty('--index', index.toString());
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-teal/10 filter blur-[120px] animate-pulse-subtle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-cyan/10 filter blur-[100px] animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptLTUtM2g0djFoLTR2LTF6bTAgMmgxdjRoLTF2LTR6TTI2IDI0aDR2MWgtNHYtMXptMCAyaDF2NGgtMXYtNHptLTkgMmg0djFoLTR2LTF6bTAgMmgxdjRoLTF2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50 -z-10"></div>

      <div className="section-container pt-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in mb-6">
            <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-white bg-white/5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
              </span>
              Established in 2024
            </span>
          </div>
          
          <h1 className="heading-xl mb-6 text-balance">
            <div className="overflow-hidden">
              <span 
                ref={el => wordsRef.current[0] = el} 
                className="text-reveal inline-block"
                style={{ '--index': 0 } as React.CSSProperties}
              >
                Cutting-Edge Digital
              </span>
            </div>
            <div className="overflow-hidden">
              <span 
                ref={el => wordsRef.current[1] = el} 
                className="text-reveal inline-block"
                style={{ '--index': 1 } as React.CSSProperties}
              >
                Solutions for
              </span>
            </div>
            <div className="overflow-hidden">
              <span 
                ref={el => wordsRef.current[2] = el} 
                className="text-reveal inline-block text-teal"
                style={{ '--index': 2 } as React.CSSProperties}
              >
                Modern Business
              </span>
            </div>
          </h1>
          
          <p className="subheading max-w-2xl mx-auto mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.7s' }}>
            Empowering organizations by leveraging technology to drive growth, enhance customer experiences, and optimize operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
            <a href="#contact" className="btn-primary">
              Get in Touch
            </a>
            <a href="#services" className="btn-outline">
              Explore Services
            </a>
          </div>
        </div>
        
        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl animate-fade-in opacity-0" style={{ animationDelay: '1.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-teal/10 to-cyan/10 opacity-30 mix-blend-overlay"></div>
            <div className="glassmorphism rounded-xl aspect-[16/9] animate-float">
              <div className="h-full w-full flex items-center justify-center">
                <div className="p-8 text-center">
                  <div className="flex flex-wrap justify-center gap-8">
                    <div className="rounded-lg bg-white/5 p-6 w-32 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
                      <div className="font-display font-bold text-3xl text-teal">UI</div>
                      <div className="text-white/70 mt-2">Design</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-6 w-32 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
                      <div className="font-display font-bold text-3xl text-cyan">UX</div>
                      <div className="text-white/70 mt-2">Experience</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-6 w-32 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-white/10">
                      <div className="font-display font-bold text-3xl text-teal">Web</div>
                      <div className="text-white/70 mt-2">Development</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-10 w-20 h-20 rounded-full bg-cyan/20 filter blur-xl"></div>
          <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-teal/20 filter blur-xl"></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="h-14 w-8 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
