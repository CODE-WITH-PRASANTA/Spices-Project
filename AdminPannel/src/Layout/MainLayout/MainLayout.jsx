import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // =========================================================
  // DESKTOP SIDEBAR COLLAPSE / MOBILE SIDEBAR OPEN
  // =========================================================

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  };

  // =========================================================
  // MOBILE SIDEBAR CLOSE
  // =========================================================

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  return (
    <div
      className={`MainLayout ${
        isCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onToggleCollapse={toggleSidebar}
        onMobileClose={closeMobileSidebar}
      />

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {isMobileOpen && (
        <div
          className="MainLayout-overlay"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="MainLayout-container">
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="MainLayout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;