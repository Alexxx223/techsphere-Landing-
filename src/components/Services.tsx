
import React from 'react';
import { Laptop, Palette, FileText, FileEdit, Megaphone, Database } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Web Design",
      description: "Fast, responsive websites built to convert visitors into customers. We create designs that work for your business.",
      icon: <Laptop className="h-6 w-6 text-teal" />
    },
    {
      title: "Logo & Brand Identity",
      description: "Create a memorable brand with smarter visuals that make a stronger impact in your market.",
      icon: <Palette className="h-6 w-6 text-cyan" />
    },
    {
      title: "Business Cards & Company Profiles",
      description: "Professional marketing tools designed to help you win more clients and grow your business.",
      icon: <FileText className="h-6 w-6 text-teal" />
    },
    {
      title: "Resume Design",
      description: "Stand out from the crowd with a professionally designed resume that gets you noticed.",
      icon: <FileEdit className="h-6 w-6 text-cyan" />
    },
    {
      title: "Flyers & Marketing",
      description: "Eye-catching designs customized for your marketing campaigns to attract more customers.",
      icon: <Megaphone className="h-6 w-6 text-teal" />
    },
    {
      title: "IT Consulting & Computer Repair",
      description: "Expert technology solutions that just work, keeping your business running smoothly.",
      icon: <Database className="h-6 w-6 text-cyan" />
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
            We help businesses grow with professional design and technology solutions. 
            From stunning websites to memorable branding to IT Suppport, we deliver results that make an impact.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
