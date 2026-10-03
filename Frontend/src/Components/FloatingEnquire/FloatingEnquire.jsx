import React, { useState, useEffect, useCallback, useRef } from "react";
import "./FloatingEnquire.css";

const BUSINESS_DETAILS = {
  brand: "Foodigo",
  proprietor: "Sandeep Kumar",
  phone: "+9190072522221",
  displayPhone: "+91 90072 52221",
  email: "gsmarketing507@gmail.com",
  address: "Patiramjote, Matigara, Siliguri, Dist. Darjeeling, West Bengal, India",
};

const PRODUCT_CATEGORIES = [
  "Packaged Snacks & Savouries",
  "Spices & Seasonings",
  "Ready-to-Cook & Instant Foods",
  "Beverages & Syrups",
  "Bulk Dealership / Distributorship",
  "Wholesale & Institutional Supply",
];

const FloatingEnquire = ({
  triggerOnLoad = false,
  loadDelay = 3000,
  onEnquirySuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    productInterest: "",
    message: "",
    captchaInput: "",
    agreeTerms: true,
  });

  const firstInputRef = useRef(null);

  // Generate a random 3-digit CAPTCHA
  const generateCaptcha = useCallback(() => {
    const randomNum = Math.floor(100 + Math.random() * 900).toString();
    setCaptchaCode(randomNum);
    setFormData((prev) => ({ ...prev, captchaInput: "" }));
  }, []);

  const handleOpen = useCallback(() => {
    if (isSubmitting) return;
    setIsSubmitted(false);
    generateCaptcha();
    setIsOpen(true);
  }, [generateCaptcha, isSubmitting]);

  const handleClose = useCallback(() => {
    if (isSubmitting) return;
    setIsOpen(false);
  }, [isSubmitting]);

  // Automatic open timer
  useEffect(() => {
    if (!triggerOnLoad) return;
    const timer = setTimeout(() => {
      handleOpen();
    }, loadDelay);

    return () => clearTimeout(timer);
  }, [triggerOnLoad, loadDelay, handleOpen]);

  // Autofocus first field when opened
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 350);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen && !isSubmitting) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, handleClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "mobile") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, mobile: numbersOnly }));
      return;
    }

    if (name === "captchaInput") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 3);
      setFormData((prev) => ({ ...prev, captchaInput: numbersOnly }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    if (formData.fullName.trim().length < 3) {
      alert("Please enter your full name (minimum 3 characters).");
      return false;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return false;
    }

    if (!formData.productInterest) {
      alert("Please select a product category or enquiry type.");
      return false;
    }

    if (formData.captchaInput.trim() !== captchaCode) {
      alert("Incorrect verification code. Please check the CAPTCHA and try again.");
      generateCaptcha();
      return false;
    }

    if (!formData.agreeTerms) {
      alert("Please agree to be contacted regarding this product enquiry.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulated instant client-side resolution (No backend required)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const enquiryData = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        mobile: `+91 ${formData.mobile.trim()}`,
        productInterest: formData.productInterest,
        message: formData.message.trim(),
        timestamp: new Date().toISOString(),
      };

      if (onEnquirySuccess) {
        onEnquirySuccess(enquiryData);
      }

      // Reset fields after successful entry
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        productInterest: "",
        message: "",
        captchaInput: "",
        agreeTerms: true,
      });
    }, 700);
  };

  const handleCall = () => {
    window.location.href = `tel:${BUSINESS_DETAILS.phone}`;
  };

  return (
    <>
      {/* ================= FLOATING TRIGGER BUTTON ================= */}
      {!isOpen && (
        <button
          type="button"
          className="foodigo-trigger-btn"
          onClick={handleOpen}
          aria-label="Open product enquiry form"
        >
          <span className="foodigo-trigger-glow" />
          <span className="foodigo-trigger-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span className="foodigo-trigger-label">ENQUIRE NOW</span>
          <span className="foodigo-trigger-arrow">←</span>
        </button>
      )}

      {/* ================= MODAL BACKDROP ================= */}
      {isOpen && (
        <div
          className="foodigo-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isSubmitting) handleClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="foodigo-modal-title"
        >
          <div className="foodigo-modal-card">
            {/* CLOSE BUTTON */}
            <button
              type="button"
              className="foodigo-modal-close"
              onClick={handleClose}
              disabled={isSubmitting}
              aria-label="Close enquiry popup"
            >
              <span>×</span>
            </button>

            {/* ================= BRAND PROMO PANEL ================= */}
            <div className="foodigo-promo-panel">
              <div className="foodigo-promo-overlay" />
              <div className="foodigo-promo-content">
                <div className="foodigo-promo-badge">
                  <span className="foodigo-promo-badge-dot" />
                  Premium Food &amp; FMCG Brand
                </div>

                <div className="foodigo-promo-tag">GS MARKETING &amp; DISTRIBUTORS</div>

                <h2 className="foodigo-promo-title">
                  Welcome to <br />
                  <span>{BUSINESS_DETAILS.brand}</span>
                </h2>

                <p className="foodigo-promo-description">
                  Delivering high quality packaged foods, spices, and wholesale supplies across Siliguri, Darjeeling, and Eastern India.
                </p>

                <div className="foodigo-promo-highlights">
                  <div className="foodigo-highlight-item">
                    <span className="foodigo-highlight-icon">✓</span>
                    <div>
                      <strong>Direct Sourcing</strong>
                      <small>Pure &amp; hygienic packaging</small>
                    </div>
                  </div>

                  <div className="foodigo-highlight-item">
                    <span className="foodigo-highlight-icon">✓</span>
                    <div>
                      <strong>Wholesale &amp; Bulk</strong>
                      <small>Competitive dealer pricing</small>
                    </div>
                  </div>

                  <div className="foodigo-highlight-item">
                    <span className="foodigo-highlight-icon">✓</span>
                    <div>
                      <strong>Fast Logistics</strong>
                      <small>Reliable local supply chain</small>
                    </div>
                  </div>

                  <div className="foodigo-highlight-item">
                    <span className="foodigo-highlight-icon">✓</span>
                    <div>
                      <strong>Distributor Support</strong>
                      <small>Tailored trade margins</small>
                    </div>
                  </div>
                </div>

                <div className="foodigo-company-meta">
                  <p>
                    <strong>Proprietor:</strong> {BUSINESS_DETAILS.proprietor}
                  </p>
                  <p>
                    <strong>Location:</strong> {BUSINESS_DETAILS.address}
                  </p>
                </div>

                <button type="button" className="foodigo-quick-call-btn" onClick={handleCall}>
                  <span className="foodigo-call-icon">☎</span>
                  <span>
                    Call Us Directly
                    <strong>{BUSINESS_DETAILS.displayPhone}</strong>
                  </span>
                </button>
              </div>
            </div>

            {/* ================= FORM PANEL ================= */}
            <div className="foodigo-form-panel">
              {isSubmitted ? (
                <div className="foodigo-success-view">
                  <div className="foodigo-success-icon">✓</div>
                  <h3>Thank You!</h3>
                  <p>
                    Your enquiry for <strong>{BUSINESS_DETAILS.brand}</strong> products has been registered.
                  </p>
                  <p className="foodigo-success-sub">
                    Our team will get in touch with you at your provided mobile number shortly.
                  </p>
                  <button
                    type="button"
                    className="foodigo-btn-primary"
                    onClick={() => {
                      setIsSubmitted(false);
                      handleClose();
                    }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="foodigo-form-header">
                    <div className="foodigo-form-badge">QUICK PRODUCT ENQUIRY</div>
                    <h3 id="foodigo-modal-title" className="foodigo-form-title">
                      Get Best Price &amp; Samples
                    </h3>
                    <p className="foodigo-form-subtitle">
                      Looking for wholesale, dealership, or products? Fill in your details below.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="foodigo-form-body" noValidate>
                    {/* NAME */}
                    <div className="foodigo-form-group">
                      <label htmlFor="foodigoFullName" className="foodigo-form-label">
                        Full Name / Firm Name
                      </label>
                      <div className="foodigo-input-wrapper">
                        <input
                          ref={firstInputRef}
                          id="foodigoFullName"
                          type="text"
                          name="fullName"
                          placeholder="Enter your name or business name"
                          value={formData.fullName}
                          onChange={handleChange}
                          maxLength={80}
                          required
                          autoComplete="name"
                        />
                        <span className="foodigo-input-icon">👤</span>
                      </div>
                    </div>

                    {/* MOBILE */}
                    <div className="foodigo-form-group">
                      <label htmlFor="foodigoMobile" className="foodigo-form-label">
                        Mobile Number
                      </label>
                      <div className="foodigo-input-wrapper">
                        <span className="foodigo-country-prefix">+91</span>
                        <input
                          id="foodigoMobile"
                          type="tel"
                          name="mobile"
                          placeholder="10 digit mobile number"
                          value={formData.mobile}
                          onChange={handleChange}
                          maxLength={10}
                          required
                          autoComplete="tel"
                          inputMode="numeric"
                        />
                        <span className="foodigo-input-icon">📞</span>
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div className="foodigo-form-group">
                      <label htmlFor="foodigoEmail" className="foodigo-form-label">
                        Email Address <span>(Optional)</span>
                      </label>
                      <div className="foodigo-input-wrapper">
                        <input
                          id="foodigoEmail"
                          type="email"
                          name="email"
                          placeholder="e.g. name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                        />
                        <span className="foodigo-input-icon">✉</span>
                      </div>
                    </div>

                    {/* PRODUCT REQUIREMENT */}
                    <div className="foodigo-form-group">
                      <label htmlFor="foodigoProduct" className="foodigo-form-label">
                        Product Category / Enquiry Type
                      </label>
                      <div className="foodigo-input-wrapper">
                        <select
                          id="foodigoProduct"
                          name="productInterest"
                          value={formData.productInterest}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>
                            Select your interest
                          </option>
                          {PRODUCT_CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <span className="foodigo-chevron">▼</span>
                      </div>
                    </div>

                    {/* OPTIONAL NOTE */}
                    <div className="foodigo-form-group">
                      <label htmlFor="foodigoMessage" className="foodigo-form-label">
                        Specific Requirement <span>(Optional)</span>
                      </label>
                      <div className="foodigo-input-wrapper">
                        <input
                          id="foodigoMessage"
                          type="text"
                          name="message"
                          placeholder="Quantity, location, or remarks"
                          value={formData.message}
                          onChange={handleChange}
                          maxLength={150}
                        />
                      </div>
                    </div>

                    {/* CAPTCHA VERIFICATION */}
                    <div className="foodigo-captcha-group">
                      <label htmlFor="foodigoCaptcha" className="foodigo-form-label">
                        Verification Code
                      </label>
                      <div className="foodigo-captcha-row">
                        <div
                          className="foodigo-captcha-display"
                          aria-label={`Verification code ${captchaCode.split("").join(" ")}`}
                        >
                          {captchaCode ? captchaCode.split("").join(" ") : "..."}
                        </div>
                        <input
                          id="foodigoCaptcha"
                          type="text"
                          name="captchaInput"
                          placeholder="Enter code"
                          className="foodigo-captcha-input"
                          value={formData.captchaInput}
                          onChange={handleChange}
                          maxLength={3}
                          required
                          autoComplete="off"
                          inputMode="numeric"
                        />
                        <button
                          type="button"
                          className="foodigo-captcha-refresh"
                          onClick={generateCaptcha}
                          aria-label="Refresh verification code"
                          title="Generate new code"
                        >
                          ↻
                        </button>
                      </div>
                    </div>

                    {/* TERMS */}
                    <div className="foodigo-terms-row">
                      <input
                        type="checkbox"
                        id="foodigoTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="foodigoTerms">
                        I agree to receive quotation and details from <strong>Foodigo</strong>.
                      </label>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button type="submit" className="foodigo-btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="foodigo-spinner" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Enquiry
                          <span>→</span>
                        </>
                      )}
                    </button>

                    <p className="foodigo-guarantee-text">
                      🔒 Your details are strictly confidential and used only for Foodigo trade enquiries.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingEnquire;