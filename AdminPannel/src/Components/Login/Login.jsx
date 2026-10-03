import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowRight,
  FiShoppingBag,
  FiShield,
  FiStar,
} from "react-icons/fi";

import { FaLeaf } from "react-icons/fa";

import "./Login.css";

// =====================================================
// PALASH ESSENTIAL LOGIN IMAGE
// Make sure this file exists:
// src/assets/palash-login.png
// =====================================================

import palashLoginImage from "../../assets/main-1.jpeg";

const Login = () => {
  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: true,
  });

  // =====================================================
  // UI STATE
  // =====================================================

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================================================
  // LOGIN SUBMIT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const enteredId =
      formData.identifier.trim();

    const enteredPassword =
      formData.password;

    // ===================================================
    // PALASH ESSENTIAL ADMIN CREDENTIALS
    // ===================================================

    if (
      enteredId === "palash" &&
      enteredPassword === "12345"
    ) {
      // Store authentication status
      sessionStorage.setItem(
        "isAdminAuthenticated",
        "true"
      );

      // Store admin name
      sessionStorage.setItem(
        "adminName",
        "Palash Essential"
      );

      // Clear previous error
      setErrorMessage("");

      // Show success screen
      setIsSuccess(true);

      // Navigate to dashboard
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      setErrorMessage(
        "Invalid credentials. Please check your admin ID and password."
      );
    }
  };

  return (
    <div className="Login-container">

      {/* =================================================
          SUCCESS OVERLAY
      ================================================= */}

      {isSuccess && (
        <div className="Login-success-overlay">

          <div className="Login-success-card">

            {/* SUCCESS ICON */}

            <div className="Login-success-icon-wrapper">

              <FiCheckCircle
                size={76}
                className="Login-success-icon"
              />

            </div>

            {/* SECURITY BADGE */}

            <span className="Login-success-badge">

              <FiShield size={14} />

              Secure Login

            </span>

            {/* SUCCESS TITLE */}

            <h1 className="Login-success-title">
              LOGIN SUCCESSFUL
            </h1>

            {/* SUCCESS MESSAGE */}

            <p className="Login-success-subtitle">
              Welcome to Palash Essential
            </p>

            <p className="Login-success-text">
              Preparing your administration
              dashboard...
            </p>

            {/* LOADER */}

            <div className="Login-success-loader">
              <span />
            </div>

          </div>

        </div>
      )}

      {/* =================================================
          MAIN LOGIN CARD
      ================================================= */}

      <div
        className={`Login-card-wrapper ${
          isSuccess
            ? "Login-blur"
            : ""
        }`}
      >

        {/* =================================================
            LEFT BRAND SECTION
        ================================================= */}

        <div
          className="Login-brand-section"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(0, 0, 0, 0.90),
                rgba(5, 5, 5, 0.72),
                rgba(0, 0, 0, 0.48)
              ),
              url(${palashLoginImage})
            `,
          }}
        >

          {/* =================================================
              DECORATIVE GLOW
          ================================================= */}

          <div
            className="
              Login-brand-glow
              Login-brand-glow-one
            "
          />

          <div
            className="
              Login-brand-glow
              Login-brand-glow-two
            "
          />

          {/* =================================================
              BRAND HEADER
          ================================================= */}

          <div className="Login-brand-header">

            <div className="Login-logo-container">

              {/* LOGO */}

              <div className="Login-logo-badge">

                <FaLeaf
                  className="Login-logo-leaf"
                />

              </div>

              {/* BRAND TEXT */}

              <div className="Login-logo-text-group">

                <h2 className="Login-brand-title">
                  PALASH
                </h2>

                <span className="Login-brand-subtitle">
                  ESSENTIAL
                </span>

                <p className="Login-brand-tagline">
                  Pure • Natural • Premium
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="Login-hero-content">

            {/* HERO BADGE */}

            <span className="Login-hero-badge">

              <FiShoppingBag
                size={14}
              />

              PALASH ESSENTIAL ADMIN

            </span>

            {/* HERO HEADING */}

            <h1 className="Login-hero-heading">

              Pure Spices.

              <br />

              <span className="Login-hero-highlight">
                Rich Flavours.
              </span>

            </h1>

            {/* DESCRIPTION */}

            <p className="Login-hero-description">

              Manage your Palash Essential
              products, orders, customers,
              enquiries and daily business
              operations from one secure
              administration panel.

            </p>

            {/* =================================================
                PRODUCT VALUES
            ================================================= */}

            <div className="Login-values">

              {/* VALUE 1 */}

              <div className="Login-value-item">

                <span className="Login-value-icon">

                  <FaLeaf />

                </span>

                <div>

                  <strong>
                    100% Natural
                  </strong>

                  <small>
                    Pure ingredients &
                    products
                  </small>

                </div>

              </div>

              {/* VALUE 2 */}

              <div className="Login-value-item">

                <span className="Login-value-icon">

                  <FiStar />

                </span>

                <div>

                  <strong>
                    Premium Quality
                  </strong>

                  <small>
                    Quality you can trust
                  </small>

                </div>

              </div>

              {/* VALUE 3 */}

              <div className="Login-value-item">

                <span className="Login-value-icon">

                  <FiShield />

                </span>

                <div>

                  <strong>
                    Secure Management
                  </strong>

                  <small>
                    Protected admin access
                  </small>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              BRAND FOOTER
          ================================================= */}

          <div className="Login-hero-footer">

            <div className="Login-footer-line" />

            <p className="Login-handwritten">

              Pure Spices

              <br />

              Better Tomorrow

              <FaLeaf
                className="Login-footer-leaf"
              />

            </p>

          </div>

        </div>

        {/* =================================================
            RIGHT LOGIN FORM
        ================================================= */}

        <div className="Login-form-section">

          {/* =================================================
              MOBILE BRAND
          ================================================= */}

          <div className="Login-mobile-brand">

            <div className="Login-mobile-logo">

              <FaLeaf />

            </div>

            <div className="Login-mobile-brand-text">

              <strong>
                PALASH
              </strong>

              <span>
                ESSENTIAL
              </span>

            </div>

          </div>

          {/* =================================================
              USER ICON
          ================================================= */}

          <div className="Login-avatar-container">

            <div className="Login-avatar-3d">

              <FiUser
                size={25}
              />

            </div>

          </div>

          {/* =================================================
              FORM HEADER
          ================================================= */}

          <div className="Login-form-header">

            <span className="Login-welcome-label">
              ADMINISTRATION
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to your Palash Essential
              administration account.
            </p>

          </div>

          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {errorMessage && (
            <div className="Login-error-badge">

              {errorMessage}

            </div>
          )}

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="Login-form"
          >

            {/* =================================================
                ADMIN ID
            ================================================= */}

            <div className="Login-input-wrapper">

              <label
                htmlFor="identifier"
                className="Login-input-label"
              >
                Admin ID
              </label>

              <div className="Login-input-group">

                <FiUser
                  className="Login-input-icon"
                  size={18}
                />

                <input
                  id="identifier"
                  type="text"
                  name="identifier"
                  placeholder="Enter admin ID"
                  value={formData.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />

              </div>

            </div>

            {/* =================================================
                PASSWORD
            ================================================= */}

            <div className="Login-input-wrapper">

              <label
                htmlFor="password"
                className="Login-input-label"
              >
                Password
              </label>

              <div className="Login-input-group">

                <FiLock
                  className="Login-input-icon"
                  size={18}
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                {/* PASSWORD SHOW/HIDE */}

                <button
                  type="button"
                  className="Login-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}

                </button>

              </div>

            </div>

            {/* =================================================
                FORM OPTIONS
            ================================================= */}

            <div className="Login-form-options">

              <label className="Login-checkbox-label">

                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={
                    formData.rememberMe
                  }
                  onChange={handleChange}
                />

                <span>
                  Remember me
                </span>

              </label>

              <span className="Login-forgot-link">
                Secure Access
              </span>

            </div>

            {/* =================================================
                LOGIN BUTTON
            ================================================= */}

            <button
              type="submit"
              className="Login-submit-btn"
            >

              <span>
                Login to Dashboard
              </span>

              <FiArrowRight
                size={19}
              />

            </button>

          </form>

          {/* =================================================
              SECURITY INFO
              
              IMPORTANT:
              No ID or password is displayed here.
          ================================================= */}

          <div className="Login-security-note">

            <FiShield size={15} />

            <span>
              Your admin session is protected
              with secure authentication.
            </span>

          </div>

          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <div className="Login-copyright">

            © {new Date().getFullYear()}
            {" "}
            Palash Essential.
            {" "}
            All rights reserved.

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;