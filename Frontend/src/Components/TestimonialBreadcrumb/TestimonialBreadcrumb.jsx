import React from "react";
import { Link } from "react-router-dom";
import "./TestimonialBreadcrumb.css";

// Background image
import TestimonialBreadcrumbImage from "../../assets/breadcrumbcontact.webp";

const TestimonialBreadcrumb = () => {
  return (
    <section
      className="TestimonialBreadcrumb"
      style={{
        backgroundImage: `url(${TestimonialBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="TestimonialBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="TestimonialBreadcrumb__content">
        {/* Page Title */}
        <h1 className="TestimonialBreadcrumb__title">
          Testimonials
        </h1>

        {/* Breadcrumb */}
        <div className="TestimonialBreadcrumb__breadcrumb">
          {/* Home Link (Navigates to home page) */}
          <Link to="/" className="TestimonialBreadcrumb__home">
            Home
          </Link>

          {/* Arrow */}
          <span
            className="TestimonialBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          {/* Current Page */}
          <span className="TestimonialBreadcrumb__current">
            Testimonials
          </span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialBreadcrumb;