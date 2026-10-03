import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import MenuDetails from "./Pages/MenuDetails/MenuDetails";
import MenuDetailsSection from "./Pages/MenuDetailsSection/MenuDetailsSection";
import Gallery from "./Pages/Gallery/Gallery";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Faq from "./Pages/Faq/Faq";
import Contact from "./Pages/Contact/Contact";

// Action Route Components
// import Account from "./Components/Account/Account";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import CartDetails from "./Components/CartDetails/CartDetails";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";
import FloatingSupport from "./Components/FloatingSupport/FloatingSupport";
import FloatingEnquire from "./Components/FloatingEnquire/FloatingEnquire";

// Automatically scrolls the window to the top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <Routes>
        {/* Main Navigation Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/menu" element={<MenuDetails />} />
        <Route path="/menu-details" element={<MenuDetailsSection />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />

        {/* Action Routes */}
        <Route path="/cart" element={<CartDetails/>} />
        {/* <Route path="/account" element={<Account />} /> */}




        </Routes>
        <FloatingForm/>
        <Footer />

       <FloatingIcons/>

       <FloatingEnquire
        triggerOnLoad={false}
       />

       <FloatingSupport/>

    </BrowserRouter>
  );
};

export default App;