import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import useCurrentUser from '../hooks/use-current-user';
import deleteBoard from '../api/delete-board';
import deleteUser from '../api/delete-user';

const CreateWorkshopForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        disclaimer: '',
        date_start: '',
        date_end: '',
        categories: ['']
    });
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
    
        try {
            // Initial login request
            console.log('Starting login process...');
            const response = await postLogin(
                credentials.username,
                credentials.password            
            );
            console.log('Login response:', response);  // Check what we get back from login
    
            if (response.token) {
                // Store token and user ID
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                console.log('Stored in localStorage:', {
                    token: response.token,
                    userId: response.user_id
                });
    
                // Set auth context
                setAuth({
                    token: response.token,
                    userId: response.user_id,  // Make sure we're setting userId in auth
                    is_superuser: response.is_superuser,
                });
                
                // Fetch user details
                console.log('Fetching user details for ID:', response.user_id);
                const user = await getUser(response.user_id);
                console.log('Fetched user details:', user);
    
                if (user?.is_superuser) {
                    console.log('User is superuser, redirecting to admin');
                    navigate("/admin");
                } else {
                    console.log('User is not superuser or undefined:', user);
                    navigate("/");
                }
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please try again.");
        }
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
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <textarea
                    placeholder="Disclaimer (Optional)"
                    value={formData.disclaimer}
                    onChange={(e) => setFormData(prev => ({ ...prev, disclaimer: e.target.value }))}
                    className="form-input"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Start Date</label>
                    <input
                        type="datetime-local"
                        value={formData.date_start}
                        onChange={(e) => setFormData(prev => ({ ...prev, date_start: e.target.value }))}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>End Date</label>
                    <input
                        type="datetime-local"
                        value={formData.date_end}
                        onChange={(e) => setFormData(prev => ({ ...prev, date_end: e.target.value }))}
                        required
                        className="form-input"
                    />
                </div>
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
                            Remove
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

const AdminPage = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    console.log('Auth in AdminPage:', auth); 
    console.log('User ID in AdminPage:', auth?.userId);
    const { user, isLoading, error } = useCurrentUser(auth?.userId); // Ensure you're passing auth.userId here
    console.log('User in AdminPage:', user); 
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const [isCreatingWorkshop, setIsCreatingWorkshop] = useState(false);

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Current token:', token);
        console.log('API URL:', import.meta.env.VITE_API_URL);
    }, []);
    
    if (!user || !user.is_superuser) {
        return (
            <div className="admin-restricted">
                <p>You must be an Admin to view this page.</p>
                <button onClick={() => navigate("/")} className="return-button">
                    Return Home
                </button>
            </div>
        );
    }

    if (isLoading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error.message || "An error occurred, please try again later."}</p>;
    }

    const handleCreateWorkshop = async (formData) => {
        try {
            // Format the data for your API
            const workshopData = {
                title: formData.title,
                description: formData.description,
                disclaimer: formData.disclaimer || '',
                date_start: formData.date_start,
                date_end: formData.date_end,
                categories: formData.categories.map(title => ({ title }))  // Format categories as objects
            };
    
            console.log('Sending data:', workshopData);
    
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }
    
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/board/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Make sure to use the correct token format
                },
                body: JSON.stringify(workshopData)
            });
    
            // Log response for debugging
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
    
            // Only try to parse JSON if we get a successful response
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Authentication failed. Please log in again.');
                }
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error('Failed to create workshop');
            }
    
            const data = await response.json();
            console.log('Success response:', data);
    
            setShowSuccessMessage('Workshop Created Successfully!');
            setIsCreatingWorkshop(false);
    
            // Fetch updated boards instead of page refresh
            const boardsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/board/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (boardsResponse.ok) {
                const updatedBoards = await boardsResponse.json();
                // Update your boards state here
                console.log('Updated boards:', updatedBoards);
            }
    
        } catch (err) {
            console.error('Error creating workshop:', err);
            alert(err.message);
        }
    };

    const handleBoardDelete = async (boardId) => {
        if (window.confirm('Are you sure you want to delete this Workshop Board?')) {
            try {
                await deleteBoard(boardId, auth.token);
                setShowSuccessMessage('Workshop Deleted Successfully!');
                setTimeout(() => {
                    setShowSuccessMessage('');
                    navigate(0);
                }, 2000);
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project');
            }
        }
    };

    const handleUserDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this User?')) {
            try {
                await deleteUser(userId, auth.token);
                setShowSuccessMessage('User Deleted Successfully!');
                setTimeout(() => {
                    setShowSuccessMessage('');
                    navigate(0);
                }, 2000);
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className="admin-container">
            <div className="workshops-section">
                <h1 className="admin-title">Admin Dashboard</h1>
                
                {showSuccessMessage && (
                    <div className="success-message">{showSuccessMessage}</div>
                )}

                <div className="workshop-list">
                    <h2>Workshop Boards</h2>
                    {user.boards?.length > 0 ? (
                        <div className="boards-grid">
                            {user.boards.map((board) => (
                                <div key={board.id} className="board-card">
                                    <div className="board-content">
                                        <h3>{board.title}</h3>
                                        <p>Created: {new Date(board.date_created).toLocaleString()}</p>
                                    </div>
                                    <div className="board-actions">
                                        <button 
                                            onClick={() => navigate(`/workshop/${board.id}`)}
                                            className="view-button"
                                        >
                                            View
                                        </button>
                                        <button 
                                            onClick={() => handleBoardDelete(board.id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">No workshop boards found.</p>
                    )}
                </div>
            </div>

            <div className="create-section">
                <button 
                    onClick={() => setIsCreatingWorkshop(!isCreatingWorkshop)}
                    className="create-workshop-button"
                >
                    {isCreatingWorkshop ? 'Cancel' : 'Create New Workshop'}
                </button>

                {isCreatingWorkshop && (
                    <div className="create-workshop-form">
                        <h2>Create New Workshop</h2>
                        <CreateWorkshopForm onSubmit={handleCreateWorkshop} />
                    </div>
                )}
            </div>
        </div>
    );
};
export default AdminPage;