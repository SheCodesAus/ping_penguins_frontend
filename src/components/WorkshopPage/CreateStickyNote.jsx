import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./CreateStickyNote.css";
import useAuth from '../../hooks/use-auth';

const CreateStickyNote = ({ onAddNote, activeCategory, onClose }) => {
  const { auth } = useAuth();
  const [noteText, setNoteText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      if (!noteText.trim()) {
        throw new Error('Note text is required');
      }

      // Log the data we're about to send
      console.log('Submitting note with data:', {
        comment: noteText,
        anonymous: isAnonymous,
        category: activeCategory.id
      });

      const result = await onAddNote({
        comment: noteText,
        anonymous: isAnonymous,
        category: activeCategory.id
      });
      
      console.log('Response from onAddNote:', result);

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

  return (
    <div className="create-note-modal">
      <form onSubmit={handleSubmit} className="create-note-form">
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