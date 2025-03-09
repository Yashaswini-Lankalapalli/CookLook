import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RecipeInput from "./pages/RecipeInput"

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/Home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/RecipeInput" element={<RecipeInput />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App;
