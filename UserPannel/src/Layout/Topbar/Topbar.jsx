import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, User, Settings, LogOut, CheckCircle, AlertCircle } from 'lucide-react';
import './Topbar.css';

const dummyNotifications = [
  { id: 1, title: 'New User Registered', subtitle: '5 minutes ago', type: 'info' },
  { id: 2, title: 'System Backup Complete', subtitle: '1 hour ago', type: 'success' },
  { id: 3, title: 'Storage limit reached 80%', subtitle: '3 hours ago', type: 'warning' },
];

const Topbar = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar">
      {/* Left Section */}
      <div className="topbar__left">
        <button className="topbar__toggle-btn" onClick={toggleSidebar} aria-label="Toggle Navigation">
          <Menu size={20} />
        </button>
        <div className="topbar__header-title">
          <h1 className="topbar__title">Dashboard</h1>
          <span className="topbar__breadcrumb">/ Analytics & Performance</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="topbar__right">
        {/* Notifications Popup */}
        <div className="topbar__notification-wrapper" ref={notifRef}>
          <button
            className="topbar__icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="topbar__badge">3</span>
          </button>

          {showNotifications && (
            <div className="topbar__card topbar__notification-card">
              <div className="topbar__card-header">
                <h3>Notifications</h3>
                <span className="topbar__card-badge">3 New</span>
              </div>
              <ul className="topbar__notification-list">
                {dummyNotifications.map((n) => (
                  <li key={n.id} className="topbar__notification-item">
                    <div className="topbar__notification-icon">
                      {n.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    </div>
                    <div className="topbar__notification-text">
                      <p className="topbar__notification-title">{n.title}</p>
                      <span className="topbar__notification-subtitle">{n.subtitle}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="topbar__card-footer">
                <button className="topbar__card-action">Mark all as read</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Section */}
        <div className="topbar__profile-wrapper" ref={profileRef}>
          <button
            className="topbar__profile-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            <div className="topbar__avatar">JS</div>
            <div className="topbar__profile-info">
              <span className="topbar__profile-name">Jane Smith</span>
              <span className="topbar__profile-role">Administrator</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="topbar__card topbar__profile-dropdown">
              <a href="/profile" className="topbar__dropdown-item">
                <User size={16} />
                <span>My Profile</span>
              </a>
              <a href="/settings" className="topbar__dropdown-item">
                <Settings size={16} />
                <span>Settings</span>
              </a>
              <hr className="topbar__divider" />
              <button className="topbar__dropdown-item topbar__dropdown-item--danger">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;