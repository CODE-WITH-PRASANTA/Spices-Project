import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Account from "./Pages/Account/Account";

 
const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar Always Visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Account" element={<Account/>} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;