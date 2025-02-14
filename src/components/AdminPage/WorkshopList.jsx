import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WorkshopList.css';

const WorkshopList = ({ boards, onDelete, categories }) => {
    const navigate = useNavigate();
    const [countdowns, setCountdowns] = useState({});
    const [selectedBoardNotes, setSelectedBoardNotes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingBoard, setEditingBoard] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [showEditModal, setShowEditModal] = useState(false);
    const [board, setBoard] = useState(null);

    useEffect(() => {
        // Add this line to see the date format
        console.log('Board dates:', boards?.map(board => ({
            title: board.title,
            date_started: board.date_started
        })));

        const timer = setInterval(() => {
            const newCountdowns = {};
            boards?.forEach(board => {
                const now = new Date().getTime();
                const startDate = new Date(board.date_started).getTime();
                const timeLeft = startDate - now;

                if (timeLeft > 0) {
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                    newCountdowns[board.id] = `${days}d ${hours}h ${minutes}m`;
                } else {
                    newCountdowns[board.id] = 'Workshop in progress';
                }
            });
            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(timer);
    }, [boards]);

    const handleViewNotes = async (boardId) => {
        setIsLoading(true);
        setError(null);
        try {
    
            const boardResponse = await fetch(`${import.meta.env.VITE_API_URL}/board/${boardId}/`, {
                headers: {
                    'Authorization': `Token ${window.localStorage.getItem('token')}`,
                },
            });

            if (!boardResponse.ok) {
                throw new Error('Failed to fetch board data');
            }

            const boardData = await boardResponse.json();
            console.log('Board data:', boardData);

        
            const notesResponse = await fetch(`${import.meta.env.VITE_API_URL}/board/${boardId}/notes/`, {
                headers: {
                    'Authorization': `Token ${window.localStorage.getItem('token')}`,
                },
            });

            if (!notesResponse.ok) {
                throw new Error('Failed to fetch notes');
            }

            const notesData = await notesResponse.json();
            console.log('Notes data:', notesData);

            setSelectedBoardNotes({
                boardId: boardId,
                notes: notesData,
                categories: boardData.categories || [] // Get categories from board data
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Failed to fetch notes. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (board) => {
        console.log('Board data:', board);
        console.log('Board categories:', board.categories);
        console.log('Available categories:', categories);

        setEditingBoard(board.id);
        setEditedValues({
            title: board.title,
            description: board.description,
            date_start: board.date_start,
            disclaimer: board.disclaimer,
            code: board.code,
            categories: board.categories.map(cat => cat.id)
        });
        setShowEditModal(true);
        setBoard(board);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/board/${editingBoard}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${window.localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    ...editedValues,
                    categories: board.categories
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update board');
            }

            window.location.reload();
            handleCloseModal();
        } catch (error) {
            console.error('Error updating board:', error);
            alert('Failed to update workshop');
        }
    };

    const handleCloseModal = () => {
        setShowEditModal(false);
        setEditingBoard(null);
        setEditedValues({});
        setBoard(null);
    };

    if (!boards?.length) {
        return <p className="empty-message">No workshop boards found.</p>;
    }

    const sortedBoards = [...boards].sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
    );

    return (
        <div className="workshop-list">
            <h2>Workshop Boards</h2>
            <div className="boards-grid">
                {sortedBoards.map((board) => (
                    <div key={board.id} className="board-card">
                        <div className="board-content">
                            <h3>{board.title}</h3>
                            <p>Board ID: {board.id}</p>
                            <p>Start: {new Date(board.date_start).toLocaleString()}</p>
                            <button 
                                onClick={() => handleEdit(board)}
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <div className="workshop-details">
                                <div className="board-url">
                                    <h4>Workshop Code</h4>
                                    <span>{board.code}</span>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(board.code);
                                            alert('Workshop Code copied to clipboard!');
                                        }}
                                        className="copy-url-button"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                            
                            {selectedBoardNotes && selectedBoardNotes.boardId === board.id && (
                                <div className="notes-preview">
                                    <h4>Workshop Notes</h4>
                                    {selectedBoardNotes.notes && selectedBoardNotes.notes.length > 0 ? (
                                        <div className="notes-list">
                                            {selectedBoardNotes.notes.map((note, index) => {
                                                const categoryTitle = selectedBoardNotes.categories?.find(
                                                    cat => Number(cat.id) === Number(note.category)
                                                )?.title;
                                                
                                                return (
                                                    <div key={index} className="note-item">
                                                        <p><strong>Author:</strong> {note.anonymous 
                                                            ? 'Anonymous' 
                                                            : note.owner?.display_name || '- User'}
                                                        </p>
                                                        <p><strong>Category:</strong> {categoryTitle || 'Uncategorized'}</p>
                                                        <p><strong>Created:</strong> {new Date(note.created_at).toLocaleString()}</p>
                                                        {note.comment && <p><strong>Comment:</strong> {note.comment}</p>}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p>No notes found for this workshop.</p>
                                    )}
                                    <button 
                                        onClick={() => setSelectedBoardNotes(null)}
                                        className="close-notes-button"
                                    >
                                        Close Notes
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="board-actions">
                            <button 
                                onClick={() => {
                                    // Store current superuser status in localStorage if it's not already there
                                    if (!window.localStorage.getItem('isSuperuser')) {
                                        window.localStorage.setItem('isSuperuser', 'true');
                                    }
                                    navigate(`/board/${board.id}`, { 
                                        state: { 
                                            isSuperuser: true,
                                            fromAdmin: true  // Add this flag to indicate coming from admin panel
                                        }
                                    });
                                }}
                                className="view-button"
                            >
                                View Workshop
                            </button>
                            <button 
                                onClick={() => handleViewNotes(board.id)}
                                className="view-notes-button"
                                disabled={isLoading}
                            >
                                {isLoading && selectedBoardNotes?.boardId === board.id ? 'Loading...' : 'View Notes'}
                            </button>
                            <button 
                                onClick={() => onDelete(board.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                        {error && selectedBoardNotes?.boardId === board.id && (
                            <div className="error-message">{error}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Workshop</h2>
                        <div className="modal-form">
                            <div className="form-group">
                                <label>Board ID:</label>
                                <input
                                    type="text"
                                    value={editingBoard}
                                    disabled
                                    className="disabled-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Title:</label>
                                <input
                                    type="text"
                                    value={editedValues.title}
                                    onChange={(e) => setEditedValues({
                                        ...editedValues,
                                        title: e.target.value
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Start Date:</label>
                                <input
                                    type="datetime-local"
                                    value={editedValues.date_start?.slice(0, 16)}
                                    onChange={(e) => setEditedValues({
                                        ...editedValues,
                                        date_start: e.target.value
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Categories:</label>
                                <div className="categories-list">
                                    {board?.categories?.map(category => (
                                        <div key={category.id} className="category-item">
                                            <input
                                                type="text"
                                                value={category.title}
                                                onChange={(e) => {
                                                    // Handle category name edit
                                                    const updatedCategories = board.categories.map(cat =>
                                                        cat.id === category.id ? { ...cat, title: e.target.value } : cat
                                                    );
                                                    setBoard({ ...board, categories: updatedCategories });
                                                }}
                                            />
                                            <button 
                                                onClick={() => {
                                                    // Handle category removal
                                                    const updatedCategories = board.categories.filter(cat => cat.id !== category.id);
                                                    setBoard({ ...board, categories: updatedCategories });
                                                }}
                                                className="remove-category-btn"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => {
                                            // Handle adding new category
                                            const newCategory = {
                                                id: Date.now(), // Temporary ID
                                                title: 'New Category',
                                                board: board.id
                                            };
                                            setBoard({
                                                ...board,
                                                categories: [...board.categories, newCategory]
                                            });
                                        }}
                                        className="add-category-btn"
                                    >
                                        Add New Category
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea
                                    value={editedValues.description}
                                    onChange={(e) => setEditedValues({
                                        ...editedValues,
                                        description: e.target.value
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Disclaimer:</label>
                                <textarea
                                    value={editedValues.disclaimer}
                                    onChange={(e) => setEditedValues({
                                        ...editedValues,
                                        disclaimer: e.target.value
                                    })}
                                />
                            </div>
                            <div className="modal-actions">
                                <button onClick={handleSave}>Save Changes</button>
                                <button onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkshopList; 