const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const uploadRoute = require('./controllers/routeUpload'); // Ensure correct path

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); // Added order routes

const resetPasswordRoutes = require('./routes/userRoutes'); 
const forgotPasswordRoutes = require('./routes/userRoutes'); 
const changePasswordRoutes = require('./routes/userRoutes'); 
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const orderRoutes = require("./routes/orderRoutes");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Logging middleware for development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// API Routes
app.use('/api/products', productRoutes); // Product-related routes
app.use('/api/users', userRoutes); // User-related routes
app.use('/api/cart', cartRoutes); // Cart-related routes
app.use('/api/orders', orderRoutes); // Order-related routes (newly added)
app.use('/api/upload', uploadRoute); // Image upload route for Cloudinary

app.use('/api/reset-password', resetPasswordRoutes); 
app.use('/api/forgot-password', forgotPasswordRoutes); 
app.use('/api/change-password', changePasswordRoutes); 

// Default route for root endpoint
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(express.json()); // Ensure JSON request bodies are parsed

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);


// Error handling middleware
app.use(errorHandler);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
