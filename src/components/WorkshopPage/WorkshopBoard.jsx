import React, { useState } from 'react';
import useAuth from '../../hooks/use-auth';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories, title }) => {
    const { auth } = useAuth();
    const [newNote, setNewNote] = useState({
        content: '',
        categoryId: null,
        isAnonymous: false
    });
    const [activeCategory, setActiveCategory] = useState(null);
    const [error, setError] = useState(null);
    const [showCreateNote, setShowCreateNote] = useState(false);

    // Debug logs
    console.log('All notes:', notes);

    const handleCategoryClick = (category) => {
        if (activeCategory?.id === category?.id) {
            setActiveCategory(null);
        } else {
            setActiveCategory(category);
        }
    };

    const handleAddNote = async (noteData) => {
        try {
            // Prevent default form submission behavior
            console.log('Submitting note:', noteData);
            
            // Add board ID to the note data
            const noteWithBoard = {
                ...noteData,
                board: boardId
            };

            // Call the parent's onAddNote but don't let errors propagate up
            const result = await onAddNote(noteWithBoard).catch(error => {
                console.error('Error adding note:', error);
                setError('Failed to create note. Please try again.');
                return null;
            });

            if (result) {
                setShowCreateNote(false); // Only close on success
                setError(null);
            }
        } catch (error) {
            console.error('Error in handleAddNote:', error);
            setError('Failed to create note. Please try again.');
        }
    };

    return (
        <div className="workshop-content">
            <div className="workshop-header">
                <h2 
                    className="notes-board-title"
                    onClick={() => setActiveCategory(null)}
                >
                    Notes Board
                </h2>
                {activeCategory && (
                    <div className="active-category-indicator">
                        Viewing: {activeCategory.title}
                        <button 
                            className="create-note-btn"
                            onClick={() => setShowCreateNote(true)}
                        >
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
            </div>

            <div className="categories-sidebar">
                <div
                    className ="workshop-noteBoard">
                    <h2>Workshop Note Board</h2>
                
                    
                </div>
                {categories.map((category) => (
                    <div 
                        key={category.id} 
                        className={`category-card ${newNote.categoryId === category.id ? 'selected' : ''}`}
                        onClick={() => setNewNote(prev => ({ ...prev, categoryId: category.id }))}
                    >
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>

            <div className="notes-area">
                <form onSubmit={handleAddNote} className="add-note-form">
                    <textarea
                        value={newNote.content}
                        onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your note here..."
                        required
                    />
                    <div className="note-form-options">
                        <label>
                            <input
                                type="checkbox"
                                checked={newNote.isAnonymous}
                                onChange={(e) => setNewNote(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                            />
                            Post Anonymously
                        </label>
                    </div>
                    <button type="submit" disabled={!newNote.categoryId || !newNote.content.trim()}>
                        Add Note
                    </button>
                </form>

                <div className="notes-grid">
                    {(activeCategory ? notes.filter(note => note.category === activeCategory.id) : notes)
                        .map((note) => (
                            <div 
                                key={note.id} 
                                className={`sticky-note category-${note.category}`}
                            >
                                <div className="note-content">{note.comment}</div>
                                <div className="note-author">
                                    {note.anonymous ? 'Anonymous' : note.owner?.display_name}
                                </div>
                                <div className="note-category">
                                    {categories.find(cat => cat.id === note.category)?.title}
                                </div>
                                <div className="note-fold"></div>
                            </div>
                        ))}
                </div>
            </div>

            {showCreateNote && activeCategory && (
                <CreateStickyNote 
                    onAddNote={handleAddNote}
                    activeCategory={activeCategory}
                    boardId={boardId}
                    onClose={() => setShowCreateNote(false)}
                />
            )}
        </div>
    );
};

export default WorkshopBoard;