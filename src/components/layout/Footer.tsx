
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-fragranceDark text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-serif text-2xl mb-4 flex items-center">
              <span className="text-gold">Fragrance</span>
              <span className="ml-1">Dupes</span>
            </h3>
            <p className="text-gray-300 text-sm max-w-xs text-center md:text-left">
              Entdecke hochwertige Parfüm-Alternativen und kreiere deinen eigenen unverwechselbaren Duft.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg mb-4 text-gold">Navigation</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                Startseite
              </Link>
              <Link to="/products" className="text-gray-300 hover:text-white transition-colors duration-300">
                Produkte
              </Link>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                Admin Login
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-serif text-lg mb-4 text-gold">Kontakt</h4>
            <p className="text-gray-300 mb-2">info@fragrancedupes.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Fragrance Dupes. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
