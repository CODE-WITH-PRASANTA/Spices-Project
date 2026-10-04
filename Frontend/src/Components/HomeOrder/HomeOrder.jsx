import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Wheat,
  ShieldCheck,
  Leaf,
  Sprout,
  Phone,
  MapPin,
  CheckCircle2,
} from "lucide-react";

import "./HomeOrder.css";

// =====================================================
// PALASH ESSENCE - FIVE PRODUCT IMAGES
// =====================================================

import turmericImage from "../../assets/p-1.png";
import cuminImage from "../../assets/p-2.png";
import redChilliImage from "../../assets/p-3.png";
import corianderImage from "../../assets/p-4.png";
import garamMasalaImage from "../../assets/p-5.png";

// =====================================================
// CONSTANTS
// =====================================================

const TRADE_PHONE = "8240737381";

// =====================================================
// ONLY FIVE PRODUCTS
// =====================================================

const PRODUCTS = [
  {
    id: "turmeric",
    variant: "hero",

    category: "Turmeric",

    name: "Turmeric Powder",

    subtitle: "Pure golden goodness",

    description:
      "Finely ground turmeric with a rich natural colour and authentic traditional flavour for everyday cooking.",

    image: turmericImage,

    features: [
      "100% Pure",
      "Natural Colour",
      "Premium Quality",
    ],

    perfectFor: [
      "Curries",
      "Milk",
      "Marinades",
    ],

    packs:
      "50g · 100g · 200g",
  },

  {
    id: "cumin",
    variant: "compact",

    category: "Cumin",

    name: "Cumin Powder",

    subtitle:
      "Aromatic everyday essential",

    description:
      "Premium cumin powder with a warm aroma and bold flavour for everyday Indian cooking.",

    image: cuminImage,

    features: [
      "Pure Cumin",
      "Fine Ground",
      "Rich Aroma",
    ],

    perfectFor: [
      "Curries",
      "Raita",
      "Masala",
    ],

    packs:
      "50g · 100g · 200g",
  },

  {
    id: "red-chilli",
    variant: "compact",

    category: "Red Chilli",

    name: "Red Chilli Powder",

    subtitle:
      "Bold colour, authentic heat",

    description:
      "Carefully selected red chillies ground to deliver vibrant colour and balanced traditional heat.",

    image: redChilliImage,

    features: [
      "Bold Colour",
      "Rich Flavour",
      "Premium Quality",
    ],

    perfectFor: [
      "Curries",
      "Snacks",
      "Pickles",
    ],

    packs:
      "50g · 100g · 200g",
  },

  {
    id: "coriander",
    variant: "wide",

    category: "Coriander",

    name: "Coriander Powder",

    subtitle:
      "Fresh earthy flavour",

    description:
      "Finely ground coriander with a fresh aroma and naturally earthy taste for everyday recipes.",

    image: corianderImage,

    features: [
      "Fresh Aroma",
      "Fine Ground",
      "100% Pure",
    ],

    perfectFor: [
      "Curries",
      "Gravies",
      "Masala",
    ],

    packs:
      "50g · 100g · 200g",
  },

  {
    id: "garam-masala",
    variant: "wide",

    category: "Garam Masala",

    name: "Garam Masala",

    subtitle:
      "The finishing touch",

    description:
      "A beautifully balanced traditional spice blend crafted to bring warmth, depth and aroma to every dish.",

    image: garamMasalaImage,

    features: [
      "Traditional Blend",
      "Rich Aroma",
      "Premium Quality",
    ],

    perfectFor: [
      "Curries",
      "Rice",
      "Snacks",
    ],

    packs:
      "50g · 100g · 200g",
  },
];

// =====================================================
// TRUST ITEMS
// =====================================================

const TRUST = [
  {
    icon: Leaf,
    title: "100% Pure",
    text: "No additives or fillers",
  },

  {
    icon: Wheat,
    title: "Fine Ground",
    text: "Carefully processed spices",
  },

  {
    icon: ShieldCheck,
    title: "Hygienically Packed",
    text: "Sealed for freshness",
  },

  {
    icon: Sprout,
    title: "Premium Quality",
    text: "Selected with care",
  },
];

// =====================================================
// PRODUCT CARD
// =====================================================

function ProductCard({
  product,
  index,
}) {
  const cardRef = useRef(null);

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const node = cardRef.current;

    if (!node) return;

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setVisible(true);

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.08,
        }
      );

    observer.observe(node);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`
        product-card
        product-card--${product.variant}
        ${
          visible
            ? "product-card--visible"
            : ""
        }
      `}
      style={{
        "--reveal-delay":
          `${index * 90}ms`,
      }}
    >
      {/* ==========================================
          PRODUCT IMAGE
      ========================================== */}

      <div className="product-card__image-wrap">

        <img
          src={product.image}
          alt={`${product.name} - Palash Essence`}
          className="product-card__image"
          loading={
            index === 0
              ? "eager"
              : "lazy"
          }
          decoding="async"
        />

        <div
          className="product-card__image-overlay"
          aria-hidden="true"
        />

        <div
          className="product-card__gold-light"
          aria-hidden="true"
        />

      </div>

      {/* ==========================================
          PURE BADGE
      ========================================== */}

      <div className="product-card__badge">

        <Leaf size={11} />

        <span>
          100% Pure &amp; Natural
        </span>

      </div>

      {/* ==========================================
          CONTENT
      ========================================== */}

      <div className="product-card__content">

        <div className="product-card__top">

          <span className="product-card__category">
            {product.category}
          </span>

          <h3 className="product-card__title">
            {product.name}
          </h3>

          <p className="product-card__subtitle">
            {product.subtitle}
          </p>

          <p className="product-card__description">
            {product.description}
          </p>

          {/* FEATURES */}

          <ul className="product-card__features">

            {product.features.map(
              (feature) => (
                <li key={feature}>

                  <CheckCircle2
                    size={11}
                  />

                  <span>
                    {feature}
                  </span>

                </li>
              )
            )}

          </ul>

        </div>

        {/* ======================================
            CARD FOOTER
        ====================================== */}

        <div className="product-card__footer">

          <div className="product-card__meta">

            <span>
              Perfect For
            </span>

            <strong>
              {product.perfectFor.join(
                " • "
              )}
            </strong>

          </div>

          <div
            className="
              product-card__meta
              product-card__meta--right
            "
          >

            <span>
              Pack Sizes
            </span>

            <strong>
              {product.packs}
            </strong>

          </div>

        </div>

      </div>
    </article>
  );
}

// =====================================================
// HOME ORDER
// =====================================================

const HomeOrder = () => {
  return (
    <section
      className="home-order"
      aria-labelledby="home-order-heading"
    >

      {/* ==========================================
          BACKGROUND
      ========================================== */}

      <div
        className="home-order__background"
        aria-hidden="true"
      >

        <div
          className="
            home-order__gold-orb
            home-order__gold-orb--left
          "
        />

        <div
          className="
            home-order__gold-orb
            home-order__gold-orb--right
          "
        />

        <div className="home-order__leaf-pattern" />

        <div className="home-order__grain" />

      </div>

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}

      <div className="home-order__inner">

        {/* ========================================
            HEADER
        ======================================== */}

        <header className="home-order__intro">

          <div className="home-order__badge">

            <span className="home-order__badge-dot" />

            Direct From Mill

          </div>

          <h1
            id="home-order-heading"
            className="home-order__heading"
          >

            Pure Spices,

            <br />

            <em>
              Premium Every Day.
            </em>

          </h1>

          <p className="home-order__description">
            Discover Palash Essence —
            premium Indian spices crafted
            with purity, freshness and
            traditional goodness.
          </p>

        </header>

        {/* ========================================
            TRUST STRIP
        ======================================== */}

        <div className="home-order__trust">

          {TRUST.map(
            ({
              icon: Icon,
              title,
              text,
            }) => (
              <div
                className="home-order__trust-item"
                key={title}
              >

                <div className="home-order__trust-icon">
                  <Icon size={17} />
                </div>

                <div className="home-order__trust-content">

                  <strong>
                    {title}
                  </strong>

                  <span>
                    {text}
                  </span>

                </div>

              </div>
            )
          )}

        </div>

        {/* ========================================
            PRODUCTS
        ======================================== */}

        <div className="home-order__products">

          {PRODUCTS.map(
            (
              product,
              index
            ) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            )
          )}

        </div>

        {/* ========================================
            BOTTOM SECTION
        ======================================== */}

        <div className="home-order__bottom">

          <div className="home-order__range">

            <div className="home-order__range-heading">
              Our Spice Collection
            </div>

            <p>
              Five carefully selected
              essentials for authentic
              everyday flavour.
            </p>

            <div className="home-order__range-list">

              {PRODUCTS.map(
                (product) => (
                  <span
                    key={product.id}
                  >
                    {product.name}
                  </span>
                )
              )}

            </div>

            <div className="home-order__address">

              <MapPin size={13} />

              <span>
                173/1B Plot No. Baisakhi Math ,
               Belghoria, Kolkata – 700056
              </span>

            </div>

          </div>

          {/* ======================================
              TRADE ENQUIRY
          ====================================== */}

          <a
            href={`tel:${TRADE_PHONE}`}
            className="home-order__trade"
            aria-label={`Call trade enquiry ${TRADE_PHONE}`}
          >

            <span className="home-order__trade-icon">

              <Phone size={16} />

            </span>

            <span>

              <small>
                Trade Enquiry
              </small>

              <strong>
                {TRADE_PHONE}
              </strong>

            </span>

          </a>

        </div>

        {/* ========================================
            BRAND LINE
        ======================================== */}

        <div className="home-order__brandline">

          <span />

          <div>
            PALASH{" "}
            <b>
              ESSENCE
            </b>
          </div>

          <span />

        </div>

      </div>

    </section>
  );
};

export default HomeOrder;