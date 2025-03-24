
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <main className="min-h-screen bg-richblack text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
};

export default Index;
