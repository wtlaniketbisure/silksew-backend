const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"] },
    address: { type: String, required: true },
    status: { type: String, default: "Pending" },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
