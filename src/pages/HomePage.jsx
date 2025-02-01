// import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import "../style.css"; 
import "./HomePage.css";

function HomePage() {
  const [workshopCode, setWorkshopCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      fireConfetti(); // Fire confetti immediately when button is clicked
      setIsLoading(true);
      setError('');

      try {
          // Extract UUID from input
          const code = workshopCode.trim();
          
          // Make API request to Django backend
          const response = await axios.get(`/api/board/${code}/`);

          if (response.data) {
            // Navigate after a slight delay to allow confetti to be visible
            setTimeout(() => {
                navigate(`/workshop/${code}`);
            }, 1000);
        }

          
          // if (response.data) {
          //     // Redirect to workshop page with the UUID
          //     navigate(`/workshop/${code}`);
          // }
      } catch (error) {
          setError(
              error.response?.data?.error || 
              'Unable to access workshop. Please check your code and try again.'
          );
      } finally {
          setIsLoading(false);
      }
  };

  return (
      <div className="landing-container">
          {/* About Me Section */}
          <section className="about-section">
              <div className="about-container">
                  <div className="about-content">
                      <div className="about-text">
                          <h2 className="section-title">Welcome to StickyBloom! I'm Emma.</h2>
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
                        <h2 className="form-title">Ready to Start?</h2>
                        <div className="form-group">
                            <label htmlFor="workshop-code" className="form-label">
                                Enter your unique workshop code to begin your journey
                            </label>
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


