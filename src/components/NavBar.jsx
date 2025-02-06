import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import Footer from "./Footer.jsx";

function NavBar() {
    const {auth, setAuth} = useAuth();
    const location = useLocation(); 

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    // Function to determine if we should show auth links
    const shouldShowAuthLinks = () => {
        return !location.pathname.includes('/login') && 
               !location.pathname.includes('/signup');
    };

    return (
        <div className="app-layout">
            <nav className="home-navbar">
                <div className="nav-container">
                <div className="nav-logo">  
                <Link to="/" className="logo">
                    <img src="../public/images/Stickybloomlogo.png" alt="StickyBloom Logo"/>
                </Link>
                </div>
        
        <div id="rotate-words">
            <div>Energising Cultures</div>
            <div>Elevating Happiness</div>
            <div>Bespoke Culture Strategies</div>
            <div>Unforgettable Workplace Experiences</div>
        </div>
        </div>      
                <div className="nav-links">
                    {auth.token ? (
                        <Link to="/" onClick={handleLogout}>Log Out</Link>
                    ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Sign Up</Link>
                            </>
                    )}
                </div> 
            </nav>

            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default NavBar;