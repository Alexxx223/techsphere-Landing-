import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { PortfolioProject } from '@/data/portfolioProjects';
import { getCaseStudyById } from '@/data/caseStudies';
import { preloadCaseStudy } from '@/utils/route-preloader';

interface PortfolioCardProps {
  project: PortfolioProject;
  className?: string;
  onViewDetails: (project: PortfolioProject) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ project, className, onViewDetails }) => {
  const hasCaseStudy = getCaseStudyById(project.id);

  const handleMouseEnter = () => {
    if (hasCaseStudy) {
      preloadCaseStudy();
    }
  };

  return (
    <div 
      className={cn("group cursor-pointer", className)}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Hover Content */}
          <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-teal uppercase tracking-wider">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-medium text-cyan uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              
              <h3 className="madeinhaus-heading text-heading-sm text-white mb-2 group-hover:text-teal transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="madeinhaus-body-base mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/90">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* Case Study Link - Primary Action */}
                {hasCaseStudy ? (
                  <Link
                    to={`/portfolio/${project.id}/case-study`}
                    className="flex items-center justify-center px-4 py-2 rounded-full bg-teal text-white text-sm font-medium hover:bg-teal/80 transition-all duration-300 transform hover:scale-105"
                  >
                    View Case Study
                  </Link>
                ) : (
                  <button 
                    onClick={() => onViewDetails(project)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-teal/30 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                )}
                
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-teal/30 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Content (Always Visible) */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-teal uppercase tracking-wider">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-xs font-medium text-cyan uppercase tracking-wider">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="madeinhaus-heading text-heading-sm text-white mb-2 group-hover:text-teal transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="madeinhaus-body-base line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;