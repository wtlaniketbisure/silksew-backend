const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes by verifying JWT token
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token and decode the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID and attach to request object (excluding the password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next(); // Continue to the next middleware or route handler
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  // Ensure the user is authenticated and has the "admin" role
  if (req.user && req.user.role === "admin") {
    next(); // User is an admin, proceed to the next handler
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};

module.exports = { protect, isAdmin };
