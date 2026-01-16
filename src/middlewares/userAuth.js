const jwt=require("jsonwebtoken");
const { JWT_KEY } = require("../config/server-config");
function userAuth(req,res,next){
  try {
    const token=req?.cookies?.token;
    if(!token){
          return res.status(401).json({ msg: "No token, auth denied" });
    }
    const decodeInfo=jwt.verify(token,JWT_KEY);
    
    req.user=decodeInfo;
    next();
  } catch (error) {
      return res.status(401).json({ msg: "Invalid or expired token" });
  }
}
module.exports=userAuth;