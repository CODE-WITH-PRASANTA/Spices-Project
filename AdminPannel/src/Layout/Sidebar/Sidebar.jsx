import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Inbox,
  FileText,
  Image as ImageIcon,
  Star,
  User,
  Settings,
  LogOut,
  X,
  MailBadgeIcon,
  MailBadge,
} from "lucide-react";

import logo from "../../assets/main-palash-logo.png";
import "./Sidebar.css";

// Navigation Items configuration
export const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    // Matches root '/' and '/dashboard'
    isMatch: (currentPath) => currentPath === "/" || currentPath.startsWith("/dashboard"),
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    path: "/order",
    isMatch: (currentPath) => currentPath.startsWith("/orders") || currentPath.startsWith("/order"),
  },
  
  {
    label: "Menu",
    icon: FileText,
    path: "/menu",
  },
 
  {
    label: "Gallery",
    icon: ImageIcon,
    path: "/gallery",
  },
  {
    label: "Testimonials",
    icon: Star,
    path: "/testimonial",
  },
  {
    label: "Enquires",
    icon: MailBadge,
    path: "/enquire",
  },
  {
    label: "Contact Leads",
    icon: Inbox,
    path: "/contact-lead",
  },
 
  {
    label: "Admin Profile",
    icon: User,
    path: "/profile",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  brandName = "PALASH",
  brandTagline = "ADMIN PANEL",
  user = {
    name: "Admin",
    role: "Super Administrator",
    initials: "AD",
    avatarUrl: "",
  },
  version = "v2.5.0",
}) => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();

  // Helper to determine if an item is active
  const checkIsActive = (item, isNavActive) => {
    if (item.isMatch) {
      return item.isMatch(currentPath);
    }
    // Normalizes trailing slashes and handles sub-routes
    const targetPath = item.path.toLowerCase();
    return isNavActive || currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  const handleLinkClick = (customClick) => (e) => {
    if (customClick) customClick(e);
    // Auto-close drawer on mobile upon clicking a link
    if (window.innerWidth <= 992) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Mobile Drawer Overlay */}
      <div
        className={`HealthySidebar-backdrop ${isMobileOpen ? "is-visible" : ""}`}
        onClick={onMobileClose}
        aria-hidden="true"
      />

      <aside
        className={`HealthySidebar ${isCollapsed ? "is-collapsed" : ""} ${
          isMobileOpen ? "is-mobile-open" : ""
        }`}
        aria-label="Healthy Haven Sidebar"
      >
        {/* Ambient Glows */}
        <div className="HealthySidebar-glow HealthySidebar-glow-top" />
        <div className="HealthySidebar-glow HealthySidebar-glow-bottom" />

        {/* Brand Header */}
        <div className="HealthySidebar-header">
          <div className="HealthySidebar-brand">
            <div className="HealthySidebar-logo-ring">
              <img src={logo} alt="Healthy Haven Logo" className="HealthySidebar-logo" />
            </div>

            <div className="HealthySidebar-brand-meta">
              <h2>{brandName}</h2>
              <span>{brandTagline}</span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            className="HealthySidebar-mobile-close"
            onClick={onMobileClose}
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Profile Card */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `HealthySidebar-profile-card ${isActive ? "is-active" : ""}`
          }
          onClick={handleLinkClick(onProfileClick)}
          title={isCollapsed ? `${user.name} (${user.role})` : undefined}
        >
          <div className="HealthySidebar-avatar-wrap">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="HealthySidebar-avatar-img" />
            ) : (
              <div className="HealthySidebar-avatar-fallback">
                {user.initials ||
                  user.name
                    ?.split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
              </div>
            )}
            <span className="HealthySidebar-status-beacon" />
          </div>

          <div className="HealthySidebar-profile-details">
            <span className="HealthySidebar-profile-name">{user.name}</span>
            <span className="HealthySidebar-profile-role">{user.role}</span>
          </div>
        </NavLink>

        {/* Navigation List */}
        <nav className="HealthySidebar-nav" aria-label="Main Navigation">
          {!isCollapsed && <div className="HealthySidebar-nav-heading">MAIN NAVIGATION</div>}

          <div className="HealthySidebar-nav-list">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive: isNavActive }) => {
                    const active = checkIsActive(item, isNavActive);
                    return `HealthySidebar-link ${active ? "active" : ""}`;
                  }}
                  onClick={handleLinkClick(item.onClick)}
                  title={isCollapsed ? item.label : undefined}
                >
                  <span className="HealthySidebar-icon-box">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>

                  <span className="HealthySidebar-link-title">{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Footer Area */}
     
      </aside>
    </>
  );
};

export default Sidebar;