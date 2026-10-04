import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FloatingForm.css";
import API from "../../api/axios";

// ============================================================
// PALASH ESSENCE - FLOATING CONTACT FORM
// Premium Black + Gold Grocery / Spice Theme
// ============================================================

// Keep your existing image path.
// Ideally this should be your Palash Essence logo/product image.
import brandImage from "../../assets/floatingform.png";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const FloatingForm = ({
  isOpen: controlledIsOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [internalOpen, setInternalOpen] = useState(true);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [isClosing, setIsClosing] = useState(false);

  const isVisible =
    controlledIsOpen !== undefined
      ? controlledIsOpen
      : internalOpen;

  // ==========================================================
  // CLOSE FORM
  // ==========================================================

  const handleClose = (force = false) => {
    if (status === "submitting" && !force) {
      return;
    }

    setIsClosing(true);

    setTimeout(() => {
      setInternalOpen(false);
      setIsClosing(false);
      setStatus("idle");

      if (typeof onClose === "function") {
        onClose();
      }
    }, 300);
  };

  // ==========================================================
  // INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================================
  // SUBMIT FORM
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status !== "idle") {
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        text: "All fields are required.",
        confirmButtonText: "Okay",
        confirmButtonColor: "#b88a2b",
      });

      return;
    }

    try {
      setStatus("submitting");

      const response = await API.post("/cold-leads", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        message: "",
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to submit your details."
        );
      }

      const savedLead = response.data.data;

      if (typeof onSubmitSuccess === "function") {
        await onSubmitSuccess(savedLead);
      }

      setFormData(EMPTY_FORM);

      handleClose(true);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your details have been submitted successfully.",
        timer: 1600,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      setStatus("idle");

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#b88a2b",
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`palash-overlay ${
        isClosing ? "palash-overlay-closing" : ""
      }`}
      onClick={() => handleClose()}
    >
      <div
        className={`palash-card ${
          isClosing ? "palash-card-closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="palash-form-title"
      >
        {/* =====================================================
            PREMIUM DECORATIVE BACKGROUND
        ===================================================== */}

        <div className="palash-gold-orb palash-gold-orb-one"></div>
        <div className="palash-gold-orb palash-gold-orb-two"></div>

        <div className="palash-top-pattern"></div>

        {/* =====================================================
            TOP BRAND IMAGE
        ===================================================== */}

        <div className="palash-brand-image">
          <div className="palash-image-ring"></div>

          <img
            src={brandImage}
            alt="Palash Essence"
            className="palash-logo-image"
          />
        </div>

        {/* =====================================================
            CLOSE BUTTON
        ===================================================== */}

        <button
          type="button"
          className="palash-close"
          onClick={() => handleClose()}
          disabled={status === "submitting"}
          aria-label="Close contact form"
        >
          <span></span>
          <span></span>
        </button>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="palash-content">
          {/* ===================================================
              BRAND TEXT
          =================================================== */}

          <div className="palash-brand-heading">
            <span className="palash-brand-small">
              PALASH
            </span>

            <span className="palash-brand-main">
              ESSENCE
            </span>

            <div className="palash-brand-line">
              <span></span>
              <small>
                PURE SPICES • RICH FLAVOURS • BETTER TOMORROW
              </small>
              <span></span>
            </div>
          </div>

          {/* ===================================================
              HEADING
          =================================================== */}

          <div className="palash-heading">
            <div className="palash-eyebrow">
              <span className="palash-eyebrow-line"></span>

              <span>
                WE'D LOVE TO HEAR FROM YOU
              </span>
            </div>

            <h2 id="palash-form-title">
              Let's <span>Connect.</span>
            </h2>

            <p>
              Share your details and our team will
              <br />
              get back to you shortly.
            </p>
          </div>

          {/* ===================================================
              FORM
          =================================================== */}

          <form
            className="palash-form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* NAME */}

            <div className="palash-field">
              <label htmlFor="palash-name">
                Your Name <em>*</em>
              </label>

              <div className="palash-input">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                  />
                  <path d="M4 21c0-4 3.2-7 8-7s8 3 8 7" />
                </svg>

                <input
                  id="palash-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  disabled={status === "submitting"}
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className="palash-field">
              <label htmlFor="palash-email">
                Email Address <em>*</em>
              </label>

              <div className="palash-input">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="14"
                    rx="2"
                  />

                  <path d="m3 7 9 6 9-6" />
                </svg>

                <input
                  id="palash-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  disabled={status === "submitting"}
                />
              </div>
            </div>

            {/* PHONE */}

            <div className="palash-field">
              <label htmlFor="palash-phone">
                Phone Number <em>*</em>
              </label>

              <div className="palash-input">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                </svg>

                <input
                  id="palash-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  inputMode="tel"
                  disabled={status === "submitting"}
                />
              </div>
            </div>

            {/* ADDRESS */}

            <div className="palash-field">
              <label htmlFor="palash-address">
                Address <em>*</em>
              </label>

              <div className="palash-input">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />

                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                  />
                </svg>

                <input
                  id="palash-address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  autoComplete="street-address"
                  disabled={status === "submitting"}
                />
              </div>
            </div>

            {/* =================================================
                SUBMIT BUTTON
            ================================================= */}

            <button
              type="submit"
              className={`palash-submit ${
                status === "submitting"
                  ? "palash-submit-loading"
                  : ""
              }`}
              disabled={status === "submitting"}
            >
              {status === "idle" ? (
                <>
                  <span>
                    Send My Details
                  </span>

                  <span className="palash-arrow">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <span className="palash-spinner"></span>

                  <span>
                    Submitting...
                  </span>
                </>
              )}
            </button>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="palash-security">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />

                <path d="m9 12 2 2 4-4" />
              </svg>

              <span>
                Your information is safe & secure
              </span>
            </div>
          </form>
        </div>

        {/* =====================================================
            PREMIUM BOTTOM DECORATION
        ===================================================== */}

        <div className="palash-bottom-decoration">
          <span></span>
          <i>✦</i>
          <span></span>
        </div>

        <div className="palash-spice-dots">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;