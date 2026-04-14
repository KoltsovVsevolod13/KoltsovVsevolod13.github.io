import { useState } from 'react';
import MyButton from './UI/MyButton/MyButton';
import { getCategoryLabel } from '../utils/categories';

export default function CategoryFilter({ menu = [], onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const availableCategories = [...new Set(menu.map(item => item.category).filter(Boolean))];

  const handleClick = (category) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    onCategoryChange(newCategory);
  };

  return (
    <div className="categories">
      {availableCategories.map(cat => {
        const dishWithLabel = menu.find(item => item.category === cat);
        const label = getCategoryLabel(cat, dishWithLabel?.categoryLabel);
        
        return (
          <MyButton
            key={cat}
            variant={activeCategory === cat ? "primary" : "outline"}
            onClick={() => handleClick(cat)}
          >
            {label}
          </MyButton>
        );
      })}
    </div>
  );
}