import React, { useState } from "react";

const SignUpPage = ({ initialTitle }) => {
  const [workspaceTitle, setWorkspaceTitle] = useState(initialTitle || "");

  const handleTitleChange = (event) => {
    setWorkspaceTitle(event.target.value);
  };

  return (
    <div className="page-container">
      {/* Header Section */}
      <section className="header-section">
        <input
          type="text"
          value={workspaceTitle}
          onChange={handleTitleChange}
          placeholder="Enter Workspace Title"
          className="workspace-title-input"
        />
        <h1>{workspaceTitle || "Welcome to Workspace Title!"}</h1>
        <p>
          We're excited to have you join our collaborative workspace. Please
          create your account and set up your profile to get started.
        </p>
        <p>
          Your information is confidential and won't be shared outside the
          workshop space. Feel free to be yourself and express your thoughts
          openly.
        </p>
      </section>

      {/* Main Form Section */}
      <form className="form-container">
        {/* Create Your Account */}
        <section>
          <h2>Create Your Account</h2>

          {/* Account Details */}
          <div className="form-section">
            <h3>Account Details</h3>
            <label className="form-label">
              Email Address <span className="required">*</span>
              <input type="email" name="email" className="form-input" required />
            </label>
            <label className="form-label">
              Password <span className="required">*</span>
              <input
                type="password"
                name="password"
                className="form-input"
                required
              />
            </label>
            <label className="form-label">
              Confirm Password <span className="required">*</span>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                required
              />
            </label>
          </div>

          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <label className="form-label">
              First Name <span className="required">*</span>
              <input
                type="text"
                name="firstName"
                className="form-input"
                required
              />
            </label>
            <label className="form-label">
              Last Name <span className="required">*</span>
              <input
                type="text"
                name="lastName"
                className="form-input"
                required
              />
            </label>
            <label className="form-label">
              Display Nickname
              <input type="text" name="nickname" className="form-input" />
            </label>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>Professional Information</h3>
            <label className="form-label">
              Position
              <input type="text" name="position" className="form-input" />
            </label>
            <div className="form-gender">
              <span>Gender</span>
              <div className="gender-options">
                <label>
                  <input type="radio" name="gender" value="female" /> Female
                </label>
                <label>
                  <input type="radio" name="gender" value="male" /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value="other" /> Other
                </label>
              </div>
            </div>
            <label className="form-label">
              Choose Your Personal Note Color
              <input type="color" name="noteColor" className="color-picker" />
              <div className="note-preview">
                This is how your notes will look
              </div>
            </label>
          </div>
        </section>

        {/* Footer Section */}
        <section className="footer-section">
          <div className="info-box">
            Your information is private and will only be used within the
            workshop space. You can update it anytime from your profile
            settings.
          </div>
          <label className="terms-checkbox">
            <input type="checkbox" name="terms" required /> I agree to the{" "}
            <a href="/terms">Terms and Conditions</a> and{" "}
            <a href="/privacy">Privacy Policy</a>
          </label>
          <button type="submit" className="submit-button">
            Create Account & Continue
          </button>
          <p className="login-link">
            Already have an account? <a href="/login">Log in here</a>
          </p>
        </section>
      </form>
    </div>
  );
};

export default SignUpPage;
