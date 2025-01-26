import React, { useState } from 'react';

const CreateWorkshopForm = ({ categories, onAddCategory, onRemoveCategory, onCategoryChange, onSubmit }) => {
  const [newWorkshopTitle, setNewWorkshopTitle] = useState('');
  const [workshopDateTime, setWorkshopDateTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validCategories = categories.filter(cat => cat.name.trim() !== '');
    onSubmit(newWorkshopTitle, validCategories, workshopDateTime);
    setNewWorkshopTitle('');
    setWorkshopDateTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Workshop Title</label>
        <input
          type="text"
          value={newWorkshopTitle}
          onChange={(e) => setNewWorkshopTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          placeholder="Enter new workshop title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Date and Time</label>
        <input
          type="datetime-local"
          value={workshopDateTime}
          onChange={(e) => setWorkshopDateTime(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        {categories.map((category, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={category.name}
              onChange={(e) => onCategoryChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              placeholder="Enter category name"
            />
            {categories.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveCategory(index)}
                className="px-2 py-2 text-red-500 hover:text-red-700"
              >
                ×
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAddCategory}
          className="mt-2 text-sm text-pink-500 hover:text-pink-700"
        >
          + Add Category
        </button>
      </div>

      <button type="submit" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
        Create Workshop
      </button>
    </form>
  );
};

export default CreateWorkshopForm;
