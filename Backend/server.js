const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require("./models/User");
const Recipe = require("./models/Recipe");


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://backend-en:backend123@backend-en.apgdp.mongodb.net/Backend-EN?retryWrites=true&w=majority&appName=Backend-EN", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Schema & Model
const EntrySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});
const Entry = mongoose.model("user", EntrySchema);

app.get('/', async(req, res)=> {
  res.json("woringggg")
})

//Register route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await Entry.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEntry = new Entry({ username, email, password: hashedPassword });

    await newEntry.save();
    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt for:", email); // Debugging

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found!"); // Debugging
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password!"); // Debugging
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    console.log("Login successful!"); // Debugging
    res.json({ success: true, message: "Login successful" });
    
  } catch (error) {
    console.error("Login error:", error); // Debugging
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// API to Add Recipe
app.post('/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

// API to Get All Recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});


//Delete recipe
app.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Received delete request for ID:", id); // Debugging
  try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) {
          return res.status(404).json({ message: "Recipe not found" });
      }
      res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ message: "Server error" });
  }
});

//Editing recipes
app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  console.log("Received update request for ID:", id, "with data:", updatedData); // Debugging

  try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedRecipe) {
          return res.status(404).json({ message: "Recipe not found" });
      }
      res.json(updatedRecipe);
  } catch (error) {
      console.error("Error updating recipe:", error);
      res.status(500).json({ message: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));