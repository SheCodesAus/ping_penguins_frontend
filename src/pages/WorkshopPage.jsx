// WorkshopPage.jsx
import React, { useEffect, useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
import getBoard from '../api/get-board';
import { useParams, Link } from 'react-router-dom';
import './WorkshopPage.css';

const WorkshopPage = () => {
    const { boardId } = useParams(); // Get the boardId from URL params
    const [categories, setCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                // Fetch board data using the dynamic boardId
                const boardData = await getBoard(boardId); // Use boardId here
                console.log('Fetched board data:', boardData);
                setCategories(boardData.categories || []);
                setNotes(boardData.notes || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching board data:", err);
            }
        };

        if (boardId) { // Make sure the boardId exists before fetching data
            fetchBoardData();
        }
    }, [boardId]); // Trigger the effect when boardId changes

    if (error) {
        return <div className="error-container">{error}</div>;
    }

    return (
        <div className="workshop-page">
            <div className="workshop-header">
                <h1 className="workshop-title">The Workshop Starts In...</h1>
                <CountdownTimer boardId={boardId} />
                <div className="workshop-info">
                    <p> Ready to enhance your team culture?</p>
                    <Link to={`/workshoplanding/`} className="workshop-link">
                        Learn more about StickyBloom workshops
                    </Link>
                </div>
            </div>

            <div className="workshop-content">
                <WorkshopBoard
                    boardId={boardId} // Pass the dynamic boardId here
                    notes={notes}
                    onAddNote={setNotes}
                    categories={categories}
                />
            </div>
        </div>
    );
};

export default WorkshopPage;
