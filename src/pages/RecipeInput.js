import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function AddRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const onRecipeAdded = location.state?.onRecipeAdded; // Extract function from navigation state

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    image: "",
    cookingTime: "",
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/recipes", recipe);
      alert("Recipe added successfully!");

      // Reset form after submission
      setRecipe({ name: "", description: "", ingredients: "", image: "", cookingTime: "" });

      // Update UI if function exists
      if (onRecipeAdded) {
        onRecipeAdded(response.data);
      }

      navigate("/Recipes"); // Navigate back to the recipes page
    } catch (error) {
      console.error("Error adding recipe:", error);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="recipe-form-container">
      <h2 className="form-title">Add a New Recipe</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-input"
            placeholder="Recipe Name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            className="form-textarea"
            placeholder="Description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="ingredients"
            className="form-textarea"
            placeholder="Ingredients (comma-separated)"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="image"
            className="form-input"
            placeholder="Image URL"
            value={recipe.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="cookingTime"
            className="form-input"
            placeholder="Cooking Time (minutes)"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">
          Add Recipe
        </button>
      </form>
    </div>
  );
}
