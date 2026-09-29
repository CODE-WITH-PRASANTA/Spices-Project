import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Boxes,
  Star,
  Mail,
  TicketPercent,
  UserCog,
  Settings,
  X,
  ChefHat,
  ChevronRight,
  Contact,
} from "lucide-react";

import "./Sidebar.css";

// =========================================================
// PALASH ESSENCE LOGO
// =========================================================

import palashLogo from "../../assets/PALASH ESSENCE LOGO.png";

// =========================================================
// SIDEBAR
// =========================================================

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onClose,
}) => {
  // =======================================================
  // MENU ITEMS
  // =======================================================

  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },

    {
      text: "Products",
      path: "/products",
      icon: Package,
    },

    {
      text: "Categories",
      path: "/categories",
      icon: Tags,
    },

    {
      text: "Orders",
      path: "/orders",
      icon: ShoppingBag,
    },

    {
      text: "Customers",
      path: "/customers",
      icon: Users,
    },

    {
      text: "Inventory",
      path: "/inventory",
      icon: Boxes,
    },

    {
      text: "Reviews",
      path: "/reviews",
      icon: Star,
    },

    {
      text: "Enquiries",
      path: "/enquiries",
      icon: Mail,
    },

    // =====================================================
    // CONTACT LEADS
    // =====================================================

    {
      text: "Contact Leads",
      path: "/contact-leads",
      icon: Contact,
    },

    {
      text: "Coupons & Offers",
      path: "/coupons",
      icon: TicketPercent,
    },

    {
      text: "Users",
      path: "/users",
      icon: UserCog,
    },

    {
      text: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  // =======================================================
  // MOBILE CLOSE
  // =======================================================

  const handleNavClick = () => {
    if (isMobileOpen && onClose) {
      onClose();
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <aside
      className={`Sidebar
        ${isCollapsed ? "collapsed" : ""}
        ${isMobileOpen ? "mobile-open" : ""}
      `}
    >
      {/* ===================================================
          BACKGROUND DECORATION
      =================================================== */}

      <div className="Sidebar-bg-glow glow-one" />
      <div className="Sidebar-bg-glow glow-two" />

      {/* ===================================================
          BRAND HEADER
      =================================================== */}

      <div className="Sidebar-brand">

        {/* Logo */}
        <div className="Sidebar-brand-logo">
          <img
            src={palashLogo}
            alt="Palash Essence"
          />
        </div>

        {/* Brand Text */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="Sidebar-brand-content">

            <div className="Sidebar-brand-name">
              PALASH
            </div>

            <div className="Sidebar-brand-subtitle">
              ESSENCE
            </div>

            <div className="Sidebar-brand-tagline">
              Pure Spices • Rich Flavour
            </div>

          </div>
        )}

        {/* Mobile Close */}
        {isMobileOpen && (
          <button
            type="button"
            className="Sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* ===================================================
          BRAND DIVIDER
      =================================================== */}

      <div className="Sidebar-brand-divider">
        <span />
        <ChefHat size={13} />
        <span />
      </div>

      {/* ===================================================
          NAVIGATION
      =================================================== */}

      <nav className="Sidebar-nav">

        {/* Section Label */}

        {(!isCollapsed || isMobileOpen) && (
          <div className="Sidebar-section-title">
            MANAGEMENT
          </div>
        )}

        {/* Menu */}

        <div className="Sidebar-menu">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={handleNavClick}
                title={
                  isCollapsed && !isMobileOpen
                    ? item.text
                    : undefined
                }
                className={({ isActive }) =>
                  `Sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >

                {/* Icon */}

                <span className="Sidebar-icon">
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />
                </span>

                {/* Text */}

                {(!isCollapsed || isMobileOpen) && (
                  <>
                    <span className="Sidebar-text">
                      {item.text}
                    </span>

                    <ChevronRight
                      className="Sidebar-arrow"
                      size={15}
                    />
                  </>
                )}

              </NavLink>
            );
          })}

        </div>
      </nav>

      {/* ===================================================
          BOTTOM BRAND CARD
      =================================================== */}

      {(!isCollapsed || isMobileOpen) && (
        <div className="Sidebar-bottom-card">

          <div className="Sidebar-bottom-icon">
            <ChefHat size={18} />
          </div>

          <div className="Sidebar-bottom-content">

            <strong>
              Pure Spices
            </strong>

            <span>
              Trusted Quality
            </span>

          </div>

        </div>
      )}

    </aside>
  );
};

export default Sidebar;