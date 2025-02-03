import React from 'react';
import './CategorySidebar.css'; 

const CategorySidebar = ({ categories, onCategorySelect }) => { 
    return (
        <div className="category-sidebar">
            <h2>Categories</h2>
            <ul>
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category.id} onClick={() => onCategorySelect(category)}> 
                            {category.title} 
                        </li> 
                    ))
                ) : (
                    <li>No categories available.</li> 
                )}
            </ul>
        </div>
    );
};

export default CategorySidebar;