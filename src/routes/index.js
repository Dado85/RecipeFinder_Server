const express=require("express");
const authRouter = require("./v1/authRouter");
const profileRouter = require("./v1/profileRouter");
const recipeRouter = require("./v1/recipeRouter");
const v1Router=express.Router();
v1Router.use("/auth",authRouter)
v1Router.use("/user",profileRouter);
v1Router.use("/recipe",recipeRouter);
module.exports=v1Router