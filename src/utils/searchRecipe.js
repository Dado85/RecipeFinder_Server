const axios = require("axios");
const { API_KEY } = require("../config/server-config");
async function fetchRecipe(options) {
  try {
    const params = {
      apiKey: API_KEY,
      instructionsRequired: true,
      addRecipeInformation: true,
      ...options, // spread dynamic options only
    };

    const res = await axios.get("https://api.spoonacular.com/recipes/complexSearch", { params });
    return res.data;
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = fetchRecipe;
