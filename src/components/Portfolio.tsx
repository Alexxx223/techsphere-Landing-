
import React, { useState } from 'react';
import { cn } from "@/lib/utils";

const Portfolio = () => {
  const [filter, setFilter] = useState('*');
  
  const portfolioItems = [
    { id: 1, category: 'app', image: '/images/tyre-pit-wordmark.png', title: 'Tyre Pit Wordmark' },
    { id: 2, category: 'app', image: '/images/tyre pit logo.jpg', title: 'Tyre Pit Logo' },
    { id: 3, category: 'app', image: '/images/rjected banner.jpg', title: 'Promotional Banner' },
    { id: 4, category: 'card', image: '/images/final greenred-tyre pit stop bus flyer - Made with PosterMyWall (1).jpg', title: 'Tyre Pit Flyer' },
    { id: 5, category: 'web', image: '/images/A New Design - Made with PosterMyWall.jpg', title: 'Poster Design' },
    { id: 6, category: 'app', image: '/images/Engine Oil Advertisement(FINAL).png', title: 'Engine Oil Ad' },
    { id: 7, category: 'card', image: '/images/pepskay.jpeg', title: 'Pepskay Designs' },
    { id: 8, category: 'card', image: '/images/genuine.jpeg', title: 'Genuine Branding' },
    { id: 9, category: 'web', image: '/images/genuine2.jpeg', title: 'Genuine Poster' }
  ];
  
  const filteredItems = filter === '*' 
    ? portfolioItems 
    : portfolioItems.filter(item => `filter-${item.category}` === filter);

  return (
    <section id="portfolio" className="py-24 bg-richblack">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="heading-lg mb-6">Portfolio</h2>
          <p className="subheading max-w-3xl mx-auto">
            Take a look at some of the exciting projects we've completed, including logo design, graphic design, and more.
            We are committed to delivering high-quality, creative solutions to meet our clients' needs.
          </p>
        </div>
        
        <div className="flex justify-center mb-12" data-aos="fade-up">
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              className={cn("px-4 py-2 rounded-md transition-colors", 
                filter === '*' ? "bg-teal text-white" : "glassmorphism text-white/70 hover:bg-white/10")}
              onClick={() => setFilter('*')}
            >
              All
            </button>
            <button 
              className={cn("px-4 py-2 rounded-md transition-colors", 
                filter === 'filter-app' ? "bg-teal text-white" : "glassmorphism text-white/70 hover:bg-white/10")}
              onClick={() => setFilter('filter-app')}
            >
              Graphic Design
            </button>
            <button 
              className={cn("px-4 py-2 rounded-md transition-colors", 
                filter === 'filter-card' ? "bg-teal text-white" : "glassmorphism text-white/70 hover:bg-white/10")}
              onClick={() => setFilter('filter-card')}
            >
              UI/UX
            </button>
            <button 
              className={cn("px-4 py-2 rounded-md transition-colors", 
                filter === 'filter-web' ? "bg-teal text-white" : "glassmorphism text-white/70 hover:bg-white/10")}
              onClick={() => setFilter('filter-web')}
            >
              Web Design
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="portfolio-item group" data-aos="fade-up">
              <div className="relative glassmorphism rounded-xl overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 w-full">
                    <h4 className="text-white text-lg font-medium">{item.title}</h4>
                    <div className="flex mt-4 space-x-2">
                      <a href={item.image} className="h-10 w-10 rounded-full glassmorphism flex items-center justify-center hover:bg-teal/30 transition-colors">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </a>
                      <a href="#" className="h-10 w-10 rounded-full glassmorphism flex items-center justify-center hover:bg-teal/30 transition-colors">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
