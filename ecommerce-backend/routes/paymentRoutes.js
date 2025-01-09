const express = require('express');
const { createPaymentIntent, confirmPayment, getPaymentStatus } = require('../controllers/paymentController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validatePayment } = require('../middleware/paymentMiddleware');

const router = express.Router();

// Route to create a payment intent (initiates the payment process)
router.post('/create-payment-intent', authMiddleware, validatePayment, createPaymentIntent);

// Route to confirm the payment (once the payment is completed by the user)
router.post('/confirm-payment', authMiddleware, confirmPayment);

// Route to get the payment status for a specific order
router.get('/payment-status/:orderId', authMiddleware, getPaymentStatus);

module.exports = router;
