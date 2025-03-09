import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../components/EditRecipeModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${id}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe.");
    }
  };

  const onEdit = (recipe) => {
    setEditingRecipe(recipe); // Open modal with selected recipe
  };

  const handleRecipeAdded = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const handleUpdateRecipe = async () => {
    if (!editingRecipe) return;

    try {
      const response = await axios.put(
        `http://localhost:5000/recipes/${editingRecipe._id}`,
        editingRecipe
      );

      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe._id === editingRecipe._id ? response.data : recipe
        )
      );
      setEditingRecipe(null); // Close the modal
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert("Failed to update recipe.");
    }
  };

  return (
    <div>
      <h1>Recipes</h1>
      <br />
      <button className="btn add-recipe" onClick={() => navigate("/RecipeInput")}>
        Add Recipe
      </button>
      <div className="recipes-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} onDelete={onDelete} onEdit={onEdit} />
          ))
        ) : (
          <p>No recipes available. Add one!</p>
        )}
      </div>

      {/* Edit Recipe Modal */}
      {editingRecipe && (
        <EditRecipeModal
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onSave={handleUpdateRecipe}
          setEditingRecipe={setEditingRecipe}
        />
      )}
    </div>
  );
}
