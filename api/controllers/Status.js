const Status = require("../models/Status");

const getAllStatus = async (req, res) => {
  try {
    const statusData = await Status.find();
    return res.status(200).json({
      success: true,
      data: statusData,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Check your connection and try again",
    });
  }
};

const getStatusWithNumber = async (req, res) => {
  try {
    const statusData = await Status.findOne(req.params);

    if (!statusData) {
      return res.status(404).json({
        success: false,
        message: "There is no service status available at the moment.",
      });
    }
    return res.status(200).json({
      success: true,
      status: statusData?.status || "",
      invoice: statusData?.invoice || {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Check your connection and try again",
    });
  }
};
const addStatus = async (req, res) => {
  console.log(req.body);
  try {
    const { customerId, status, invoice } = req.body;
    const newStatus = new Status({
      customerId,
      status,
      invoice,
    });

    const existingCustomer = await Status.findOne({ customerId });
    console.log(existingCustomer);
    if (existingCustomer) {
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
      message: "Check your connection and try again",
    });
  }
};

const updateStatus = async (req, res) => {
  const body = req.body;
  const customerId = body.customerId;
  const update = req.body;
  console.log(update);
  try {
    const updateStatus = await Status.findOneAndUpdate(
      { customerId: customerId },
      update,
      { new: true }
    );
    if (!updateStatus) {
      console.log("Status not found");
      return res.status(404).json({
        success: false,
        message: "Status not found",
      });
    }

    console.log("Updated successfully");
    return res.status(200).json({
      success: true,
      message: "Updated successfully",
      updateStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Check your connection and try again",
      error: error.message,
    });
  }
};

module.exports = {
  getAllStatus,
  getStatusWithNumber,
  addStatus,
  updateStatus,
};
