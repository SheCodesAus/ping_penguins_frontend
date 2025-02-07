import React from 'react';

const WorkshopBoard = ({ boardId, notes, onAddNote, categories, title, date_started }) => {
    return (
        <div className="workshop-content">
            <div className="workshop-header">
                <h1>{title}</h1>
            </div>
            
            <div className="categories-sidebar">
                {categories.map((category, index) => (
                    <div key={category.id} className="category-card">
                        <h3>{category.name}</h3>
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