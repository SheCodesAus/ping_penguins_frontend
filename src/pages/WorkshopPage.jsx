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

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await getBoard(1);
                console.log('Fetched board data:', boardData);
                setCategories(boardData.categories || []);
                setNotes(boardData.notes || []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching board data:", err);
            }
        };

        fetchBoardData();
    }, []);

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
                <Link to={`/workshoplanding/${boardId}`} className="workshop-link">
                     Learn more about StickyBloom workshops
                </Link>
            </div>
        </div>

            <div className="workshop-content">
                <WorkshopBoard
                    boardId={1}
                    notes={notes}
                    onAddNote={setNotes}
                    categories={categories}
                />
            </div>
        </div>
    );
};

export default WorkshopPage;