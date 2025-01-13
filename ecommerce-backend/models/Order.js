const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"], // Example values
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Example: Pending, Shipped, Delivered
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
