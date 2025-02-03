import React from 'react';

const CategorySidebar = ({ categories }) => { 
    return (
        <div className="category-sidebar">
            <h2>Categories</h2>
            <ul>
                {Array.isArray(categories) && categories.length > 0 ? (
                    categories.map((category, index) => (
                        <li key={index}>{category}</li> 
                    ))
                ) : (
                    <li>No categories available.</li> 
                )}
            </ul>
        </div>
    );
};

export default CategorySidebar;