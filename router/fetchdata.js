// External Module
const express = require("express");
const fetchRouter = express.Router();

// Local Module
const fetchController = require("../controllers/fetchcontroller.js");

fetchRouter.get("/getCar", fetchController.getCar);
fetchRouter.get("/getpackage",fetchController.getpackages)

module.exports = fetchRouter;