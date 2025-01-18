const Order = require("../models/Order");
const Cart = require("../models/Cart");

const createOrder = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log the incoming request body
    const { items, totalAmount, paymentMethod, address } = req.body;

    if (!items || !items.length || !totalAmount || !paymentMethod || !address) {
      return res.status(400).json({ message: "Missing required fields in the order" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      paymentMethod,
      address,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error in createOrder:", error.message); // Log errors
    res.status(500).json({ message: error.message });
  }
};


// Other methods remain unchanged
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to the order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { user, items, totalAmount, address, paymentMethod } = req.body;

    const orderData = {
      user,
      items,
      address,
      totalAmount,
      paymentMethod,
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  res.status(501).json({ message: "Stripe payment not implemented yet" });
};

const placeOrderRazorpay = async (req, res) => {
  res.status(501).json({ message: "Razorpay payment not implemented yet" });
};

module.exports = { createOrder, getOrderById, getMyOrders, getAllOrders, placeOrder, placeOrderStripe, placeOrderRazorpay };
