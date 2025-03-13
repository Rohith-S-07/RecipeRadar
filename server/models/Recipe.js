const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userName: { type: String, required: true },
    text: { type: String, required: true },
    profilePicture: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    ingredients: [{ name: { type: String, required: true }, quantity: { type: String, required: true } }],
    steps: { type: [String], required: true },
    image: { type: String, required: true },
    authorID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    authorName: { type: String, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    tags: { type: [String] },
    videoLink: { type: String },
    nutrition: {
        calories: { type: Number, default: 0 },
        protein: { type: Number, default: 0 },
        carbohydrates: { type: Number, default: 0 },
        fat: { type: Number, default: 0 },
        sugar: { type: Number, default: 0 },
        fiber: { type: Number, default: 0 },
        sodium: { type: Number, default: 0 },
        calcium: { type: Number, default: 0 },
        iron: { type: Number, default: 0 },
    },
    comments: [commentSchema],
    summary: { type: String },
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, required: true }
    }],    
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recipe', recipeSchema);