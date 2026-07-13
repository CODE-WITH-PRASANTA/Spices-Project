import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Blog from "./Components/Blog/Blog";
import Footer from "./Components/Footer/Footer";
import BlogDetails from "./Components/BlogDetails/BlogDetails";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Blog" element={<Blog/>} />
        <Route path="/BlogDetails" element={<BlogDetails/>} />
      
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;