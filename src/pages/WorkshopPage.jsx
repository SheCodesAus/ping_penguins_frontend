// WorkshopPage.jsx
import React, { useEffect, useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import getBoard from '../api/get-board';
import { useParams, Link } from 'react-router-dom';
import './WorkshopPage.css';

const WorkshopPage = () => {
    const { boardId } = useParams();
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [boardTitle, setBoardTitle] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [boardDescription, setBoardDescription] = useState("");
    const [boardDisclaimer, setBoardDisclaimer] = useState("");

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await getBoard(boardId);
                console.log('Fetched board data:', boardData);
                setCategories(boardData.categories || []);
                setNotes(boardData.notes || []);
                setBoardTitle(boardData.title || "Workshop");
                setStartTime(boardData.start_time);
                setBoardDescription(boardData.description || "");
                setBoardDisclaimer(boardData.disclaimer || "");
            } catch (err) {
                setError(err.message);
                console.error("Error fetching board data:", err);
            }
        };

        if (boardId) {
            fetchBoardData();
        }
    }, [boardId]);

    // Check if current time is before start time
    const now = new Date();
    const workshopDate = startTime ? new Date(startTime) : null;
    const isBeforeWorkshop = workshopDate ? now < workshopDate : false;

    const handleEnterBoard = () => {
        // Add any logic needed before entering the board
        setShowBoard(true);
    };

    const [showBoard, setShowBoard] = useState(false);

    if (showBoard) {
        return (
            <div className="workshop-content">
                <WorkshopBoard
                    boardId={boardId}
                    notes={notes}
                    onAddNote={setNotes}
                    categories={categories}
                />
            </div>
        );
    }

    return (
        <div className="workshop-page">
            <div className="workshop-header">
                <h1 className="workshop-title">{boardTitle}</h1>
                {isBeforeWorkshop && (
                    <>
                        <h2 className="workshop-subtitle">The Workshop Starts In...</h2>
                        <CountdownTimer startTime={startTime} />
                    </>
                )}
                <div className="board-info">
                    <div className="board-description">
                        <h3>About This Workshop</h3>
                        <p>{boardDescription}</p>
                    </div>
                    <div className="board-disclaimer">
                        <h3>Please Note</h3>
                        <p>{boardDisclaimer}</p>
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
