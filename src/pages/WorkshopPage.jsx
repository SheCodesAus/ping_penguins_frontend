import React, { useState } from 'react';
import CountdownTimer from '../components/WorkshopPage/CountdownTimer'
import WorkshopBoard from '../components/WorkshopPage/WorkshopBoard';

const WorkshopPage = () => {
  const [notes, setNotes] = useState([]);

  const handleAddNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div className="workshop-page">
      <h1 className="text-2xl font-bold mb-6">The Workshop Starts In...</h1>

      <CountdownTimer boardId={"1"} />
      {/* please add in UUID to link board route, instead of 1 */}
    
      <WorkshopBoard boardId="1" notes={notes} onAddNote={handleAddNote} />
    </div>
  );
};

export default WorkshopPage;
