import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
  Send,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  PackageCheck,
  ShieldCheck,
  HeartHandshake,
  Navigation,
} from "lucide-react";

import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    inquiryType: "Product Inquiry",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      inquiryType: "Product Inquiry",
      message: "",
    });

    setIsSubmitted(false);
    setSubmittedData(null);
  };

  /* =====================================================
     CONTACT INFORMATION
  ===================================================== */

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit Us",
      lines: [
        "Patiramjote, Matigara, Siliguri",
        "Dist: Darjeeling, West Bengal, India",
      ],
      link: "https://www.google.com/maps/search/?api=1&query=Patiramjote+Matigara+Siliguri+Darjeeling+West+Bengal+India",
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: [
        "+91 90072 522221",
        "Sandeep Kumar — Proprietor",
      ],
      link: "tel:+9190072522221",
    },
    {
      icon: Mail,
      title: "Email Us",
      lines: [
        "gsmarketing507@gmail.com",
        "We'd love to hear from you",
      ],
      link: "mailto:gsmarketing507@gmail.com",
    },
    {
      icon: Clock3,
      title: "Business Hours",
      lines: [
        "Monday - Saturday",
        "09:00 AM - 07:00 PM IST",
      ],
    },
  ];

  /* =====================================================
     PALASH ESSENCE BRAND POINTS
  ===================================================== */

  const brandPerks = [
    {
      icon: PackageCheck,
      title: "Carefully Selected Products",
      desc: "Quality-focused staples including Besan, Sattu and premium Sabudana for everyday use.",
    },
    {
      icon: Sparkles,
      title: "Retail & Bulk Enquiries",
      desc: "Connect with us for product requirements, wholesale quantities and business enquiries.",
    },
    {
      icon: ShieldCheck,
      title: "Quality-Focused Approach",
      desc: "We value clean presentation, dependable products and consistent customer experience.",
    },
    {
      icon: HeartHandshake,
      title: "Personal Assistance",
      desc: "Speak directly with our team for product information, requirements and business support.",
    },
  ];

  return (
    <section className="ContactMain">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ===================================================== */}

      <div
        className="ContactMainBgGlow ContactMainBgGlow1"
        aria-hidden="true"
      />

      <div
        className="ContactMainBgGlow ContactMainBgGlow2"
        aria-hidden="true"
      />

      <div className="ContactMainWrapper">

        {/* =====================================================
            1. CONTACT INFORMATION CARDS
        ===================================================== */}

        <div className="ContactMainInfo">

          {contactCards.map((card, index) => {
            const Icon = card.icon;
            const CardElement = card.link ? "a" : "div";

            return (
              <CardElement
                className="ContactMainCard"
                key={index}
                href={card.link}
                target={
                  card.link && card.link.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  card.link && card.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                style={{
                  animationDelay: `${index * 0.1}s`,
                  textDecoration: "none",
                }}
              >

                <div className="ContactMainIconWrapper">
                  <Icon
                    className="ContactMainIcon"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="ContactMainCardContent">

                  <h3 className="ContactMainCardTitle">
                    {card.title}
                  </h3>

                  <div className="ContactMainCardText">
                    {card.lines.map((line, idx) => (
                      <span key={idx}>
                        {line}
                      </span>
                    ))}
                  </div>

                </div>

                {card.link && (
                  <div className="ContactMainCardArrow">
                    <ArrowUpRight size={15} />
                  </div>
                )}

              </CardElement>
            );
          })}

        </div>

        {/* =====================================================
            2. CONTACT + INQUIRY SECTION
        ===================================================== */}

        <div className="ContactMainSplitSection">

          {/* LEFT SIDE */}

          <div className="ContactMainSidePerks">

            <span className="ContactMainBadge">
              <Sparkles size={14} />
              Palash Essence
            </span>

            <h2 className="ContactMainSideHeading">
              Let&apos;s Start a Conversation
            </h2>

            <p className="ContactMainSideDesc">
              Have a question about our products, bulk requirements,
              retail enquiries or business opportunities? Get in touch
              with Palash Essence and our team will be happy to assist you.
            </p>

            <div className="ContactMainPerksList">

              {brandPerks.map((perk, idx) => {
                const PerkIcon = perk.icon;

                return (
                  <div
                    className="ContactMainPerkItem"
                    key={idx}
                  >

                    <div className="ContactMainPerkIconBox">
                      <PerkIcon
                        size={20}
                        strokeWidth={2}
                      />
                    </div>

                    <div>

                      <h4 className="ContactMainPerkTitle">
                        {perk.title}
                      </h4>

                      <p className="ContactMainPerkDesc">
                        {perk.desc}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="ContactMainDirectCall">

              <Phone size={18} />

              <span>
                Speak with us:{" "}
                <a
                  href="tel:+9190072522221"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  <strong>
                    +91 90072 522221
                  </strong>
                </a>
              </span>

            </div>

          </div>

          {/* RIGHT SIDE FORM */}

          <div className="ContactMainReservationBox">

            <div className="ContactMainBoxHeader">

              <span className="ContactMainBoxBadge">
                <Send size={14} />
                Send an Inquiry
              </span>

              <h3 className="ContactMainBoxTitle">
                Connect With Palash Essence
              </h3>

              <p className="ContactMainBoxSubtitle">
                Tell us what you need and our team will get back to you.
              </p>

            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {isSubmitted && submittedData ? (

              <div className="ContactMainSuccessCard">

                <div className="ContactMainSuccessIcon">
                  <CheckCircle2
                    size={46}
                    strokeWidth={2.2}
                  />
                </div>

                <h4 className="ContactMainSuccessTitle">
                  Thank You for Reaching Out!
                </h4>

                <p className="ContactMainSuccessText">
                  Thank you,{" "}
                  <strong>
                    {submittedData.name}
                  </strong>
                  . Your enquiry regarding{" "}
                  <strong>
                    {submittedData.inquiryType}
                  </strong>{" "}
                  has been received. Our team will connect with you at{" "}
                  <strong>
                    {submittedData.number}
                  </strong>{" "}
                  or{" "}
                  <strong>
                    {submittedData.email}
                  </strong>.
                </p>

                <button
                  type="button"
                  className="ContactMainResetButton"
                  onClick={handleReset}
                >
                  <RefreshCw size={15} />
                  Send Another Message
                </button>

              </div>

            ) : (

              /* =================================================
                  CONTACT FORM
              ================================================= */

              <form
                className="ContactMainForm"
                onSubmit={handleSubmit}
              >

                <div className="ContactMainFormRow">

                  <div className="ContactMainField">

                    <label
                      className="ContactMainLabel"
                      htmlFor="name"
                    >
                      Your Name
                    </label>

                    <input
                      id="name"
                      className="ContactMainInput"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="ContactMainField">

                    <label
                      className="ContactMainLabel"
                      htmlFor="email"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      className="ContactMainInput"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="ContactMainFormRow">

                  <div className="ContactMainField">

                    <label
                      className="ContactMainLabel"
                      htmlFor="number"
                    >
                      Phone Number
                    </label>

                    <input
                      id="number"
                      className="ContactMainInput"
                      type="tel"
                      name="number"
                      placeholder="+91 98765 43210"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="ContactMainField">

                    <label
                      className="ContactMainLabel"
                      htmlFor="inquiryType"
                    >
                      Requirement Type
                    </label>

                    <select
                      id="inquiryType"
                      className="ContactMainInput ContactMainSelect"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="Product Inquiry">
                        Product Inquiry
                      </option>

                      <option value="Wholesale & Bulk Supply">
                        Wholesale & Bulk Supply
                      </option>

                      <option value="Distributorship / Dealership">
                        Distributorship / Dealership
                      </option>

                      <option value="Custom Packing">
                        Custom Packaging
                      </option>

                      <option value="General Question">
                        General Question
                      </option>
                    </select>

                  </div>

                </div>

                <div className="ContactMainField">

                  <label
                    className="ContactMainLabel"
                    htmlFor="message"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    className="ContactMainTextarea"
                    name="message"
                    placeholder="Tell us about your requirement..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                  />

                </div>

                <div className="ContactMainSubmitWrapper">

                  <button
                    type="submit"
                    className="ContactMainSubmitButton"
                  >
                    <span>
                      Send Inquiry
                    </span>

                    <span className="ContactMainSubmitIcon">
                      <ArrowUpRight size={16} />
                    </span>

                  </button>

                </div>

              </form>
            )}

          </div>

        </div>

        {/* =====================================================
            3. LOCATION SECTION
        ===================================================== */}

        <div className="ContactMainMapContainer">

          <div className="ContactMainMapHeader">

            <span className="ContactMainBadge">
              <Navigation size={14} />
              Find Us
            </span>

            <h3 className="ContactMainMapHeading">
              Visit Palash Essence
            </h3>

            <p className="ContactMainMapSub">
              Patiramjote, Matigara, Siliguri,
              Dist - Darjeeling, West Bengal, India.
            </p>

          </div>

          <div className="ContactMainMapFrameWrapper">

            <iframe
              title="Palash Essence Location"
              src="https://maps.google.com/maps?q=Matigara,Siliguri,Darjeeling,West+Bengal&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="ContactMainMapOverlayBadge">

              <div className="ContactMainMapBadgePin">
                <MapPin size={20} />
              </div>

              <div>
                <strong>
                  Palash Essence
                </strong>

                <span>
                  Patiramjote, Matigara, Siliguri, WB
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactMain;