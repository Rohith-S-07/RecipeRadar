const express = require('express');
const router = express.Router();
const { getAdminStats, getUsers, deleteUser, getRecipes, deleteRecipe } = require('../controllers/adminController');

router.get('/stats', getAdminStats);
router.get("/getUsers", getUsers);
router.delete("/deleteUser/:id", deleteUser);

router.get("/getRecipes", getRecipes);
router.delete("/deleteRecipe/:id", deleteRecipe);

module.exports = router;