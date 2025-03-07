
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, initialProducts } from '@/utils/data';
import CategoryBadge from '@/components/ui/CategoryBadge';
import { useAuth } from '@/contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Load product data
    const timer = setTimeout(() => {
      const savedProducts = localStorage.getItem('products');
      const allProducts = savedProducts ? JSON.parse(savedProducts) : initialProducts;
      const foundProduct = allProducts.find((p: Product) => p.id === id);
      
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'perfume': return 'Parfüm';
      case 'deodorant': return 'Deo';
      case 'lattafa': return 'Lattafa';
      case 'soap': return 'Seife';
      default: return 'Andere';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="shimmer h-[500px] rounded-lg"></div>
              <div className="space-y-6">
                <div className="shimmer h-8 w-2/3 rounded"></div>
                <div className="shimmer h-6 w-1/3 rounded"></div>
                <div className="shimmer h-6 w-1/4 rounded"></div>
                <div className="space-y-3">
                  <div className="shimmer h-4 w-full rounded"></div>
                  <div className="shimmer h-4 w-full rounded"></div>
                  <div className="shimmer h-4 w-2/3 rounded"></div>
                </div>
                <div className="shimmer h-10 w-full rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif mb-4">Produkt nicht gefunden</h1>
          <p className="text-muted-foreground mb-6">
            Das gesuchte Produkt konnte nicht gefunden werden.
          </p>
          <Link 
            to="/products"
            className="px-6 py-3 bg-gold text-white rounded-md hover:bg-gold/90 transition-all duration-300"
          >
            Zurück zu allen Produkten
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative overflow-hidden rounded-lg">
              {!imageLoaded && (
                <div className="absolute inset-0 shimmer bg-gray-200" />
              )}
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-auto object-cover transition-all duration-700 ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <CategoryBadge category={getCategoryName(product.category)} />
                {product.dupeOf && (
                  <div className="mt-2 inline-block bg-gold text-white px-3 py-1 text-xs rounded-full">
                    Dupe für: {product.dupeOf}
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.brand}</p>
              
              <p className="text-2xl font-medium text-gold">{product.price.toFixed(2)} €</p>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Beschreibung</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              {product.notes && product.notes.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Duftnoten</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.map((note, index) => (
                      <span key={index} className="px-3 py-1 bg-secondary rounded-full text-xs">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="block text-center px-6 py-3 bg-gold/10 text-gold border border-gold/30 rounded-md hover:bg-gold/20 transition-all duration-300 mt-6"
                >
                  Im Admin-Bereich bearbeiten
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-16">
            <Link 
              to="/products"
              className="inline-flex items-center text-gold hover:text-gold/70 transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M19 12H5"></path>
                <path d="M12 19l-7-7 7-7"></path>
              </svg>
              Zurück zu allen Produkten
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
