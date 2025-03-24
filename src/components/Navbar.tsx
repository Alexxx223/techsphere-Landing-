
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-5",
        isScrolled ? "py-3 glassmorphism" : ""
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-xl font-display font-bold text-white tracking-tighter">
                Tech<span className="text-teal">Sphere</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="text-white/80 hover:text-white transition-colors">
              Services
            </a>
            <a href="#portfolio" className="text-white/80 hover:text-white transition-colors">
              Portfolio
            </a>
            <a href="#team" className="text-white/80 hover:text-white transition-colors">
              Team
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-teal hover:bg-white/5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[80px] bg-richblack/95 backdrop-blur-lg transform transition-transform duration-300 ease-in-out z-40",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="p-4 space-y-4 flex flex-col items-center justify-center h-full">
          <a 
            href="#hero" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            Home
          </a>
          <a 
            href="#about" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            About
          </a>
          <a 
            href="#services" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            Services
          </a>
          <a 
            href="#portfolio" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            Portfolio
          </a>
          <a 
            href="#team" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            Team
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="text-white/80 hover:text-white transition-colors text-xl"
          >
            Contact
          </a>
          <a 
            href="#contact" 
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary mt-4"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
