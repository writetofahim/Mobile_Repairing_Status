const Status = require("../models/Status");

const getAllStatus = async (req, res) => {
  try {
    const status = await Status.find();
    return res.status(200).json({
      success: true,
      status,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get status",
    });
  }
};

const addStatus = async (req, res) => {
  try {
    const { phone, status } = req.body;
    const newStatus = new Status({
      phone,
      status,
    });

    const existingPhone = await Status.findOne({ phone });
    console.log(existingPhone);
    if (existingPhone) {
      return res
        .status(400)
        .json({ success: false, message: "This customer is already exists" });
    }

    await newStatus.save();
    console.log("Status added successfully");
    res.status(201).json({
      success: true,
      newStatus,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to Status",
    });
  }
};
module.exports = {
  getAllStatus,
  addStatus,
};
