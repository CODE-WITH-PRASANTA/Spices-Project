import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Blog from "./Components/Blog/Blog";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog/>} />
      
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;