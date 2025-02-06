import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import postNote from '../../api/post-note';
import "./CreateStickyNote.css";
import useAuth from '../../hooks/use-auth';


const CreateStickyNote = ({ onAddNote, activeCategory }) => {
  const { id: boardId } = useParams();
  const {auth, setAuth} = useAuth();
  const [noteText, setNoteText] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous errors
    setError(null);

    if (!noteText.trim()) {
      setError("Note text is required");
      return;
    }

    try {
      // Attempt to post note with minimal required information
      const response = await postNote(
        noteText, 
        false, 
        boardId,
        activeCategory.id || '01', 
        auth.userId  // Pass null for owner if not sure
      );

      // Verify the response structure
      if (!response) {
        throw new Error("No response from server");
      }

      // Add the note using the response data
      onAddNote({
        text: response.comment || noteText,
        author: "Anonymous", // Default author if not specified
        category: activeCategory || 'default',
      });

      // Reset form
      setNoteText('');
      setShowPopup(false);
    } catch (error) {
      console.error("Error creating sticky note:", error);
      setError(error.message || "Failed to create sticky note");
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
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your sticky note here..."
              required
              className="create-sticky-note-textarea"
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