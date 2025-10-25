
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import PortfolioCard from './PortfolioCard';
import ProjectDetailModal from './ProjectDetailModal';
import { portfolioProjects, categories, getProjectsByCategory, PortfolioProject } from '@/data/portfolioProjects';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const filteredProjects = getProjectsByCategory(activeFilter);
  
  const categoriesWithCounts = categories.map(category => ({
    ...category,
    count: category.id === 'all' ? portfolioProjects.length : getProjectsByCategory(category.id).length
  }));

  const handleViewDetails = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="min-h-screen bg-richblack">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="madeinhaus-display-xl mb-8">
              Our
              <br />
              <span className="text-teal">Work</span>
            </h1>
            <p className="madeinhaus-body-large max-w-2xl">
              Explore our portfolio of creative solutions, from brand identities to digital experiences. 
              Each project represents our commitment to exceptional design and strategic thinking.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Navigation */}
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {categoriesWithCounts.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                "border border-white/20 backdrop-blur-sm",
                activeFilter === category.id
                  ? "bg-teal text-white border-teal shadow-lg shadow-teal/25"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30"
              )}
            >
              {category.label}
              <span className="ml-2 text-xs opacity-60">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PortfolioCard 
                project={project} 
                onViewDetails={handleViewDetails}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-white/40 text-lg">
              No projects found in this category.
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 pb-24">
        <div className="text-center">
          <h2 className="madeinhaus-display-md mb-6">
            Ready to start your project?
          </h2>
          <p className="madeinhaus-body-large mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with exceptional design and strategic thinking.
          </p>
          <button className="btn-primary rounded-full text-lg px-8 py-4">
            Get Started
          </button>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Portfolio;
