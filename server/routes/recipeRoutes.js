const express = require('express');
const { addRecipe, getRecipes } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Routes
router.post('/add', authMiddleware, upload.single('image'), addRecipe); // Now handling file upload
router.get('/', getRecipes);

module.exports = router;
