import React from "react";
import { Link } from "react-router-dom"; // Link for navigation
import "./GalleryBreadcrumb.css";

// Background image
import GalleryBreadcrumbImage from "../../assets/breadcrumbcontact.webp";

const GalleryBreadcrumb = () => {
  return (
    <section
      className="GalleryBreadcrumb"
      style={{
        backgroundImage: `url(${GalleryBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="GalleryBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="GalleryBreadcrumb__content">
        {/* Page Title */}
        <h1 className="GalleryBreadcrumb__title">Gallery</h1>

        {/* Breadcrumb */}
        <div className="GalleryBreadcrumb__breadcrumb">
          {/* Home Link (Navigates to home page) */}
          <Link to="/" className="GalleryBreadcrumb__home">
            Home
          </Link>

          {/* Arrow */}
          <span className="GalleryBreadcrumb__arrow" aria-hidden="true">
            ›
          </span>

          {/* Current Page */}
          <span className="GalleryBreadcrumb__current">Gallery</span>
        </div>
      </div>
    </section>
  );
};

export default GalleryBreadcrumb;