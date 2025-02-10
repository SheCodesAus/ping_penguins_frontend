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
    const [showBoard, setShowBoard] = useState(true);
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
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                // Fetch categories with token
                const categoriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/category/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    console.log('Categories fetched:', categoriesData);
                    setCategories(categoriesData);
                } else {
                    console.error('Failed to fetch categories:', await categoriesResponse.text());
                }

                // Fetch notes with token
                const notesResponse = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Accept': 'application/json'
                    }
                });

                if (notesResponse.ok) {
                    const notesData = await notesResponse.json();
                    console.log('Notes fetched:', notesData);
                    setNotes(notesData);
                } else {
                    console.error('Failed to fetch notes:', await notesResponse.text());
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (boardId) {
            fetchData();
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
    const handleAddNote = async (noteData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Not authenticated');
            }

            // Include all possible fields
            const completeNoteData = {
                comment: noteData.comment,
                anonymous: noteData.anonymous,
                category: noteData.category,
                board: boardId  // Include board ID from params
            };

            console.log('Sending complete note data:', completeNoteData);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/note/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(completeNoteData)
            });

            const responseText = await response.text();
            console.log('Response status:', response.status);
            console.log('Response text:', responseText);

            if (!response.ok) {
                throw new Error(`Failed to create note: ${responseText}`);
            }

            const newNote = JSON.parse(responseText);
            console.log('Note created successfully:', newNote);

            // Update notes state
            setNotes(prevNotes => [...prevNotes, newNote]);

            return newNote;

        } catch (error) {
            console.error('Error in handleAddNote:', error);
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
