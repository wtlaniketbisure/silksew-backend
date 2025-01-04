import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../CSS/LoginSignup.css";

const LoginSignup = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation to the login page
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginsignup-login">
          Already have an account?{" "}
          <span
            className="loginsignup-link"
            onClick={handleLoginClick} // Attach the handler here
          >
            Login here
          </span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;



