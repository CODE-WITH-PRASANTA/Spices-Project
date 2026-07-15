import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./AppLayout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Lead from "./Components/Lead/Lead";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/admin/lead" element={<Lead />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
