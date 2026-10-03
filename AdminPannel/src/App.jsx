import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// =====================================================
// LAYOUT
// =====================================================

import MainLayout from "./Layout/MainLayout/MainLayout";

// =====================================================
// PAGES / COMPONENTS
// =====================================================

import DashBoard from "./Pages/DashBoard/DashBoard";
import Gallery from "./Components/Gallery/Gallery";
import ContactLead from "./Components/ContactLead/ContactLead";
import Order from "./Components/Order/Order";
import Testimonial from "./Components/Testimonial/Testimonial";
import Menu from "./Components/Menu/Menu";
import Login from "./Components/Login/Login";
import Enquires from "./Components/Enquires/Enquires";

// =====================================================
// PROTECTED ROUTE
// =====================================================

const ProtectedRoute = ({ children }) => {
  const isAuthenticated =
    sessionStorage.getItem("isAdminAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// =====================================================
// APP
// =====================================================

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            LOGIN PAGE

            IMPORTANT:
            Login is OUTSIDE MainLayout.

            Therefore:
            - No Sidebar
            - No Topbar
            - No Admin Layout
            - Full screen Login page
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* =================================================
            PROTECTED ADMIN AREA

            MainLayout contains:
            - Sidebar
            - Topbar
            - Outlet
        ================================================= */}

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* =================================================
              ROOT
          ================================================= */}

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="/dashboard"
            element={<DashBoard />}
          />

          {/* =================================================
              GALLERY
          ================================================= */}

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          {/* =================================================
              CONTACT LEADS
          ================================================= */}

          <Route
            path="/contact-lead"
            element={<ContactLead />}
          />

          {/* =================================================
              ORDERS
          ================================================= */}

          <Route
            path="/order"
            element={<Order />}
          />

          {/* =================================================
              TESTIMONIALS
          ================================================= */}

          <Route
            path="/testimonial"
            element={<Testimonial />}
          />

          {/* =================================================
              Enquires
          ================================================= */}

          <Route
            path="/enquire"
            element={<Enquires/>}
          />

          {/* =================================================
              MENU
          ================================================= */}

          <Route
            path="/menu"
            element={<Menu />}
          />

        </Route>

        {/* =================================================
            FALLBACK

            Unknown URL -> Login
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;