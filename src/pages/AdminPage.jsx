import React, { useState } from 'react';
import CreateWorkshopForm from '../components/AdminPage/CreateWorkshopForm';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [categories, setCategories] = useState([]); 
    const navigate = useNavigate();

    const handleCategoriesUpdate = (newCategories, newBoardId) => {
        setCategories(newCategories); 
        navigate('/workshop'); 
    };

    return (
        <div className="admin-page">
            <h1 className="text-2xl font-bold mb-6">Admin Page</h1>
            <CreateWorkshopForm onCategoriesUpdate={handleCategoriesUpdate} /> 
        </div>
    );
};

export default AdminPage;