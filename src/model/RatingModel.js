const {mongoose}=require("mongoose")

const RatingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required:true
  },
  recipeId:{
    type:String,
    required:true
  },
  rating: {
    type: String,
    required:true
  },
  reviews: {
    type: String,
    required:true
  },
},{timestamps:true});
RatingSchema.index({ userId: 1, recipeId: 1 }, { unique: true });
const RatingModel = mongoose.model("rating", RatingSchema);
module.exports = RatingModel;
