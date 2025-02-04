import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../../api/post-login.js";
import useAuth from "../../hooks/use-auth.js";

function LoginExisting() {
    const navigate = useNavigate();  
    const { auth, setAuth } = useAuth();
    const [error, setError] = useState("");

    const [credentials, setCredentials] = useState({
        username: "",  // Changed from email to username to match backend
        password: "",
    });
        
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");  // Clear any previous errors

        try {
            if (!credentials.username || !credentials.password) {
                setError("Please fill in all fields");
                return;
            }

            const response = await postLogin(
                credentials.username,
                credentials.password            
            );

            if (response.token) {
                window.localStorage.setItem("token", response.token);
                window.localStorage.setItem("userId", response.user_id);
                setAuth({
                    token: response.token,
                    is_superuser: response.is_superuser,
                });
                
            const user = await getUser(response.user_id);
                // Redirect based on user type
                if (user.is_superuser) {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Login failed. Please try again.");
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title">Welcome Back</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
                <input
                    type="text"
                    id="username"  // Changed from email to username
                    className="form-input"
                    placeholder="Enter your username"  // Updated placeholder
                    value={credentials.username}
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="form-button">
                Log In
            </button>
            <Link to="/signup" className="form-link">
                Don&apos;t have an account? Sign up here
            </Link>
        </form>
    );
}

export default LoginExisting;