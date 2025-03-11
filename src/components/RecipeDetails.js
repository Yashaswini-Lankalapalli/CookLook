import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error("Error fetching recipe details:", error));
  }, [id]);

  if (!recipe) return <h2>Loading...</h2>;

  return (
    <div className="recipe-details-container">
      <h2>{recipe.name}</h2>
      <p>{recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <img src={recipe.image} alt={recipe.name} />
      <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
    </div>
  );
}
