import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Pricing from '@/components/Pricing';

const PricingPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/pricing";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Pricing Plans - TechSphere Technologies</title>
        <meta
          name="description"
          content="Discover TechSphere's competitive pricing plans for web development, graphic design, and digital solutions. Choose the perfect package for your business needs and budget."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="web development pricing, graphic design rates, digital solutions cost, TechSphere pricing plans, affordable web development"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Pricing Plans - TechSphere Technologies" />
        <meta property="og:description" content="Discover TechSphere's competitive pricing plans for web development, graphic design, and digital solutions. Choose the perfect package for your business needs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Pricing Plans" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="Pricing Plans - TechSphere Technologies" />
        <meta name="twitter:description" content="Discover TechSphere's competitive pricing plans for web development, graphic design, and digital solutions." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Pricing Plans" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <Pricing />
      </Layout>
    </>
  );
};

export default PricingPage;