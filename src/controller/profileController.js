const { userModel } = require("../model");
const { findByIdAndUpdate } = require("../model/userModel");

async function getProfile(req, res) {
  try {
    const userId = req?.user?._id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        sucess: false,
        data: "error",
      });
    }
    user.password = null;

    return res.status(200).json({
      sucess: true,
      message: "user fetched sucessfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
async function editPreferences(req, res) {
  try {
    const {
      diet,
      allergies,
      skillLevel,
      includeIngredients,
      excludeIngredients,
    } = req.body;
    const userId = req.user._id;
    const updateUser = await userModel.findByIdAndUpdate(
      userId,
      { diet, allergies, skillLevel, includeIngredients, excludeIngredients },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        sucess: false,
        data: "invalid credntials",
      });
    }
    return res.status(200).json({
      sucess: true,
      message: "preferences update sucessfully",
      data: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      data: error.message,
    });
  }
}
module.exports = { getProfile,editPreferences };
