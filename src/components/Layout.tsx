import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-richblack text-white overflow-x-hidden">
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;