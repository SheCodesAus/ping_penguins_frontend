import React, { useState, useEffect } from 'react';
import CreateStickyNote from './CreateStickyNote';
import CategorySidebar from './CategorySidebar'; 
import './WorkshopBoard.css'; 
import './CreateStickyNote.css';
import getUsers from '../../api/get-users';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories = [], title = "Workshop" }) => { 
    const [currentCategory, setCurrentCategory] = useState(null); 
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const fetchedUsers = await getUsers(); 
              console.log('Fetched users: ', fetchedUsers); 
              setUsers(fetchedUsers || []); 
          } catch (err) {
              setError(err.message); 
              console.error("Error fetching users:", err);
          }
      };

      fetchUsers(); 
  }, []); 

    const handleCategoryChange = (category) => {
        setCurrentCategory(category); 
    };

    const handleAddNote = (newNote) => {
        onAddNote(newNote); 
    };

    return (
        <div className="workshop-board">
            <h2 className="workshop-board-title">{title}</h2>
            {error && <div className="error-message">{error}</div>}
            
            <CategorySidebar 
                boardId={boardId} 
                onCategorySelect={handleCategoryChange} 
                categories={categories} 
            />

            <CreateStickyNote 
                onAddNote={handleAddNote} 
                activeCategory={currentCategory} 
            />

            <div className="sticky-notes-container">
                {currentCategory?.notes ? (
                    currentCategory.notes.map((note, index) => {
                        const author = users?.find(user => user.id === note.owner); 
                        return (
                            <div key={index} className="sticky-note">
                                <p>{note.comment}</p>
                                <p><em>by {author ? author.display_name : 'Unknown'}</em></p> 
                            </div>
                        );
                    })
                ) : (
                    <p>No notes available.</p>
                )}
            </div>
        </div>
    );
};

export default WorkshopBoard;