import React from 'react';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories, title, date_started }) => {
    console.log('Categories in WorkshopBoard:', categories); // Debug log

    return (
        <div className="workshop-content">
            {/* <div className="workshop-header">
                <h1>{title}</h1>
            </div>
             */}
            <div className="categories-sidebar">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                        <h3>{category.title}</h3>  {/* Changed from name to title */}
                        <p>{category.description}</p>
                    </div>
                ))}
            </div>

            <div className="notes-area">
                {/* Your sticky notes will go here */}
            </div>
        </div>
    );
};

export default WorkshopBoard;