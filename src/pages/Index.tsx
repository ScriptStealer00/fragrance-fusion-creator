
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product, initialProducts } from '@/utils/data';
import FragranceCard from '@/components/ui/FragranceCard';

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      const savedProducts = localStorage.getItem('products');
      setProducts(savedProducts ? JSON.parse(savedProducts) : initialProducts);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section min-h-[90vh] flex items-center justify-center relative px-4 py-16">
        <div className="z-10 max-w-2xl text-center opacity-0 animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <span className="inline-block py-1 px-3 rounded-full bg-primary/80 text-gold text-sm font-medium mb-4">
            Deine Lieblingsdüfte, neu interpretiert
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 text-balance">
            Entdecke die Welt der Premium Dupes
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Hochwertige Alternativen zu bekannten Düften - von Parfüms und Deos bis hin zu Lattafa-Produkten und handgemachten Seifen.
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-gold text-white rounded-md hover:bg-gold/90 transition-all duration-300 transform hover:-translate-y-1 inline-block"
          >
            Alle Produkte entdecken
          </Link>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '400ms' }}>
          <h2 className="text-3xl font-serif mb-4">Unsere Highlights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Entdecke unsere beliebtesten Dupes und Kreationen, die perfekt zu deinem Stil passen.
          </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="fragrance-card">
                <div className="shimmer h-[280px]" />
                <div className="p-4">
                  <div className="shimmer h-6 w-20 rounded-full mb-2" />
                  <div className="shimmer h-6 w-full mb-1" />
                  <div className="shimmer h-4 w-24 mb-2" />
                  <div className="shimmer h-5 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.slice(0, 3).map(product => (
                <FragranceCard key={product.id} product={product} />
              ))
            ) : (
              products.slice(0, 3).map(product => (
                <FragranceCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
        
        <div className="text-center mt-12 opacity-0 animate-fadeIn" style={{ animationDelay: '600ms' }}>
          <Link
            to="/products"
            className="text-gold hover:text-gold/70 font-medium underline underline-offset-4 transition-colors duration-300"
          >
            Alle Produkte anzeigen
          </Link>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="bg-primary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '700ms' }}>
            <h2 className="text-3xl font-serif mb-4">Unsere Kategorien</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Von Parfüms bis zu handgemachten Seifen - finde genau das, was zu dir passt.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 opacity-0 animate-fadeIn" style={{ animationDelay: '800ms' }}>
            <Link to="/products?category=perfume" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-800">
                  <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                  <path d="M10 13v-2"></path>
                  <path d="M8 21h8"></path>
                  <path d="M7 17.4V14h10v3.4a2 2 0 0 1-1.2 1.8l-3.6 1.8a2 2 0 0 1-1.8 0l-3.6-1.8A2 2 0 0 1 7 17.4Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-lg mb-2">Parfüms</h3>
              <p className="text-sm text-muted-foreground">Hochwertige Dupes beliebter Parfüms</p>
            </Link>
            
            <Link to="/products?category=deodorant" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-800">
                  <path d="M9 6V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                  <path d="M12 14v7"></path>
                  <path d="M9 10v1"></path>
                  <path d="M9 17v1"></path>
                  <path d="M15 10v1"></path>
                  <path d="M15 17v1"></path>
                  <path d="M9 6h6a3 3 0 0 1 3 3v12H6V9a3 3 0 0 1 3-3Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-lg mb-2">Deos</h3>
              <p className="text-sm text-muted-foreground">Frische Deos für jeden Tag</p>
            </Link>
            
            <Link to="/products?category=lattafa" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-800">
                  <path d="M8 22h8"></path>
                  <path d="M12 11V2"></path>
                  <path d="M10 7h4"></path>
                  <rect x="7" y="13" width="10" height="7" rx="1"></rect>
                </svg>
              </div>
              <h3 className="font-serif text-lg mb-2">Lattafa</h3>
              <p className="text-sm text-muted-foreground">Exquisite Düfte aus dem Orient</p>
            </Link>
            
            <Link to="/products?category=soap" className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-800">
                  <path d="M8 21h12a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H10a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13a3 3 0 0 0 3 3h3Z"></path>
                  <path d="M13 5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3V5Z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-lg mb-2">Seifen</h3>
              <p className="text-sm text-muted-foreground">Handgemachte Seifen mit luxuriösen Düften</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
