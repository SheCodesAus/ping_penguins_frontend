import { useEffect, useState } from 'react';
import useAuth from '../../hooks/use-auth';
import getBoardNotes from '../../api/get-board-notes';
import CreateStickyNote from './CreateStickyNote';
import { Link } from 'react-router-dom';

const WorkshopBoard = ({ boardId, onAddNote, categories, title }) => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    comment: '',
    category: null,
    anonymous: false,
  });
  const [activeCategory, setActiveCategory] = useState(null);
  const [error, setError] = useState(null);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Please log in to view notes');
        }

        const notesData = await getBoardNotes(boardId);
        console.log('Fetched notes for board:', boardId, notesData);
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
        setError(error.message);
      }
    };

    if (boardId) {
      fetchNotes();
    }
  }, [boardId]);

  useEffect(() => {
    console.log('Notes:', notes);
    console.log('Active Category:', activeCategory);
  }, [notes, activeCategory]);

  // Filter notes based on active category
  const filteredNotes = activeCategory 
    ? notes.filter(note => note.category === activeCategory.id)
    : notes;

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Current dropdown state:', isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
    console.log('Toggling dropdown to:', !isDropdownOpen);
  };

  // Add useEffect to monitor state changes
  useEffect(() => {
    console.log('Dropdown state changed to:', isDropdownOpen);
  }, [isDropdownOpen]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setError(null);
    setIsDropdownOpen(false);
  };

  const handleTitleClick = () => {
    setActiveCategory(null);
    setNewNote((prev) => ({ ...prev, category: null }));
    setShowCreateNote(false);
  };

  const handleAddNote = async (noteData) => {
    try {
      console.log('WorkshopBoard handling note:', noteData);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(noteData)
      });

      const responseText = await response.text();
      console.log('Server response:', responseText);

      if (!response.ok) {
        throw new Error(`Server error: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Note created successfully:', data);

      // Update notes state
      setNotes(prevNotes => [...prevNotes, data]);
      return data;

    } catch (error) {
      console.error('Error in handleAddNote:', error);
      throw error; // Propagate error to form
    }
  };

  return (
    <div className="workshop-content">
      {/* Only show for admin users */}
      {auth && auth.is_superuser && (
        <div className="admin-nav">
          <Link to="/admin" className="back-to-admin">
            Back to Admin Dashboard
          </Link>
        </div>
      )}
      
      {/* Mobile dropdown */}
      <div className="board-title-wrapper">
        <div className="board-title-container">
          <div className="title-section">
            <h2>Workshop Note Board</h2>
          </div>
          <div className="button-section">
            <button 
              className={`dropdown-toggle ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Toggle categories"
            >
              ▼
            </button>
          </div>
        </div>
        {isDropdownOpen && (
          <div className="mobile-categories-dropdown">
            {categories.map((category) => (
              <div
                key={category.id}
                className="category-card"
                onClick={() => {
                  handleCategoryClick(category);
                  setIsDropdownOpen(false);
                }}
              >
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {activeCategory && (
        <div className="active-category-indicator">
          Viewing: {activeCategory.title}
          <button className="create-note-btn" onClick={() => setShowCreateNote(true)}>
            Post Note
          </button>
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}
      
      {/* Desktop sidebar */}
      <div className="categories-sidebar">
        <h2>Workshop Notes Board</h2>
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category)}
          >
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
        ))}
      </div>

      <div className="notes-area">
        {showCreateNote && activeCategory && (
          <CreateStickyNote 
            onAddNote={handleAddNote}
            activeCategory={activeCategory}
            onClose={() => setShowCreateNote(false)}
          />
        )}

        <div className="notes-grid">
          {[...filteredNotes]
            .reverse()
            .map((note) => {
              console.log('Note data:', note);
              return (
                <div key={note.id} className={`sticky-note category-${note.category}`}>
                  <div className="note-content">{note.comment}</div>
                  <div className="note-author">
                    - {note.anonymous 
                        ? 'Anonymous' 
                        : note.owner?.display_name || '- User'}
                  </div>
                  <div className="note-category">
                    {categories.find(cat => cat.id === note.category)?.title}
                  </div>
                  <div className="note-fold"></div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default WorkshopBoard;




