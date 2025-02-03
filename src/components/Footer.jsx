import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import '../style.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-text">
                    © {new Date().getFullYear()} StickyBloom. All rights reserved. Created with love, tears, and lots of coffee by PingPenguins <span className="penguin-emoji">🐧</span>
                </div>
                <div className="social-links">
                    <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaInstagram size={24} />
                    </a>
                    <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon"
                    >
                        <FaFacebook size={24} />
                    </a>
                </div>
            </div>
      {/* Penguin Animation */}
      
        </footer>
    );
}

export default Footer;