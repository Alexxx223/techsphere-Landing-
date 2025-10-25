/**
 * SEO Utilities for Case Study Pages
 * Handles structured data markup, meta tags, and SEO optimization
 */

import { CaseStudy } from '@/types/caseStudy';

export interface SEOData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage: string;
  ogType: string;
  keywords: string[];
  structuredData: object;
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SectionInfo {
  title: string;
  description: string;
}

/**
 * Generate comprehensive SEO data for case study pages
 */
export const generateCaseStudySEO = (
  caseStudy: CaseStudy, 
  section?: string,
  baseUrl: string = window.location.origin
): SEOData => {
  const sectionInfo = section ? getSectionInfo(section) : null;
  
  // Generate title with section context
  const title = sectionInfo 
    ? `${caseStudy.seoTitle} - ${sectionInfo.title}`
    : caseStudy.seoTitle;
  
  // Generate description with section context
  const description = sectionInfo?.description 
    ? `${sectionInfo.description} - ${caseStudy.seoDescription}`
    : caseStudy.seoDescription;
  
  // Generate canonical URL
  const canonicalUrl = section 
    ? `${baseUrl}/portfolio/${caseStudy.id}/case-study/${section}`
    : `${baseUrl}/portfolio/${caseStudy.id}/case-study`;
  
  // Generate breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Portfolio', url: `${baseUrl}/portfolio` },
    { name: caseStudy.title, url: `${baseUrl}/portfolio/${caseStudy.id}/case-study` }
  ];
  
  if (section && sectionInfo) {
    breadcrumbs.push({ 
      name: sectionInfo.title, 
      url: canonicalUrl 
    });
  }
  
  // Generate structured data
  const structuredData = generateStructuredData(caseStudy, baseUrl, section);
  
  return {
    title,
    description,
    canonicalUrl,
    ogImage: caseStudy.ogImage,
    ogType: 'article',
    keywords: caseStudy.tags,
    structuredData,
    breadcrumbs
  };
};

/**
 * Generate JSON-LD structured data for case studies
 */
export const generateStructuredData = (
  caseStudy: CaseStudy, 
  baseUrl: string,
  section?: string
): object => {
  const caseStudyUrl = `${baseUrl}/portfolio/${caseStudy.id}/case-study`;
  
  // Base Article structured data
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "description": caseStudy.seoDescription,
    "image": caseStudy.ogImage,
    "url": caseStudyUrl,
    "datePublished": caseStudy.date,
    "dateModified": caseStudy.date,
    "author": {
      "@type": "Organization",
      "name": "Techsphere Technologies",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Techsphere Technologies",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": caseStudyUrl
    },
    "keywords": caseStudy.tags.join(", "),
    "articleSection": caseStudy.category,
    "about": {
      "@type": "CreativeWork",
      "name": caseStudy.title,
      "description": caseStudy.overview.challenge,
      "creator": {
        "@type": "Organization",
        "name": "Techsphere Technologies"
      }
    }
  };
  
  // Add client organization if testimonial exists
  if (caseStudy.testimonial) {
    articleData.about = {
      ...articleData.about,
      "client": {
        "@type": "Organization",
        "name": caseStudy.testimonial.company
      }
    };
  }
  
  // BreadcrumbList structured data
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": `${baseUrl}/portfolio`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": caseStudy.title,
        "item": caseStudyUrl
      }
    ]
  };
  
  // Add section to breadcrumb if present
  if (section) {
    const sectionInfo = getSectionInfo(section);
    if (sectionInfo) {
      breadcrumbData.itemListElement.push({
        "@type": "ListItem",
        "position": 4,
        "name": sectionInfo.title,
        "item": `${caseStudyUrl}/${section}`
      });
    }
  }
  
  // Service/Product structured data based on case study
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${caseStudy.category} Services`,
    "description": caseStudy.overview.solution,
    "provider": {
      "@type": "Organization",
      "name": "Techsphere Technologies",
      "url": baseUrl
    },
    "serviceType": caseStudy.category,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Design Services",
      "itemListElement": caseStudy.technologies.map((tech, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": tech.name,
          "description": tech.description || `${tech.name} services`
        }
      }))
    }
  };
  
  // Review structured data if testimonial exists
  let reviewData = null;
  if (caseStudy.testimonial && caseStudy.testimonial.rating) {
    reviewData = {
      "@context": "https://schema.org",
      "@type": "Review",
      "reviewBody": caseStudy.testimonial.quote,
      "author": {
        "@type": "Person",
        "name": caseStudy.testimonial.author,
        "jobTitle": caseStudy.testimonial.position,
        "worksFor": {
          "@type": "Organization",
          "name": caseStudy.testimonial.company
        }
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": caseStudy.testimonial.rating,
        "bestRating": 5
      },
      "itemReviewed": {
        "@type": "Service",
        "name": `${caseStudy.category} Project: ${caseStudy.title}`,
        "provider": {
          "@type": "Organization",
          "name": "Techsphere Technologies"
        }
      }
    };
  }
  
  // Combine all structured data
  const combinedData = [articleData, breadcrumbData, serviceData];
  if (reviewData) {
    combinedData.push(reviewData);
  }
  
  return combinedData;
};

/**
 * Get section information for SEO purposes
 */
export const getSectionInfo = (sectionId: string): SectionInfo | null => {
  const sections: Record<string, SectionInfo> = {
    overview: {
      title: 'Project Overview',
      description: 'Comprehensive project overview including challenges, solutions, and objectives'
    },
    process: {
      title: 'Design Process',
      description: 'Detailed breakdown of the design and development process'
    },
    challenges: {
      title: 'Challenges & Solutions',
      description: 'Key challenges faced and innovative solutions implemented'
    },
    technical: {
      title: 'Technical Details',
      description: 'Technical implementation details and technologies used'
    },
    results: {
      title: 'Results & Metrics',
      description: 'Project outcomes, metrics, and measurable results'
    },
    testimonial: {
      title: 'Client Testimonial',
      description: 'Client feedback and testimonial about the project'
    }
  };
  
  return sections[sectionId] || null;
};

/**
 * Generate meta keywords from case study data
 */
export const generateMetaKeywords = (caseStudy: CaseStudy): string => {
  const keywords = [
    ...caseStudy.tags,
    caseStudy.category.toLowerCase(),
    'portfolio',
    'case study',
    'design',
    'techsphere'
  ];
  
  return [...new Set(keywords)].join(', ');
};

/**
 * Generate Open Graph meta tags
 */
export const generateOpenGraphTags = (seoData: SEOData) => {
  return {
    'og:title': seoData.title,
    'og:description': seoData.description,
    'og:image': seoData.ogImage,
    'og:url': seoData.canonicalUrl,
    'og:type': seoData.ogType,
    'og:site_name': 'Techsphere Technologies'
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterTags = (seoData: SEOData) => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': seoData.title,
    'twitter:description': seoData.description,
    'twitter:image': seoData.ogImage,
    'twitter:site': '@techsphere_technologies'
  };
};

/**
 * Generate additional SEO meta tags
 */
export const generateAdditionalMetaTags = (seoData: SEOData) => {
  return {
    'keywords': seoData.keywords.join(', '),
    'robots': 'index, follow',
    'author': 'Techsphere Technologies',
    'viewport': 'width=device-width, initial-scale=1.0',
    'theme-color': '#0a0a0a'
  };
};