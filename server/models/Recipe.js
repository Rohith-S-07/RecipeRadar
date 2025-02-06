const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name: { type: String, required: true }, // Ingredient name
            quantity: { type: String, required: true }, // e.g., "1 cup", "2 tbsp"
        },
    ],
    steps: {
        type: [String], // Array of steps for preparation
        required: true,
    },
    image: {
        type: String, // URL or path to the image
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User who posted the recipe
        required: true,
    },
    cookingTime: {
        type: Number, // Time in minutes
        required: true,
    },
    servings: {
        type: Number, // Number of servings
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Difficulty level
        required: true,
    },
    tags: {
        type: [String], // Array of tags for filtering/searching
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);
