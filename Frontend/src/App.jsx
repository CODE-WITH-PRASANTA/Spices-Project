import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import About from "./Pages/About/About";
import Faqs from "./Pages/Faqs/Faqs";
import ContactUs from "./Pages/ContactUs/ContactUs";


const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/pages/faqs" element={<Faqs/>} />
        <Route path="/contact" element={<ContactUs/>} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;