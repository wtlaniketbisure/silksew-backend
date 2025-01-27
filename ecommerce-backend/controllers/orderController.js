const Order = require("../models/Order");
const Cart = require("../models/Cart");
require("dotenv").config(); // Load .env file

const currency = "inr";
const deliveryCharge = 10;

const createOrder = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log the incoming request body
    const { items, totalAmount, paymentMethod, address, paymentIntentId } = req.body;

    if (!items || !items.length || !totalAmount || !paymentMethod || !address) {
      return res.status(400).json({ message: "Missing required fields in the order" });
    }

    const finalAmount = totalAmount + deliveryCharge;

     let paymentIntent;


      // Handle payment based on payment method
      if (paymentMethod === "card") {
        if (!paymentIntentId) {
          // Create a new payment intent if one is not provided
          paymentIntent = await stripe.paymentIntents.create({
            amount: finalAmount * 100, // Convert to smallest currency unit (e.g., paise for INR)
            currency,
            payment_method_types: ["card"],
          });
        } else {
          // Retrieve existing payment intent
          paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        }
  
        if (!paymentIntent) {
          return res.status(500).json({ message: "Unable to process payment with Stripe" });
        }
      }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount : finalAmount,
      paymentMethod,
      paymentIntentId: paymentIntent ? paymentIntent.id : null,
      status: paymentMethod === "card" ? "Pending Payment" : "Processing",
      address,
    });

    res.status(201).json({order,
      clientSecret: paymentIntent ? paymentIntent.client_secret : null,
      message: "Order created successfully",
  });
  } catch (error) {
    console.error("Error in createOrder:", error.message); // Log errors
    res.status(500).json({ message: error.message });
  }
};


// Other methods remain unchanged
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access to the order" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email"); // Populate userId to get name and email
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const placeOrder = async (req, res) => {
  try {
    const {items, totalAmount, address, paymentMethod } = req.body;
    const userId = req.user._id;

    if (!userId || !items || !totalAmount || !address || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      address,
      paymentMethod,
      payment: false,  // Assuming payment status is pending for COD
      date: Date.now(),
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const userOrders = async (req,res) =>{
  try{
    const {userId} = req.body

    const orders = await Order.find({userId})
    res.json({success:true,orders})
  } catch (error){
    console.log(error)
    res.json({success:false,message:error.message});
  }
}


const placeOrderStripe = async (req, res) => {
  res.status(501).json({ message: "Stripe payment not implemented yet" });
};

const placeOrderRazorpay = async (req, res) => {
  res.status(501).json({ message: "Razorpay payment not implemented yet" });
};

const updateOrderStatus = async (req, res) =>{

  try {
      
      const {_id, status} = req.body

      await Order.findByIdAndUpdate(_id, {status})
      res.json({success:true, message:'Status Updated'})

  } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
}

const updatePaymentStatus = async (req, res) =>{

  try {
      
      const {_id, payment} = req.body

      await Order.findByIdAndUpdate(_id, {payment})
      res.json({success:true, message:'Status Updated'})

  } catch (error) {
      console.log(error)
      res.json({success:false, message:error.message})
  }
}

module.exports = { createOrder, getOrderById, getMyOrders, getAllOrders, placeOrder, placeOrderStripe, placeOrderRazorpay ,updatePaymentStatus, updateOrderStatus,userOrders};
