import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import About from "./Pages/About/About";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;