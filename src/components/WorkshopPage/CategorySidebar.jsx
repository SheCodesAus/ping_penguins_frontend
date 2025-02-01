import React, { useEffect, useState } from 'react';
import getBoard from '../../api/get-board'; 

const CategorySidebar = ({ boardId, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const boardData = await getBoard(boardId);
        setCategories(boardData.categories); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [boardId]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories: {error}</p>;

  return (
    <div className="category-sidebar">
      <h2>Categories</h2>
      {categories.length > 0 ? (
        categories.map((category) => (
          <button
            key={category.id} 
            onClick={() => onCategorySelect(category.title)} 
            className="category-button"
          >
            {category.title}
          </button>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default CategorySidebar;