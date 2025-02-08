import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import postNote from '../../api/post-note';
import "./CreateStickyNote.css";
import useAuth from '../../hooks/use-auth';

const CreateStickyNote = ({ onAddNote, activeCategory }) => {
  const { id: boardId } = useParams();
  const { auth } = useAuth();
  const [noteText, setNoteText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
        if (!noteText.trim()) {
            throw new Error("Note text is required");
        }

        if (!activeCategory) {
            throw new Error("Please select a category first");
        }

        const newNote = {
            content: noteText,
            is_anonymous: isAnonymous,
            category_id: activeCategory.id
        };

        await onAddNote(newNote);
        
        // Only clear form and close if no error was thrown
        setNoteText('');
        setIsAnonymous(false);
        setSuccessMessage('Note posted successfully!');
        
        setTimeout(() => {
            setSuccessMessage('');
            onClose && onClose();
        }, 2000);

    } catch (error) {
        console.error('Error submitting note:', error);
        setError(error.message || 'Failed to create note');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)} className="create-note-button">
        +
      </button>

      {showPopup && (
        <div className="create-sticky-note-popup">
          <span 
            className="create-sticky-note-close-popup" 
            onClick={() => setShowPopup(false)}
          >
            ✖
          </span>
          <form onSubmit={handleSubmit} className="create-sticky-note-form">
            <h2>Create a Sticky Note</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="sticky-note-preview">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your sticky note here..."
                required
                className="create-sticky-note-textarea"
                disabled={isSubmitting}
              />
              <div className="note-fold"></div>
            </div>
            <div className="note-options">
              <label className="anonymous-option">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  disabled={isSubmitting}
                />
                Post Anonymously
              </label>
              <p className="author-preview">
                Posting as: <strong>{isAnonymous ? "Anonymous" : auth.display_name}</strong>
              </p>
              {activeCategory && (
                <p className="category-preview">
                  Category: <strong>{activeCategory.title}</strong>
                </p>
              )}
            </div>
            <button 
              type="submit" 
              className="create-sticky-note-form-button"
              disabled={isSubmitting || !activeCategory}
            >
              {isSubmitting ? 'Posting...' : 'Add Sticky Note'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateStickyNote;