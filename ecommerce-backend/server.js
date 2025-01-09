// app.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors'); // Import CORS middleware
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware
app.use(express.json()); // Body parser for JSON requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logging for development
}

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Error handling middleware
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
