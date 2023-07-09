const mongoose = require("mongoose");

// const rowsSchema = new mongoose.Schema({
//   partsName: { type: String },
//   price: { type: String },
// });

const invoiceSchema = new mongoose.Schema({
  serviceCharge: { type: String },
  rows: { type: Array },
});

const statusSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  status: { type: String },
  invoice: { type: invoiceSchema },
});

module.exports = mongoose.model("Status", statusSchema);
