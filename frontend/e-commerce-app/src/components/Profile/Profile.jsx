import React, { useEffect, useState } from "react";
import "./Profile.css"; // Add your CSS styling for the Profile page
import profile_icon from "../Assets/profile_icon.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from local storage or call an API
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
      navigate("/signup"); // Redirect to login if user is not logged in
    } else {
      setUserData(loggedInUser);
    }
  }, [navigate]);

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  const { name, email, fullName } = userData;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul className="sidebar-menu">
          <li>Your Orders</li>
          <li>Login & Security</li>
          <li>Your Addresses</li>
          <li>Contact Us</li>
        </ul>
      </div>

      {/* Main Profile Content */}
      <div className="profile-main">
        <div className="profile-header">
          <img src={profile_icon} alt="Profile Icon" className="profile-page-icon" />
          <h2>Welcome, {name}</h2>
          {fullName && <p>Full Name: {fullName}</p>}
        </div>
        <div className="profile-details">
          <h3>Your Details:</h3>
          <ul>
            <li><strong>Name:</strong> {name}</li>
            <li><strong>Email:</strong> {email}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
