import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Add this import
import confetti from 'canvas-confetti';
import "../style.css"; 
import "./HomePage.css";

function HomePage() {
  const [workshopCode, setWorkshopCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isValidUUID = (uuid) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
};

  // Define colors for confetti
  const colors = [
    '#F613A5', 
    '#FFC0E9', // Light pink
    '#FF69B4', // Hot pink
    '#ffffff', // White for contrast
  ];

  const fireConfetti = () => {
    // Fire confetti from the left edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.1, y: 0.5 },
      colors: colors,
      startVelocity: 30,
      gravity: 0.8,
      shapes: ['circle', 'square'],
      ticks: 300
    });

    // Fire confetti from the right edge
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.9, y: 0.5 },
      colors: colors,
      startVelocity: 30,
      gravity: 0.8,
      shapes: ['circle', 'square'],
      ticks: 300
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Array of valid test codes
//     const validCodes = ['test123', 'demo456', 'workshop789'];
    
//     if (validCodes.includes(workshopCode.trim())) {
//         fireConfetti();
//         setTimeout(() => {
//             navigate(`/workshop/${workshopCode}`);
//         }, 1000);
//     } else {
//         setError('Invalid workshop code. Please try again.');
//     }
//     setIsLoading(false);
// };

const code = workshopCode.trim();

        // First check if it's a valid UUID format
        if (!isValidUUID(code)) {
            setError('Invalid workshop code format');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`/api/board/${code}/`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Invalid workshop code. Please check your code and try again');
            }

            // Valid UUID and successful response
            fireConfetti();
            setTimeout(() => {
                navigate(`/workshop/${code}`);
            }, 1000);
            
        } catch (error) {
            setError('Unable to access workshop. Please check your code and try again.');
        } finally {
            setIsLoading(false);
        }
    };

const handleInputChange = (e) => {
  setWorkshopCode(e.target.value);
  setError(''); // Clear error when input changes
};


  return (
      <div className="landing-container">
        {/* Custom Navbar */}
        <nav className="home-navbar">
    <div className="nav-container">
        <div className="nav-logo">
            <img src="/img/Stickybloomlogo.png" alt="StickyBloom Logo" />
        </div>
        
        <div id="rotate-words">
            <div>Energising Cultures</div>
            <div>Elevating Happiness</div>
            <div>Bespoke Culture Strategies</div>
            <div>Unforgettable Workplace Experiences</div>
        </div>
        
        <div className="nav-right"></div>
    </div>
</nav>
          {/* About Me Section */}
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
                          <p>If you are one of my lucky clients, insert your unique link below to access the workshop and let the magic happen!</p>
                      </div>
                      <div className="about-image-container">
                          <img 
                              src="./img/HomePage_Emma.png" 
                              alt="It's Show Time - Dynamic pose" 
                              className="show-time-image"
                          />
                      </div>
                  </div>
              </div>
          </section>

          {/* Workshop Access Section */}
          <section className="workshop-section">
                <div className="workshop-container">
                    <form className="workshop-form" onSubmit={handleSubmit}>
                        <h2 className="form-title">Enter your unique workshop code to begin your journey</h2>
                        <div className="form-group">
                            <input
                                type="text"
                                id="workshop-code"
                                className="form-input"
                                value={workshopCode}
                                onChange={(e) => setWorkshopCode(e.target.value)}
                                placeholder="Enter your code"
                                required
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Access'}
                        </button>
                    </form>
                </div>
            </section>
      </div>
  );
}

export default HomePage;


