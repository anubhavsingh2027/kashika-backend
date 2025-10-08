// External Module
const express = require("express");
const carRouter = express.Router();

// Local Module
const carController = require("../controllers/userController");

carRouter.post("/carbooking/:id", carController.bookCar);

module.exports = carRouter;