import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import About from '@/components/About';

const AboutPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/about";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>About Us - TechSphere Technologies</title>
        <meta
          name="description"
          content="Learn about TechSphere Technologies - our mission, vision, and the team behind innovative web development and digital solutions. Discover our commitment to excellence and client success."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="about TechSphere, company mission, web development team, digital solutions experts, technology consulting"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="About Us - TechSphere Technologies" />
        <meta property="og:description" content="Learn about TechSphere Technologies - our mission, vision, and the team behind innovative web development and digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies About Us" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="About Us - TechSphere Technologies" />
        <meta name="twitter:description" content="Learn about TechSphere Technologies - our mission, vision, and the team behind innovative web development and digital solutions." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies About Us" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <About />
      </Layout>
    </>
  );
};

export default AboutPage;