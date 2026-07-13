import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Breadcrumb from "./Components/Breadcrumb/Breadcrumb";
// Import your image here
import BannerImage from "./assets/your-image-name.jpg"; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Breadcrumb 
        title="ABOUT US" 
        backgroundImage={BannerImage}
        links={[
          { label: 'Home', url: '/' },
          { label: 'About us', url: '/about' }
        ]} 
      />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;