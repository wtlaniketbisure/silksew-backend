// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     items: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
        
//         quantity: { type: Number, required: true, min: 1 },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"] },
//     address: { type: Object, required: true },
//     status: { type: String, default: "Pending" },
//     payment: { type: Boolean, required: true, default: false },
//     date: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);


 const mongoose = require("mongoose");

 const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: {type: Object, required: true},
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true, enum: ["Credit Card", "Debit Card", "PayPal", "Cash on Delivery"] },
    address: { type: Object, required: true },
    status: { type: String, default: "Pending" },
    payment: { type: Boolean, required: true, default: false },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
