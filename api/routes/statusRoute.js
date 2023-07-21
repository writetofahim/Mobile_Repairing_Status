const express = require("express");
const route = express.Router();
const statusController = require("../controllers/Status");

route.post("/", statusController.addStatus);
route.get("/", statusController.getAllStatus);
route.put("/", statusController.updateStatus);
route.get("/:customerId", statusController.getStatusWithNumber);

module.exports = route;
