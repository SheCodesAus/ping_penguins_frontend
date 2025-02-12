import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import CreateWorkshopForm from '../components/AdminPage/CreateWorkshopForm';
import WorkshopList from '../components/AdminPage/WorkshopList';
import deleteBoard from '../api/delete-board';


const AdminPage = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [boards, setBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [isCreatingWorkshop, setIsCreatingWorkshop] = useState(false);
    const [newWorkshopId, setNewWorkshopId] = useState(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/board/`, {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch boards');
                const data = await response.json();
                setBoards(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching boards:', error);
                setError('Failed to load workshops');
                setIsLoading(false);
            }
        };

        fetchBoards();
    }, []);

    if (!auth || !auth.token) {
        return (
            <div className="admin-restricted">
                <p>You must be an Admin to view this page.</p>
                <button onClick={() => navigate("/")} className="return-button">
                    Return Home
                </button>
            </div>
        );
    }

    const handleCreateWorkshop = async (formData) => {
        try {
            const workshopData = {
                title: formData.title,
                description: formData.description,
                disclaimer: formData.disclaimer || '',
                date_start: new Date(formData.date_start).toISOString(),
                image: '',
                categories: formData.categories.map(title => ({ title }))
            };

            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');

            console.log('Current token:', token);
            console.log('API URL:', import.meta.env.VITE_API_URL);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/board/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`  // Changed from Bearer to Token
                },
                body: JSON.stringify(workshopData)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Error response:', errorData);
                
                if (response.status === 401) {
                    throw new Error('Authentication failed. Please log in again.');
                }
                throw new Error(`Failed to create workshop: ${errorData}`);
            }

            const data = await response.json();
            console.log('Success response:', data);
            
            setShowSuccessMessage('Workshop Created Successfully!');
            setNewWorkshopId(data.id);
            setIsCreatingWorkshop(false);
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            console.error('Error creating workshop:', err);
            alert(err.message);
        }
    };

    const copyWorkshopUrl = () => {
        const workshopUrl = `${window.location.origin}/workshop/${newWorkshopId}`;
        navigator.clipboard.writeText(workshopUrl);
        alert('Workshop URL copied to clipboard!');
    };

    const handleBoardDelete = async (boardId) => {
        if (window.confirm('Are you sure you want to delete this workshop?')) {
            try {
                await deleteBoard(boardId, auth.token);
                setShowSuccessMessage('Workshop Deleted Successfully!');
                setTimeout(() => {
                    setShowSuccessMessage('');
                    navigate(0);
                }, 2000);
            } catch (error) {
                console.error('Error deleting workshop:', error);
                alert('Failed to delete workshop');
            }
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="admin-title">Admin Dashboard</h1>
                <button 
                    onClick={() => setIsCreatingWorkshop(!isCreatingWorkshop)}
                    className="create-workshop-button"
                >
                    {isCreatingWorkshop ? 'Back to Workshops' : 'Create New Workshop'}
                </button>
            </div>

            {showSuccessMessage && (
                <div className="success-message">
                    {showSuccessMessage}
                    {newWorkshopId && (
                        <div className="workshop-id-section">
                            <p><strong>Workshop ID:</strong> {newWorkshopId}</p>
                            <p><strong>Workshop URL:</strong></p>
                            <div className="workshop-url-container">
                                <span>{`${window.location.origin}/workshop/${newWorkshopId}`}</span>
                                <button 
                                    onClick={copyWorkshopUrl}
                                    className="copy-button"
                                >
                                    Copy URL
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {isCreatingWorkshop ? (
                <div className="create-workshop-form">
                    <h2>Create New Workshop</h2>
                    <CreateWorkshopForm onSubmit={handleCreateWorkshop} />
                </div>
            ) : (
                <>
                    {isLoading ? (
                        <p className="loading">Loading workshops...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <WorkshopList 
                            boards={boards} 
                            onDelete={handleBoardDelete}
                            categories={boards[0]?.categories || []}
                        />
                    )}
                </>
            )}
        </div>
    </div>
    );
};

export default AdminPage;