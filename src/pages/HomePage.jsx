import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios'; // Add this import
import confetti from 'canvas-confetti';
import "../style.css"; 
import "./HomePage.css";

// function HomePage() {
//   const [workshopCode, setWorkshopCode] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();


//   // Define colors for confetti
//   const colors = [
//     '#F613A5', 
//     '#FFC0E9', // Light pink
//     '#FF69B4', // Hot pink
//     '#ffffff', // White for contrast
//   ];

//   const fireConfetti = () => {
//     // Fire confetti from the left edge
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { x: 0.1, y: 0.5 },
//       colors: colors,
//       startVelocity: 30,
//       gravity: 0.8,
//       shapes: ['circle', 'square'],
//       ticks: 300
//     });

//     // Fire confetti from the right edge
//     confetti({
//       particleCount: 100,
//       spread: 70,
//       origin: { x: 0.9, y: 0.5 },
//       colors: colors,
//       startVelocity: 30,
//       gravity: 0.8,
//       shapes: ['circle', 'square'],
//       ticks: 300
//     });
//   };

//   const handleChange = (event) => {
//     setWorkshopCode(event.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submit button clicked!");
//     setIsLoading(true);
//     setError('');

//     // Array of valid test codes
// //     const validCodes = ['test123', 'demo456', 'workshop789'];
    
// //     if (validCodes.includes(workshopCode.trim())) {
// //         fireConfetti();
// //         setTimeout(() => {
// //             navigate(`/workshop/${workshopCode}`);
// //         }, 1000);
// //     } else {
// //         setError('Invalid workshop code. Please try again.');
// //     }
// //     setIsLoading(false);
// // };

// const boardId = workshopCode.trim();
// console.log("Board ID:", boardId);

//         // if it's a valid ID
//         // if (isNaN(boardId)) {
//         //     setError('Invalid board ID format');
//         //     setIsLoading(false);
//         //     return;
//         // }

//         try {
//             console.log('Attempting to fetch board with ID:', boardId);
//             const response = await fetch(`/api/board/${boardId}/`);
//             // const data = await response.json();

//             if (!response.ok) {
                
//                 const data = await response.json();
//                 console.error("Error Response:", data);
//                 throw new Error(data.error || 'Invalid workshop code. Please check your code and try again');
//             }

//             const data = await response.json();
//             console.log('Board Data:', data);

//             // Valid BoardID and successful response
//             fireConfetti();
//             setTimeout(() => {
//                 navigate(`/workshoplanding/${boardId}`);
//             }, 1000);
            
//         } catch (error) {
//             setError('Unable to access workshop. Please check your code and try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

// const handleInputChange = (e) => {
//   setWorkshopCode(e.target.value);
//   setError(''); // Clear error when input changes
// };

function HomePage() {
    const [workshopCode, setWorkshopCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const colors = [
        '#F613A5', 
        '#FFC0E9',
        '#FF69B4',
        '#ffffff',
    ];

    const fireConfetti = () => {
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

        const boardId = workshopCode.trim();

        // Validate if input is a number
        if (!boardId || isNaN(boardId)) {
            setError('Please enter a valid workshop code (numbers only)');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://sticky-bloom-3855ad75260f.herokuapp.com/board/${boardId}/`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Workshop not found');
            }

            // Successful access
            fireConfetti();
            
            // Navigate to workshop page after confetti
            setTimeout(() => {
                navigate(`/workshop/${boardId}`);
            }, 1000);

        } catch (error) {
            console.error('Error accessing workshop:', error);
            setError('Workshop not found. Please check your code.');
        } finally {
            setIsLoading(false);
        }
    };

    // Clear error when input changes
    const handleInputChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (value === '' || /^\d+$/.test(value)) {
            setWorkshopCode(value);
            setError('');
        }
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
        
        {/* <div className="nav-right">
        <Link to="/login" className="login-link">Login</Link>
        </div> */}
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
                          <p>To access your workshop, please sign up or log in using your unique link.</p>
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
                <div className="auth-links">
            <div className="auth-buttons">
                <Link to="/login" className="auth-link login-link">Login</Link>
                <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
            </div>
        </div>
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


