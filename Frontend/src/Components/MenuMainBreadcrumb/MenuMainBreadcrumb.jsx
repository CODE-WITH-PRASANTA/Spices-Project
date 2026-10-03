import React from "react";
import { Link } from "react-router-dom"; // Link for React Router navigation
import "./MenuMainBreadcrumb.css";

// Background image
import MenuMainBreadcrumbImage from "../../assets/breadcrumbcontact.webp";

const MenuMainBreadcrumb = () => {
  return (
    <section
      className="MenuMainBreadcrumb"
      style={{
        backgroundImage: `url(${MenuMainBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="MenuMainBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="MenuMainBreadcrumb__content">
        {/* Page Title */}
        <h1 className="MenuMainBreadcrumb__title">Menu</h1>

        {/* Breadcrumb */}
        <div className="MenuMainBreadcrumb__breadcrumb">
          {/* Home Link (navigates to homepage) */}
          <Link to="/" className="MenuMainBreadcrumb__home">
            Home
          </Link>

          {/* Arrow */}
          <span className="MenuMainBreadcrumb__arrow" aria-hidden="true">
            ›
          </span>

          {/* Current Page */}
          <span className="MenuMainBreadcrumb__current">Menu</span>
        </div>
      </div>
    </section>
  );
};

export default MenuMainBreadcrumb;