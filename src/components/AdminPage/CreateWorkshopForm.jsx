import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postBoard from "../api/post-board.js";

function CreateWorkshopForm() {
    const navigate = useNavigate();  

    const [boardData, setBoardData] = useState({
        title: "",
        description: "",
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setBoardData((prevBoardData) => ({
            ...prevBoardData,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (boardData.title && boardData.description) {
            postBoard(
                boardData.title,
                boardData.description  
            ).then((response) => {
              const id = response.id
              navigate(`board/${id}`) 
            });
        }
    };

    return (
        <form className="form-container">
            <h2 className="form-title">Create a Workshop</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Workshop Title</label>
                <input
                    type="text"
                    id="title"
                    className="form-input"
                    placeholder="Enter your workshop title"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                    id="description"
                    className="form-input"
                    placeholder="Describe your workshop"
                    onChange={handleChange}
                    rows="4"
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Create Workshop
            </button>
        </form>
    );
}
  
export default CreateWorkshopForm;