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
                console.log('Full board data:', boardData); // Log the entire board data
                
                if (!boardData) {
                    throw new Error('No board data received');
                }

                // Log each field we're trying to set
                console.log('Title:', boardData.title);
                console.log('Categories:', boardData.categories);
                console.log('Notes:', boardData.notes);
                console.log('Date Started:', boardData.date_start);
                console.log('Description:', boardData.description);
                console.log('Disclaimer:', boardData.disclaimer);

                setCategories(boardData.categories || []);
                setNotes(boardData.notes || []);
                setBoardTitle(boardData.title || "Workshop");
                setStartTime(boardData.date_start);
                setBoardDescription(boardData.description || "");
                setBoardDisclaimer(boardData.disclaimer || "");

                console.log('Start time set to:', boardData.date_start); // Debug log
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

    if (showBoard) {
        console.log('Rendering WorkshopBoard...');
        return (
            <div className="workshop-content">
                <WorkshopBoard
                    boardId={boardId}
                    notes={notes}
                    onAddNote={setNotes}
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
