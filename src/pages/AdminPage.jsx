import React, { useState } from 'react';
import { useWorkshop } from '../contexts/WorkshopContext';
import { useNavigate } from 'react-router-dom';
import CategorySidebar from '../components/WorkshopPage/CategorySidebar';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import CreateWorkshopForm from '../components/AdminPage/CreateWorkshopForm';
import RecentWorkshops from '../components/AdminPage/RecentWorkshops';
import './WorkshopPage.css';
import "../style.css";

const AdminPage = () => {
  const { updateWorkshop, workshops = [] } = useWorkshop();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([{ name: '', color: 'green' }]);
  const [notes, setNotes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleSubmitNewWorkshop = (title, validCategories, dateTime) => {
    updateWorkshop(title, validCategories, dateTime);
    setIsFormVisible(false);
    navigate('/workshop');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Workshop Admin Dashboard</h1>

      {/* Create New Workshop Button */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="mb-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        {isFormVisible ? 'Cancel' : 'Create New Workshop'}
      </button>

      {/* Conditionally render the Create Workshop Form */}
      {isFormVisible && (
        <CreateWorkshopForm 
          categories={categories}
          onAddCategory={handleAddCategory}
          onRemoveCategory={handleRemoveCategory}
          onCategoryChange={handleCategoryChange}
          onSubmit={handleSubmitNewWorkshop}
        />
      )}

      {/* Flex container for sidebar and board */}
      <div className="flex mt-6">
        {/* Render the CategorySidebar */}
        <CategorySidebar
          categories={categories}
          activeCategory={categories[0]?.name || ''}
          onCategorySelect={() => {}}
        />

        {/* Render the WorkshopBoard */}
        <div className="ml-4 flex-1">
          <WorkshopBoard
            activeCategory={categories[0]?.name || ''}
            notes={notes}
            onAddNote={(newNote) => setNotes([...notes, newNote])}
          />
        </div>
      </div>

      {/* Display Recent Workshops */}
      <RecentWorkshops workshops={workshops} />
    </div>
  );
};

export default AdminPage;
