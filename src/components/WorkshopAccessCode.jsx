import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fireConfetti from './ConfettiComponent';
import useAuth from '../hooks/use-auth';
import './WorkshopAccess.css';

const WorkshopAccessCode = () => {
    const [workshopCode, setWorkshopCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            if (!auth?.token) {
                throw new Error('Please log in to access the workshop');
            }

            // First try to interpret input as a board ID
            if (!isNaN(workshopCode)) {
                // If input is a number, try accessing directly by ID
                const boardResponse = await fetch(`${import.meta.env.VITE_API_URL}/board/${workshopCode}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${auth.token}`
                    }
                });

                if (boardResponse.ok) {
                    // If board exists with this ID, trigger confetti and navigate
                    fireConfetti();
                    navigate(`/board/${workshopCode}`);
                    return;
                }
            }

            // If not a valid ID or board not found, try as a code
            const boardsResponse = await fetch(`${import.meta.env.VITE_API_URL}/board/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${auth.token}`
                }
            });

            if (!boardsResponse.ok) {
                throw new Error('Failed to fetch boards');
            }

            const boards = await boardsResponse.json();
            const board = boards.find(board => board.code === workshopCode);
            
            if (!board) {
                throw new Error('Workshop not found');
            }

            // Trigger confetti and navigate to the board using its ID
            fireConfetti();
            navigate(`/board/${board.id}`);
        } catch (error) {
            console.error('Error:', error);
            setError('Invalid workshop code or ID. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="page-container">
            <div className="content-wrap">
                {auth?.token ? (
                    <section className="workshop-access-section">
                        <div className="workshop-access-container">
                            <form className="workshop-access-form" onSubmit={handleSubmit}>
                                <h2 className="workshop-access-form-title">
                                    Enter your unique workshop code to begin your journey
                                </h2>
                                <div className="workshop-access-form-group">
                                    <input
                                        type="text"
                                        id="workshop-code"
                                        className="workshop-access-form-input"
                                        value={workshopCode}
                                        onChange={(e) => setWorkshopCode(e.target.value)}
                                        placeholder="Enter your code"
                                        required
                                    />
                                </div>
                                {error && <div className="workshop-access-error-message">{error}</div>}
                                <button
                                    type="submit"
                                    className="workshop-access-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Loading...' : 'Enter Workshop'}
                                </button>
                            </form>
                        </div>
                    </section>
                ) : (
                    <div className="login-prompt">
                        <p>Please log in to join a workshop</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="login-button"
                        >
                            Log In
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkshopAccessCode;