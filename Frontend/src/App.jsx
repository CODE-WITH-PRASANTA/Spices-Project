import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
<<<<<<< HEAD
import About from "./Pages/About/About";
import Faqs from "./Pages/Faqs/Faqs";
import ContactUs from "./Pages/ContactUs/ContactUs";
=======
import Footer from "./Components/Footer/Footer";
>>>>>>> 4d64763499523f3b64edbf01c74805e87974c223


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

      <Footer />
    </BrowserRouter>
  );
};

export default App;