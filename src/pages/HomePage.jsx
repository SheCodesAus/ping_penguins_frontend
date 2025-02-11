import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fireConfetti from "../components/ConfettiComponent.js";
import useAuth from "../hooks/use-auth.js";
import WorkshopAccessCode from '../components/WorkshopAccessCode';

function HomePage() {
    const [workshopCode, setWorkshopCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const handleWorkshopSubmit = async (event) => {
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

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setWorkshopCode(value);
            setError('');
        }
    };

    return (
        <div className="landing-container">
            {showConfetti && <Confetti numberOfPieces={300} gravity={0.5} />}
            
            <section className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">Welcome to Stickybloom! I'm Emma.</h2>
                            <p>
                                I strongly believe every organisation has the capacity to foster a dynamic environment where teams can thrive, and everyone plays a vital role in your success. My goal is to help organisations unlock their full potential and create a culture where that success can flourish.
                            </p>
                            <p>
                                Our approach focuses on the idea that team energy and happiness are key to building a thriving culture. Investing in your people not only boosts employee satisfaction but also drives financial success and positions your company as an industry leader.
                            </p>
                            <p>
                                If you would like to know more, please follow the link to my{" "}
                                <a href="https://crowdbloom.com.au/" target="_blank" rel="noopener noreferrer">
                                    website
                                </a>{" "}
                                to explore how we can work together to help your organisation thrive!
                            </p>
                            <p>To access your workshop, please sign up or log in using your unique link.</p>
                        </div>
                        <div className="about-image-container">
                            <img 
                                src="/images/HomePage_Emma.png" 
                                alt="It's Show Time - Dynamic pose" 
                                className="show-time-image"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Show the workshop access code component only for authenticated users */}
            {auth?.token && (
                <section className="workshop-access-section">
                    <WorkshopAccessCode />
                </section>
            )}
        </div>
    );
}

export default HomePage;




