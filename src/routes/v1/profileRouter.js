const express=require("express");
const userAuth = require("../../middlewares/userAuth");
const { getProfile, editPreferences } = require("../../controller/profileController");
const profileRouter=express.Router();
profileRouter.get("/view",userAuth,getProfile);
profileRouter.post("/edit",userAuth,editPreferences);
module.exports=profileRouter