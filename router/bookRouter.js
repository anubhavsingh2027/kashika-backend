// External Module
const express = require("express");
const bookRouter = express.Router();

// Local Module
const bookController = require("../controllers/userController.js");


bookRouter.post("/bookPackage/:id", bookController.bookPackage);
bookRouter.post("/carbooking/:id",bookController.bookCar)
bookRouter.get("/userHistory/:id",bookController.userHistory);
module.exports = bookRouter;