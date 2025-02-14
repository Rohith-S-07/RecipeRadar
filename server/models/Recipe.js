const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    ingredients: [{ name: { type: String, required: true }, quantity: { type: String, required: true } }],
    steps: { type: [String], required: true },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: { type: [String] },
    videoLink: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);