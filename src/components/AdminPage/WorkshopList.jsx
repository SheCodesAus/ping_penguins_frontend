import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WorkshopList.css';

const WorkshopList = ({ boards, onDelete, categories }) => {
    const navigate = useNavigate();
    const [countdowns, setCountdowns] = useState({});
    const [selectedBoardNotes, setSelectedBoardNotes] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
                            <div className="board-header">
                                <h3>{board.title}</h3>
                                <span className="board-id">ID: {board.id}</span>
                            </div>
                            <p>Created: {new Date(board.created_at).toLocaleString()}</p>
                            <p>Start: {new Date(board.date_start).toLocaleString()}</p>
                            {/* <div className="countdown-timer">
                                <span>Status: </span>
                                <span className={`countdown ${
                                    countdowns[board.id] === 'Workshop in progress' ? 'in-progress' : 'upcoming'
                                }`}>
                                    {countdowns[board.id]}
                                </span>
                            </div> */}
                            <div className="board-url">
                                <span>URL: {`${window.location.origin}/workshop/${board.id}`}</span>
                                <button 
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/workshop/${board.id}`);
                                        alert('Workshop URL copied to clipboard!');
                                    }}
                                    className="copy-url-button"
                                >
                                    Copy
                                </button>
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
                            <Link 
                                to={`/board/${board.id}`} 
                                className="view-button"
                            >
                                View Workshop
                            </Link>
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
        </div>
    );
};

export default WorkshopList; 