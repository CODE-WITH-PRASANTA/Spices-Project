import React from "react";
import { Link } from "react-router-dom"; // Link for React Router navigation
import "./FaqBreadcrumb.css";

// Background image
import FaqBreadcrumbImage from "../../assets/p-breadcrumb.png";

const FaqBreadcrumb = () => {
  return (
    <section
      className="FaqBreadcrumb"
      style={{
        backgroundImage: `url(${FaqBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="FaqBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="FaqBreadcrumb__content">
        {/* Page Title */}
        <h1 className="FaqBreadcrumb__title">FAQ</h1>

        {/* Breadcrumb */}
        <div className="FaqBreadcrumb__breadcrumb">
          {/* Home Link (Navigates to home page) */}
          <Link to="/" className="FaqBreadcrumb__home">
            Home
          </Link>

          {/* Arrow */}
          <span className="FaqBreadcrumb__arrow" aria-hidden="true">
            ›
          </span>

          {/* Current Page */}
          <span className="FaqBreadcrumb__current">FAQ</span>
        </div>
      </div>
    </section>
  );
};

export default FaqBreadcrumb;