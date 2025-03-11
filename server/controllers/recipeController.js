const axios = require('axios');
const Recipe = require("../models/Recipe");
const qs = require('qs');

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

const getNutritionData = async (ingredients) => {
    try {
        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            console.error("Invalid ingredients format:", ingredients);
            return null;
        }

        // console.log("Processing Ingredients:", ingredients);

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

        // console.log("Formatted Ingredient List:", ingredientList);

        // Make API request to parse ingredients and fetch nutrition
        const response = await axios({
            method: 'post',
            url: `https://api.spoonacular.com/recipes/parseIngredients`,
            data: qs.stringify({
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

        // console.log("Received Ingredients:", ingredients);

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

        // console.log("Final Recipe Object:", newRecipe);

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

const getUserRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await Recipe.find({ authorID: userId });

        res.status(200).json(recipes);
    } catch (error) {
        console.error("Error fetching user recipes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.user.id;

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        // Ensure the logged-in user is the owner of the recipe
        if (recipe.authorID.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this recipe" });
        }

        await Recipe.findByIdAndDelete(recipeId);
        res.status(200).json({ message: "Recipe deleted successfully" });

    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Update a recipe
const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (req.file) {
            updateData.image = req.file.path.startsWith("/") ? req.file.path : `/${req.file.path}`;
        }

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error });
    }
};

const addComment = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const { text } = req.body;
        const userID = req.user.id;
        const userName = req.user.name;
        const profilePicture = req.user.profilePicture;

        if (!text) {
            return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        const newComment = { userID, userName, profilePicture, text, createdAt: new Date() };

        recipe.comments.push(newComment);

        // Generate a new summary
        const updatedSummary = await generateCommentSummary(recipe.comments);

        // Save updated summary in the database
        recipe.summary = updatedSummary;

        await recipe.save();

        res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getComments = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipe = await Recipe.findById(recipeId).select("comments");

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipe.comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const generateCommentSummary = async (comments) => {
    if (comments.length === 0) {
        return "No reviews yet.";
    }

    const commentTexts = comments.map(comment => comment.text).join("\n");

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GEMINI_API_KEY}`,
            {
                contents: [{
                    role: "user",
                    parts: [
                        {
                            text: `Summarize the following user comments for a recipe in a neutral and structured tone as a summary.
                            Avoid using words like "customers" or "these reviews" or "feedback." Instead, refer to individuals as people 
                            who tried the recipe. Focus on aspects such as taste, texture, ease of preparation, and overall cooking experience. 
                            Format the response as a single paragraph in about 50 - 100 words without headings or bold text.
                            User reviews: 
                            "${commentTexts}"`
                        }
                    ]
                }]
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        return response.data.candidates[0]?.content?.parts[0]?.text;
    } catch (error) {
        console.error("Error generating summary:", error.response?.data || error.message);
        return "Summary generation failed.";
    }
};

module.exports = {
    addRecipe, getRecipes, searchRecipes, getRecipeById,
    getRecipesByCategory, getUserRecipes, updateRecipe, deleteRecipe,
    addComment, getComments
};