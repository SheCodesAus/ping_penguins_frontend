import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../../api/post-login.js";
import getUser from "../../api/get-user.js";
import useAuth from "../../hooks/use-auth.js";
import fireConfetti from "../ConfettiComponent.js";
import getBoard from "../../api/get-board.js"; // Note the hyphen in the filename

function LoginExisting() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [error, setError] = useState("");
  const [workshopCode, setWorkshopCode] = useState("");
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleWorkshopSubmit = async (event) => {
    event.preventDefault();
  
    if (workshopCode.trim()) {
      try {
        // Fetch the board data using the code
        const boardData = await getBoard(workshopCode);

        // Only navigate if boardData exists and has valid data
        if (boardData && boardData.id) {
          fireConfetti();
          // Store the board data in localStorage for use in the workshop page
          window.localStorage.setItem('currentBoard', JSON.stringify(boardData));
          navigate(`/board/${workshopCode}`); // Update the route to match your board route
        } else {
          setError("Invalid workshop code. Please try again.");
        }
      } catch (err) {
        setError("Workshop code not found. Please check and try again.");
        console.error("Error fetching board data:", err);
      }
    } else {
      setError("Please enter a valid workshop code.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      if (!credentials.username || !credentials.password) {
        setError("Please fill in all fields");
        return;
      }

      const response = await postLogin(credentials.username, credentials.password);

      if (response.token) {
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("userId", response.user_id);
        window.localStorage.setItem("isSuperuser", response.is_superuser);

        setAuth({
          token: response.token,
          userId: response.user_id,
          is_superuser: response.is_superuser,
        });

        const user = await getUser(response.user_id);

        // Redirect superusers directly to the admin page
        if (user?.is_superuser) {
          navigate("/admin");
        } else {
          setShowWorkshopForm(true); // Show workshop form for non-superusers
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div>
      {!showWorkshopForm ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Welcome Back</h2>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
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
      ) : (
        <form className="workshop-form" onSubmit={handleWorkshopSubmit}>
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
          <button type="submit" className="submit-button">
            Enter Workshop
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginExisting;
