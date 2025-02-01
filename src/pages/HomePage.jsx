import React from 'react';
// import Navbar from "../components/NavBar";
import "../style.css"; 
import "./HomePage.css";

// const handleSubmit = (e) => {
//   e.preventDefault();
//   setIsSubmitted(true);
//   // to handle the workshop URL
// };




function HomePage() {
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
                          {/* <p>If you are one of my lucky clients, insert your link below to access the workshop and let the magic happen!</p> */}
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

          {/* <section className="workshop-section">
                <div className="workshop-container">
                    <form className="workshop-form" onSubmit={handleSubmit}>
                        <h3 className="form-title">Workshop Access</h3>
                        <div className="form-group">
                            <label htmlFor="workshop-url" className="form-label">
                                Enter your workshop access URL:
                            </label>
                            <input
                                type="url"
                                id="workshop-url"
                                className="form-input"
                                value={workshopUrl}
                                onChange={(e) => setWorkshopUrl(e.target.value)}
                                placeholder="https://workshop-url.com"
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            Access Workshop
                        </button>
                        {isSubmitted && (
                            <div className="success-message">
                                Thank you! You will be redirected to the workshop shortly.
                            </div>
                        )}
                    </form>
                </div>
            </section>
       */}
      </div>
  );
}

      {/* Workshop Access Section
      <section className="workshop-section">
        <div className="workshop-container">
          <h2 className="section-title">Workshop Access</h2>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="workshop-form">
              <div className="form-group">
                <label htmlFor="workshop-link" className="form-label">
                  Enter Workshop Link:
                </label>
                <input
                  type="url"
                  id="workshop-link"
                  value={workshopLink}
                  onChange={(e) => setWorkshopLink(e.target.value)}
                  placeholder="https://workshop-url.com"
                  className="form-input"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Access Workshop
              </button>
            </form>
            {isSubmitted && (
              <div className="success-message">
                Thank you! Your workshop link has been submitted.
              </div>
            )}
          </div>
        </div>
      </section> */}
    

export default HomePage;
