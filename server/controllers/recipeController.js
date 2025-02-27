const axios = require('axios');
const Recipe = require("../models/Recipe");
const qs = require('qs');

const SPOONACULAR_API_KEY = '5fab7b46f2964aef89cf3c2eedb990a5';

const getNutritionData = async (ingredients) => {
    try {
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            console.error("Invalid ingredients format:", ingredients);
            return null;
        }

        console.log("Processing Ingredients:", ingredients);

        // Convert ingredients into Spoonacular API format
        const ingredientList = ingredients
            .map(ing => {
                if (!ing.quantity || !ing.name) {
                    console.warn("Skipping invalid ingredient:", ing);
                    return null;
                }
                return `${ing.quantity} ${ing.name}`;
            })
            .filter(Boolean) // Remove null/undefined values
            .join('\n'); // Spoonacular expects newline-separated values

        if (!ingredientList) {
            console.error("No valid ingredients to process.");
            return null;
        }

        console.log("Formatted Ingredient List:", ingredientList);

        // Make API request to parse ingredients and fetch nutrition
        const response = await axios({
            method: 'post',
            url: `https://api.spoonacular.com/recipes/parseIngredients`,
            data: qs.stringify({ // Convert to x-www-form-urlencoded format
                ingredientList: ingredientList,
                servings: 1,
                includeNutrition: true
            }),
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: { apiKey: SPOONACULAR_API_KEY }
        });

        let nutrition = {
            calories: 0,
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            sugar: 0,
            fiber: 0,
            sodium: 0,
            calcium: 0,
            iron: 0
        };

        response.data.forEach(ing => {
            if (ing.nutrition) {
                ing.nutrition.nutrients.forEach(nutrient => {
                    switch (nutrient.name.toLowerCase()) {
                        case 'calories': nutrition.calories += nutrient.amount; break;
                        case 'protein': nutrition.protein += nutrient.amount; break;
                        case 'carbohydrates': nutrition.carbohydrates += nutrient.amount; break;
                        case 'fat': nutrition.fat += nutrient.amount; break;
                        case 'sugar': nutrition.sugar += nutrient.amount; break;
                        case 'fiber': nutrition.fiber += nutrient.amount; break;
                        case 'sodium': nutrition.sodium += nutrient.amount; break;
                        case 'calcium': nutrition.calcium += nutrient.amount; break;
                        case 'iron': nutrition.iron += nutrient.amount; break;
                    }
                });
            }
        });

        Object.keys(nutrition).forEach(key => {
            nutrition[key] = parseFloat(nutrition[key].toFixed(2));
        });

        return nutrition;

    } catch (error) {
        console.error("Error fetching nutrition data:", error.response?.data || error.message);
        return null;
    }
};

const addRecipe = async (req, res) => {
    try {
        const { title, description, cookingTime, servings, difficulty, tags } = req.body;
        const ingredients = typeof req.body.ingredients === "string" ? JSON.parse(req.body.ingredients) : req.body.ingredients;
        const steps = typeof req.body.steps === "string" ? JSON.parse(req.body.steps) : req.body.steps;

        const authorID = req.user.id;
        const authorName = req.user.name;
        const image = req.file ? `/uploads/${req.file.filename}` : "";

        if (!title || !description || !ingredients.length || !steps.length || !cookingTime || !servings || !difficulty) {
            return res.status(400).json({ message: "Please fill all required fields" });
        }

        console.log("Received Ingredients:", ingredients);

        const nutrition = await getNutritionData(ingredients) || {};

        const newRecipe = new Recipe({
            title,
            description,
            ingredients,
            steps,
            cookingTime,
            servings,
            difficulty,
            tags,
            authorID,
            authorName,
            image,
            nutrition
        });

        console.log("Final Recipe Object:", newRecipe);

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
        const recipes = await Recipe.find().populate("authorID", "name");
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
        const recipe = await Recipe.findById(id).populate("authorID", "name");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error("Error fetching recipe:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get recipes by category (based on tags)
const getRecipesByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        // Find recipes where tags contain the category (case-insensitive)
        const recipes = await Recipe.find({
            tags: { $regex: category, $options: "i" }
        });

        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching category recipes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { addRecipe, getRecipes, searchRecipes, getRecipeById, getRecipesByCategory };