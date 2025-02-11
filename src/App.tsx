import React from "react";
import SearchPage from "../pages/SearchPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SignupForm from "./pages/signupForm";
import MyRecipePage from "./pages/MyRecipePage";
import RecipeExplore from "./pages/RecipeExplore";
import TasteNote from "./pages/TastingNote";
import ProfileEditPage from "./pages/ProfileEditPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/my-recipe" element={<MyRecipePage />} />
        <Route path="/recipe" element={<RecipeExplore />} />
        <Route path="/view-notes" element={<TasteNote />} />
        <Route path="/mypage/edit-profile" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
