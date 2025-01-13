const Order = require("../models/Order");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, address } = req.body;

    if (!items || !items.length || !totalAmount || !paymentMethod || !address) {
      return res
        .status(400)
        .json({ message: "Missing required fields in the order" });
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
    res.status(500).json({ message: error.message });
  }
};

// Get an order by ID
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

// Get logged-in user's orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrderById, getMyOrders, getAllOrders };
