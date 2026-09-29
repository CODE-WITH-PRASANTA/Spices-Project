import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import './Navbar.css';

// 1. IMPORT YOUR LOGO HERE:
import logo from '../../assets/PALASH ESSENCE LOGO.png'; // Adjust the filename/extension (.svg, .png, etc.) as needed

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { name: 'Shop', path: '/shop' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`waffy-navbar ${isScrolled ? 'scrolled' : 'floating'}`}>
      <div className="navbar-container">
        <div className="navbar-wrapper">
          
          {/* LEFT: Logo Section */}
          <div className="navbar-logo">
            {/* 2. LOGO RENDERED HERE: */}
            <img 
              src={logo} 
              alt="Waffy Logo" 
            />
           
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