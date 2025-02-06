const Recipe = require('../models/Recipe');

// Add a new recipe
const addRecipe = async (req, res) => {
  try {
      const { title, description, cookingTime, servings, difficulty, tags } = req.body;

      // Ensure ingredients and steps are parsed correctly
      const ingredients = typeof req.body.ingredients === 'string' ? JSON.parse(req.body.ingredients) : req.body.ingredients;
      const steps = typeof req.body.steps === 'string' ? JSON.parse(req.body.steps) : req.body.steps;

      const author = req.user.id; // Authenticated user ID
      const image = req.file ? `/uploads/${req.file.filename}` : '';

      if (!title || !description || !ingredients.length || !steps.length || !cookingTime || !servings || !difficulty) {
          return res.status(400).json({ message: 'Please fill all required fields' });
      }

      const newRecipe = new Recipe({
          title,
          description,
          ingredients,
          steps,
          image,
          cookingTime,
          servings,
          difficulty,
          tags: Array.isArray(tags) ? tags : tags ? tags.split(',').map(tag => tag.trim()) : [],
          author,
      });

      await newRecipe.save();
      res.status(201).json({ message: 'Recipe added successfully!', recipe: newRecipe });
  } catch (error) {
      console.error('Error adding recipe:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('author', 'name');
        res.status(200).json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addRecipe, getRecipes };