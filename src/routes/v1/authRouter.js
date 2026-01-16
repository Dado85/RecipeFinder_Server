const express=require("express");
const { signup, login, logout } = require("../../controller/authController");
const userAuth = require("../../middlewares/userAuth");

const authRouter=express.Router();
authRouter.post("/signup",signup);
authRouter.post("/login",login);
authRouter.post("/logout",logout);
module.exports=authRouter;