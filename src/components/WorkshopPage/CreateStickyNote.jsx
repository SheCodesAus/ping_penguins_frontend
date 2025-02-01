import React, { useState } from 'react';
import postNote from '../../api/post-note';
import "./CreateStickyNote.css";

const CreateStickyNote = ({ onAddNote, activeCategory }) => {
  const [noteText, setNoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (noteText && author) {
      try {
        const response = await postNote(noteText, false, 'boardId', activeCategory, author);
        onAddNote({
          text: response.comment,
          author: response.name,
          category: activeCategory,
        });
        setNoteText('');
        setAuthor('');
        setShowPopup(false);
      } catch (error) {
        console.error("Error creating sticky note:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)} className="create-note-button">
        +
      </button>

      {showPopup && (
        <div className="create-sticky-note-popup">
          <span className="create-sticky-note-close-popup" onClick={() => setShowPopup(false)}>✖</span>
          <form onSubmit={handleSubmit} className="create-sticky-note-form">
            <h2>Create a Sticky Note</h2>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your sticky note here..."
              required
              className="create-sticky-note-textarea"
            />
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              required
              className="create-sticky-note-author-input"
            />
            <button type="submit" className="create-sticky-note-form-button">
              Add Sticky Note
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateStickyNote;