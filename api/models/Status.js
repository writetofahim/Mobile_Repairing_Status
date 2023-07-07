const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  status: { type: String },
});

module.exports = mongoose.model("Status", statusSchema);
