
import React from 'react';
import { Code, Cloud, Devices, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-richblack">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5" data-aos="fade-up">
            <div className="p-6 glassmorphism rounded-xl">
              <h3 className="heading-md mb-4">About TechSphere</h3>
              <p className="text-white/70 mb-6">
                TechSphere is a leading provider of innovative technology solutions, delivering cutting-edge digital services that empower businesses to thrive in a dynamic world. 
                Our mission is to harness the power of technology to create impactful and scalable solutions for clients worldwide.
              </p>
              <a href="#about" className="text-teal flex items-center group hover:underline">
                Learn More 
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glassmorphism rounded-xl p-6" data-aos="fade-up" data-aos-delay="100">
                <Code className="h-10 w-10 text-teal mb-4" />
                <h4 className="text-xl font-medium mb-3">Custom Software Solutions</h4>
                <p className="text-white/70">
                  We specialize in building tailored software solutions to meet unique business needs,
                  from web development to graphic designs.
                </p>
              </div>
              
              <div className="glassmorphism rounded-xl p-6" data-aos="fade-up" data-aos-delay="200">
                <Cloud className="h-10 w-10 text-cyan mb-4" />
                <h4 className="text-xl font-medium mb-3">Graphic designs</h4>
                <p className="text-white/70">
                  Our graphic design services provide innovative, eye-catching designs tailored to elevate your brand's visual identity.
                </p>
              </div>
              
              <div className="glassmorphism rounded-xl p-6" data-aos="fade-up" data-aos-delay="300">
                <Devices className="h-10 w-10 text-teal mb-4" />
                <h4 className="text-xl font-medium mb-3">Digital Transformation</h4>
                <p className="text-white/70">
                  Transform your business processes with our comprehensive digital solutions designed for maximum efficiency and growth.
                </p>
              </div>
              
              <div className="glassmorphism rounded-xl p-6" data-aos="fade-up" data-aos-delay="400">
                <ShieldCheck className="h-10 w-10 text-cyan mb-4" />
                <h4 className="text-xl font-medium mb-3">Cybersecurity</h4>
                <p className="text-white/70">
                  Protect your data and systems with our advanced cybersecurity services, tailored to keep your business secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
