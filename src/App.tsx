import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "pretendard/dist/web/static/pretendard.css";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;
