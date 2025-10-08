const mongoose=require('mongoose');

const packageSchema=new mongoose.Schema({
  packageName:{
   type: String,
   required:true
  },
  place:{
    type:String,
    required:true
  },
  url:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  }
},
    {timeStamp:true}
);

module.exports=mongoose.model("packagedetails",packageSchema);