import React from "react";
import { Link } from "react-router-dom";
import "./AccountBreadCrumb.css";

import BannerImage from "../../assets/image12.webp";

// 1. Changed function name to match your file and export name
const AccountBreadCrumb = ({
  title = "MY ACCOUNT", 
  links = [
    { label: "Home", url: "/" },
    { label: "My Account", url: null },
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

// 2. Now this correctly references the component above
export default AccountBreadCrumb;