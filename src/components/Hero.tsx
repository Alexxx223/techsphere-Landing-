
import React from 'react';
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section id="hero" className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover bg-center relative" style={{ 
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/pc.jpeg')" 
    }}>
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto" data-aos="zoom-in">
          <h1 className="heading-xl mb-4">Transform Your Business with TechSphere</h1>
          <h2 className="subheading mb-4">Innovative Digital Solutions for the Modern Enterprise</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            From custom software development to cybersecurity - we deliver cutting-edge IT services tailored to your needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#pricing" className="btn-primary">
              Get Started
            </a>
            <a href="#services" className="btn-outline">
              Our Services
            </a>
          </div>
          
          <a href="#about" className="block mt-16 text-white">
            <svg className="w-6 h-6 mx-auto animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
