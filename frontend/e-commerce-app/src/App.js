import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import LoginSignup from "./pages/LoginSignup";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the required CSS for Toastify
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* The product route now accepts productId */}
          <Route path="/product/:productId" element={<Product />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<LoginSignup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer /> {/* Add ToastContainer here to display toast notifications */}
      </BrowserRouter>
    </div>
  );
}

export default App;
