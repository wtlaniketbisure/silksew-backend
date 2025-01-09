import React, { createContext, useState, useEffect } from "react";
import all_product from "../components/Assets/all_product";

export const ShopContext = createContext(null);

// Function to get the default cart (either from localStorage or create a new one)
const getDefaultCart = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      return JSON.parse(savedCart); // Load the saved cart from localStorage
    }
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }

  // Initialize the cart with 0 items for each product
  let cart = {};
  if (Array.isArray(all_product) && all_product.length > 0) {
    for (let index = 0; index < all_product.length; index++) {
      cart[all_product[index].id] = 0; // Default to 0 for each product
    }
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Save cart items to localStorage whenever the cart changes
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  // Function to update the quantity of a product in the cart
  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity < 0) newQuantity = 0; // Prevent negative quantities

    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: newQuantity };
      return newCart;
    });
  };

  // Add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] + 1 };
      return newCart;
    });
  };

  // Remove an item from the cart, ensuring quantity doesn't go below zero
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: Math.max(0, prev[itemId] - 1) };
      return newCart;
    });
  };

  // Increment quantity of an item in the cart
  const increaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: prev[itemId] + 1 };
      return newCart;
    });
  };

  // Decrement quantity of an item in the cart
  const decreaseQuantity = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev, [itemId]: Math.max(0, prev[itemId] - 1) };
      return newCart;
    });
  };

  // Calculate the total amount in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
    }

    return totalAmount;
  };

  // Calculate the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      totalItem += cartItems[item]; // Sum of all quantities, not just > 0
    }
    return totalItem;
  };

  // Clear the entire cart
  const clearCart = () => {
    const clearedCart = getDefaultCart(); // Reset cart to default state
    setCartItems(clearedCart);
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity, // Expose updateCartItemQuantity method
    increaseQuantity, // Expose increaseQuantity method
    decreaseQuantity, // Expose decreaseQuantity method
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
