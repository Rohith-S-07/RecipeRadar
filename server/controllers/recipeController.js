const Recipe = require("../models/Recipe");

// Add a new recipe
const addRecipe = async (req, res) => {
    try {
        const { title, description, cookingTime, servings, difficulty, tags } = req.body;

        // Ensure ingredients and steps are parsed correctly
        const ingredients = typeof req.body.ingredients === "string" ? JSON.parse(req.body.ingredients) : req.body.ingredients;
        const steps = typeof req.body.steps === "string" ? JSON.parse(req.body.steps) : req.body.steps;

        const author = req.user.id; // Authenticated user ID
        const image = req.file ? `/uploads/${req.file.filename}` : "";

        // Validation: Ensure all required fields are filled
        if (!title || !description || !ingredients.length || !steps.length || !cookingTime || !servings || !difficulty) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        // Create new recipe object
        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            cookingTime,
            servings,
            difficulty,
            tags,
            author,
            image,
        });

        // Save to database
        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });

    } catch (error) {
        console.error("Error adding recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("author", "name");
        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Search recipes by title or tags
const searchRecipes = async (req, res) => {
    try {
        const { query } = req.query; // Get the search query from URL
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        // Search by title or tags (case insensitive)
        const recipes = await Recipe.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } },
            ],
        });

        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error searching recipes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a single recipe by ID
const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findById(id).populate("author", "name");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addRecipe, getRecipes, searchRecipes, getRecipeById };