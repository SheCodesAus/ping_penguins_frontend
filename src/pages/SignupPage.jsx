import React, { useState } from "react";
// import postLogin from "../api/post-login.js";
// import postUser from "../api/post-user.js";
// import { useNavigate } from "react-router-dom";

const SignUpPage = ({ initialTitle }) => {
  const [workspaceTitle, setWorkspaceTitle] = useState(initialTitle || "");

  // const handleTitleChange = (event) => {
  //   setWorkspaceTitle(event.target.value);
  // };
  const handleColorChange = (event) => {
    const newColor = event.target.value;
    console.log("newColor", newColor);
    setSignUpDetails({...signUpDetails, color: newColor})
    // setWorkspaceTitle(event.target.value);
    console.log("SignUpDetails", signUpDetails)
  };

  const handleTextChange = (event, field) => {
    const newText = event.target.value;
    console.log("newText", newText);
    if (field=="firstName")
    {
      setSignUpDetails({...signUpDetails,firstName:newText})
    }
    else if (field=="lastName")
      {
        setSignUpDetails({...signUpDetails,lastName:newText})
      }
    else if (field=="displayName")
      {
        setSignUpDetails({...signUpDetails,displayName:newText})
      }
    else if (field=="email")
      {
        setSignUpDetails({...signUpDetails,email:newText})
      }
    else if (field=="password")
      {
        setSignUpDetails({...signUpDetails,password:newText})
      }
    else if (field=="confirmPassword")
      {
        setSignUpDetails({...signUpDetails,confirmPassword:newText})
      }
    else if (field=="position")
      {
        setSignUpDetails({...signUpDetails,position:newText})
      }
    else if (field=="tenure")
      {
        setSignUpDetails({...signUpDetails,tenure:newText})
      }
    // setWorkspaceTitle(event.target.value);
    console.log("SignUpDetails", signUpDetails)
  };

  const handleTandCChecked = (event) => {
    const isChecked = event.target.checked;
    console.log("TandCChecked", isChecked);
    setSignUpDetails({...signUpDetails, tandcchecked: isChecked})
    // setWorkspaceTtandccheckeditle(event.target.value);
    console.log("SignUpDetails", signUpDetails)
  };

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
                <input type="text" name="firstName" className="workspace-signup-input" onChange={(e) => handleTextChange(e, "firstName")} required />
              </label>
              <label className="form-label">
                Last Name <span className="required">*</span>
                <input type="text" name="lastName" className="workspace-signup-input" onChange={(e) => handleTextChange(e, "lastName")} required />
              </label>
              <label className="form-label">
                Display Name <span className="required">* This is the name shown on your stickynotes</span>
                <input type="text" name="displayName" className="workspace-signup-input" onChange={(e) => handleTextChange(e, "displayName")} required />
              </label>
              <label className="form-label">
                Email <span className="required">*</span>
                <input type="email" name="email" className="workspace-signup-email" onChange={(e) => handleTextChange(e, "email")} required />
              </label>
              <label className="form-label">
                Password <span className="required">*</span>
                <input type="password" name="password" className="workspace-signup-password" onChange={(e) => handleTextChange(e, "password")}  required />
              </label>
              <label className="form-label">
                Confirm Password <span className="required">*</span>
                <input type="password" name="confirmPassword" className="workspace-signup-confirmpassword" onChange={(e) => handleTextChange(e, "confirmPassword")}  required />
              </label>
            </div>

            {/* Professional Information */}
            <div className="form-section">
              <label className="form-label">
                Position
                <input type="text" name="position" className="workspace-signup-input" onChange={(e) => handleTextChange(e, "position")} />
              </label>
              <label className="form-label">
                Tenure in Company
                <input type="text" name="tenure" className="workspace-signup-input" onChange={(e) => handleTextChange(e, "tenure")} />
              </label>
            </div>

            {/* Gender Selection
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
            </div> */}

            {/* Personal Note Color Picker */}
            <div className="workspace-signup-color-picker">
              <label className="form-label">Choose Your Personal Note Colour <span className="required">*</span> </label>
              <input type="color" name="noteColor" onChange={handleColorChange} className="workspace-signup-color-box" required />
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
              <input type="checkbox" name="terms" checked={signUpDetails.tandcchecked} onChange={handleTandCChecked} required /> I agree to the{" "}
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

