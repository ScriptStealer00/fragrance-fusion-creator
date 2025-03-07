
import React from 'react';

interface CategoryBadgeProps {
  category: string;
  onClick?: () => void;
  isActive?: boolean;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  onClick,
  isActive = false 
}) => {
  const getColors = () => {
    if (isActive) {
      return 'bg-gold text-white';
    }
    
    if (onClick) {
      return 'bg-secondary hover:bg-gold/20 text-fragranceDark hover:text-fragranceDark cursor-pointer';
    }
    
    switch (category.toLowerCase()) {
      case 'parfüm':
      case 'perfume':
        return 'bg-pink-100 text-pink-800';
      case 'deo':
      case 'deodorant':
        return 'bg-blue-100 text-blue-800';
      case 'lattafa':
        return 'bg-purple-100 text-purple-800';
      case 'seife':
      case 'soap':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      onClick={onClick}
      className={`badge ${getColors()} transition-colors duration-300`}
    >
      {category}
    </span>
  );
};

export default CategoryBadge;
