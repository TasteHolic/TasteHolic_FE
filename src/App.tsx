import React from "react";
import SearchPage from "../pages/SearchPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SignupForm from "./pages/signupForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
};

export default App;
