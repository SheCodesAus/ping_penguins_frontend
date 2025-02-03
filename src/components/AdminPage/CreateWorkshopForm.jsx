import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import postBoard from '../../api/post-board';

const CreateWorkshopForm = ({ onCategoriesUpdate }) => { 
    const navigate = useNavigate();  

    const [boardData, setBoardData] = useState({
        title: "",
        description: "",
        disclaimer: "",
        date_start: "",
        date_end: "",
        image: "", 
        category1: "", 
        category2: "",
        category3: "", 
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setBoardData((prevBoardData) => ({
            ...prevBoardData,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (boardData.title && boardData.description && boardData.disclaimer && boardData.date_start && boardData.date_end && boardData.category1 && boardData.category2 && boardData.category3) {
            try {
                const categoriesArray = [boardData.category1, boardData.category2, boardData.category3]; 
                const response = await postBoard(
                    boardData.title,
                    boardData.description,
                    boardData.disclaimer,
                    boardData.date_start,
                    boardData.date_end,
                    boardData.image,
                    categoriesArray 
                );

                onCategoriesUpdate(categoriesArray, response.id); 
            } catch (error) {
                console.error('Error creating board:', error);
            }
        } else {
            console.error("All required fields must be filled.");
        }
    };
  
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Create a Workshop</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Workshop Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-input"
                    placeholder="Enter your workshop title"
                    value={boardData.title}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-input"
                    placeholder="Describe your workshop"
                    value={boardData.description}
                    onChange={handleChange}
                    rows="4"
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="disclaimer">Disclaimer</label>
                <input
                    type="text"
                    id="disclaimer"
                    className="form-input"
                    placeholder="Write a disclaimer"
                    value={boardData.disclaimer}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="date_start">Start Date</label>
                <input
                    type="date"
                    id="date_start"
                    className="form-input"
                    value={boardData.date_start}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="date_end">End Date</label>
                <input
                    type="date"
                    id="date_end"
                    className="form-input"
                    value={boardData.date_end}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="image">Workshop Image (optional)</label>
                <input
                    type="url"
                    id="image"
                    className="form-input"
                    placeholder="Enter the URL for your workshop image"
                    value={boardData.image}
                    onChange={handleChange} 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="category1">Category 1</label>
                <input
                    type="text"
                    id="category1"
                    className="form-input"
                    placeholder="Enter first category"
                    value={boardData.category1}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="category2">Category 2</label>
                <input
                    type="text"
                    id="category2"
                    className="form-input"
                    placeholder="Enter second category"
                    value={boardData.category2}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="category3">Category 3</label>
                <input
                    type="text"
                    id="category3"
                    className="form-input"
                    placeholder="Enter third category"
                    value={boardData.category3}
                    onChange={handleChange}
                    required 
                />
            </div>
            <button type="submit" className="form-button">
                Create Workshop
            </button>
        </form>
    );
};

export default CreateWorkshopForm;