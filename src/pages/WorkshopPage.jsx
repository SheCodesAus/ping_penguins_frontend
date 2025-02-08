// WorkshopPage.jsx
import React, { useEffect, useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import getBoard from '../api/get-board';
import { useParams, Link } from 'react-router-dom';


const WorkshopPage = () => {
    const { boardId } = useParams();
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [boardTitle, setBoardTitle] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [boardDescription, setBoardDescription] = useState("");
    const [boardDisclaimer, setBoardDisclaimer] = useState("");
    const [showBoard, setShowBoard] = useState(false);
    const [countdown, setCountdown] = useState('');
    const [workshopStarted, setWorkshopStarted] = useState(false);

    // Add debug logs
    console.log('BoardId:', boardId);
    console.log('ShowBoard:', showBoard);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await getBoard(boardId);
                console.log('Board Data:', boardData); // Debug log
                
                if (!boardData) {
                    throw new Error('No board data received');
                }

                setCategories(boardData.categories || []);
                console.log('Categories set to:', boardData.categories); // Debug log
                setNotes(boardData.notes || []);
                setBoardTitle(boardData.title || "Workshop");
                setStartTime(boardData.date_start);
                setBoardDescription(boardData.description || "");
                setBoardDisclaimer(boardData.disclaimer || "");
            } catch (err) {
                console.error("Error fetching board data:", err);
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
                // If more than 24 hours have passed since start
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

    // Fetch notes when component mounts
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log('Starting to fetch notes. Token exists:', !!token);
                console.log('API URL:', import.meta.env.VITE_API_URL);
                
                const response = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                
                console.log('Fetch response:', response.status);
                const data = await response.json();
                console.log('Fetched notes:', data);
                setNotes(data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        console.log('useEffect triggered with boardId:', boardId);
        if (boardId) {
            fetchNotes();
        }
    }, [boardId]);

    // Add loading state
    if (!boardId) {
        return <div>No board ID provided</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if current time is before start time
    const now = new Date();
    const workshopDate = startTime ? new Date(startTime) : null;
    const isBeforeWorkshop = workshopDate ? now < workshopDate : false;

    // Add debug logs
    console.log('Current time:', now);
    console.log('Workshop date:', workshopDate);
    console.log('Start time (raw):', startTime);
    console.log('Is before workshop:', isBeforeWorkshop);

    const handleEnterBoard = () => {
        console.log('Entering board...');
        setShowBoard(true);
    };

    // Handle adding new note
    const handleAddNote = async (newNote) => {
        try {
            console.log('WorkshopPage: Processing note data:', newNote);
            
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const noteData = {
                comment: newNote.content,
                anonymous: newNote.is_anonymous,
                category: newNote.category_id
            };

            console.log('Sending to API:', noteData);

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
            console.log('Success! Server returned:', data);

            setNotes(prevNotes => [...prevNotes, data]);
            return data;

        } catch (error) {
            console.error('Error in WorkshopPage handleAddNote:', error);
            // Don't rethrow the error, just return null or false
            return null;
        }
    };

    if (showBoard) {
        console.log('Rendering WorkshopBoard...');
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

    console.log('Rendering landing page...');
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
