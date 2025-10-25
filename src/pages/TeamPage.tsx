import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Team from '@/components/Team';

const TeamPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/team";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Our Team - TechSphere Technologies</title>
        <meta
          name="description"
          content="Meet the talented team behind TechSphere Technologies. Our experienced developers, designers, and consultants are dedicated to delivering exceptional digital solutions."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="TechSphere team, web developers, graphic designers, technology experts, digital solutions team, professional staff"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Our Team - TechSphere Technologies" />
        <meta property="og:description" content="Meet the talented team behind TechSphere Technologies. Our experienced developers, designers, and consultants are dedicated to delivering exceptional digital solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Team" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="Our Team - TechSphere Technologies" />
        <meta name="twitter:description" content="Meet the talented team behind TechSphere Technologies. Our experienced developers, designers, and consultants." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Team" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <Team />
      </Layout>
    </>
  );
};

export default TeamPage;