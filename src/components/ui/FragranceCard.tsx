
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/utils/data';
import CategoryBadge from './CategoryBadge';

interface FragranceCardProps {
  product: Product;
}

const FragranceCard: React.FC<FragranceCardProps> = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'perfume': return 'Parfüm';
      case 'deodorant': return 'Deo';
      case 'lattafa': return 'Lattafa';
      case 'soap': return 'Seife';
      default: return 'Andere';
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="fragrance-card fragrance-card-hover opacity-0 animate-slideUp" style={{ animationDelay: '100ms' }}>
        <div className="relative overflow-hidden" style={{ height: '280px' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 shimmer bg-gray-200" />
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {product.dupeOf && (
            <div className="absolute top-2 right-2 bg-gold text-white px-3 py-1 text-xs rounded-full">
              Dupe für: {product.dupeOf}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="mb-2">
            <CategoryBadge category={getCategoryName(product.category)} />
          </div>
          <h3 className="font-serif text-lg font-medium mb-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mb-2">{product.brand}</p>
          <p className="text-gold font-medium">{product.price.toFixed(2)} €</p>
        </div>
      </div>
    </Link>
  );
};

export default FragranceCard;
