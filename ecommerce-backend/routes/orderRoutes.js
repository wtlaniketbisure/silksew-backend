const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders, // For admin
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order (protected route)
router.post("/", protect, createOrder);

// Get order by ID (protected route)
router.get("/:id", protect, getOrderById);

// Get logged-in user's orders (protected route)
router.get("/myorders", protect, getMyOrders);

// Get all orders (admin-only route)
router.get("/", protect, getAllOrders);

module.exports = router;
