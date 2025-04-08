const express = require('express');
const router = express.Router();
const { getAdminStats, getUsers, deleteUser, getRecipes, deleteRecipe, getAllMessages, updateMessageStatus } = require('../controllers/adminController');

router.get('/stats', getAdminStats);
router.get("/getUsers", getUsers);
router.delete("/deleteUser/:id", deleteUser);

router.get("/getRecipes", getRecipes);
router.delete("/deleteRecipe/:id", deleteRecipe);

router.get('/getFeedbacks', getAllMessages);
router.put('/updateFeedbackStatus/:id', updateMessageStatus);

module.exports = router;