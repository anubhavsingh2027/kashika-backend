// External Module
const express = require("express");
const carAddRouter = express.Router();

// Local Module
const carAddController = require("../controllers/adminController");
carAddRouter.get("/addCar",(req,res,next)=>{
  return res.json("hey ");
})
carAddRouter.post("/addCar", carAddController.createCar);
carAddRouter.delete("/delete/:id", carAddController.deleteCar);



module.exports = carAddRouter;