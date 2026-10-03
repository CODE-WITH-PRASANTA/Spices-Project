import React, { useRef, useState } from "react";
import {
  FaLeaf,
  FaArrowRight,
  FaPlay,
  FaStar,
  FaShieldAlt,
  FaMortarPestle,
  FaAward,
} from "react-icons/fa";

import productImg from "../../assets/main-1.jpeg";
import "./Homehero.css";

const Homehero = () => {
  const visualRef = useRef(null);

  const [tilt, setTilt] = useState({
    x: 0,
    y: 0,
  });

  /* =========================================================
     3D MOUSE MOVEMENT
  ========================================================= */

  const handleMouseMove = (e) => {
    const element = visualRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: y * -6,
      y: x * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      x: 0,
      y: 0,
    });
  };

  /* =========================================================
     SCROLL
  ========================================================= */

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="homehero">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="homehero__background">

        <div className="homehero__ambient homehero__ambient--left" />

        <div className="homehero__ambient homehero__ambient--right" />

        <div className="homehero__texture" />

        <div className="homehero__gold-pattern">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

      </div>

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="homehero__container">

        {/* ===================================================
            LEFT CONTENT
        =================================================== */}

        <div className="homehero__content">

          {/* TOP LABEL */}

          <div className="homehero__eyebrow">

            <span className="homehero__eyebrow-line" />

            <span>
              PURE SPICES
            </span>

            <b>|</b>

            <span>
              RICH FLAVOURS
            </span>

            <b>|</b>

            <span>
              BETTER TOMORROW
            </span>

          </div>

          {/* BRAND */}

          <div className="homehero__brand">

            <span className="homehero__brand-name">
              PALASH
            </span>

            <span className="homehero__brand-subtitle">
              ESSENCE
            </span>

          </div>

          {/* TITLE */}

          <h1 className="homehero__title">

            <span>
              Bringing the
            </span>

            <span className="homehero__title-gold">
              True Taste of India
            </span>

          </h1>

          {/* SMALL DECORATIVE LINE */}

          <div className="homehero__title-decoration">

            <FaLeaf />

            <span />

          </div>

          {/* DESCRIPTION */}

          <p className="homehero__description">
            At Palash Essence, we bring you the finest,
            naturally sourced spices crafted with tradition.
            Pure, aromatic and full of authentic flavour
            for a healthier and happier you.
          </p>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div className="homehero__features">

            {/* PURE */}

            <div className="homehero__feature">

              <div className="homehero__feature-icon">
                <FaLeaf />
              </div>

              <div className="homehero__feature-content">

                <strong>
                  100% Pure
                </strong>

                <span>
                  Naturally Sourced
                </span>

              </div>

            </div>

            {/* QUALITY */}

            <div className="homehero__feature">

              <div className="homehero__feature-icon">
                <FaShieldAlt />
              </div>

              <div className="homehero__feature-content">

                <strong>
                  Premium Quality
                </strong>

                <span>
                  Carefully Selected
                </span>

              </div>

            </div>

            {/* TASTE */}

            <div className="homehero__feature">

              <div className="homehero__feature-icon">
                <FaMortarPestle />
              </div>

              <div className="homehero__feature-content">

                <strong>
                  Authentic Taste
                </strong>

                <span>
                  Traditional Flavour
                </span>

              </div>

            </div>

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="homehero__actions">

            <button
              type="button"
              className="homehero__button homehero__button--primary"
              onClick={() =>
                handleScrollTo("products")
              }
            >

              <span>
                Explore Our Spices
              </span>

              <FaArrowRight />

            </button>

            <button
              type="button"
              className="homehero__button homehero__button--secondary"
              onClick={() =>
                handleScrollTo("about")
              }
            >

              <FaPlay />

              <span>
                Watch Our Story
              </span>

            </button>

          </div>

          {/* =================================================
              STATS
          ================================================= */}

          <div className="homehero__stats">

            <div className="homehero__stat">

              <strong>
                5+
              </strong>

              <span>
                Premium Spices
              </span>

            </div>

            <div className="homehero__stat-divider" />

            <div className="homehero__stat">

              <strong>
                100%
              </strong>

              <span>
                Natural Ingredients
              </span>

            </div>

            <div className="homehero__stat-divider" />

            <div className="homehero__stat">

              <strong>
                10K+
              </strong>

              <span>
                Happy Customers
              </span>

            </div>

            <div className="homehero__stat-divider" />

            <div className="homehero__stat">

              <strong>
                4.9
                <small>★</small>
              </strong>

              <span>
                Customer Rating
              </span>

            </div>

          </div>

        </div>

        {/* ===================================================
            RIGHT PRODUCT VISUAL
        =================================================== */}

        <div
          className="homehero__visual"
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >

          {/* LARGE CIRCLES */}

          <div className="homehero__visual-circle homehero__visual-circle--one" />

          <div className="homehero__visual-circle homehero__visual-circle--two" />

          <div className="homehero__visual-circle homehero__visual-circle--three" />

          {/* PRODUCT GLOW */}

          <div className="homehero__visual-glow" />

          {/* =================================================
              PRODUCT IMAGE
          ================================================= */}

          <div
            className="homehero__product"
            style={{
              transform: `
                perspective(1200px)
                rotateX(${tilt.x}deg)
                rotateY(${tilt.y}deg)
              `,
            }}
          >

            <div className="homehero__product-image">

              <img
                src={productImg}
                alt="Palash Essence Premium Indian Spices"
                draggable="false"
              />

              <div className="homehero__image-overlay" />

            </div>

            {/* PRODUCT FOOTER */}

            <div className="homehero__product-footer">

              <div className="homehero__product-logo">

                <div>
                  <FaLeaf />
                </div>

                <div>
                  <strong>
                    PALASH ESSENCE
                  </strong>

                  <span>
                    PURE SPICES • RICH FLAVOURS
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              NATURAL BADGE
          ================================================= */}

          <div className="homehero__badge homehero__badge--natural">

            <div className="homehero__badge-icon">
              <FaLeaf />
            </div>

            <div className="homehero__badge-content">

              <strong>
                100%
              </strong>

              <span>
                NATURAL
              </span>

            </div>

          </div>

          {/* =================================================
              PREMIUM BADGE
          ================================================= */}

          <div className="homehero__badge homehero__badge--premium">

            <div className="homehero__badge-icon">
              <FaAward />
            </div>

            <div className="homehero__badge-content">

              <strong>
                Premium
              </strong>

              <span>
                QUALITY
              </span>

            </div>

          </div>

          {/* =================================================
              PREMIUM SPICES TEXT
          ================================================= */}

          <div className="homehero__premium-note">

            <FaLeaf />

            <span>
              Premium
              <br />
              Spices
            </span>

            <div className="homehero__premium-arrow" />

          </div>

          {/* =================================================
              GOLD DOTS
          ================================================= */}

          <div className="homehero__dots">

            {Array.from({ length: 9 }).map(
              (_, index) => (
                <span key={index} />
              )
            )}

          </div>

        </div>

      </div>

      {/* =====================================================
          BOTTOM BRAND MESSAGE
      ===================================================== */}

      <div className="homehero__bottom-message">

        <span className="homehero__bottom-line" />

        <FaLeaf />

        <span>
          TRADITION MEETS PURITY
        </span>

        <FaLeaf />

        <span className="homehero__bottom-line" />

      </div>

    </section>
  );
};

export default Homehero;