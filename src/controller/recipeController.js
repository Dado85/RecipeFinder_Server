const { userModel, RatingModel } = require("../model");
const fetchRecipe = require("../utils/searchRecipe");

async function searchRecipe(req, res) {
  try {
    const {
      query,
      cuisine,
      mealType,
      maxTime,
      addRecipeNutrition,
      includeIngredients,
      excludeIngredients,
    } = req.query;
    const userId = req.user._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ sucess: false, message: "user not found" });
    }
    const searchFilters = {};

    if (query) searchFilters.query = query;
    if (cuisine) searchFilters.cuisine = cuisine;
    if (mealType) searchFilters.type = mealType;
    if (maxTime) searchFilters.maxReadyTime = Number(maxTime);
    if (includeIngredients)
      searchFilters.includeIngredients = includeIngredients;
    if (excludeIngredients)
      searchFilters.excludeIngredients = excludeIngredients;
    if (addRecipeNutrition === "true") searchFilters.addRecipeNutrition = true;

    const data = await fetchRecipe(searchFilters);
    return res.status(200).json({
      sucess: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
async function rateRecipe(req, res) {
  try {
    const loggedinUser = req?.user?._id;
    const { reviews, rating } = req?.body;
    const { recipeId } = req?.params;
    const existingRating = await RatingModel.findOne({
      userId: loggedinUser,
      recipeId,
    });
    if (!existingRating) {
      const newRating = await RatingModel.create({
        userId: loggedinUser,
        recipeId,
        rating,
        reviews,
      });
      return res.status(200).json({
        sucess: true,
        message: "reviews and rating added sucessfully",
        data: newRating,
      });
    }
    existingRating.rating = rating;
    existingRating.reviews = reviews;
    await existingRating.save();
    return res.status(200).json({
      sucess: true,
      message: "update rating sucessfully",
      data: existingRating,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
async function getAllReviews(req, res) {
  try {
    const { recipeId } = req.params;
    const existRating = await RatingModel.find({ recipeId }).populate(
      "userId",
      "name",
    );
    if (!existRating || existRating.length === 0) {
      return res.status(200).json({
        sucess: true,
        message: "No rating or reviews present",
        data: [],
      });
    }
    const reviews = existRating;
    return res.status(200).json({
      sucess: true,
      message: "reviews fetched sucessfully",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
module.exports = { searchRecipe, rateRecipe, getAllReviews };
