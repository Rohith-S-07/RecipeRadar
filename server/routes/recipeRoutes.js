const express = require("express");
const { addRecipe, getRecipes, searchRecipes, getRecipeById, getRecipesByCategory, getUserRecipes, deleteRecipe, updateRecipe } = require("../controllers/recipeController");
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
router.get("/search", searchRecipes);
router.get("/view/:id", getRecipeById);
router.get("/category/:category", getRecipesByCategory);
router.get("/my-recipes", authMiddleware, getUserRecipes);
// router.put('/edit/:id', authMiddleware, updateRecipe);
router.put('/edit/:id', upload.single('image'), updateRecipe);
router.delete("/delete/:id", authMiddleware, deleteRecipe);


module.exports = router;