import React, { useState } from 'react';
import { useWorkshop } from '../contexts/WorkshopContext';
import { useNavigate } from 'react-router-dom';
import CategorySidebar from '../components/WorkshopPage/CategorySidebar';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import './WorkshopPage.css';
import "../style.css";


const AdminPage = () => {
  const { updateWorkshop, workshopData } = useWorkshop();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkshopTitle, setNewWorkshopTitle] = useState('');
  const [categories, setCategories] = useState([
    { name: '', color: 'green' }
  ]);
  const [notes, setNotes] = useState([]);

  const handleAddCategory = () => {
    setCategories([...categories, { name: '', color: 'green' }]);
  };

  const handleRemoveCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = categories.map((category, i) => {
      if (i === index) {
        return { ...category, name: value };
      }
      return category;
    });
    setCategories(newCategories);
  };

  const handleSubmitNewWorkshop = (e) => {
    e.preventDefault();
    const validCategories = categories.filter(cat => cat.name.trim() !== '');
    updateWorkshop(newWorkshopTitle, validCategories);
    setNewWorkshopTitle('');
    setCategories([{ name: '', color: 'green' }]);
    setIsModalOpen(false);
    navigate('/workshop');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Workshop Admin</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Create New Workshop
        </button>
      </div>

      {/* Modal for creating a new workshop */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Create New Workshop</h2>
            <form onSubmit={handleSubmitNewWorkshop}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workshop Title
                </label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                {categories.map((category, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => handleCategoryChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
                      placeholder="Enter category name"
                    />
                    {categories.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(index)}
                        className="px-2 py-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="mt-2 text-sm text-pink-500 hover:text-pink-700"
                >
                  + Add Category
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Create Workshop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Flex container for sidebar and board */}
      <div className="flex">
        {/* Render the CategorySidebar */}
        <CategorySidebar
          categories={categories}
          activeCategory={categories[0]?.name || ''}
          onCategorySelect={() => {}} // Add your category select logic here
        />

        {/* Render the WorkshopBoard */}
        <div className="mt-6 ml-4 flex-1"> {/* Added margin-left for spacing */}
          <WorkshopBoard
            activeCategory={categories[0]?.name || ''}
            notes={notes}
            onAddNote={(newNote) => setNotes([...notes, newNote])} // Function to add notes
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
