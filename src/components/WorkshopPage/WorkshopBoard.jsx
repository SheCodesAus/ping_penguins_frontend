import React, { useState } from 'react';
import useAuth from '../../hooks/use-auth';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories, title }) => {
    const { auth } = useAuth();
    const [newNote, setNewNote] = useState({
        content: '',
        categoryId: null,
        isAnonymous: false
    });

    const handleAddNote = (e) => {
        e.preventDefault();
        if (!newNote.content.trim() || !newNote.categoryId) return;
        
        onAddNote({
            content: newNote.content,
            category_id: newNote.categoryId,
            board_id: boardId,
            is_anonymous: newNote.isAnonymous,
            user_id: auth.userId
        });

        setNewNote({
            content: '',
            categoryId: null,
            isAnonymous: false
        });
    };

    return (
        <div className="workshop-content">
            <div className="workshop-header">
                <h1>{title}</h1>
            </div>
            
            <div className="categories-sidebar">
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
                    {notes.map((note) => (
                        <div key={note.id} className="sticky-note">
                            <div className="note-content">{note.content}</div>
                            <div className="note-author">
                                {note.is_anonymous ? 'Anonymous' : note.display_name}
                            </div>
                            <div className="note-fold"></div>
                        </div>
                    ))}
                </div>
            </div>
            {/* <div className="sticky-note-creator" style={{position: 'relative', zIndex: 1000}}>
                <CreateStickyNote 
                    onAddNote={onAddNote} 
                    activeCategory={activeCategory}
                />
            </div> */}
        </div>
    );
};

export default WorkshopBoard;