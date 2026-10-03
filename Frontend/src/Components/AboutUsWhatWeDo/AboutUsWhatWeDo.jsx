import React from "react";
import "./AboutUsWhatWeDo.css";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Stone-Ground Besan",
    description:
      "Finely milled from carefully selected chana dal using traditional grinding practices to preserve natural aroma, texture, colour and everyday goodness.",
    badge: "Pure Gram Flour",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 16h24l4 24a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3l4-24z" />
        <path d="M16 16c0-4 3.5-7 8-7s8 3 8 7" />
        <path d="M12 21h24" />
        <path d="M24 26v10" />
        <path d="M21 29c2 1 3 0 3 0s1 1 3 0" />
        <path d="M21 33c2 1 3 0 3 0s1 1 3 0" />
      </svg>
    ),
  },

  {
    id: 2,
    title: "Traditional Protein Sattu",
    description:
      "Traditionally roasted Bengal gram processed into fine Sattu, offering a naturally wholesome everyday ingredient for drinks, meals and healthy recipes.",
    badge: "Wholesome Staple",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 24h28c0 9-6 16-14 16S10 33 10 24z" />
        <line x1="8" y1="24" x2="40" y2="24" />
        <path d="M28 8l-6 12" />
        <circle cx="29" cy="8" r="3" />
        <path d="M18 32c3 3 9 3 12 0" />
      </svg>
    ),
  },

  {
    id: 3,
    title: "Premium Sabudana",
    description:
      "Clean, evenly sized and carefully sorted tapioca pearls designed for delicious khichdi, fasting recipes, snacks and traditional Indian preparations.",
    badge: "Carefully Sorted",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="16" cy="18" r="4.5" />
        <circle cx="32" cy="18" r="4.5" />
        <circle cx="24" cy="28" r="5" />
        <circle cx="15" cy="36" r="3.5" />
        <circle cx="33" cy="36" r="3.5" />
        <path d="M24 10v4" />
        <path d="M22 12h4" />
      </svg>
    ),
  },

  {
    id: 4,
    title: "Wholesale & Custom Packaging",
    description:
      "Flexible bulk and retail packaging solutions designed for distributors, retailers, food businesses and everyday households.",
    badge: "B2B & Retail",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10 16l14-7 14 7-14 7-14-7z" />
        <path d="M10 16v16l14 8 14-8V16" />
        <line x1="24" y1="23" x2="24" y2="40" />
        <path d="M17 12.5l14 7" />
        <circle cx="35" cy="33" r="5" />
        <path d="M33 33l1.5 1.5 3-3" />
      </svg>
    ),
  },

  {
    id: 5,
    title: "Quality & Hygienic Processing",
    description:
      "Every stage is handled with attention to cleanliness, consistency and freshness so Palash Essence products can become trusted everyday kitchen essentials.",
    badge: "Quality Assured",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M24 6l15 6v11c0 10-6.5 16-15 19-8.5-3-15-9-15-19V12l15-6z" />
        <path d="M16 24l5 5 11-11" />
      </svg>
    ),
  },
];

const AboutUsWhatWeDo = () => {
  return (
    <section className="AboutUsWhatWeDo">
      {/* Ambient background */}
      <div
        className="AboutUsWhatWeDo__ambient"
        aria-hidden="true"
      >
        <span className="AboutUsWhatWeDo__glow AboutUsWhatWeDo__glow--one" />
        <span className="AboutUsWhatWeDo__glow AboutUsWhatWeDo__glow--two" />
        <span className="AboutUsWhatWeDo__gridPattern" />
      </div>

      <div className="AboutUsWhatWeDo__container">
        {/* =================================================
            HEADER
        ================================================= */}
        <header className="AboutUsWhatWeDo__heading">
          <span className="AboutUsWhatWeDo__eyebrow">
            <span className="AboutUsWhatWeDo__eyebrowDot" />
            THE PALASH ESSENCE PROMISE
            <span className="AboutUsWhatWeDo__eyebrowDot" />
          </span>

          <h2 className="AboutUsWhatWeDo__title">
            What Palash Essence
            <span> Delivers</span>
          </h2>

          <div
            className="AboutUsWhatWeDo__decorLine"
            aria-hidden="true"
          >
            <span className="AboutUsWhatWeDo__decorSide" />
            <span className="AboutUsWhatWeDo__decorDiamond">
              ◆
            </span>
            <span className="AboutUsWhatWeDo__decorSide" />
          </div>

          <p className="AboutUsWhatWeDo__subtitle">
            From carefully selected ingredients to thoughtful processing
            and packaging, Palash Essence brings traditional Indian
            goodness together with consistent quality for modern kitchens.
          </p>

          <div className="AboutUsWhatWeDo__introNote">
            <strong>PURE INGREDIENTS</strong>
            <span>•</span>
            <strong>TRADITIONAL GOODNESS</strong>
            <span>•</span>
            <strong>EVERYDAY TRUST</strong>
          </div>
        </header>

        {/* =================================================
            SERVICES GRID
        ================================================= */}
        <div className="AboutUsWhatWeDo__grid">
          {SERVICES_DATA.map((service, index) => (
            <article
              className={`AboutUsWhatWeDo__card ${
                index === SERVICES_DATA.length - 1
                  ? "AboutUsWhatWeDo__card--featured"
                  : ""
              }`}
              key={service.id}
            >
              <div className="AboutUsWhatWeDo__cardAccentBar" />

              {/* Number */}
              <span className="AboutUsWhatWeDo__cardNumber">
                0{index + 1}
              </span>

              {/* Icon */}
              <div className="AboutUsWhatWeDo__iconWrapper">
                <div className="AboutUsWhatWeDo__iconGlow" />

                <div className="AboutUsWhatWeDo__iconCircle">
                  {service.icon}
                </div>
              </div>

              {/* Badge */}
              <span className="AboutUsWhatWeDo__cardBadge">
                {service.badge}
              </span>

              {/* Title */}
              <h3 className="AboutUsWhatWeDo__cardTitle">
                {service.title}
              </h3>

              {/* Description */}
              <p className="AboutUsWhatWeDo__description">
                {service.description}
              </p>

              {/* Bottom accent */}
              <div className="AboutUsWhatWeDo__cardBottom">
                <span />
                <span />
                <span />
              </div>
            </article>
          ))}
        </div>

        {/* =================================================
            BRAND STATEMENT
        ================================================= */}
        <div className="AboutUsWhatWeDo__brandStatement">
          <div className="AboutUsWhatWeDo__brandMark">
            PE
          </div>

          <div className="AboutUsWhatWeDo__brandContent">
            <span>PALASH ESSENCE</span>

            <h3>
              Simple ingredients.
              <em> Meaningful quality.</em>
            </h3>

            <p>
              We believe everyday food essentials should be simple,
              dependable and made with care. That philosophy guides
              everything we do.
            </p>
          </div>

          <div className="AboutUsWhatWeDo__brandBadge">
            <strong>PURE</strong>
            <span>BY</span>
            <strong>CHOICE</strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsWhatWeDo;