import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scrolling to transition layout behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`waffy-navbar ${isScrolled ? 'scrolled' : 'floating'}`}>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          
          {/* LEFT: Logo Section */}
          <div className="navbar-logo">
            <img 
              src="/path-to-your-logo/waffy-logo.png" 
              alt="Waffy Logo" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="logo-text">Waffy</span>
          </div>

          {/* CENTER/RIGHT: Desktop Nav Titles */}
          <div className="navbar-menu-desktop">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`nav-item-link ${link.name === 'Home' ? 'active' : ''}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* RIGHT SIDE: Action Buttons */}
          <div className="navbar-actions-desktop">
            <button className="action-btn">
              <Search size={19} />
            </button>
            
            <div className="currency-selector">
              <span>USD</span>
              <ChevronDown size={14} />
            </div>

            <a href="/cart" className="cart-btn">
              <ShoppingCart size={20} />
              <span className="cart-badge">0</span>
            </a>

            <a href="/account" className="account-btn">
              <User size={20} />
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="navbar-toggle-mobile">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {isMobileMenuOpen && (
        <div className="navbar-menu-mobile">
          <div className="mobile-links-wrapper">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            {/* Mobile Actions Utilities */}
            <div className="mobile-actions-panel">
              <button className="mobile-action-item">
                <Search size={18} /> <span>Search</span>
              </button>
              <div className="mobile-action-item">
                <span>USD</span> <ChevronDown size={12} />
              </div>
              <a href="/cart" className="mobile-action-item">
                <ShoppingCart size={18} /> <span>Cart (0)</span>
              </a>
              <a href="/account" className="mobile-action-item">
                <User size={18} /> <span>Account</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;