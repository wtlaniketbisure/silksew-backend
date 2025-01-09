import React, { useState, useEffect, useCallback, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import profile_icon from "../Assets/profile_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext); // Get the total number of items in the cart
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState(""); // Added state for full name

  // Function to update login state, wrapped with useCallback to optimize performance
  const updateLoginState = useCallback(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setIsLoggedIn(true);
      setUserName(loggedInUser.name);
      setUserFullName(loggedInUser.fullName || ""); // Save full name if available
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setUserFullName("");
    }
  }, []);

  useEffect(() => {
    updateLoginState(); // Initial check for logged-in user

    // Event listener to handle login/logout dynamically
    const handleAuthEvent = () => {
      updateLoginState();
    };

    // Listen for "authChange" event
    window.addEventListener("authChange", handleAuthEvent);

    // Listen for storage changes (to detect login/logout in other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "user") {
        updateLoginState();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Cleanup event listeners on component unmount
      window.removeEventListener("authChange", handleAuthEvent);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [updateLoginState]);

  const handleLogoutClick = () => {
    // Clear user data and update state
    localStorage.removeItem("user");

    // Dispatch "authChange" event
    const event = new Event("authChange");
    window.dispatchEvent(event);

    // Trigger a storage event to notify other tabs of the logout
    localStorage.setItem("user", JSON.stringify(null)); // This will trigger the storage event in other tabs

    // Redirect to signup page after logout
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SILKSEW</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" && <hr />}
        </li>
        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "womens" && <hr />}
        </li>
        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn && (
          <Link to="/cart" className="cart-icon-wrapper">
            <img src={cart_icon} alt="Cart" className="cart-icon" />
            {/* Display the cart item count if it's greater than 0 */}
            {getTotalCartItems() > 0 && (
              <div className="cart-item-count">{getTotalCartItems()}</div>
            )}
          </Link>
        )}
        {isLoggedIn ? (
          <div className="profile-info">
            <Link to="/profile" className="profile-link">
              <img src={profile_icon} alt="Profile" className="profile-icon" />
            </Link>
            <span className="user-name">
              Hi, {userName}{userFullName && ` (${userFullName})`}
            </span>
            <button onClick={handleLogoutClick} className="login-btn">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => navigate("/signup")} className="login-btn">
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
