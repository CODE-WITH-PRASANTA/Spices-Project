import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

// Logo
import mainLogo from "../../assets/main-palash-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="Navbar-container">
        {/* LOGO */}
        <Link
          to="/"
          className="Navbar-logo"
          onClick={handleMenuClick}
          aria-label="Healthy Heaven Home"
        >
          <img
            src={mainLogo}
            alt="Healthy Heaven"
            className="Navbar-logoImage"
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <nav
          className={`Navbar-navigation ${
            menuOpen ? "Navbar-navigationActive" : ""
          }`}
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            About
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Menu
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Faq
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Gallery
          </NavLink>

          <NavLink
            to="/testimonial"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Testimonial
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Contact Us
          </NavLink>
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="Navbar-actions">
          {/* Cart Page Route Link */}
          <Link
            to="/cart"
            className="Navbar-actionButton Navbar-cartButton"
            onClick={handleMenuClick}
            aria-label="Shopping Cart"
            title="Cart"
          >
            <svg
              className="Navbar-actionIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8H18L19.2 20H4.8L6 8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="Navbar-cartBadge">3</span>
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          className={`Navbar-menuButton ${
            menuOpen ? "Navbar-menuButtonActive" : ""
          }`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="Navbar-menuLine"></span>
          <span className="Navbar-menuLine"></span>
          <span className="Navbar-menuLine"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;