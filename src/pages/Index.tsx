import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  useEffect(() => {
    // Ensure document language is set as a fallback.
    if (typeof document !== "undefined") {
      document.documentElement.lang = "en";
    }
  }, []);

  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/`
      : "https://techsphere-dun.vercel.app/";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>TechSphere - Professional Web Development & Digital Solutions</title>
        <meta
          name="description"
          content="TechSphere provides professional web development, graphic design, and full-service digital solutions. We build responsive websites, e-commerce platforms, branding, and marketing strategies tailored to help businesses grow online and engage their customers effectively."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="web development, web design, graphic design, digital solutions, e-commerce, responsive design, branding, SEO, TechSphere, software development, UI/UX"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="TechSphere - Professional Web Development & Digital Solutions" />
        <meta property="og:description" content="TechSphere provides professional web development, graphic design, and full-service digital solutions. We build responsive websites, e-commerce platforms, branding, and marketing strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Logo" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="TechSphere - Professional Web Development & Digital Solutions" />
        <meta name="twitter:description" content="TechSphere provides professional web development, graphic design, and full-service digital solutions." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Logo" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="msapplication-TileColor" content="#1a1a1a" />
      </Helmet>

      {/* Redirect to home page while preserving SEO metadata */}
      <Navigate to="/" replace />
    </>
  );
};

export default Index;
