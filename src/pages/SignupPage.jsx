import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ initialTitle }) => {
  const navigate = useNavigate(); // React Router navigation hook
  const [workspaceTitle] = useState(initialTitle || "");
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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
    if (!signUpDetails.firstName) errors.firstName = "First Name is required";
    if (!signUpDetails.lastName) errors.lastName = "Last Name is required";
    if (!signUpDetails.displayName) errors.displayName = "Display Name is required";
    if (!signUpDetails.email) errors.email = "Email is required";
    if (!signUpDetails.password) errors.password = "Password is required";
    if (!signUpDetails.confirmPassword) errors.confirmPassword = "Confirm Password is required";
    if (signUpDetails.password !== signUpDetails.confirmPassword) 
      errors.passwordMismatch = "Passwords do not match";
    if (!signUpDetails.color) errors.color = "Color selection is required";
    if (!signUpDetails.tandcchecked) errors.tandcchecked = "You must accept the Terms & Conditions";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      alert("Profile setup is complete!");
      navigate("/workshop"); // Redirect user to /workshop
    }
  }, [isFormSubmitted, navigate]);

  return (
    <div className="workspace-signup">
      <div className="workspace-signup-container">
        <section className="workspace-signup-header">
          <h1>{workspaceTitle || "Welcome to StickyBloom!"}</h1>
          <p>
            We're excited to have you join our collaborative workspace. Before we begin, let's set up your profile.
          </p>
        </section>

        <form className="workspace-signup-form" onSubmit={handleSubmit}>
          <section>
            <h2>Create Your Profile</h2>

            <div className="form-section">
              <label className="form-label">
                First Name <span className="required">*</span>
                <input type="text" name="firstName" className="workspace-signup-input" onChange={handleChange} />
                {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
              </label>
              <label className="form-label">
                Last Name <span className="required">*</span>
                <input type="text" name="lastName" className="workspace-signup-input" onChange={handleChange} />
                {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
              </label>
              <label className="form-label">
                Display Name <span className="required">*</span>
                <input type="text" name="displayName" className="workspace-signup-input" onChange={handleChange} />
                {formErrors.displayName && <p className="error">{formErrors.displayName}</p>}
              </label>
              <label className="form-label">
                Email <span className="required">*</span>
                <input type="email" name="email" className="workspace-signup-email" onChange={handleChange} />
                {formErrors.email && <p className="error">{formErrors.email}</p>}
              </label>
              <label className="form-label">
                Password <span className="required">*</span>
                <input type="password" name="password" className="workspace-signup-password" onChange={handleChange} />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
              </label>
              <label className="form-label">
                Confirm Password <span className="required">*</span>
                <input type="password" name="confirmPassword" className="workspace-signup-confirmpassword" onChange={handleChange} />
                {formErrors.confirmPassword && <p className="error">{formErrors.confirmPassword}</p>}
                {formErrors.passwordMismatch && <p className="error">{formErrors.passwordMismatch}</p>}
              </label>
            </div>

            <div className="form-section">
              <label className="form-label">
                Position
                <input type="text" name="position" className="workspace-signup-input" onChange={handleChange} />
              </label>
              <label className="form-label">
                Tenure in Company
                <input type="text" name="tenure" className="workspace-signup-input" onChange={handleChange} />
              </label>
            </div>

            <div className="workspace-signup-color-picker">
              <label className="form-label">
                Choose Your Personal Note Colour <span className="required">*</span>
              </label>
              <input type="color" name="color" onChange={handleChange} className="workspace-signup-color-box" />
              {formErrors.color && <p className="error">{formErrors.color}</p>}
              <div className="note-preview">This is how your notes will look</div>
            </div>

           </section>

          <section className="workspace-signup-footer">
            <div className="info-box">
              Your information is private and will only be used within the workshop space.
            </div>
            <label className="workspace-signup-terms">
              <input type="checkbox" name="tandcchecked" checked={signUpDetails.tandcchecked} onChange={handleChange} />
              I agree to the <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>
              {formErrors.tandcchecked && <p className="error">{formErrors.tandcchecked}</p>}
            </label>
            <button type="submit" className="workspace-signup-btn">Create Profile</button>
            <p className="login-link">
              Already have an account? <a href="/login">Log in here</a>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
