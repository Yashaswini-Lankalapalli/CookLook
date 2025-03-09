import React from "react";

export default function EditRecipeModal({ recipe, onClose, onSave, setEditingRecipe }) {
  if (!recipe) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Recipe</h2>
        <p>Name</p>
        <input
          type="text"
          value={recipe.name}
          onChange={(e) => setEditingRecipe({ ...recipe, name: e.target.value })}
        />
        <p>Description</p>
        <textarea
          value={recipe.description}
          onChange={(e) => setEditingRecipe({ ...recipe, description: e.target.value })}
        />
        <p>Ingredients</p>
        <input
          type="text"
          value={recipe.ingredients}
          onChange={(e) => setEditingRecipe({ ...recipe, ingredients: e.target.value })}
        />
        <p>Cooking time</p>
        <input
          type="number"
          value={recipe.cookingTime}
          onChange={(e) => setEditingRecipe({ ...recipe, cookingTime: e.target.value })}
        />

        <div className="modal-buttons">
          <button className="save-btn" onClick={onSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
