import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import EditRecipeModal from "../components/EditRecipeModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalIsOpen(false);
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
            <RecipeCard key={recipe._id} recipe={recipe} onDelete={onDelete} onEdit={onEdit} onClick={() => openModal(recipe)} />
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

      {/* View Recipe Modal */}
      {/* View Recipe Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  className="modal"
  overlayClassName="modal-overlay"
>
  {selectedRecipe && (
    <div className="modal-content">
      <h2 className="modal-title">{selectedRecipe.name}</h2>
      <img src={selectedRecipe.image} alt={selectedRecipe.name} className="modal-image" />

      <div className="modal-section">
        <h3>Description</h3>
        <p>{selectedRecipe.description}</p>
      </div><br/>

      <div className="modal-section">
        <h3>Ingredients</h3>
        <p>{selectedRecipe.ingredients}</p>
      </div><br/>

      <div className="modal-section">
        <h3>Instructions</h3>
        <p>{selectedRecipe.instructions}</p>
      </div><br/>

      <p className="cooking-time"><strong>Cooking Time:</strong> {selectedRecipe.cookingTime} minutes</p>

      <button onClick={closeModal} className="btn">Close</button>
    </div>
  )}
</Modal>

    </div>
  );
}
