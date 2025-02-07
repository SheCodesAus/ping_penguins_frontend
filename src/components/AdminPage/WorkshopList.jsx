import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkshopList.css';

const WorkshopList = ({ boards, onDelete }) => {
    const navigate = useNavigate();
    const [countdowns, setCountdowns] = useState({});

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
                            <p>Start: {new Date(board.date_started).toLocaleString()}</p>
                            <div className="countdown-timer">
                                <span>Status: </span>
                                <span className={`countdown ${
                                    countdowns[board.id] === 'Workshop in progress' ? 'in-progress' : 'upcoming'
                                }`}>
                                    {countdowns[board.id]}
                                </span>
                            </div>
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
                        </div>
                        <div className="board-actions">
                            <button 
                                onClick={() => navigate(`/workshop/${board.id}`)}
                                className="view-button"
                            >
                                View
                            </button>
                            <button 
                                onClick={() => onDelete(board.id)}
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkshopList; 