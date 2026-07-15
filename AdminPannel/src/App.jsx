import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./AppLayout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import OurTeam from "./Components/OurTeam/OurTeam";
import PremiumQuality from "./Components/PremiumQuality/PremiumQuality";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/admin/our-team" element={<OurTeam/>}/>
        <Route path="/admin/premium-product" element={<PremiumQuality/>}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
