import React from "react";
import { Link } from "react-router-dom"; // Link for React Router navigation
import "./ContactBreadcrumb.css";

// Background image
import ContactBreadcrumbImage from "../../assets/p-breadcrumb.png";

const ContactBreadcrumb = () => {
  return (
    <section
      className="ContactBreadcrumb"
      style={{
        backgroundImage: `url(${ContactBreadcrumbImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="ContactBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="ContactBreadcrumb__content">
        {/* Heading */}
        <h1 className="ContactBreadcrumb__title">Contact Us</h1>

        {/* Breadcrumb */}
        <div className="ContactBreadcrumb__breadcrumb">
          {/* Home Link (Navigates to homepage) */}
          <Link to="/" className="ContactBreadcrumb__home">
            Home
          </Link>

          {/* Arrow */}
          <span
            className="ContactBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          {/* Current Page */}
          <span className="ContactBreadcrumb__current">
            Contact Us
          </span>
        </div>
      </div>
    </section>
  );
};

export default ContactBreadcrumb;