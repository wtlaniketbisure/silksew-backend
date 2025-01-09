import React, { useState } from "react";
import "../CSS/Login.css";
import axios from "axios";
import { BASEURL } from "../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send login request to the backend
      const response = await axios.post(`${BASEURL}/api/users/login`, {
        email,
        password,
      });

      console.log(response);

      // Extract token from response and store it
      const { token, user } = response.data; // Assuming backend returns { token, user }
      localStorage.setItem("token", token); // Save JWT token in localStorage
      localStorage.setItem("user", JSON.stringify(user)); // Optionally store user info

      // Dispatch custom login event to notify other components
      const authEvent = new Event("authChange");
      window.dispatchEvent(authEvent);

      // Clear input fields
      setEmail("");
      setPassword("");

      // Redirect to homepage or another page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Show specific error message from backend
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <form onSubmit={onSubmitHandler}>
          <div className="loginsignup-fields">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
