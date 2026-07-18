import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Blog from "./Components/Blog/Blog";
import BlogDetails from "./Components/BlogDetails/BlogDetails";

// Pages
import Home from "./pages/Home/Home";
import About from "./Pages/About/About";
import Faqs from "./Pages/Faqs/Faqs";
import ContactUs from "./Pages/ContactUs/ContactUs";

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogdetails" element={<BlogDetails />} />

        {/* FAQ */}
        <Route path="/faq" element={<Faqs />} />

        {/* Contact */}
        <Route path="/contact" element={<ContactUs />} />
      </Routes>

      {/* Footer Always Visible */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;