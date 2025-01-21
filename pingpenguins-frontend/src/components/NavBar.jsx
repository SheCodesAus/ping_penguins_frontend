import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import "./NavBar.css";

function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleAuthClick = () => {
        setIsLoggedIn(!isLoggedIn); // Toggle login state
    };

    return (
        <>
            <header className="navbar">
                <h1 className="navbar-logo">StickyBloom</h1>
                <nav className={`navbar-links ${isOpen ? "open" : ""}`}>
                    <Link to="/" onClick={() => setIsOpen(false)}>Landing</Link>
                    <Link to="/about" onClick={() => setIsOpen(false)}>Workshop</Link>
                    <Link to="/projects" onClick={() => setIsOpen(false)}>Dashboard</Link>
                    <button
                        onClick={() => {
                            handleAuthClick();
                            setIsOpen(false);
                        }}
                        className="auth-button"
                    >
                        {isLoggedIn ? "Logout" : "Login"}
                    </button>
                </nav>
                <div className="navbar-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </header>
            <main className="main-content">
                <Outlet />
            </main>
        </>
    );
}

export default NavBar;