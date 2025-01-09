/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  const [showOfferPopup, setShowOfferPopup] = useState(false); // State to control the pop-up visibility
  const [timer, setTimer] = useState(300); // Timer countdown in seconds (5 minutes for demo)

  // Check if the user has seen the offer pop-up before and if 30 minutes have passed
  useEffect(() => {
    const lastPopupTime = localStorage.getItem("lastPopupTime");
    const currentTime = Date.now();

    // If last popup time exists and 30 minutes (1800000 ms) have passed
    if (!lastPopupTime || currentTime - lastPopupTime >= 1800000) {
      setShowOfferPopup(true); // Show pop-up if 30 minutes have passed or it's the first time
      localStorage.setItem("lastPopupTime", currentTime); // Store the current timestamp
    }

    // Countdown Timer
    if (timer === 0) return; // Stop the timer when it reaches 0
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000); // Decrease the timer every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [timer]);

  // Close the popup and set the flag in localStorage to prevent showing it again for the next 30 minutes
  const closePopup = () => {
    setShowOfferPopup(false);
    // Update the timestamp when the user closes the pop-up
    localStorage.setItem("lastPopupTime", Date.now());
  };

  // Function to format time (hours:minutes:seconds)
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timer);

  return (
    <div className="hero">
      {/* Offer Pop-up */}
      {showOfferPopup && (
        <div className="offer-popup">
          <div className="offer-popup-content">
            <button
              className="offer-popup-close"
              onClick={closePopup}
              aria-label="Close Offer Pop-up"
            >
              &times; {/* Close button */}
            </button>
            <h3>Special Offers Just For You!</h3>
            {/* Countdown Timer */}
            <p className="timer">
              <span className="timer-box">{hours}</span>
              <span className="timer-separator">:</span>
              <span className="timer-box">{minutes}</span>
              <span className="timer-separator">:</span>
              <span className="timer-box">{seconds}</span>
            </p>
            <h1 className="offer-product-name">Product: "Stylish Winter Jacket"</h1>
            <h2 className="offer-price">Offer Price: Rs:700.00 (Old price Rs:1000.99)</h2>
            {/* <ul className="offer-list">
              <li>Flat 20% off on your first purchase!</li>
              <li>Buy 2, Get 1 Free on all accessories!</li>
              <li>Free shipping on orders above $50!</li>
            </ul> */}
            <button
              className="offer-popup-action"
              onClick={closePopup}
              aria-label="Claim Offer"
            >
              Claim Offer
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="Hand icon indicating new arrivals" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="Arrow icon pointing to the latest collection" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="Hero image showcasing new arrivals" />
      </div>
    </div>
  );
};

export default Hero;
