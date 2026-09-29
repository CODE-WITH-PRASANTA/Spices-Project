import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  ChevronDown,
  Bell,
  Mail,
  Search,
  User,
  LogOut,
  Shield,
  Maximize,
  Minimize,
  X,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";

import "./Topbar.css";

// =========================================================
// BACKEND
// =========================================================

const BACKEND_BASE_URL = "http://localhost:5000";

const API_BASE_URL = `${BACKEND_BASE_URL}/api/profiles`;

// =========================================================
// DEFAULT AVATAR
// =========================================================

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

// =========================================================
// AVATAR URL HELPER
// =========================================================

const getAvatarUrl = (path) => {
  if (!path) return DEFAULT_AVATAR;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  return `${BACKEND_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// =========================================================
// TOPBAR
// =========================================================

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [mailOpen, setMailOpen] = useState(false);

  const [mobileSearchOpen, setMobileSearchOpen] =
    useState(false);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  // =======================================================
  // PROFILE
  // =======================================================

  const [currentProfile, setCurrentProfile] = useState({
    name: "Palash Admin",
    email: "admin@palashessence.com",
    travelerType: "Super Admin",
    avatar: DEFAULT_AVATAR,
  });

  // =======================================================
  // REFS
  // =======================================================

  const dropdownRef = useRef(null);

  const mobileSearchInputRef = useRef(null);

  // =======================================================
  // FETCH PROFILE
  // =======================================================

  const fetchTopProfile = async () => {
    try {
      const res = await fetch(API_BASE_URL);

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const result = await res.json();

      if (result.success && result.data?.length > 0) {
        setCurrentProfile(result.data[0]);
      }
    } catch (err) {
      console.error(
        "Failed to load profile in topbar:",
        err
      );
    }
  };

  // =======================================================
  // INITIAL PROFILE LOAD
  // =======================================================

  useEffect(() => {
    fetchTopProfile();

    const handleProfileUpdate = (event) => {
      if (event.detail) {
        setCurrentProfile(event.detail);
      }
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdate
      );
    };
  }, []);

  // =======================================================
  // CLOSE ALL MENUS
  // =======================================================

  const closeAllMenus = () => {
    setDropdownOpen(false);
    setNotificationsOpen(false);
    setMailOpen(false);
  };

  // =======================================================
  // CLICK OUTSIDE
  // =======================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeAllMenus();
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // =======================================================
  // ESCAPE KEY
  // =======================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllMenus();
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // =======================================================
  // FULLSCREEN STATE
  // =======================================================

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement)
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // =======================================================
  // MOBILE SEARCH AUTO FOCUS
  // =======================================================

  useEffect(() => {
    if (
      mobileSearchOpen &&
      mobileSearchInputRef.current
    ) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  // =======================================================
  // FULLSCREEN
  // =======================================================

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .catch(() => {});
    } else {
      document
        .exitFullscreen()
        .catch(() => {});
    }
  };

  // =======================================================
  // OPEN MENU
  // =======================================================

  const openMenu = (setter) => {
    closeAllMenus();
    setter(true);
  };

  // =======================================================
  // PROFILE AVATAR
  // =======================================================

  const avatarUrl = getAvatarUrl(
    currentProfile?.avatar
  );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <>
      <header className="Topbar">

        {/* =================================================
            TOPBAR INNER
        ================================================= */}

        <div
          className={`Topbar-inner ${
            mobileSearchOpen ? "is-hidden" : ""
          }`}
        >

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="Topbar-left">

            {/* Sidebar Toggle */}

            <button
              type="button"
              className="Topbar-toggle-btn"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>

            {/* Search */}

            <div className="Topbar-search-box">

              <Search
                size={16}
                className="Topbar-search-icon"
              />

              <input
                type="text"
                placeholder="Search products, orders..."
                className="Topbar-search-input"
                aria-label="Search"
              />

              <kbd className="Topbar-search-shortcut">
                Ctrl K
              </kbd>

            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div
            className="Topbar-right"
            ref={dropdownRef}
          >

            {/* =================================================
                MOBILE SEARCH
            ================================================= */}

            <button
              type="button"
              className="Topbar-action-btn Topbar-mobile-search-btn"
              onClick={() =>
                setMobileSearchOpen(true)
              }
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}

            <div className="Topbar-action-wrapper">

              <button
                type="button"
                className={`Topbar-action-btn ${
                  notificationsOpen
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  notificationsOpen
                    ? closeAllMenus()
                    : openMenu(
                        setNotificationsOpen
                      )
                }
                aria-label="Notifications"
                aria-expanded={
                  notificationsOpen
                }
              >
                <Bell size={18} />

                <span className="Topbar-badge">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="Topbar-dropdown Topbar-notifications-dropdown">

                  <div className="Topbar-dropdown-header">

                    <div className="Topbar-dropdown-title-wrap">

                      <Bell size={15} />

                      <span className="Topbar-dropdown-title">
                        Notifications
                      </span>

                    </div>

                    <span className="Topbar-dropdown-badge">
                      3 New
                    </span>

                  </div>

                  <div className="Topbar-notification-list">

                    <div className="Topbar-notification-item">

                      <div className="Topbar-notification-icon order">
                        <ShoppingBag size={15} />
                      </div>

                      <div className="Topbar-notification-content">

                        <p className="Topbar-notification-text">
                          New order{" "}
                          <strong>
                            #PE-9402
                          </strong>{" "}
                          has been placed.
                        </p>

                        <span className="Topbar-notification-time">
                          5 mins ago
                        </span>

                      </div>
                    </div>

                    <div className="Topbar-notification-item">

                      <div className="Topbar-notification-icon review">
                        <MessageCircle size={15} />
                      </div>

                      <div className="Topbar-notification-content">

                        <p className="Topbar-notification-text">
                          New customer review
                          received.
                        </p>

                        <span className="Topbar-notification-time">
                          18 mins ago
                        </span>

                      </div>
                    </div>

                  </div>

                  <div className="Topbar-view-all">
                    View all notifications
                  </div>

                </div>
              )}
            </div>

            {/* =================================================
                MESSAGES
            ================================================= */}

            <div className="Topbar-action-wrapper">

              <button
                type="button"
                className={`Topbar-action-btn ${
                  mailOpen ? "active" : ""
                }`}
                onClick={() =>
                  mailOpen
                    ? closeAllMenus()
                    : openMenu(setMailOpen)
                }
                aria-label="Messages"
                aria-expanded={mailOpen}
              >
                <Mail size={18} />

                <span className="Topbar-badge">
                  2
                </span>
              </button>

              {mailOpen && (
                <div className="Topbar-dropdown Topbar-notifications-dropdown">

                  <div className="Topbar-dropdown-header">

                    <div className="Topbar-dropdown-title-wrap">

                      <Mail size={15} />

                      <span className="Topbar-dropdown-title">
                        Messages
                      </span>

                    </div>

                    <span className="Topbar-dropdown-badge">
                      2 New
                    </span>

                  </div>

                  <div className="Topbar-notification-list">

                    <div className="Topbar-notification-item">

                      <div className="Topbar-notification-icon message">
                        <Mail size={15} />
                      </div>

                      <div className="Topbar-notification-content">

                        <p className="Topbar-notification-text">
                          New customer enquiry
                          received.
                        </p>

                        <span className="Topbar-notification-time">
                          10 mins ago
                        </span>

                      </div>

                    </div>

                  </div>

                  <div className="Topbar-view-all">
                    View all messages
                  </div>

                </div>
              )}
            </div>

            {/* =================================================
                FULLSCREEN
            ================================================= */}

            <button
              type="button"
              className="Topbar-action-btn Topbar-fullscreen-btn"
              onClick={toggleFullscreen}
              aria-label={
                isFullscreen
                  ? "Exit fullscreen"
                  : "Enter fullscreen"
              }
            >
              {isFullscreen ? (
                <Minimize size={18} />
              ) : (
                <Maximize size={18} />
              )}
            </button>

            {/* =================================================
                USER PROFILE
            ================================================= */}

            <div
              className={`Topbar-user ${
                dropdownOpen ? "active" : ""
              }`}
              onClick={() =>
                dropdownOpen
                  ? closeAllMenus()
                  : openMenu(
                      setDropdownOpen
                    )
              }
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();

                  dropdownOpen
                    ? closeAllMenus()
                    : openMenu(
                        setDropdownOpen
                      );
                }
              }}
            >

              {/* Avatar */}

              <div className="Topbar-avatar-wrapper">

                <img
                  src={avatarUrl}
                  alt={`${currentProfile?.name || "Admin"} avatar`}
                  className="Topbar-avatar"
                  onError={(event) => {
                    event.currentTarget.onerror =
                      null;

                    event.currentTarget.src =
                      DEFAULT_AVATAR;
                  }}
                />

                <span className="Topbar-status-indicator" />

              </div>

              {/* User Info */}

              <div className="Topbar-user-info">

                <span className="Topbar-username">
                  {currentProfile?.name ||
                    "Palash Admin"}
                </span>

                <span className="Topbar-role">
                  {currentProfile?.travelerType ||
                    "Super Admin"}
                </span>

              </div>

              <ChevronDown
                size={15}
                className={`Topbar-chevron ${
                  dropdownOpen
                    ? "open"
                    : ""
                }`}
              />

              {/* =================================================
                  USER DROPDOWN
              ================================================= */}

              {dropdownOpen && (
                <div
                  className="Topbar-dropdown Topbar-user-dropdown"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >

                  <div className="Topbar-user-card">

                    <div className="Topbar-user-card-avatar">

                      <img
                        src={avatarUrl}
                        alt=""
                      />

                    </div>

                    <div className="Topbar-user-card-details">

                      <p className="Topbar-card-name">
                        {currentProfile?.name ||
                          "Palash Admin"}
                      </p>

                      <p className="Topbar-card-email">
                        {currentProfile?.email ||
                          "admin@palashessence.com"}
                      </p>

                    </div>

                  </div>

                  <div className="Topbar-dropdown-divider" />

                  <Link
                    to="/profile"
                    className="Topbar-dropdown-item"
                    onClick={closeAllMenus}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/settings"
                    className="Topbar-dropdown-item"
                    onClick={closeAllMenus}
                  >
                    <Shield size={16} />
                    <span>Security & Settings</span>
                  </Link>

                  <div className="Topbar-dropdown-divider" />

                  <Link
                    to="/logout"
                    className="Topbar-dropdown-item logout"
                    onClick={closeAllMenus}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </Link>

                </div>
              )}
            </div>

          </div>
        </div>

        {/* =====================================================
            MOBILE SEARCH OVERLAY
        ===================================================== */}

        {mobileSearchOpen && (
          <div className="Topbar-mobile-search-overlay">

            <Search
              size={17}
              className="Topbar-search-icon"
            />

            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Search products, orders..."
              className="Topbar-mobile-search-input"
              aria-label="Search"
            />

            <button
              type="button"
              className="Topbar-mobile-search-close"
              onClick={() =>
                setMobileSearchOpen(false)
              }
              aria-label="Close search"
            >
              <X size={18} />
            </button>

          </div>
        )}

      </header>

      {/* =====================================================
          TOPBAR SPACER
      ===================================================== */}

      <div
        className="Topbar-spacer"
        aria-hidden="true"
      />
    </>
  );
};

export default Topbar;