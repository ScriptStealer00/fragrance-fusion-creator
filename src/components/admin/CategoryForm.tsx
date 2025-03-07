
import React, { useState } from 'react';
import { Category } from '@/utils/data';
import { toast } from 'sonner';

interface CategoryFormProps {
  category?: Category;
  onSave: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ 
  category, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState<Partial<Category>>(
    category || {
      id: '',
      name: ''
    }
  );
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id') {
      // Create a simplified ID from the value (lowercase, no spaces, etc.)
      const simplifiedId = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      setFormData({
        ...formData,
        [name]: simplifiedId
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name) {
      toast.error('Bitte fülle alle Felder aus');
      return;
    }
    
    const completeCategory = {
      ...formData,
    } as Category;
    
    onSave(completeCategory);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 animate-fadeIn">
      <h2 className="font-serif text-xl mb-6">{category ? 'Kategorie bearbeiten' : 'Neue Kategorie'}</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ID*</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="admin-input"
            placeholder="z.B. body-spray (keine Leerzeichen, Kleinbuchstaben)"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">
            Einzigartige ID für die Kategorie (wird automatisch formatiert)
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="admin-input"
            placeholder="z.B. Body Spray"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-300"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors duration-300"
        >
          Speichern
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
