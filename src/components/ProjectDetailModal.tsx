import React from 'react';
import { X, ExternalLink, Calendar, Clock, User } from 'lucide-react';
import { cn } from "@/lib/utils";
import { PortfolioProject } from '@/data/portfolioProjects';

interface ProjectDetailModalProps {
  project: PortfolioProject;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
  project, 
  isOpen, 
  onClose 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-richblack border border-white/20 rounded-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-richblack/95 backdrop-blur-sm border-b border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-teal uppercase tracking-wider">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="text-xs font-medium text-cyan uppercase tracking-wider">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="madeinhaus-display-sm text-white mb-2">
                {project.title}
              </h2>
              <p className="madeinhaus-body-base">
                {project.description}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {project.client && (
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-teal" />
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Client</div>
                  <div className="text-white font-medium">{project.client}</div>
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-teal" />
              <div>
                <div className="text-xs text-white/60 uppercase tracking-wider">Year</div>
                <div className="text-white font-medium">{project.year}</div>
              </div>
            </div>
            
            {project.duration && (
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-teal" />
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">Duration</div>
                  <div className="text-white font-medium">{project.duration}</div>
                </div>
              </div>
            )}
          </div>

          {/* Long Description */}
          <div className="mb-8">
            <h3 className="madeinhaus-heading text-heading-md text-white mb-4">Project Overview</h3>
            <p className="madeinhaus-body-base leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="madeinhaus-heading text-heading-md text-white mb-4">Technologies & Tools</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>  
        {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="mb-8">
              <h3 className="madeinhaus-heading text-heading-md text-white mb-4">Challenges</h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                    <span className="madeinhaus-body-base">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="mb-8">
              <h3 className="madeinhaus-heading text-heading-md text-white mb-4">Results & Impact</h3>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan mt-2 flex-shrink-0" />
                    <span className="madeinhaus-body-base">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-8">
              <h3 className="madeinhaus-heading text-heading-md text-white mb-4">Project Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img 
                      src={image} 
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-white/10">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-teal hover:bg-teal/80 text-white rounded-full font-medium transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                View Project
              </a>
            )}
            
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;