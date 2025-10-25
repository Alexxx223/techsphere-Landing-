/**
 * Case Study SEO Component
 * Comprehensive SEO metadata management for case study pages
 */

import { Helmet } from 'react-helmet-async';
import { CaseStudy } from '@/types/caseStudy';
import { 
  generateCaseStudySEO, 
  generateOpenGraphTags, 
  generateTwitterTags, 
  generateAdditionalMetaTags 
} from '@/utils/seo';

interface CaseStudySEOProps {
  caseStudy: CaseStudy;
  section?: string;
  baseUrl?: string;
}

const CaseStudySEO: React.FC<CaseStudySEOProps> = ({ 
  caseStudy, 
  section, 
  baseUrl = window.location.origin 
}) => {
  const seoData = generateCaseStudySEO(caseStudy, section, baseUrl);
  const ogTags = generateOpenGraphTags(seoData);
  const twitterTags = generateTwitterTags(seoData);
  const additionalTags = generateAdditionalMetaTags(seoData);
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <link rel="canonical" href={seoData.canonicalUrl} />
      
      {/* Additional Meta Tags */}
      {Object.entries(additionalTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Open Graph Tags */}
      {Object.entries(ogTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Card Tags */}
      {Object.entries(twitterTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Additional Open Graph Tags */}
      <meta property="og:locale" content="en_US" />
      <meta property="article:author" content="Techsphere Technologies" />
      <meta property="article:published_time" content={caseStudy.date} />
      <meta property="article:modified_time" content={caseStudy.date} />
      <meta property="article:section" content={caseStudy.category} />
      {caseStudy.tags.map((tag, index) => (
        <meta key={`tag-${index}`} property="article:tag" content={tag} />
      ))}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(seoData.structuredData)}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for better performance */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Additional SEO hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/Asset 37.png" />
      
      {/* Language and region */}
      <meta httpEquiv="content-language" content="en-US" />
      <meta name="geo.region" content="US" />
      
      {/* Cache control for better performance */}
      <meta httpEquiv="cache-control" content="public, max-age=31536000" />
    </Helmet>
  );
};

export default CaseStudySEO;