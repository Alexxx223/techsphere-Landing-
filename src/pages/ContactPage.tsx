import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/Layout';
import Contact from '@/components/Contact';

const ContactPage = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}`
      : "https://techsphere-dun.vercel.app/contact";

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Contact Us - TechSphere Technologies</title>
        <meta
          name="description"
          content="Get in touch with TechSphere Technologies for your web development, graphic design, and digital solution needs. Contact our expert team for a free consultation."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="keywords"
          content="contact TechSphere, web development consultation, graphic design inquiry, digital solutions contact, get quote, business inquiry"
        />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact Us - TechSphere Technologies" />
        <meta property="og:description" content="Get in touch with TechSphere Technologies for your web development, graphic design, and digital solution needs. Contact our expert team for a free consultation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta property="og:image:alt" content="TechSphere Technologies Contact" />
        <meta property="og:site_name" content="TechSphere Technologies" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@techsphere_technologies" />
        <meta name="twitter:title" content="Contact Us - TechSphere Technologies" />
        <meta name="twitter:description" content="Get in touch with TechSphere Technologies for your web development, graphic design, and digital solution needs." />
        <meta name="twitter:image" content="https://techsphere-dun.vercel.app/logo.png" />
        <meta name="twitter:image:alt" content="TechSphere Technologies Contact" />
        
        {/* Additional SEO Tags */}
        <meta name="author" content="TechSphere Technologies" />
        <meta name="theme-color" content="#1a1a1a" />
      </Helmet>

      <Layout>
        <Contact />
      </Layout>
    </>
  );
};

export default ContactPage;