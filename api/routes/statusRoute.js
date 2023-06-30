const express = require("express");
const route = express.Router();
const statusController = require("../controllers/Status");

route.post("/", statusController.addStatus);
route.get("/", statusController.getAllStatus);
// route.get('/:id', statusController.getStatusById)

module.exports = route;
