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
    setSuccessMessage('');
    setIsSubmitting(true);

    if (!noteText.trim()) {
      setError("Note text is required");
      setIsSubmitting(false);
      return;
    }

    if (!activeCategory) {
      setError("Please select a category first");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting note...', {
        noteText,
        isAnonymous,
        boardId,
        categoryId: activeCategory.id
      });

      const response = await postNote(
        noteText,
        isAnonymous,
        boardId,
        activeCategory.id
      );

      console.log('Server response:', response);

      if (!response) {
        throw new Error("No response from server");
      }

      const newNote = {
        id: response.id,
        content: response.comment,
        category_id: activeCategory.id,
        is_anonymous: response.anonymous,
        display_name: response.anonymous ? "Anonymous" : auth.display_name,
        created_at: response.created_at
      };

      console.log('Created new note:', newNote);
      onAddNote(newNote);
      setSuccessMessage('Note posted successfully! Refreshing board...');

      // Reset form after showing success message
      setTimeout(() => {
        setNoteText('');
        setIsAnonymous(false);
        setShowPopup(false);
        setSuccessMessage('');
        // Optionally, you could trigger a board refresh here
      }, 2000);

    } catch (error) {
      console.error("Error creating sticky note:", error);
      setError(error.message || "Failed to create sticky note");
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