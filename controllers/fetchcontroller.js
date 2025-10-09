const cardetailsModel=require("../models/carDetailsModel");
const packageDetailsModel=require('../models/packagedetailsModel');
const userDetailsModel=require('../models/UserModel')

exports.getCar=async (req,res,next)=>{
  const fetchCar = await cardetailsModel.find();
  res.json(fetchCar);
}
exports.getPackages=async(req,res,next)=>{
const fetchPackage=await packageDetailsModel.find();
res.json(fetchPackage);
}
exports.getUser=async(req,res,next)=>{
  const fetchUser=await userDetailsModel.find();
  res.json(fetchUser);
}