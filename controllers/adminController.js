const carDetailsModel=require("../models/carDetailsModel");
const packageDetailsModel=require('../models/packagedetailsModel');



exports.createPackage = async (req, res, next) => {
  try {
    const { packageName, place, url, description, price ,packageDuration} = req.body;
    const packageInfo = new packageDetailsModel({
      packageName,
      place,
      packageDuration,
      url,
      description,
      price
    });

    await packageInfo.save();

    res.status(201).json({
      success: true,
      message: "Package created successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};


exports.deletepackage =async (req,res,next)=>{
  const id = req.params.id;
  await packageDetailsModel.findByIdAndDelete(id);
  res.status(200).json({
      success: true,
      message: "Package deleted successfully!",
    });
}


exports.createCar = async (req, res, next) => {
  try{
const { carName,url,description,price,totalSeats} = req.body;
  const carInfo = new carDetailsModel({ carName,url,description,price,totalSeats });
  await carInfo.save();
    res.status(201).json({
      success: true,
      message: "Car booked successfully!",
    });

}catch(err){

 res.status(500).json({
      success: false,
      message:"Server Error",
      error:err.message
    });

  };

};


exports.deleteCar =async (req,res,next)=>{
 const id = req.params.id;
  await carDetailsModel.findByIdAndDelete(id);
  res.status(200).json({
      success: true,
      message: "Car deleted successfully!",
    });
}