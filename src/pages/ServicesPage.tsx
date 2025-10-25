import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Services from '@/components/Services';

const ServicesPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/services";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Our Services - TechSphere Technologies</title>
        <meta
          name="description"
          content="Explore TechSphere's comprehensive digital services including web development, graphic design, mobile app development, e-commerce solutions, and IT consulting services."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="web development services, graphic design, mobile app development, e-commerce solutions, IT consulting, digital marketing, TechSphere services"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Our Services - TechSphere Technologies" />
        <meta property="og:description" content="Explore TechSphere's comprehensive digital services including web development, graphic design, mobile app development, e-commerce solutions, and IT consulting." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Services" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="Our Services - TechSphere Technologies" />
        <meta name="twitter:description" content="Explore TechSphere's comprehensive digital services including web development, graphic design, mobile app development, e-commerce solutions." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Services" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <Services />
      </Layout>
    </>
  );
};

export default ServicesPage;