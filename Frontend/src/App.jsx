import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";



import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";

import Blog from "./Components/Blog/Blog";
import Footer from "./Components/Footer/Footer";

import Account from "./Pages/Account/Account";

import BlogDetails from "./Components/BlogDetails/BlogDetails";

import About from "./Pages/About/About";
import Faqs from "./Pages/Faqs/Faqs";
import ContactUs from "./Pages/ContactUs/ContactUs";

import Footer from "./Components/Footer/Footer";

 
const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Account" element={<Account/>} />


        <Route path="/Blog" element={<Blog/>} />
        <Route path="/BlogDetails" element={<BlogDetails/>} />
      

        <Route path="/about" element={<About/>} />
        <Route path="/pages/faqs" element={<Faqs/>} />
        <Route path="/contact" element={<ContactUs/>} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;