import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Portfolio from '@/components/Portfolio';

const PortfolioPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/portfolio";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Portfolio - TechSphere Technologies</title>
        <meta
          name="description"
          content="Explore TechSphere's portfolio of successful web development projects, graphic design work, and digital solutions. See our expertise in action through our client success stories."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="TechSphere portfolio, web development projects, graphic design showcase, client work, digital solutions examples, case studies"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Portfolio - TechSphere Technologies" />
        <meta property="og:description" content="Explore TechSphere's portfolio of successful web development projects, graphic design work, and digital solutions. See our expertise in action." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Portfolio" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="Portfolio - TechSphere Technologies" />
        <meta name="twitter:description" content="Explore TechSphere's portfolio of successful web development projects, graphic design work, and digital solutions." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Portfolio" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <Portfolio />
      </Layout>
    </>
  );
};

export default PortfolioPage;