
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
   import Orb from './orb';
const Hero = () => {
  // compute hue to align the shader's base-palette rotation with the site's brand hue
  // the shader rotates its hard-coded base colors by the provided hue (degrees).
  // subtract the base palette's approximate hue so passing `computedHue` results
  // in the desired absolute hue. Adjust `basePaletteHue` if you tweak the shader.
  const computedHue = typeof window !== "undefined"
    ? (Number(getComputedStyle(document.documentElement).getPropertyValue("--brand-hue")) || 180) - 194
    : 180 - 194;

  return (
    <section id="hero" className="flex items-center justify-center min-h-screen relative">
      {(() => {
        // set brand CSS variables on the client so Tailwind/custom CSS and Orb can read them
        if (typeof window !== "undefined") {
          const root = document.documentElement;
          root.style.setProperty("--brand-primary", "#01a99c"); // teal
          root.style.setProperty("--brand-secondary", "#52c1c9"); // cyan
          root.style.setProperty("--brand-tertiary", "#064e53"); // dark teal
          // single hue roughly centered between the brand colors for any hue-based algorithms
          root.style.setProperty("--brand-hue", String(180));
        }
        return null;
      })()}

      {/* background orb - positioned behind the text */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* re-enable pointer events only on the orb wrapper so hover works,
            while keeping the rest of the background non-interactive */}
        <div
          className="pointer-events-auto"
          style={{ width: "100%", height: 600, position: "relative" }}
        >
          <Orb
            hoverIntensity={1.5}
            rotateOnHover={true}
            // pass computedHue which offsets the shader's base palette rotation
            hue={computedHue}
            forceHoverState={false}
          />
        </div>
      </div>

      {/* make the content container pointer-events-none so the orb (behind it) can receive hover events;
          re-enable pointer events for interactive elements inside (links/buttons) */}
     <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto" data-aos="zoom-in">
          <h1 className="heading-xl mb-4">Transform Your Business with TechSphere</h1>
          <h2 className="subheading mb-4">Innovative Digital Solutions for the Modern Enterprise</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            From custom software development to cybersecurity - we deliver cutting-edge IT services tailored to your needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="btn-primary rounded-full">
              Get Started
            </a>
            <a href="#services" className="btn-outline rounded-full">
              Our Services
            </a>
          </div>
         
          <Link to="/about" className="block mt-16 pointer-events-auto" aria-label="Learn more about us">
            <svg
              className="w-6 h-6 mx-auto animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "var(--brand-tertiary)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
