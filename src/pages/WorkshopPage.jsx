import React, { useState } from 'react';
import { useWorkshop } from '../contexts/WorkshopContext';
import CategorySidebar from '../components/WorkshopPage/CategorySidebar';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import './WorkshopPage.css';

const WorkshopPage = () => {
  const { workshopData } = useWorkshop();
  const [activeCategory, setActiveCategory] = useState(
    workshopData.categories[0]?.name || ''
  );
  const [notes, setNotes] = useState([]);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="workshop-container">
      <div className="workshop-content">
        {/* Workshop Title */}
        <div className="workshop-header">
          <h1 className="workshop-title">{workshopData.title}</h1>
        </div>

        <div className="workshop-main">
          {/* Left sidebar */}
          <div className="categories-sidebar">
            <CategorySidebar
              categories={workshopData.categories}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
            />
          </div>

          {/* Main content area */}
          <div className="board-container">
            <WorkshopBoard
              activeCategory={activeCategory}
              notes={notes}
              onAddNote={handleAddNote}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopPage;