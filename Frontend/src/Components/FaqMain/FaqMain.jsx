import React, { useState } from "react";
import "./FaqMain.css";

import faqImageDefault from "../../assets/faq-image.png";

const DEFAULT_FAQ_DATA = [
  {
    id: "faq-1",
    question:
      "What products does Palash Essence offer?",
    answer:
      "Palash Essence focuses on carefully selected everyday food staples and essential kitchen products. Our range is built around quality ingredients, hygienic processing, dependable packaging, and the authentic taste customers expect from traditional Indian staples.",
  },
  {
    id: "faq-2",
    question:
      "How does Palash Essence maintain product quality?",
    answer:
      "We focus on careful ingredient selection, hygienic handling, controlled processing, quality-focused packaging, and proper storage. Every stage is handled with the goal of maintaining freshness, consistency, natural taste, and dependable quality.",
  },
  {
    id: "faq-3",
    question:
      "Are Palash Essence products suitable for everyday cooking?",
    answer:
      "Yes. Our products are designed for practical everyday use in home kitchens as well as food businesses. They can be used across traditional recipes, breakfast preparations, snacks, beverages, and other regular cooking requirements.",
  },
  {
    id: "faq-4",
    question:
      "Do you provide wholesale and bulk orders?",
    answer:
      "Yes. Palash Essence can support wholesale, bulk, retail, and business requirements. For larger quantities, retailers, distributors, restaurants, food businesses, and other commercial buyers can contact our team to discuss available products, quantities, packaging, and pricing.",
  },
  {
    id: "faq-5",
    question:
      "Can I become a Palash Essence distributor or dealer?",
    answer:
      "We welcome business enquiries from distributors, dealers, retailers, stockists, and other partners who are interested in working with Palash Essence. Share your location and business details with our team so that we can discuss suitable partnership opportunities.",
  },
  {
    id: "faq-6",
    question:
      "What packaging options are available?",
    answer:
      "Packaging can vary according to the product and order requirement. Consumer-friendly packs are designed for convenient household use, while bulk and commercial buyers can discuss larger quantities and suitable packaging formats with our team.",
  },
  {
    id: "faq-7",
    question:
      "How can I place a bulk or business enquiry?",
    answer:
      "You can use the enquiry options available on our website or contact the Palash Essence team directly. For faster assistance, mention the products you are interested in, approximate quantity, delivery location, and whether the requirement is retail, wholesale, or commercial.",
  },
  {
    id: "faq-8",
    question:
      "Why choose Palash Essence?",
    answer:
      "Palash Essence is built around a simple promise: carefully selected products, responsible processing, attractive packaging, and consistent quality. We aim to bring traditional food values together with a modern, premium experience for homes and businesses.",
  },
];

const FaqMain = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] =
    useState(false);

  const handleFaqClick = (index) => {
    setOpenIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !email.trim() ||
      !email.includes("@")
    ) {
      return;
    }

    console.log(
      "Palash Essence Business Email:",
      email
    );

    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="FaqMain">
      {/* =================================================
          FAQ SECTION
      ================================================= */}

      <div className="FaqMain__container">
        <header className="FaqMain__heading">
          <span className="FaqMain__eyebrow">
            PALASH ESSENCE
          </span>

          <h2 className="FaqMain__title">
            Frequently Asked{" "}
            <span>Questions</span>
          </h2>

          <p className="FaqMain__subtitle">
            Find answers about our products,
            quality standards, packaging,
            wholesale requirements, and
            business partnerships.
          </p>

          <div className="FaqMain__introBadges">
            <span>PURE QUALITY</span>
            <span>CAREFUL PROCESSING</span>
            <span>TRUSTED SERVICE</span>
          </div>
        </header>

        {/* FAQ ACCORDION */}

        <div
          className="FaqMain__accordion"
          role="region"
          aria-label="Frequently Asked Questions"
        >
          {DEFAULT_FAQ_DATA.map(
            (faq, index) => {
              const isOpen =
                openIndex === index;

              const contentId =
                `faq-panel-${faq.id}`;

              const headerId =
                `faq-btn-${faq.id}`;

              return (
                <div
                  className={`FaqMain__item ${
                    isOpen
                      ? "FaqMain__item--active"
                      : ""
                  }`}
                  key={faq.id}
                >
                  <button
                    type="button"
                    id={headerId}
                    className="FaqMain__question"
                    onClick={() =>
                      handleFaqClick(index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                  >
                    <div className="FaqMain__questionLeft">
                      <span className="FaqMain__number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="FaqMain__questionLabel">
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={`FaqMain__icon ${
                        isOpen
                          ? "FaqMain__icon--active"
                          : ""
                      }`}
                      aria-hidden="true"
                    >
                      <span className="FaqMain__iconHorizontal" />

                      <span
                        className={`FaqMain__iconVertical ${
                          isOpen
                            ? "FaqMain__iconVertical--hidden"
                            : ""
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`FaqMain__answerWrapper ${
                      isOpen
                        ? "FaqMain__answerWrapper--open"
                        : ""
                    }`}
                  >
                    <div className="FaqMain__answer">
                      <p>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* FAQ FOOTER MESSAGE */}

        <div className="FaqMain__bottomNote">
          <span className="FaqMain__bottomLine" />

          <p>
            Still have a question?
            <strong>
              {" "}
              Our Palash Essence team is
              ready to help.
            </strong>
          </p>

          <span className="FaqMain__bottomLine" />
        </div>
      </div>

      {/* =================================================
          BUSINESS UPDATE / CATALOG SECTION
      ================================================= */}

      <section
        className="FaqMain__newsletter"
        aria-label="Palash Essence Business Updates"
      >
        <div className="FaqMain__newsletterContainer">
          {/* IMAGE */}

          <div className="FaqMain__newsletterImageBox">
            <div className="FaqMain__newsletterGlow" />

            <div className="FaqMain__imageFrame">
              <span className="FaqMain__imageCorner FaqMain__imageCorner--tl" />
              <span className="FaqMain__imageCorner FaqMain__imageCorner--tr" />
              <span className="FaqMain__imageCorner FaqMain__imageCorner--bl" />
              <span className="FaqMain__imageCorner FaqMain__imageCorner--br" />

              <img
                src={faqImageDefault}
                onError={(event) => {
                  event.currentTarget.onerror =
                    null;

                  event.currentTarget.src =
                    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80";
                }}
                alt="Palash Essence food products"
                className="FaqMain__newsletterImage"
                loading="lazy"
              />
            </div>

            <div className="FaqMain__imageBadge">
              <strong>PE</strong>
              <span>PALASH ESSENCE</span>
            </div>
          </div>

          {/* CONTENT */}

          <div className="FaqMain__newsletterContent">
            <span className="FaqMain__newsletterLabel">
              STAY CONNECTED
            </span>

            <h2 className="FaqMain__newsletterTitle">
              Get Product Updates &
              <span> Business Offers</span>
            </h2>

            <p className="FaqMain__newsletterText">
              Subscribe with your email to
              receive product updates, new
              collection announcements, business
              information, special offers, and
              selected wholesale updates from
              Palash Essence.
            </p>

            {/* HIGHLIGHTS */}

            <div className="FaqMain__highlights">
              <div className="FaqMain__highlight">
                <span>01</span>
                <p>
                  Product Updates
                </p>
              </div>

              <div className="FaqMain__highlight">
                <span>02</span>
                <p>
                  Business Offers
                </p>
              </div>

              <div className="FaqMain__highlight">
                <span>03</span>
                <p>
                  New Arrivals
                </p>
              </div>
            </div>

            {/* FORM */}

            <form
              className="FaqMain__newsletterForm"
              onSubmit={handleSubmit}
            >
              <div className="FaqMain__newsletterInputWrapper">
                <svg
                  className="FaqMain__emailIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

                  <polyline points="22,6 12,13 2,6" />
                </svg>

                <input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  className="FaqMain__newsletterInput"
                  aria-label="Business email address"
                  required
                />
              </div>

              <button
                type="submit"
                className="FaqMain__newsletterButton"
              >
                <span>
                  Get Updates
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            </form>

            {/* SUCCESS */}

            {isSubscribed && (
              <div
                className="FaqMain__newsletterSuccessMsg"
                role="status"
              >
                <span>✓</span>

                Thank you! You are now
                connected with Palash Essence
                for product and business
                updates.
              </div>
            )}

            <p className="FaqMain__newsletterNote">
              <span>◆</span>
              Your business privacy matters.
              No unnecessary spam.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FaqMain;