const Product = require('../models/Product');

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, availableStock, images } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || !availableStock || !images || images.length === 0) {
      return res.status(400).json({ message: 'All required fields must be provided, including at least one image.' });
    }

    // Validate category options
    const validCategories = ['mens', 'women', 'childs'];
    const invalidCategories = category.filter(cat => !validCategories.includes(cat));
    if (invalidCategories.length > 0) {
      return res.status(400).json({ message: `Invalid category options: ${invalidCategories.join(', ')}` });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { category, images } = req.body;

    // Validate category options if provided
    if (category) {
      const validCategories = ['mens', 'women', 'childs'];
      const invalidCategories = category.filter(cat => !validCategories.includes(cat));
      if (invalidCategories.length > 0) {
        return res.status(400).json({ message: `Invalid category options: ${invalidCategories.join(', ')}` });
      }
    }

    // Validate images if provided
    if (images && images.length === 0) {
      return res.status(400).json({ message: 'At least one image must be provided.' });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
