import React from 'react';
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import Footer from "./Footer.jsx";

function NavBar() {
    const {auth, setAuth} = useAuth();
    const location = useLocation();
    
    // Check if we're on a workshop page
    const isWorkshopPage = location.pathname.startsWith('/workshop/');
    console.log('Current path:', location.pathname);
    console.log('Is workshop page:', isWorkshopPage);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    // Function to determine if we should show auth links
    const shouldShowAuthLinks = () => {
        return !location.pathname.includes('/login') && 
               !location.pathname.includes('/signup');
    };

    // For workshop pages, render only the content
    if (isWorkshopPage) {
        return <Outlet />;
    }

    // For all other pages, render the full layout
    return (
        <div className="app-layout">
            <nav className="home-navbar">
                <div className="nav-container">
                    <div className="nav-logo">  
                        <Link to="/" className="logo">
                            <img src="/images/Stickybloomlogo.png" alt="StickyBloom Logo"/>
                        </Link>
                    </div>
            
                    {location.pathname === "/" && (
                        <div id="rotate-words">
                            <div>Energising Cultures</div>
                            <div>Elevating Happiness</div>
                            <div>Bespoke Culture Strategies</div>
                            <div>Unforgettable Workplace Experiences</div>
                        </div>
                    )}
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