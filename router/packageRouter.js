// External Module
const express = require("express");
const packageRouter = express.Router();

// Local Module
const packageController = require("../controllers/userController.js");


packageRouter.post("/bookPackage/:id", packageController.bookPackage);


module.exports = packageRouter;