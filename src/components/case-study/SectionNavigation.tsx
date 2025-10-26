import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  CASE_STUDY_SECTIONS, 
  generateSectionUrl, 
  copyUrlToClipboard,
  generateSocialShareUrls 
} from '@/utils/section-navigation';
import { CaseStudy } from '@/types/caseStudy';

interface SectionNavigationProps {
  caseStudy: CaseStudy;
  currentSection?: string | null;
  className?: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ 
  caseStudy, 
  currentSection, 
  className 
}) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Filter sections based on available content
  const availableSections = CASE_STUDY_SECTIONS.filter(section => {
    switch (section.id) {
      case 'testimonial':
        return !!caseStudy.testimonial;
      default:
        return true;
    }
  });

  const handleCopyUrl = async (sectionId?: string) => {
    if (!projectId) return;
    
    const success = await copyUrlToClipboard(projectId, sectionId);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const socialUrls = projectId ? generateSocialShareUrls(projectId, caseStudy.title, currentSection || undefined) : null;

  return (
    <div className={cn("fixed right-6 top-1/2 transform -translate-y-1/2 z-50", className)}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Toggle section navigation"
      >
        <svg 
          className={cn("w-5 h-5 transition-transform duration-300", isOpen && "rotate-45")} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Navigation Panel */}
      <div className={cn(
        "bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[250px] transition-all duration-300",
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
      )}>
        <h3 className="text-white font-medium mb-3 text-sm">Jump to Section</h3>
        
        {/* Section Links */}
        <nav className="space-y-2 mb-4">
          {availableSections.map((section) => (
            <Link
              key={section.id}
              to={generateSectionUrl(projectId || '', section.id)}
              className={cn(
                "block px-3 py-2 rounded-md text-sm transition-colors duration-200",
                currentSection === section.id
                  ? "bg-[#01a99c] text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
              onClick={() => setIsOpen(false)}
            >
              {section.title}
            </Link>
          ))}
        </nav>

        {/* Share Options */}
        <div className="border-t border-white/20 pt-3">
          <h4 className="text-white/70 text-xs font-medium mb-2">Share</h4>
          
          {/* Copy URL Button */}
          <button
            onClick={() => handleCopyUrl(currentSection || undefined)}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            {copySuccess ? 'Copied!' : 'Copy URL'}
          </button>

          {/* Social Share Buttons */}
          {socialUrls && (
            <div className="flex gap-1 mt-2">
              <a
                href={socialUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-[#01a99c]/20 text-white/70 hover:text-[#01a99c] transition-colors duration-200"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href={socialUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 hover:bg-[#52c1c9]/20 text-white/70 hover:text-[#52c1c9] transition-colors duration-200"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionNavigation;