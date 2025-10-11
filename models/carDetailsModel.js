const mongoose=require('mongoose');

const carSchema=new mongoose.Schema({
  carName:{
    type:String,
    required:true
  },
  url:{
    type:String,
    required:true
  },
  totalSeats:{
  type:Number,
  required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
},
    {timeStamp:true}
);

module.exports=mongoose.model("caritems",carSchema);