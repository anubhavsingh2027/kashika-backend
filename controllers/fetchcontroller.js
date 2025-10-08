const cardetailsModel=require("../models/cardetailsModel");
const packageDetailsModel=require('../models/packagedetailsModel');


exports.getCar=async (req,res,next)=>{
  const fetchCar = await cardetailsModel.find();
  res.json(fetchCar);
}
exports.getpackages=async(req,res,next)=>{
const fetchPackage=await packageDetailsModel.find();
res.json(fetchPackage);
}