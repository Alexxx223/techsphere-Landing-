
import React from 'react';
import { Laptop, Smartphone, Database, Layers } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description: "Designing and building modern, responsive websites to enhance your online presence.",
      icon: <Laptop className="h-6 w-6 text-teal" />
    },
    {
      title: "Mobile App Design",
      description: "Creating intuitive and user-friendly mobile app designs tailored to your business goals.",
      icon: <Smartphone className="h-6 w-6 text-cyan" />
    },
    {
      title: "Graphics Design",
      description: "Our graphic design services provide innovative, eye-catching designs tailored to elevate your brand's visual identity.",
      icon: <Database className="h-6 w-6 text-teal" />
    },
    {
      title: "IT Consulting",
      description: "Providing expert advice to align your IT strategy with your business objectives.",
      icon: <Layers className="h-6 w-6 text-cyan" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-richblack relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-teal/5 filter blur-[150px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-cyan/5 filter blur-[120px]"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="madeinhaus-display-md mb-6">Our Services</h2>
          <p className="madeinhaus-body-large max-w-3xl mx-auto">
            At TechSphere, we offer a wide range of technology services that drive innovation and create value for our clients. 
            From developing digital strategies to implementing advanced IT solutions, we are here to help your business thrive.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glassmorphism rounded-xl p-6 transition-all duration-300 hover:bg-white/10" data-aos="fade-up" data-aos-delay={index * 100}>
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-lg bg-white/5 border border-white/10 mb-6">
                {service.icon}
              </div>
              <h4 className="madeinhaus-heading text-heading-sm mb-3">{service.title}</h4>
              <p className="madeinhaus-body-base">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
