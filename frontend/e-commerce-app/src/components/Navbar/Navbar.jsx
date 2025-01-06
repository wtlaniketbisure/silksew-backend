// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import logo from '../Assets/logo.png'
// import cart_icon from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom'
// import { useNavigate } from "react-router-dom";
// import { ShopContext } from '../../context/ShopContext'

// const Navbar = () => {

//     const [menu,setMenu] = useState("shop")
//     const {getTotalCartItems} = useContext(ShopContext);
//     const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/signup"); // Navigate to the Sign-Up page
//   };
//   return (
//     <div className='navbar'>
//         <div className='nav-logo'>
//             <img src={logo} alt=''/>
//             <p>SILKSEW</p>
//         </div>
//         <ul className='nav-menu'>
//             <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu === "shop"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link> {menu === "mens"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu === "womens"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu === "kids"?<hr/>:<></>}</li>
//         </ul>
//         <div className='nav-login-cart'>
//             {/* <Link to='/login'><button>Login</button></Link> */}
//             <button onClick={handleLoginClick} className="login-btn">
//         Login
//       </button>
//             <Link to='/cart'><img src={cart_icon} alt=''/></Link>
//             <div className='nav-cart-count'>{getTotalCartItems()}</div>
//         </div> 
//     </div>
//   )
// }

// export default Navbar

import React, { useState,useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const { getTotalCartItems } = useContext(ShopContext); // Get cart items count
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signup");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="navbar"
    >
      <div className="nav-logo">
        <motion.img
          src={logo}
          alt="Logo"
          className="logo"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <p>SILKSEW</p>
      </div>

      <ul
        className="nav-menu relative"
        onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
      >
        <Tab setPosition={setPosition} link="/">
          Home
        </Tab>
        <Tab setPosition={setPosition} link="/mens">
          Men
        </Tab>
        <Tab setPosition={setPosition} link="/womens">
          Women
        </Tab>
        <Tab setPosition={setPosition} link="/kids">
          Kids
        </Tab>
        <Cursor position={position} />
      </ul>

      <div className="nav-login-cart">
        <motion.button
          whileHover={{
            backgroundColor: "#38bdf8", // Light Blue
            scale: 1.15,
            boxShadow: "0px 4px 15px rgba(56, 189, 248, 0.5)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoginClick}
          className="login-btn"
        >
          Login
        </motion.button>
        <Link to="/cart">
          <motion.img
            src={cart_icon}
            alt="Cart Icon"
            whileHover={{ rotate: 20 }}
            className="cart-icon"
          />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </motion.nav>
  );
};

const Tab = ({ children, setPosition, link }) => {
  const ref = useRef(null);

  return (
    <motion.li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="tab"
      whileHover={{ scale: 1.1 }}
    >
      <Link to={link} className="tab-link">
        {children}
      </Link>
    </motion.li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.div
      animate={{
        ...position,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="cursor"
    />
  );
};

export default Navbar;






