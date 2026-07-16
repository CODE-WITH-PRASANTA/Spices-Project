import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./AppLayout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Lead from "./Components/Lead/Lead";
import OurTeam from "./Components/OurTeam/OurTeam";
import PremiumQuality from "./Components/PremiumQuality/PremiumQuality";
import BestProduct from "./Components/BestProduct/BestProduct";
import ContactUs from "./Components/ContactUs/ContactUs";
import Testimonial from "./Pages/Testimonial/Testimonial";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import Blog from "./Components/Blog/Blog";
import Shop from "./Components/Shop/Shop";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/admin/lead" element={<Lead />} />
        <Route path="/admin/our-team" element={<OurTeam/>}/>
        <Route path="/admin/premium-product" element={<PremiumQuality/>}/>
        <Route path="admin/best-product" element={<BestProduct/>}/>
          <Route path="admin/contact-us" element={<ContactUs/>}/>
        <Route path="/admin/testimonial" element={<Testimonial/>}/>
        <Route path="/admin/blog-management" element={<BlogManagement/>}/>
        <Route path="/admin/blog-posting" element={<Blog />} />
          <Route path="/admin/shop" element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
