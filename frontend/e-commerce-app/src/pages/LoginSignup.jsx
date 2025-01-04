import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "../CSS/LoginSignup.css";
import { useState } from "react";
import axios from 'axios'
import { BASEURL } from "../config";

const LoginSignup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      const response = await axios.post(BASEURL + '/api/user/userregister', { name, email, password })
      console.log(response);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} action="">
      <div className="loginsignup">
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          </div>
          <button>Continue</button>
          <p className="loginsignup-login">
            Already have an account? <span>Login here</span>
          </p>
          <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
=======
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
>>>>>>> b1802a4e34f56fff5f2118dd7929b69c551dc283
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;



