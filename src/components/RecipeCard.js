import React from "react";
import CustomImage from "./CustomImage";

export default function RecipeCard({ recipe, onDelete, onEdit }) {
  if (!recipe) return null;

  return (
    <div className="recipe-card">
      <div className="recipe-card-info">
        <CustomImage imgSrc={recipe.image} pt="65%" />
        <p className="recipe-title">{recipe.name}</p>
        <p className="recipe-desc">{recipe.description}</p>
        <p className="recipe-ingredients">
          <strong>Ingredients:</strong> {recipe.ingredients}
        </p>
        <p className="recipe-time">
          <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
        </p>

        {/* Buttons for Edit and Delete */}
        <div className="recipe-buttons">
          <button className="edit-btn" onClick={() => onEdit(recipe)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(recipe._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
