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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (workshopCode.trim()) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/board/${workshopCode}/`);
                const data = await response.json();

                if (response.ok) {
                    // Fire confetti
                    fireConfetti();
                    
                    // Wait before navigating
                    setTimeout(() => {
                        navigate(`/board/${workshopCode}`);
                    }, 2000);
                } else {
                    throw new Error(data.message || 'Invalid workshop code');
                }
            } catch (err) {
                setError('Invalid workshop code. Please try again.');
                console.error('Error:', err);
            }
        } else {
            setError('Please enter a workshop code.');
        }
    };


    return (
        <div>
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
    );
};

export default WorkshopAccessCode;