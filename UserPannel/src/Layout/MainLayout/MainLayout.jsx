import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`main-layout ${
        isSidebarCollapsed ? "main-layout--collapsed" : ""
      }`}
    >
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="main-layout__content-wrapper">
        <Topbar
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={isSidebarCollapsed}
        />

        <div className="main-layout__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;