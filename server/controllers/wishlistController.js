const Recipe = require("../models/Recipe");
const User = require('../models/User');

// Add to Wishlist
const addToWishlist = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id; // Retrieved from middleware

    try {
        const recipeExists = await Recipe.findById(recipeId);
        if (!recipeExists) {
            return res.status(404).json({ error: "Recipe not found." });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { wishlist: recipeId } }, // Prevent duplicates
            { new: true }
        ).populate('wishlist');

        res.status(200).json({ message: "Added to wishlist!", wishlist: updatedUser.wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add to wishlist." });
    }
};

// Remove from Wishlist
const removeFromWishlist = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { wishlist: recipeId } },
            { new: true }
        ).populate('wishlist');

        res.status(200).json({ message: "Removed from wishlist!", wishlist: updatedUser.wishlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to remove from wishlist." });
    }
};

// Check if Recipe is in Wishlist
const isRecipeInWishlist = async (req, res) => {
    const { recipeId } = req.params;
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found." });

        const isWishlisted = user.wishlist.includes(recipeId);
        res.status(200).json({ isWishlisted });
    } catch (error) {
        console.error("Error checking wishlist status:", error);
        res.status(500).json({ error: "Failed to check wishlist status." });
    }
};

// Get User's Wishlist
const getWishlistRecipes = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).populate('wishlist');
        if (!user) return res.status(404).json({ error: "User not found." });

        res.status(200).json(user.wishlist);
    } catch (error) {
        console.error("Error fetching wishlist recipes:", error);
        res.status(500).json({ error: "Failed to fetch wishlist recipes." });
    }
};


module.exports = {
    addToWishlist, removeFromWishlist, getWishlistRecipes, isRecipeInWishlist
};