const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://diwaarvind6:Diwa@cluster0.jxw0na0.mongodb.net/Asset?retryWrites=true&w=majority"
);

const dealerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  demail: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  dpassword: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const AddDealer = mongoose.model("AddDealer", dealerSchema);

module.exports = AddDealer;
