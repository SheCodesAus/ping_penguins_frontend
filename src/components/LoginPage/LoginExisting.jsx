import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import postLogin from "../../api/post-login.js";
import getUser from "../../api/get-user.js";
import useAuth from "../../hooks/use-auth.js";
import fireConfetti from "../ConfettiComponent.js";
import getBoard from "../../api/get-board.js"; 
import WorkshopAccessForm from "../WorkshopAccessCode";


const LoginExisting = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

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
        const boardData = await getBoard(workshopCode);

        // Only navigate if boardData exists and has valid data
        if (boardData && boardData.id) {
          fireConfetti();
          window.localStorage.setItem('currentBoard', JSON.stringify(boardData));
          navigate(`/board/${workshopCode}`); 
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

        if (user?.is_superuser) {
          navigate("/admin");
        } else {
          setShowWorkshopForm(true); 
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again.");
    }
  };

  if (showWorkshopForm) {
    return <WorkshopAccessForm />;  
  }

  return (
    <div className="form-container">
      <form className="form-title" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Email"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginExisting;
