import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import About from "./Pages/About/About";
import Faqs from "./Pages/Faqs/Faqs";
import ContactUs from "./Pages/ContactUs/ContactUs";

import Account from "./Pages/Account/Account";

import Shop from "./Pages/Shop/Shop";
import MainBlog from "./Pages/MainBlog/MainBlog";
import MainBlogDetails from "./Pages/MainBlogDetails/MainBlogDetails";



const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/faq" element={<Faqs/>} />
        <Route path="/contact" element={<ContactUs/>} />

        {/* Account */}
        <Route path="/account" element={<Account />} />

        

        {/* Blog */}
        <Route path="/blog" element={<MainBlog />} />
        
        {/* BlogDetails */}
        <Route path="BlogDetails" element={<MainBlogDetails/>} />
        



        {/* Shop */}
        <Route path="/Shop" element={<Shop />} />
        

      </Routes>

      {/* Footer Always Visible */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;