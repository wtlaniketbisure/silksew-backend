const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  updateOrderStatus,
  updatePaymentStatus
} = require("../controllers/orderController");

const router = express.Router();

// Create a new order (protected route)
router.post("/",  createOrder);

// Get order by ID (protected route)
router.get("/:id", protect, getOrderById);

// Get logged-in user's orders (protected route)
router.get("/myorders", protect, getMyOrders);

// Get all orders (admin-only route)
router.get("/", protect, getAllOrders);

// Payment Features
router.post('/place', protect, placeOrder);
router.post('/stripe', protect, placeOrderStripe);
router.post('/razorpay', protect, placeOrderRazorpay);

router.post('/order-status', updateOrderStatus);
router.post('/payment-status', updatePaymentStatus);

module.exports = router;
