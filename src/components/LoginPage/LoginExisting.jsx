import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../../api/post-login.js";
import useAuth from "../../hooks/use-auth.js";

function LoginExisting() {
    const navigate = useNavigate();  
    const { auth, setAuth } = useAuth();

    const [credentials, setCredentials] = useState({
        email: "",
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
        if (credentials.email && credentials.password) {
            try {
                const response = await postLogin(
                    credentials.email,
                    credentials.password            
                );

                console.log('Login response:', response); 

                if (response) {
                    window.localStorage.setItem("token", response.token);
                    setAuth(response); 

                    if (response.isSuperuser) {
                        navigate('/admin'); 
                    } else {
                        navigate('/workshop/1'); 
                    }
                }
            } catch (error) {
                console.error('Login failed:', error); 
            }
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h2 className="form-title">Welcome Back</h2>
            <div className="form-group" style={{ width: '100%', maxWidth: '400px' }}>
                <label className="form-label" htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                />
            </div>
            <div className="form-group" style={{ width: '100%', maxWidth: '400px' }}>
                <label className="form-label" htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    style={{ width: '100%' }}
                />
            </div>
            <button type="submit" className="form-button" style={{ width: '100%', maxWidth: '400px' }}>
                Log In
            </button>
            <Link to="/signup" className="form-link" style={{ marginTop: '10px' }}>
                Don&apos;t have an account? Sign up here
            </Link>
        </form>
    );
}

export default LoginExisting;