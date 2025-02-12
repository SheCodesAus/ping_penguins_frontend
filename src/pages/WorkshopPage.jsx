// WorkshopPage.jsx
import React, { useEffect, useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import getBoard from '../api/get-board';
import { useParams, Link } from 'react-router-dom';
import CreateStickyNote from '../components/WorkshopPage/CreateStickyNote';

const WorkshopPage = () => {
    const { boardId } = useParams();
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [boardTitle, setBoardTitle] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [boardDescription, setBoardDescription] = useState("");
    const [boardDisclaimer, setBoardDisclaimer] = useState("");
    const [showBoard, setShowBoard] = useState(false);  // Set to false to show the landing page first
    const [countdown, setCountdown] = useState('');
    const [workshopStarted, setWorkshopStarted] = useState(false);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await getBoard(boardId);
                if (!boardData) {
                    throw new Error('No board data received');
                }

                setCategories(boardData.categories || []);
                setNotes(boardData.notes || []);
                setBoardTitle(boardData.title || "Workshop");
                setStartTime(boardData.date_start);
                setBoardDescription(boardData.description || "");
                setBoardDisclaimer(boardData.disclaimer || "");
            } catch (err) {
                setError(err.message);
            }
        };

        if (boardId) {
            fetchBoardData();
        }
    }, [boardId]);

    useEffect(() => {
        if (!startTime) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const startDate = new Date(startTime).getTime();
            const timeLeft = startDate - now;
            const hoursPassed = (now - startDate) / (1000 * 60 * 60);

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

                setCountdown(`${days} days ${hours} hours ${minutes} min`);
                setWorkshopStarted(false);
            } else {
                if (hoursPassed > 24) {
                    setCountdown('Workshop has ended');
                } else {
                    setCountdown('Workshop in progress');
                }
                setWorkshopStarted(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime]);

    const handleEnterBoard = () => {
        setShowBoard(true); // Set to true when entering the board
    };

    // Handle adding new note
    const handleAddNote = async (noteData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Not authenticated');
        }

        const completeNoteData = {
            comment: noteData.comment,
            anonymous: noteData.anonymous,
            category: noteData.category,
            board: boardId
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify(completeNoteData)
        });

        if (response.ok) {
            const newNote = await response.json();
            setNotes(prevNotes => [...prevNotes, newNote]);
            return newNote;
        } else {
            const responseText = await response.text();
            console.error('Failed to create note:', responseText);
            return null;
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!boardId) {
        return <div>No board ID provided</div>;
    }

    if (showBoard) {
        return (
            <div className="workshop-content">
                <WorkshopBoard
                    boardId={boardId}
                    notes={notes}
                    onAddNote={handleAddNote}
                    categories={categories}
                    title={boardTitle}
                    date_started={startTime}
                />
            </div>
        );
    }

    return (
        <div className="workshop-page">
            <div className="workshop-header">
                <h1 className="workshop-title">{boardTitle || 'Loading...'}</h1>
                <h2 className="workshop-subtitle">The Workshop Starts In...</h2>
                <CountdownTimer startTime={startTime} />
                <div className="board-info">
                    <div className="board-description">
                        <h3>About This Workshop</h3>
                        <p>{boardDescription || 'Loading...'}</p>
                    </div>
                    <div className="board-disclaimer">
                        <h3>Please Note</h3>
                        <p>{boardDisclaimer || 'Loading...'}</p>
                    </div>
                    <button 
                        className="enter-board-button"
                        onClick={handleEnterBoard}
                    >
                        Enter Workshop Board
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkshopPage;
