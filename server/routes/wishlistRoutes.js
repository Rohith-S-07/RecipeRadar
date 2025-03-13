const express = require('express');
const router = express.Router();
const { addToWishlist, removeFromWishlist, getWishlistRecipes, isRecipeInWishlist } = require('../controllers/wishlistController');
const authenticateUser = require('../middleware/authMiddleware');

// Add to Wishlist
router.post('/:recipeId', authenticateUser, addToWishlist);

// Remove from Wishlist
router.delete('/:recipeId', authenticateUser, removeFromWishlist);

//Check if the Recipe is in Wishlist
router.get('/status/:recipeId', authenticateUser, isRecipeInWishlist);

// Get User's Wishlist
router.get('/recipes', authenticateUser, getWishlistRecipes);

module.exports = router;