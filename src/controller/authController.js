const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/index");
async function signup(req, res) {
  try {
    const { name, emailId, password } = req.body || {};
    if (!name || !emailId || !password) {
      return res.status(400).json({
        status: false,
        data: "invalid credeantials",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      emailId,
      password: hashPassword,
    });
    return res.status(200).json({
      sucess: true,
      message: "user created sucessfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
async function login(req, res) {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        status: false,
        data: "invalid credeantials",
      });
    }
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      return res.json({ msg: "Invalid credentials" });
    }
    const ispasswordvalid = await user.comparePassword(password);
    if (!ispasswordvalid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = await user.getJWT();
    res.cookie("token", token, { httpOnly: true });
    user.password=undefined
    return res.status(200).json({
      sucess: true,
      message: "login sucessfully",
      data:user
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
async function logout(req, res) {
  try {
     const token=req?.cookies?.token;
    if(!token){
          return res.status(401).json({ msg: "already logged out" });
    }
    res.cookie("token",null,{
      httpOnly:true,
      expires:new Date(0)
    })
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}

module.exports = { signup, login,logout };
