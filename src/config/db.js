const{DatabaseUrl}=require("./server-config")
const mongoose=require("mongoose")
async function connectDB() {
  await mongoose.connect(DatabaseUrl);

}
connectDB()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB connection failed:", err);
  });
  module.exports=connectDB;