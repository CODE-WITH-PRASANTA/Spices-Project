import React from "react";
import { Link } from "react-router-dom";
import "./ShopBreadCrumb.css";

import BannerImage from "../../assets/image12.webp";

const ShopBreadCrumb = ({
  title = "COLLECTION",
  links = [
    { label: "Home", url: "/" },
    { label: " Products", url: null },
  ],
}) => {
  return (
    <section
      className="breadcrumb-wrapper"
      style={{
        backgroundImage: `url(${BannerImage})`,
      }}
    >
      {/* Dark overlay for text readability against dark background designs */}
      <div className="breadcrumb-overlay"></div>

      <div className="breadcrumb-content">
        <h1 className="breadcrumb-heading">{title}</h1>

        <div className="breadcrumb-nav">
          {links.map((item, index) => (
            <React.Fragment key={index}>
              {item.url ? (
                <Link className="breadcrumb-link" to={item.url}>
                  {item.label}
                </Link>
              ) : (
                <span className="breadcrumb-current">{item.label}</span>
              )}

              {index !== links.length - 1 && (
                <span className="separator"> / </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopBreadCrumb;