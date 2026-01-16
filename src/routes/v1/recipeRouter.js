const express=require("express");
const userAuth = require("../../middlewares/userAuth");
const {searchRecipe,rateRecipe, getAllReviews} = require("../../controller/recipeController");
const recipeRouter=express.Router();
recipeRouter.get("/search",userAuth,searchRecipe);
recipeRouter.post("/rating/:recipeId",userAuth,rateRecipe);
recipeRouter.get("/reviews/:recipeId",userAuth,getAllReviews)
module.exports=recipeRouter;