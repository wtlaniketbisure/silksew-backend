const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  createOrder,
  getOrderDetails,
  updateOrderToPaid,
  updateOrderToDelivered,
} = require('../controllers/orderController');

const router = express.Router();

// Protected routes for users
router.post('/', protect, createOrder); // Create an order from cart
router.get('/:id', protect, getOrderDetails); // Get order details

// Admin route for updating order status
router.put('/:id/pay', protect, admin, updateOrderToPaid); // Mark order as paid
router.put('/:id/deliver', protect, admin, updateOrderToDelivered); // Mark order as delivered

module.exports = router;
