import React from "react";
import "./Footer.css";

// Assets
import FooterLogo from "../../assets/main-palash-logo.png";
import FooterAlmond from "../../assets/footeralmond.png";
import FooterTomato from "../../assets/footertamato.png";

// SVG Icons
const FooterLocationIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10C20 15.5 12 21 12 21C12 21 4 15.5 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="10"
      r="2.8"
      stroke="currentColor"
      strokeWidth="1.9"
    />
  </svg>
);

const FooterPhoneIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6 3.2L9.1 2.6C9.7 2.45 10.3 2.75 10.55 3.3L11.75 6.15C11.95 6.62 11.82 7.16 11.42 7.5L9.75 8.95C10.75 11.1 12.5 12.85 14.65 13.85L16.1 12.18C16.44 11.78 16.98 11.65 17.45 11.85L20.3 13.05C20.85 13.3 21.15 13.9 21 14.5L20.4 17C20.23 17.72 19.58 18.25 18.84 18.25C10.83 18.25 5.75 13.17 5.75 5.16C5.75 4.42 6.28 3.77 7 3.6L6.6 3.2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterMailIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.9"
    />
    <path
      d="M4 7L12 13L20 7"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterChevronIcon = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5L16 12L9 19"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterHeartIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21C11.7 21 11.4 20.9 11.15 20.7C5.5 16.15 2 12.92 2 8.85C2 5.6 4.45 3 7.5 3C9.25 3 10.82 3.82 12 5.1C13.18 3.82 14.75 3 16.5 3C19.55 3 22 5.6 22 8.85C22 12.92 18.5 16.15 12.85 20.7C12.6 20.9 12.3 21 12 21Z" />
  </svg>
);

const Footer = () => {
  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Products", href: "/menu" },
    { label: "Gallery", href: "/gallery" },
    { label: "Testimonials", href: "/testimonial" },
  ];

  const serviceLinks = [
    { label: "Bulk & Wholesale Supply", href: "/menu" },
    { label: "Retail Distribution", href: "/contact" },
    { label: "Pure & Hygienic Sourcing", href: "/about" },
    { label: "Fast Regional Dispatch", href: "/contact" },
  ];

  const helpLinks = [
    { label: "FAQ", href: "/faq" },
    { label: "Product Catalogue", href: "/menu" },
    { label: "Business Enquiries", href: "/contact" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Contact Us", href: "/contact" },
  ];

  const renderLinkList = (links) => (
    <ul className="FooterLinkList">
      {links.map((item) => (
        <li key={item.label} className="FooterLinkItem">
          <a href={item.href} className="FooterLink">
            <span className="FooterLinkArrow">
              <FooterChevronIcon />
            </span>
            <span className="FooterLinkLabel">{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="FooterMain">
      {/* Decorative Assets */}
      <div className="FooterAlmondDecoration" aria-hidden="true">
        <img src={FooterAlmond} alt="" />
      </div>

      <div className="FooterTomatoDecoration" aria-hidden="true">
        <img src={FooterTomato} alt="" />
      </div>

      <div className="FooterContainer">
        <div className="FooterTop">
          {/* COLUMN 1: CONTACT */}
          <div className="FooterColumn FooterContactColumn">
            <div className="FooterLogoWrapper">
              <a href="/" className="FooterLogoLink" aria-label="Palash Essence Home">
                <img
                  src={FooterLogo}
                  alt="Palash Essence"
                  className="FooterLogo"
                />
              </a>
            </div>

            <h3 className="FooterTitle">CONTACT</h3>

            {/* Address */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=173%2F1b+Plot+No+Baisakhi+Math+Belghoria+Kolkata+700056"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterContactItem"
              aria-label="Find us on Google Maps"
            >
              <span className="FooterContactIcon">
                <FooterLocationIcon />
              </span>
              <span className="FooterContactText">
                173/1b Plot No, Baisakhi Math,
                <br />
                Belghoria, Kolkata - 700056
              </span>
            </a>

            {/* Phone */}
            <a
              href="tel:+918240737381"
              className="FooterContactItem"
              aria-label="Call +91 82407 37381"
            >
              <span className="FooterContactIcon">
                <FooterPhoneIcon />
              </span>
              <span className="FooterContactText FooterPhoneText">
                +91 82407 37381
              </span>
            </a>

            {/* Email */}
            <a
              href="mailto:palashessence2008@gmail.com"
              className="FooterContactItem"
              aria-label="Send email to palashessence2008@gmail.com"
            >
              <span className="FooterContactIcon">
                <FooterMailIcon />
              </span>
              <span className="FooterContactText FooterEmailText">
                palashessence2008@gmail.com
              </span>
            </a>
          </div>

          {/* COLUMN 2: OUR LINKS */}
          <div className="FooterColumn">
            <h3 className="FooterTitle">OUR LINKS</h3>
            {renderLinkList(footerLinks)}
          </div>

          {/* COLUMN 3: SERVICES */}
          <div className="FooterColumn">
            <h3 className="FooterTitle">OUR SERVICES</h3>
            {renderLinkList(serviceLinks)}
          </div>

          {/* COLUMN 4: HELP CENTER */}
          <div className="FooterColumn">
            <h3 className="FooterTitle">HELP CENTER</h3>
            {renderLinkList(helpLinks)}
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="FooterBottom">
          <p className="FooterCopyright">
            Copyright {new Date().getFullYear()} All rights reserved.
          </p>

          <p className="FooterCreated">
            Crafted With
            <span className="FooterHeart">
              <FooterHeartIcon />
            </span>
            by{" "}
            <a
              href="https://prwebstock.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterBrand"
            >
              PR WEBSTOCK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;