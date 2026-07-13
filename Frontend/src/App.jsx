import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;