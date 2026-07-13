import React from "react";
import { Link } from "react-router-dom";
import "./UsBreadcrumb.css";

import BannerImage from "../../assets/dc.png";

const UsBreadcrumb = ({
  title = "CONTACT US",
  links = [
    { label: "Home", url: "/" },
    { label: "Contact Us", url: null },
  ],
}) => {
  return (
    <section
      className="breadcrumb-wrapper"
      style={{
        backgroundImage: `url(${BannerImage})`,
      }}
    >
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

export default UsBreadcrumb;