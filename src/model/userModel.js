const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { JWT_KEY } = require("../config/server-config");

const userSchema = new mongoose.Schema(
    {
  name: {
    type: String,
    index:true,
    required: true,
    trim:true
  }, 
  emailId: {
    type: String,
    required: true,
    lowercase:true,
    unique:true,
    trim:true
  },
  password: { type: String, required: true },
  diet: {
    type: [String],   
    default: []
  },
  allergies: {
    type: [String],      
    default: []
  },
  skillLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
  includeIngredients: {
    type: [String],      
    default: []
  },
  excludeIngredients: {
    type: [String],       
    default: []
  }
},{timestamps:true});
userSchema.methods.getJWT=async function(){
     const token=await jwt.sign({_id:this._id},JWT_KEY,{expiresIn:"1d"});
     return token;
}
userSchema.methods.comparePassword=async function(password){
     return await bcrypt.compare(password,this.password);
}

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
