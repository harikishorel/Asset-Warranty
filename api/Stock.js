const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addproduct",
    },
    Model: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Model",
    },
    Dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AddDealer",
    },
    SerialNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;