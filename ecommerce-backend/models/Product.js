const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  oldPrice: {
    type: Number,
    default: null,
    min: 0,
  },
  category: {
    type: [String], // Allows an array of strings
    required: true,
  },
  availableStock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String], // Allows an array of image URLs
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
