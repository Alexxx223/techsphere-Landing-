
import React, { useRef } from 'react';
import { cn } from "@/lib/utils";
import { Layers, Globe, PenTool } from 'lucide-react';

type ServiceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
};

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  return (
    <div 
      className="glassmorphism rounded-xl p-8 transition-all duration-300 hover:bg-white/10 animate-fade-in opacity-0 cursor-pointer relative overflow-hidden group"
      style={{ animationDelay: `${0.2 * index}s` }}
    >
      <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-r from-teal/20 to-cyan/30 rounded-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      <div className="relative">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-white/5 border border-white/10 mb-4">
          {icon}
        </div>
        
        <h3 className="heading-md mb-3">{title}</h3>
        <p className="text-white/70">{description}</p>
        
        <div className="mt-6 flex items-center text-teal font-medium">
          <span>Learn more</span>
          <svg 
            className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "UI/UX Design",
      description: "Create stunning, intuitive interfaces that engage users and enhance brand perception with our expert design services.",
      icon: <PenTool className="h-6 w-6 text-teal" />
    },
    {
      title: "Web Development",
      description: "Build responsive, high-performance websites and web applications that deliver exceptional user experiences on any device.",
      icon: <Globe className="h-6 w-6 text-cyan" />
    },
    {
      title: "Graphic Design",
      description: "Elevate your visual identity with compelling graphics, branding, and marketing materials designed to capture attention.",
      icon: <Layers className="h-6 w-6 text-teal" />
    }
  ];

  return (
    <section id="services" className="relative overflow-hidden py-24">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-teal/5 filter blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan/5 filter blur-[120px]"></div>
      
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="animate-fade-in">
            <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-white bg-white/5 backdrop-blur-sm mb-6">
              Our Expertise
            </span>
          </div>
          
          <h2 className="heading-lg mb-6 animate-fade-in">
            Exceptional Services to Transform Your Digital Presence
          </h2>
          
          <p className="subheading animate-fade-in opacity-0" style={{ animationDelay: '0.2s' }}>
            We combine technical excellence with creative vision to deliver solutions 
            that not only meet your business needs but exceed your expectations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
