
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Team from '@/components/Team';
import Pricing from '@/components/Pricing';
import QuotationGenerator from '@/components/QuotationGenerator';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <main className="min-h-screen bg-richblack text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <QuotationGenerator />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
      <Toaster />
    </main>
  );
};

export default Index;
