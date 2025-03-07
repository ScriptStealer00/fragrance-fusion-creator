
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-fragranceDark font-serif text-2xl font-medium tracking-wider flex items-center"
          >
            <span className="text-gold">Fragrance</span>
            <span className="ml-1">Dupes</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-fragranceDark hover:text-gold transition-colors duration-300">
              Startseite
            </Link>
            <Link to="/products" className="text-fragranceDark hover:text-gold transition-colors duration-300">
              Produkte
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-fragranceDark hover:text-gold transition-colors duration-300">
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 rounded-md"
              >
                Abmelden
              </button>
            ) : (
              <Link 
                to="/login"
                className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 rounded-md"
              >
                Admin Login
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-fragranceDark p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-fragranceDark hover:text-gold transition-colors duration-300 py-2">
                Startseite
              </Link>
              <Link to="/products" className="text-fragranceDark hover:text-gold transition-colors duration-300 py-2">
                Produkte
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-fragranceDark hover:text-gold transition-colors duration-300 py-2">
                  Admin
                </Link>
              )}
              {isAuthenticated ? (
                <button 
                  onClick={logout}
                  className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 rounded-md"
                >
                  Abmelden
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-white transition-colors duration-300 rounded-md"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
