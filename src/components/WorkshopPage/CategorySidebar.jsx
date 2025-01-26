import React from 'react';
import CategoryTab from '../CategoryTab';

const CategorySidebar = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="categories-sidebar">
      <div className="category-list">
        {categories.map((category) => (
          <CategoryTab
            key={category.name}
            name={category.name}
            color={category.color}
            isActive={category.name === activeCategory}
            onClick={() => onCategorySelect(category.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar; 