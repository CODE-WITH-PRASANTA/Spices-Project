import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./AppLayout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import BestProduct from "./Components/BestProduct/BestProduct";
import ContactUs from "./Components/ContactUs/ContactUs";
import Testimonial from "./Pages/Testimonial/Testimonial";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="admin/best-product" element={<BestProduct/>}/>
          <Route path="admin/contact-us" element={<ContactUs/>}/>
        <Route path="/admin/testimonial" element={<Testimonial/>}/>
        <Route path="/admin/blog-management" element={<BlogManagement/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
