import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import useAuth from "../hooks/use-auth.js";
import WorkshopAccessForm from "../components/WorkshopAccessCode.jsx";
import fireConfetti from "../components/ConfettiComponent.js";


const softColors = [
  { value: '#ffffd1', label: 'Soft Yellow' },
  { value: '#e1f8ff', label: 'Soft Blue' },
  { value: '#ffe5f0', label: 'Soft Pink' },
  { value: '#e8fde8', label: 'Soft Green' },
  { value: '#fff2d1', label: 'Soft Orange' },
  { value: '#f0e6ff', label: 'Soft Lavender' },
  { value: '#f0f0f0', label: 'Light Gray' },
  { value: '#ffebeb', label: 'Soft Coral' },
  { value: '#e6fff3', label: 'Mint' },
  { value: '#fff5e6', label: 'Peach' },
  { value: '#e6f9ff', label: 'Sky Blue' },
  { value: '#fce6ff', label: 'Light Purple' }
];


const SignUpPage = ({ initialTitle }) => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [workspaceTitle] = useState(initialTitle || "");
  const [showWorkshopForm, setShowWorkshopForm] = useState(false);
  const [workshopCode, setWorkshopCode] = useState('');
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    position: "",
    tenure: "",
    color: "",
    bio: "",
    tandcchecked: false,
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const errors = {};
    
    // Log validation process
    console.log('Validating form with details:', signUpDetails);

    if (!signUpDetails.firstName.trim()) errors.firstName = "First Name is required";
    if (!signUpDetails.lastName.trim()) errors.lastName = "Last Name is required";
    if (!signUpDetails.displayName.trim()) errors.displayName = "Display Name is required";
    if (!signUpDetails.email.trim()) errors.email = "Email is required";
    if (!signUpDetails.password) errors.password = "Password is required";
    if (!signUpDetails.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    if (signUpDetails.password !== signUpDetails.confirmPassword) 
        errors.passwordMismatch = "Passwords do not match";
    if (!signUpDetails.color) errors.color = "Please select a note color";
    if (!signUpDetails.tandcchecked) 
        errors.tandcchecked = "You must accept the Terms & Conditions";

    console.log('Validation errors:', errors); // Debug log

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWorkshopSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/board/${workshopCode}/`);
        const data = await response.json();

        if (response.ok) {
            fireConfetti();
            setTimeout(() => {
                navigate(`/board/${workshopCode}`);
            }, 1500);
        } else {
            setFormErrors({ workshop: 'Invalid workshop code' });
        }
    } catch (err) {
        setFormErrors({ workshop: 'Error validating workshop code' });
        console.error('Error:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
        try {
            const signupResponse = await postSignup(
                workspaceTitle,
                signUpDetails.email,
                signUpDetails.password,
                signUpDetails.confirmPassword,
                signUpDetails.firstName,
                signUpDetails.lastName,
                signUpDetails.displayName,
                signUpDetails.position,
                signUpDetails.tenure,
                signUpDetails.color,
                signUpDetails.bio
            );

            console.log('Signup successful:', signupResponse);

            const loginResponse = await fetch(`${import.meta.env.VITE_API_URL}/api-token-auth/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: signUpDetails.email,
                    password: signUpDetails.password,
                }),
            });

            if (!loginResponse.ok) {
                const errorText = await loginResponse.text();
                console.error('Login response:', errorText);
                throw new Error('Login failed after signup');
            }

            const loginData = await loginResponse.json();
            console.log('Login successful:', loginData);

            if (loginData.token) {
                window.localStorage.setItem("token", loginData.token);
                window.localStorage.setItem("userId", signupResponse.id);
                setAuth({
                    token: loginData.token,
                    userId: signupResponse.id,
                });

                setShowWorkshopForm(true);
            }
        } catch (error) {
            console.error("Signup/Login error:", error);
            setFormErrors({ 
                general: error.message || "Signup failed. Please try again." 
            });
        }
    }
  };

  return (
    <div className="workspace-signup">
      <div className="workspace-signup-container">
        {!showWorkshopForm ? (
          <>
            <section className="workspace-signup-header">
              <h1>{workspaceTitle || "Welcome to StickyBloom!"}</h1>
              <p>
                We're excited to have you join our collaborative workspace. 
                Let's set up your profile to get started.
              </p>
            </section>

            <form className="workspace-signup-form" onSubmit={handleSubmit}>
              {formErrors.general && (
                <div className="error-message general">{formErrors.general}</div>
              )}

              <div className="form-section">
                <label className="form-label">
                  First Name <span className="required">*</span>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={signUpDetails.firstName}
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Enter your first name" 
                  />
                  {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
                </label>

                <label className="form-label">
                  Last Name <span className="required">*</span>
                  <input 
                    type="text" 
                    name="lastName"
                    value={signUpDetails.lastName} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                  {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
                </label>
              </div>

              <div className="form-section">
                <label className="form-label">
                  Display Name <span className="required">*</span>
                  <input 
                    type="text" 
                    name="displayName"
                    value={signUpDetails.displayName} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Choose a display name"
                  />
                  {formErrors.displayName && <p className="error">{formErrors.displayName}</p>}
                </label>

                <label className="form-label">
                  Email <span className="required">*</span>
                  <input 
                    type="email" 
                    name="email"
                    value={signUpDetails.email} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <p className="error">{formErrors.email}</p>}
                </label>
              </div>

              <div className="form-section">
                <label className="form-label">
                  Password <span className="required">*</span>
                  <input 
                    type="password" 
                    name="password"
                    value={signUpDetails.password} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                  {formErrors.password && <p className="error">{formErrors.password}</p>}
                </label>

                <label className="form-label">
                  Confirm Password <span className="required">*</span>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={signUpDetails.confirmPassword} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                  {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
                  {formErrors.passwordMismatch && <p className="error">{formErrors.passwordMismatch}</p>}
                </label>
              </div>

              <div className="form-section">
                <label className="form-label">
                  Position
                  <input 
                    type="text" 
                    name="position"
                    value={signUpDetails.position} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="What's your role?"
                  />
                </label>

                <label className="form-label">
                  Tenure
                  <input 
                    type="text" 
                    name="tenure"
                    value={signUpDetails.tenure} 
                    className="workspace-signup-input" 
                    onChange={handleChange}
                    placeholder="How long have you been with us?"
                  />
                </label>
              </div>

              <div className="form-section full-width">
                <label className="form-label">
                  Bio
                  <textarea 
                    name="bio"
                    value={signUpDetails.bio}
                    className="workspace-signup-textarea" 
                    onChange={handleChange}
                    placeholder="Tell us a bit about yourself..."
                    rows="4"
                  />
                </label>
              </div>

              <div className="workspace-signup-color-picker">
                <label className="form-label">
                  Choose Your Personal Note Colour <span className="required">*</span>
                </label>
                <div className="color-options">
                  {softColors.map((color) => (
                    <div 
                      key={color.value}
                      className={`color-option ${signUpDetails.color === color.value ? 'selected' : ''}`}
                      onClick={() => handleChange({
                        target: { name: 'color', value: color.value }
                      })}
                    >
                      <div 
                        className="color-swatch" 
                        style={{ 
                          backgroundColor: color.value,
                          border: '1px solid rgba(0,0,0,0.1)' // Light border to show white colors
                        }}
                      />
                      <span className="color-label">{color.label}</span>
                    </div>
                  ))}
                </div>
                {formErrors.color && <p className="error">{formErrors.color}</p>}
                {signUpDetails.color && (
                  <div 
                    className="note-preview" 
                    style={{ 
                      backgroundColor: signUpDetails.color,
                      border: '1px solid rgba(0,0,0,0.1)'
                    }}
                  >
                    This is how your notes will look
                  </div>
                )}
              </div>

              <div className="workspace-signup-footer">
                <div className="info-box">
                  Your information is private and will only be used within the workshop space.
                </div>
                
                <label className="workspace-signup-terms">
                  <input 
                    type="checkbox" 
                    name="tandcchecked"
                    checked={signUpDetails.tandcchecked}
                    onChange={handleChange}
                  />
                  <span>
                    I agree to the <a href="/terms">Terms and Conditions</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>
                  </span>
                  {formErrors.tandcchecked && <p className="error">{formErrors.tandcchecked}</p>}
                </label>

                <button type="submit" className="workspace-signup-btn">
                  Create Profile
                </button>

                <p className="login-link">
                  Already have an account? <a href="/login">Log in here</a>
                </p>
              </div>
            </form>
          </>
        ) : (
          <WorkshopAccessForm />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;