const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  phone: String,
  status: [],
});

module.exports = mongoose.model("Status", statusSchema);
