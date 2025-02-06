import React, { useState, useEffect } from 'react';
import CreateStickyNote from './CreateStickyNote';
import CategorySidebar from './CategorySidebar'; 
import './WorkshopBoard.css'; 
import './CreateStickyNote.css';
import getUsers from '../../api/get-users';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories = [] }) => { 
    const [currentCategory, setCurrentCategory] = useState(null); 
    const [users, setUsers] = useState();
    
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              const fetchedUsers = await getUsers(); 
              console.log('Fetched users: ', fetchedUsers); 
              setUsers(fetchedUsers || []); 
          } catch (err) {
              setError(err.message); 
              console.error("Error fetching board data:", err);
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
debugger
    return (
        <div className="workshop-board">
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
                        // Find the user object by ID
                        const author = users.find(user => user.id === note.owner); 
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