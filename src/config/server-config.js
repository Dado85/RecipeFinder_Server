const dotenv=require("dotenv");
dotenv.config();
module.exports={
  PORT:process.env.PORT,
  DatabaseUrl:process.env.DATABASE_URL,
  JWT_KEY:process.env.JWT_SECRET,
  API_KEY:process.env.API_KEY
}