const userController = require("../controllers/User");
const express = require("express");
const router = express.Router();

router.get("/", userController.getAllUser);

module.exports = router;
