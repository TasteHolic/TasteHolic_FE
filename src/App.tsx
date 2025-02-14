import React from "react";
import SearchPage from "../pages/SearchPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SignupForm from "./pages/signupForm";
import MyRecipePage from "./pages/MyRecipePage";
import RecipeExplore from "./pages/RecipeExplore";
<<<<<<< HEAD
import LoginPage from "./pages/LoginPage";
import TasteNote from "./pages/TastingNote";
import ProfileEditPage from "./pages/ProfileEditPage";
=======
import TasteNote from "./pages/TastingNote";
import ProfileEditPage from "./pages/ProfileEditPage";
import LoginPage from "./pages/LoginPage";
import SignupNextPage from "./pages/SignupNextPage";
>>>>>>> dcac93c0356fdefce01af7dc6118e035008b302e
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup/done" element={<SignupNextPage />} />
        <Route path="/my-recipe" element={<MyRecipePage />} />
        <Route path="/recipe" element={<RecipeExplore />} />
        <Route path="/view-notes" element={<TasteNote />} />
        <Route path="/mypage/edit-profile" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
