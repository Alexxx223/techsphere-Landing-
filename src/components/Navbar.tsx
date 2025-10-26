
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <Link to="/" className="flex items-center space-x-2">
              {/* <span className="text-xl font-display font-bold text-white tracking-tighter">
                Tech<span className="text-teal">Sphere</span></span> */}
                <img src="../public/TS-cyan.png" alt="Techsphere" className="inline-block h-11 w-auto ml-2" />
              
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/" && "text-white font-medium after:w-full"
              )}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/about" && "text-white font-medium after:w-full"
              )}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/services" && "text-white font-medium after:w-full"
              )}
            >
              Services
            </Link>
            <Link 
              to="/portfolio" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/portfolio" && "text-white font-medium after:w-full"
              )}
            >
              Portfolio
            </Link>
            <Link 
              to="/pricing" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/pricing" && "text-white font-medium after:w-full"
              )}
            >
              Pricing
            </Link>
            <Link 
              to="/team" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/team" && "text-white font-medium after:w-full"
              )}
            >
              Team
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "relative text-white/80 hover:text-white transition-all duration-300 ease-in-out",
                "after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
                "hover:after:w-full",
                location.pathname === "/contact" && "text-white font-medium after:w-full"
              )}
            >
              Contact
            </Link>
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
        <div className="p-4 space-y-6 flex flex-col items-center justify-center h-full">
          <Link 
            to="/" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/" && "text-white font-medium after:w-full"
            )}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/about" && "text-white font-medium after:w-full"
            )}
          >
            About
          </Link>
          <Link 
            to="/services" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/services" && "text-white font-medium after:w-full"
            )}
          >
            Services
          </Link>
          <Link 
            to="/portfolio" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/portfolio" && "text-white font-medium after:w-full"
            )}
          >
            Portfolio
          </Link>
          <Link 
            to="/pricing" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/pricing" && "text-white font-medium after:w-full"
            )}
          >
            Pricing
          </Link>
          <Link 
            to="/team" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/team" && "text-white font-medium after:w-full"
            )}
          >
            Team
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "text-white/80 hover:text-white transition-all duration-300 text-xl relative",
              "after:absolute after:bottom-[-4px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-teal after:transition-all after:duration-300",
              "hover:after:w-full",
              location.pathname === "/contact" && "text-white font-medium after:w-full"
            )}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
