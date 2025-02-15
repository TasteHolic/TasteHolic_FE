import React from "react";
import SearchPage from "../pages/SearchPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SignupForm from "./pages/signupForm";
import MyRecipePage from "./pages/MyRecipePage";
import RecipeExplore from "./pages/RecipeExplore";
import TasteNote from "./pages/TastingNote";
import ProfileEditPage from "./pages/ProfileEditPage";
import LoginPage from "./pages/LoginPage";
import SignupNextPage from "./pages/SignupNextPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileNextPage from "./pages/ProfileEditNextPage";
import DeleteAccount from "./pages/DeleteAccount";
import DeleteAccountNextPage from "./pages/DeleteAccountNextPage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mypage" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signup/done" element={<SignupNextPage />} />
        <Route path="/my-recipe" element={<MyRecipePage />} />
        <Route path="/recipe" element={<RecipeExplore />} />
        <Route path="/view-notes" element={<TasteNote />} />
        <Route path="/mypage/edit-profile" element={<ProfileEditPage />} />
        <Route path="/mypage/edit-profile/done" element={<ProfileNextPage />} />
        <Route path="/mypage/delete-account" element={<DeleteAccount />} />
        <Route
          path="/mypage/delete-account/done"
          element={<DeleteAccountNextPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
