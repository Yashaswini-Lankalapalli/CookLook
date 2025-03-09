const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: String,
    image: String,
    cookingTime: Number
  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;