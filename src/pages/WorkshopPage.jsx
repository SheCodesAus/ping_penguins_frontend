import React, { useEffect, useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer';
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';
// import getBoard from '../../api/get-board';
import { useParams } from 'react-router-dom';

const WorkshopPage = () => {
    const { boardId } = useParams(); 
    const [categories, setCategories] = useState([]); 
    const [notes, setNotes] = useState([]); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                const boardData = await getBoard(boardId); 
                setCategories(boardData.categories); 
                setNotes(boardData.notes); 
            } catch (err) {
                setError(err.message); 
                console.error("Error fetching board data:", err);
            }
        };

        if (boardId) {
            fetchBoardData(); 
        }
    }, [boardId]); 

    if (error) {
        return <p>Error fetching board data: {error}</p>; 
    }

    return (
        <div>
            <h1>The Workshop Starts In...</h1>
            <CountdownTimer boardId={boardId} /> 
            <WorkshopBoard 
                boardId={boardId} 
                notes={notes} 
                onAddNote={setNotes} 
                categories={categories} 
            /> 
        </div>
    );
};

export default WorkshopPage;