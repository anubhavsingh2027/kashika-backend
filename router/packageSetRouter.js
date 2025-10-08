// External Module
const express = require("express");
const packageAddRouter = express.Router();

// Local Module
const packageaddController = require("../controllers/adminController");


packageAddRouter.post("/createPackage", packageaddController.createPackage);
packageAddRouter.delete("/packagedelete/:id", packageaddController.deletepackage);


module.exports = packageAddRouter;