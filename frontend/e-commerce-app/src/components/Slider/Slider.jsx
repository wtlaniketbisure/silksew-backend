import React from "react";
import Slider from "react-slick";
import "./Slider.css";

// Importing images
import slide1 from "../Assets/slider1.jpg";
import slide2 from "../Assets/slider2.jpg";
import slide3 from "../Assets/slider3.jpg";

const SliderComponent = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: true, // You can change this if you want to remove arrows
    dots: true, // Add dots below slider
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide">
          <img src={slide1} alt="Slide 1" />
          <div className="slide-content">
            <h2>Welcome to Our Shop</h2>
            <p>Exclusive discounts and deals on trending products</p>
            <button className="btn-shop-now">Shop Now</button>
          </div>
        </div>
        <div className="slide">
          <img src={slide2} alt="Slide 2" />
          <div className="slide-content">
            <h2>Latest Fashion Collection</h2>
            <p>Explore the new arrivals this season</p>
            <button className="btn-shop-now">Shop Now</button>
          </div>
        </div>
        <div className="slide">
          <img src={slide3} alt="Slide 3" />
          <div className="slide-content">
            <h2>Flash Sale</h2>
            <p>Hurry! Limited time offers on selected items</p>
            <button className="btn-shop-now">Shop Now</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default SliderComponent;
