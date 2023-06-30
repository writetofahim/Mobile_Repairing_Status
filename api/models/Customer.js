const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  phone: String,
  status: [Boolean],
  partsAdded: [{ partsName: String, price: Number }],
  serviceCharge: Number,
});
module.exports = mongoose.model("Customer", customerSchema);
