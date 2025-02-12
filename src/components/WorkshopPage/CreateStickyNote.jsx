import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./CreateStickyNote.css";
import useAuth from '../../hooks/use-auth';

const CreateStickyNote = ({ onAddNote, activeCategory, onClose, notesCount = 0 }) => {
  const { auth } = useAuth();
  const [noteText, setNoteText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate the next note color based on the current notes count
  const getFormColor = () => {
    const colorIndex = (notesCount + 1) % 5; // Match the pattern from your CSS
    const colors = {
      1: '#feff9c', // yellow
      2: '#7afcff', // blue
      3: '#ff7eb9', // pink
      4: '#feff9c', // yellow
      0: '#7afcff'  // blue
    };
    return colors[colorIndex];
  };

  const getFormFoldColor = () => {
    const colorIndex = (notesCount + 1) % 5;
    const colors = {
      1: '#e6e68c', // darker yellow
      2: '#6de6e6', // darker blue
      3: '#e671a7', // darker pink
      4: '#e6e68c', // darker yellow
      0: '#6de6e6'  // darker blue
    };
    return colors[colorIndex];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!noteText.trim()) {
        throw new Error('Note text is required');
      }

      const result = await onAddNote({
        comment: noteText,
        anonymous: isAnonymous,
        category: activeCategory.id
      });

      if (result) {
        setSuccess('Note posted successfully! ✅');
        setNoteText('');
        setIsAnonymous(false);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        throw new Error('Failed to create note - no response from server');
      }
    } catch (error) {
      console.error('Detailed error:', error);
      setError(error.message || 'Failed to create note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formStyle = {
    backgroundColor: getFormColor(),
    '--fold-color': getFormFoldColor()
  };

  return (
    <div className="create-note-modal">
      <form onSubmit={handleSubmit} className="create-note-form" style={formStyle}>
        <button 
          type="button" 
          className="close-button" 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write your note here..."
          required
        />

        <div className="note-signature">
          {!isAnonymous && `- ${auth.user?.display_name || 'User'}`}
          {isAnonymous && '- Anonymous'}
        </div>

        <div className="form-controls">
          <label>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Post anonymously
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Note'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStickyNote;