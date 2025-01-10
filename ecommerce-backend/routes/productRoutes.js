const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  next();
};

// Public routes
router.get('/', getAllProducts); // Get all products
router.get('/:id', validateObjectId, getProductById); // Get product by ID

// Admin-only routes (protected by auth middleware)
router.post('/', protect, isAdmin, createProduct); // Create a new product
router.put('/:id', protect, isAdmin, validateObjectId, updateProduct); // Update a product
router.delete('/:id', protect, isAdmin, validateObjectId, deleteProduct); // Delete a product

module.exports = router;
