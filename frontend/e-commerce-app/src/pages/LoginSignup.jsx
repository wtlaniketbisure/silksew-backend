import React, { useState } from "react";
import "../CSS/LoginSignup.css";
import axios from "axios";
import { BASEURL } from "../config"; // Make sure this is correctly imported
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false); // State for checkbox
  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    setError(""); // Clear previous errors
    setIsSubmitting(true); // Disable the submit button during the request

    // Validate form fields
    if (!name || !email || !password) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      setIsSubmitting(false);
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms of use and privacy policy.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Send registration request to the backend
      const response = await axios.post(`${BASEURL}/api/users/register`, {
        name: name.trim(), // Trim to remove extra spaces
        email: email.trim(),
        password,
      });

      console.log(response);

      // Store JWT token and user info in localStorage after successful registration
      const { token, name: userName, email: userEmail } = response.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ token, name: userName, email: userEmail })
      );

      // Clear form fields on successful registration
      setName("");
      setEmail("");
      setPassword("");
      setAgreeToTerms(false);

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      if (error.response) {
        // Handle backend errors
        setError(
          error.response.data?.message ||
            "Registration failed. Please check your input."
        );
      } else {
        // Handle network errors
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false); // Enable the submit button again
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          {error && <p className="error-message">{error}</p>} {/* Display error */}

          <div className="loginsignup-fields">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your Name"
              required
              autoComplete="name"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              autoComplete="email"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="continue-btn"
          >
            {isSubmitting ? (
              <span className="spinner"></span> // Replace with a spinner class
            ) : (
              "Continue"
            )}
          </button>

          <p className="loginsignup-login">
            Already have an account?{" "}
            <span className="loginsignup-link" onClick={() => navigate("/login")}>
              Login here
            </span>
          </p>

          <div className="loginsignup-agree">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              required
            />
            <p>
              By continuing, I agree to the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                terms of use
              </a>{" "}
              &{" "}
              <a href="/privacy" target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
