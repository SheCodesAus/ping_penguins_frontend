import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import postBoard from '../../api/post-board';
import './CreateWorkshopForm.css';

const CreateWorkshopForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        disclaimer: '',
        date_start: new Date().toISOString().slice(0, 16),
        categories: ['']
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const addCategory = () => {
        setFormData(prev => ({
            ...prev,
            categories: [...prev.categories, '']
        }));
    };

    const removeCategory = (index) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter((_, i) => i !== index)
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="workshop-form">
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Workshop Title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <textarea 
                    placeholder="Workshop Description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                    className="form-textarea"
                />
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Disclaimer (Optional)"
                    value={formData.disclaimer}
                    onChange={(e) => setFormData(prev => ({ ...prev, disclaimer: e.target.value }))}
                    className="form-textarea"
                />
            </div>

            <div className="form-group">
                <label>Start Date and Time</label>
                <input
                    type="datetime-local"
                    value={formData.date_start}
                    onChange={(e) => setFormData(prev => ({ ...prev, date_start: e.target.value }))}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                    className="form-input"
                />
                <small className="form-help">Please select the complete date and time when the workshop will start</small>
            </div>

            <div className="create-category-section">
                <h2>Add Categories to Workshop</h2>
                <div className="categories-container">
                    {formData.categories.map((category, index) => (
                        <div key={index} className="category-input-row">
                            <div className="category-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={category}
                                    onChange={(e) => {
                                        const newCategories = [...formData.categories];
                                        newCategories[index] = e.target.value;
                                        setFormData(prev => ({ ...prev, categories: newCategories }));
                                    }}
                                    required
                                    className="form-input workshop-category-input"
                                />
                                {formData.categories.length > 1 && (
                                    <button 
                                        type="button"
                                        onClick={() => removeCategory(index)}
                                        className="remove-category-button"
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                            {index === formData.categories.length - 1 && (
                                <button 
                                    type="button" 
                                    onClick={addCategory} 
                                    className="add-category-button"
                                >
                                    +
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="submit-button">
                Create Workshop
            </button>
        </form>
    );
};

export default CreateWorkshopForm;