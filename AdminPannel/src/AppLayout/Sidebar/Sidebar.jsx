import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaPenFancy,
  FaEdit,
  FaBlog,
  FaStore,
  FaAward,
  FaUsers,
  FaGem,
  FaQuoteLeft,
  FaEnvelopeOpenText,
  FaBullhorn,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },

    {
      name: "Blog",
      icon: <FaBlog />,
      submenu: [
        { name: "Blog Posting", path: "/admin/blog-posting", icon: <FaPenFancy /> },
        { name: "Blog Management", path: "/admin/blog-management", icon: <FaEdit /> },
      ],
    },

    { type: "section", label: "Shop" },
    { name: "Shop", path: "/admin/shop", icon: <FaStore /> },
    { name: "Best Product", path: "/admin/best-product", icon: <FaAward /> },
    { name: "Premium Quality Product", path: "/admin/premium-product", icon: <FaGem /> },

    { type: "section", label: "Company" },
    { name: "Our Team", path: "/admin/our-team", icon: <FaUsers /> },
    { name: "Testimonial", path: "/admin/testimonial", icon: <FaQuoteLeft /> },

    { type: "section", label: "Get In Touch" },
    { name: "Contact Us", path: "/admin/contact-us", icon: <FaEnvelopeOpenText /> },
    { name: "Lead", path: "/admin/lead", icon: <FaBullhorn /> },
  ];

  const [openMenu, setOpenMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = (name) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  const handleMenuClick = () => {
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "close"}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-brand-icon">A</div>

            {sidebarOpen && (
              <div className="sidebar-brand-text">
                <h2>Admin Panel</h2>
                <p>Management System</p>
              </div>
            )}
          </div>

          {isMobile && sidebarOpen && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <nav className="sidebar-menu">
          {menu.map((item, index) => {
            if (item.type === "section") {
              return sidebarOpen ? (
                <div className="sidebar-section" key={`${item.label}-${index}`}>
                  <span className="sidebar-section__bar" />
                  {item.label}
                </div>
              ) : (
                <div className="sidebar-section sidebar-section--collapsed" key={`${item.label}-${index}`} />
              );
            }

            return (
              <div className="sidebar-menu-item" key={item.name}>
                {item.submenu ? (
                  <>
                    <button
                      type="button"
                      className={`menu-btn ${openMenu === item.name ? "expanded" : ""}`}
                      onClick={() => toggleMenu(item.name)}
                      data-tooltip={item.name}
                    >
                      <div className="menu-main">
                        <span className="menu-icon">{item.icon}</span>
                        {sidebarOpen && <span className="menu-text">{item.name}</span>}
                      </div>

                      {sidebarOpen && (
                        <span className={`menu-arrow ${openMenu === item.name ? "rotate" : ""}`}>
                          <FaChevronDown />
                        </span>
                      )}
                    </button>

                    {openMenu === item.name && sidebarOpen && (
                      <div className="submenu">
                        {item.submenu.map((sub) => (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            onClick={handleMenuClick}
                            className={({ isActive }) =>
                              `submenu-link ${isActive ? "active" : ""}`
                            }
                          >
                            <span className="submenu-icon">{sub.icon}</span>
                            <span className="submenu-text">{sub.name}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={handleMenuClick}
                    data-tooltip={item.name}
                    className={({ isActive }) =>
                      `menu-link ${isActive ? "active" : ""}`
                    }
                  >
                    <div className="menu-main">
                      <span className="menu-icon">{item.icon}</span>
                      {sidebarOpen && <span className="menu-text">{item.name}</span>}
                    </div>
                  </NavLink>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}