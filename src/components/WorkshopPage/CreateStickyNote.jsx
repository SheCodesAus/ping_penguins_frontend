import { useState } from "react";
import postNote from '../../api/post-note';

function CreateStickyNote(props) {
    const { noteId } = props;

    const [noteData, setNoteData] = useState({
        name: "",
        comment: "",
        note: noteId,
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setNoteData((prevNoteData) => ({
            ...prevNoteData,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (noteData.name && noteData.comment) {
            postNote(
                noteData.name,
                noteData.comment 
            ).then((response) => {
                console.log(response)
            });
        }
    };

    return (
        <form className="form-container">
            <h2 className="form-name">Create a Sticky Note</h2>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Your Name</label>
                <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="Enter your name"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="comment">Comment</label>
                <textarea
                    id="comment"
                    className="form-input"
                    placeholder="comment..."
                    onChange={handleChange}
                    rows="4"
                />
            </div>
            <button type="submit" className="form-button" onClick={handleSubmit}>
                Create Sticky Note
            </button>
        </form>
    );
}
  
export default CreateStickyNote;