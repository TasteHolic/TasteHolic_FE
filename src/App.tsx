import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "../Pages/SearchPage";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/search" element=<SearchPage /> />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
