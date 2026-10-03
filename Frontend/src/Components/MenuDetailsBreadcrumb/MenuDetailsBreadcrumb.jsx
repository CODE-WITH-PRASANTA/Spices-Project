import React from "react";
import { Link } from "react-router-dom";
import "./MenuDetailsBreadcrumb.css";

// Background image - update or replace the path if needed
import MenuDetailsBreadcrumbImage from "../../assets/breadcrumbcontact.webp";

const MenuDetailsBreadcrumb = ({ foodName = "Menu Details" }) => {
  return (
    <section
      className="MenuDetailsBreadcrumb"
      style={{
        backgroundImage: `url(${MenuDetailsBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="MenuDetailsBreadcrumb__overlay" />

      {/* Main Content */}
      <div className="MenuDetailsBreadcrumb__content">
        {/* Page Title */}
        <h1 className="MenuDetailsBreadcrumb__title">{foodName}</h1>

        {/* Breadcrumb Trail */}
        <nav
          className="MenuDetailsBreadcrumb__breadcrumb"
          aria-label="Breadcrumb"
        >
          {/* Home Link */}
          <Link to="/" className="MenuDetailsBreadcrumb__link">
            Home
          </Link>

          {/* Separator */}
          <span className="MenuDetailsBreadcrumb__arrow" aria-hidden="true">
            ›
          </span>

          {/* Menu Link */}
          <Link to="/menu" className="MenuDetailsBreadcrumb__link">
            Menu
          </Link>

          {/* Separator */}
          <span className="MenuDetailsBreadcrumb__arrow" aria-hidden="true">
            ›
          </span>

          {/* Current Page */}
          <span
            className="MenuDetailsBreadcrumb__current"
            aria-current="page"
          >
            {foodName}
          </span>
        </nav>
      </div>
    </section>
  );
};

export default MenuDetailsBreadcrumb;