import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiArrowRight,
  FiShoppingBag,
  FiShield,
} from "react-icons/fi";

import { FaLeaf } from "react-icons/fa";

import "./Login.css";
import foodigoImage from "../../assets/login.png";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.identifier === "foodigo" &&
      formData.password === "12345"
    ) {
      sessionStorage.setItem("isAdminAuthenticated", "true");

      setIsSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      setErrorMessage(
        "Invalid credentials. Please check your login details."
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

            <div className="Login-success-icon-wrapper">
              <FiCheckCircle
                size={76}
                className="Login-success-icon"
              />
            </div>

            <span className="Login-success-badge">
              <FiShield size={14} />
              Secure Login
            </span>

            <h1 className="Login-success-title">
              LOGIN SUCCESSFUL
            </h1>

            <p className="Login-success-subtitle">
              Welcome to the Foodigo Admin Portal
            </p>

            <p className="Login-success-text">
              Preparing your dashboard...
            </p>

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
          isSuccess ? "Login-blur" : ""
        }`}
      >

        {/* =================================================
            LEFT BRAND / PRODUCT SECTION
        ================================================= */}

        <div
          className="Login-brand-section"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(5, 38, 24, 0.70),
                rgba(8, 54, 31, 0.45),
                rgba(0, 0, 0, 0.35)
              ),
              url(${foodigoImage})
            `,
          }}
        >

          {/* Decorative elements */}

          <div className="Login-brand-glow Login-brand-glow-one" />
          <div className="Login-brand-glow Login-brand-glow-two" />

          {/* =================================================
              BRAND HEADER
          ================================================= */}

          <div className="Login-brand-header">

            <div className="Login-logo-container">

              <div className="Login-logo-badge">
                <FaLeaf className="Login-logo-leaf" />
              </div>

              <div className="Login-logo-text-group">

                <h2 className="Login-brand-title">
                  Foodigo
                </h2>

                <span className="Login-brand-subtitle">
                  FOOD PRODUCTS
                </span>

                <p className="Login-brand-tagline">
                  Pure • Fresh • Trusted
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="Login-hero-content">

            <span className="Login-hero-badge">
              <FiShoppingBag size={14} />
              Foodigo Admin Portal
            </span>

            <h1 className="Login-hero-heading">
              Good Food.
              <br />

              <span className="Login-hero-highlight">
                Better Living.
              </span>
            </h1>

            <p className="Login-hero-description">
              Manage your Foodigo products, orders, customers,
              enquiries and daily business operations from one
              secure administration panel.
            </p>

            {/* PRODUCT VALUES */}

            <div className="Login-values">

              <div className="Login-value-item">
                <span className="Login-value-icon">
                  <FaLeaf />
                </span>

                <div>
                  <strong>Pure Products</strong>
                  <small>Quality you can trust</small>
                </div>
              </div>

              <div className="Login-value-item">
                <span className="Login-value-icon">
                  <FiShield />
                </span>

                <div>
                  <strong>Secure Management</strong>
                  <small>Protected admin access</small>
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
              From Quality
              <br />
              To Your Kitchen
              <FaLeaf className="Login-footer-leaf" />
            </p>

          </div>

        </div>

        {/* =================================================
            RIGHT LOGIN FORM
        ================================================= */}

        <div className="Login-form-section">

          {/* TOP BRAND MARK */}

          <div className="Login-mobile-brand">

            <div className="Login-mobile-logo">
              <FaLeaf />
            </div>

            <span>Foodigo</span>

          </div>

          {/* USER ICON */}

          <div className="Login-avatar-container">

            <div className="Login-avatar-3d">

              <FiShoppingBag
                size={25}
              />

            </div>

          </div>

          {/* FORM HEADER */}

          <div className="Login-form-header">

            <span className="Login-welcome-label">
              ADMINISTRATION
            </span>

            <h2>
              Welcome Back
            </h2>

            <p>
              Login to your Foodigo admin account
              and manage your food business.
            </p>

          </div>

          {/* ERROR */}

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

            {/* IDENTIFIER */}

            <div className="Login-input-wrapper">

              <label
                htmlFor="identifier"
                className="Login-input-label"
              >
                Email or Mobile Number
              </label>

              <div className="Login-input-group">

                <FiMail
                  className="Login-input-icon"
                  size={18}
                />

                <input
                  id="identifier"
                  type="text"
                  name="identifier"
                  placeholder="Enter email or mobile number"
                  value={formData.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />

              </div>

            </div>

            {/* PASSWORD */}

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

                <button
                  type="button"
                  className="Login-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
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

            {/* OPTIONS */}

            <div className="Login-form-options">

              <label className="Login-checkbox-label">

                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />

                <span>
                  Remember me
                </span>

              </label>

              <a
                href="#forgot"
                className="Login-forgot-link"
              >
                Forgot Password?
              </a>

            </div>

            {/* LOGIN BUTTON */}

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

          {/* SECURITY INFO */}

          <div className="Login-security-note">

            <FiShield size={15} />

            <span>
              Your admin session is protected
              with secure authentication.
            </span>

          </div>

          {/* COPYRIGHT */}

          <div className="Login-copyright">
            © {new Date().getFullYear()} Foodigo.
            All rights reserved.
          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;