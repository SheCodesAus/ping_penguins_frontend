import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import postSignup from '../api/post-signup.js'; // Assuming you have a postSignup function
import '../style.css';

function SignupPage() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!credentials.username || !credentials.password || !credentials.email) {
                setError("Please fill in all fields");
                setIsLoading(false);
                return;
            }

            const response = await postSignup(credentials.username, credentials.password, credentials.email);

            if (response.token) {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id)
                navigate('/'); // Redirect to homepage
            } else {
                setError("Signup failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setError("Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-page">
            <form className="form-container" onSubmit={handleSubmit}>
                <h2 className="form-title">Sign Up</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="form-input"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-input"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-input"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="form-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default SignupPage;