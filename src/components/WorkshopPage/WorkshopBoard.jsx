import React, { useState } from 'react';
import StickyNote from '../StickyNote';

const WorkshopBoard = ({ activeCategory, notes, onAddNote }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ text: '', author: '' });

  const filteredNotes = notes.filter(note => note.category === activeCategory);

  const handleSubmitNote = (e) => {
    e.preventDefault();
    onAddNote({
      ...newNote,
      category: activeCategory,
      bgColor: 'pink'
    });
    setNewNote({ text: '', author: '' });
    setIsAddingNote(false);
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-lg h-[calc(100vh-12rem)] overflow-hidden flex flex-col">
      <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex items-center relative w-full">
          <h2 className="text-xl font-bold text-gray-800">
            {activeCategory}
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 relative">
        {activeCategory && (
          <div className="fixed-button-container">
            <button 
              onClick={() => setIsAddingNote(true)}
              className="add-note-button"
              aria-label="Add new note"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 5v14m-7-7h14"
                />
              </svg>
            </button>
          </div>
        )}
        <div className="notes-grid">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <StickyNote
                key={`${note.category}-${index}-${note.author}`}
                text={note.text}
                author={note.author}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              {activeCategory ? (
                <>
                  <p className="text-lg mb-2">No notes in this category yet</p>
                  <p className="text-sm">Click the + button to add the first note!</p>
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Add Note Modal */}
      {isAddingNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="sticky-note-modal">
            <form onSubmit={handleSubmitNote}>
              <textarea
                value={newNote.text}
                onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
                placeholder="Write your note here..."
                required
                autoFocus
              />
              <input
                type="text"
                value={newNote.author}
                onChange={(e) => setNewNote({ ...newNote, author: e.target.value })}
                placeholder="Your name"
                required
              />
              <div className="sticky-note-modal-buttons">
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-button"
                >
                  Add Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopBoard;
