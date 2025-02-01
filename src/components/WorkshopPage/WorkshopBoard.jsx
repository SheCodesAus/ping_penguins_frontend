import React, { useState } from 'react';
import CreateStickyNote from './CreateStickyNote';
import CategorySidebar from './CategorySidebar'; 
import './WorkshopBoard.css'; 

const WorkshopBoard = ({ boardId, notes, onAddNote }) => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [showCreateNote, setShowCreateNote] = useState(false);

  const filteredNotes = currentCategory
    ? notes.filter(note => note.category === currentCategory)
    : notes;

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
  };

  const handleAddNote = (newNote) => {
    onAddNote(newNote);
    setShowCreateNote(false); 
  };

  return (
    <div className="workshop-board">
      <CategorySidebar boardId={boardId} onCategorySelect={handleCategoryChange} />

      <CreateStickyNote onAddNote={handleAddNote} activeCategory={currentCategory} />

      {/* Sticky Notes Container */}
      <div className="sticky-notes-container">
        <h2>{currentCategory ? `${currentCategory} Notes` : 'All Notes'}</h2>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div key={index} className="sticky-note">
              <p>{note.text}</p>
              <p><em>by {note.author}</em></p>
            </div>
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>
    </div>
  );
};

export default WorkshopBoard;