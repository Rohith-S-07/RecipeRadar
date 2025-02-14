const express = require("express");
const { addRecipe, getRecipes, searchRecipes, getRecipeById, getRecipesByCategory } = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post("/add", authMiddleware, upload.single("image"), addRecipe);
router.get("/", getRecipes);
router.get("/search", searchRecipes); // Search recipes by title/tags
router.get("/:id", getRecipeById); // Get a single recipe by ID
router.get("/category/:category", getRecipesByCategory);


module.exports = router;