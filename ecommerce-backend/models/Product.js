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
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0 && v.every(cat => typeof cat === 'string');
      },
      message: 'Categories must be a non-empty array of strings'
    }
  },
  availableStock: {
    type: Number,
    required: true,
    min: 0,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one image is required'
    }
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);