import React, { useState } from "react";

const SignUpPage = ({ initialTitle }) => {
  const [workspaceTitle, setWorkspaceTitle] = useState(initialTitle || "");

  // const handleTitleChange = (event) => {
  //   setWorkspaceTitle(event.target.value);
  // };

  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
    email: "",
    password: "",
  });

  return (
    <div className="workspace-signup">
      {/* Page Container */}
      <div className="workspace-signup-container">

        {/* Header Section */}
        <section className="workspace-signup-header">
          {/* <input
            type="text"
            value={workspaceTitle}
            onChange={handleTitleChange}
            placeholder="Enter Workspace Title"
            className="workspace-title-input"
          /> */}
          <h1>{workspaceTitle || "Welcome to StickyBloom!"}</h1>
          <p>
            We're excited to have you join our collaborative workspace. Before we begin,
            let's set up your profile to make your experience more personal and engaging.
          </p>
          <p>
            Your information is confidential and won't be shared outside the workshop space.
            Feel free to be yourself and express your thoughts openly.
          </p>
        </section>

        {/* Main Form Section */}
        <form className="workspace-signup-form">

          {/* Profile Setup */}
          <section>
            <h2>Create Your Profile</h2>

            {/* Personal Information */}
            <div className="form-section">
              <label className="form-label">
                First Name <span className="required">*</span>
                <input type="text" name="firstName" className="workspace-signup-input" value={signUpDetails.firstName} required />
              </label>
              <label className="form-label">
                Last Name <span className="required">*</span>
                <input type="text" name="lastName" className="workspace-signup-input" value={signUpDetails.lastName} required />
              </label>
              <label className="form-label">
                Display Name <span className="required">*</span>
                <input type="text" name="displayName" className="workspace-signup-input" value={signUpDetails.displayName} required />
              </label>
            </div>

            {/* Professional Information */}
            <div className="form-section">
              <label className="form-label">
                Position
                <input type="text" name="position" className="workspace-signup-input" />
              </label>
              <label className="form-label">
                Tenure in Company
                <input type="text" name="tenure" className="workspace-signup-input" />
              </label>
            </div>

            {/* Gender Selection */}
            <div className="workspace-signup-gender">
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

            {/* Personal Note Color Picker */}
            <div className="workspace-signup-color-picker">
              <label className="form-label">Choose Your Personal Note Colour <span className="required">*</span> </label>
              <input type="color" name="noteColor" className="workspace-signup-color-box" required />
              <div className="note-preview">This is how your notes will look</div>
            </div>

            {/* Bio Section */}
            <div className="form-section">
              <label className="form-label">
                Bio
                <textarea name="bio" className="workspace-signup-input" placeholder="Tell us a bit about yourself..."></textarea>
              </label>
            </div>
          </section>

          {/* Footer Section */}
          <section className="workspace-signup-footer">
            <div className="info-box">
              Your information is private and will only be used within the workshop space.
              You can update it anytime from your profile settings.
            </div>
            <label className="workspace-signup-terms">
              <input type="checkbox" name="terms" required /> I agree to the{" "}
              <a href="/terms">Terms and Conditions</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </label>
            <button type="submit" className="workspace-signup-btn">
              Create Profile
            </button>
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

