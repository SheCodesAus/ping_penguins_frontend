import React, { useState } from 'react';
import CreateWorkshopForm from '../components/AdminPage/CreateWorkshopForm';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

import deleteBoard from '../api/delete-board';
import deleteUser from '../api/delete-user';
import getUsers from '../api/get-users';


const AdminPage = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [users, setUsers] = useState([]);
    const { user, isLoading, error } = useCurrentUser(auth?.token);
    const [showSuccessMessage, setShowSuccessMessage] = useState('');
    const isAdmin = user?.is_superuser;

    if (!user?.is_superuser) {
        return (
            <div>
                <p>You must be an Admin to view this page.</p>
                <button onClick={() => navigate("/")}>Return Home</button>
            </div>
        );
    }

    if (isLoading) {
        return <p>loading...</p>;
    }

    if (error) {
        return <p>{error.message || "Oops! An error occurred, please try again later."}</p>;
    }

    const handleBoardDelete = async (boardId) => {
        if (isAdmin) {
            if (window.confirm('Are you sure you want to delete this Workshop Board?')) {
                try {
                    await deleteBoard(boardId, auth.token);
                    setShowSuccessMessage('Workshop Deleted Successfully!');
                    setTimeout(() => {
                        setShowSuccessMessage('');
                        navigate(0);  // Refresh the page
                    }, 2000);
                } catch (error) {
                    if (error.message.includes('403')) {
                        alert('Only administrators can delete projects');
                    } else {
                        console.error('Error deleting project:', error);
                        alert('Failed to delete project');
                    }
                }
            }
        } else {
            navigate('/');
        }
    };

    const handleUserDelete = async (userId) => {
        if (isAdmin) {
            if (window.confirm('Are you sure you want to delete this User?')) {
                try {
                    await deleteUser(userId, auth.token);
                    setShowSuccessMessage('User Deleted Successfully!');
                    setTimeout(() => {
                        setShowSuccessMessage('');
                        navigate(0);  // Refresh the page
                    }, 2000);
                } catch (error) {
                    if (error.message.includes('403')) {
                        alert('Only administrators can delete Users');
                    } else {
                        console.error('Error deleting user:', error);
                        alert('Failed to delete user');
                    }
                }
            }
        } else {
            navigate('/delete');
        }
    };

    return (
        <div className="admin-page">
            <h1 className="admin-page">Admin Page</h1>
            <CreateWorkshopForm onCategoriesUpdate={handleCategoriesUpdate} />
    
            {/* Boards and Users Grid */}
            <div className="details-grid">
                {/* Boards Section */}
                <div className="boards-section">
                    <h2>Your Boards</h2>
                    {user.boards.length > 0 ? (
                        <div className="boards-list">
                            {user.boards.map((board) => (
                                <div key={board.id} className="item-card">
                                    <div className="item-content">
                                        <h3>{board.title}</h3>
                                        <p>Created: {new Date(board.date_created).toLocaleString()}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => navigate(`/board/${board.id}`)}>View</button>
                                        <button 
                                            onClick={() => handleBoardDelete(board.id)}
                                            className="delete-button"
                                        >
                                            {isAdmin ? 'Admin Delete' : 'Delete Board'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">You have not created any Workshop boards yet.</p>
                    )}
                </div>
    
                {/* Users Section */}
                <div className="users-section">
                    <h2>Users</h2>
                    {user.users.length > 0 ? (
                        <div className="users-list">
                            {user.users.map((user) => (
                                <div key={user.id} className="item-card">
                                    <div className="item-content">
                                        <p>Username: {user.username}</p>
                                        <p>Display Name: {user.display_name}</p>
                                        <p>Email: {user.email}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button 
                                            onClick={() => handleUserDelete(user.id)}
                                            className="delete-button"
                                        >
                                            {isAdmin ? 'Admin Delete' : 'Delete User'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">No users found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;