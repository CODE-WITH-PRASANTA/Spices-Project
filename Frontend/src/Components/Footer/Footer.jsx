import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';

import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
} from 'react-icons/fa';
import './Footer.css';

// Import your footer background image asset
import footerBg from '../../assets/footer_1.webp'; 

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="waffy-footer" style={{ backgroundImage: `url(${footerBg})` }}>
      <div className="footer-main-container">
        <div className="footer-grid-layout">
          
          {/* COLUMN 1: About Us */}
          <div className="footer-column about-column">
            <h3 className="column-heading">About us</h3>
            <p className="about-text">
              Pellentesque posuere orci lobortis scelerisque blandit. Donec id tellus lacinia an, tincidunt risus ac, consequat velit.
            </p>
            <a href="/about" className="read-more-link">Read More</a>
           <div className="social-icons-row">
  <a href="#" className="social-icon"><FaFacebookF size={16} /></a>
  <a href="#" className="social-icon"><FaPinterestP size={16} /></a>
  <a href="#" className="social-icon"><FaInstagram size={16} /></a>
</div>
          </div>

          {/* COLUMN 2: Help Links */}
          <div className="footer-column links-column">
            <h3 className="column-heading">Help</h3>
            <ul className="links-list">
              <li><a href="/search"><ChevronRight size={14} className="bullet-arrow" /> Search</a></li>
              <li><a href="/help"><ChevronRight size={14} className="bullet-arrow" /> Help</a></li>
              <li><a href="/information"><ChevronRight size={14} className="bullet-arrow" /> Information</a></li>
              <li><a href="/privacy"><ChevronRight size={14} className="bullet-arrow" /> Privacy Policy</a></li>
              <li><a href="/shipping"><ChevronRight size={14} className="bullet-arrow" /> Shipping Details</a></li>
            </ul>
          </div>

          {/* COLUMN 3: Support Links */}
          <div className="footer-column links-column">
            <h3 className="column-heading">Support</h3>
            <ul className="links-list">
              <li><a href="/contact"><ChevronRight size={14} className="bullet-arrow" /> Contact us</a></li>
              <li><a href="/about"><ChevronRight size={14} className="bullet-arrow" /> About us</a></li>
              <li><a href="/careers"><ChevronRight size={14} className="bullet-arrow" /> Careers</a></li>
              <li><a href="/refunds"><ChevronRight size={14} className="bullet-arrow" /> Refunds</a></li>
              <li><a href="/deliveries"><ChevronRight size={14} className="bullet-arrow" /> Deliveries</a></li>
            </ul>
          </div>

          {/* COLUMN 4: Information Links */}
          <div className="footer-column links-column">
            <h3 className="column-heading">Information</h3>
            <ul className="links-list">
              <li><a href="/search-terms"><ChevronRight size={14} className="bullet-arrow" /> Search Terms</a></li>
              <li><a href="/advanced-search"><ChevronRight size={14} className="bullet-arrow" /> Advanced Search</a></li>
              <li><a href="/faq"><ChevronRight size={14} className="bullet-arrow" /> Help & Faq's</a></li>
              <li><a href="/store-location"><ChevronRight size={14} className="bullet-arrow" /> Store Location</a></li>
              <li><a href="/returns"><ChevronRight size={14} className="bullet-arrow" /> Orders & Returns</a></li>
            </ul>
          </div>

          {/* COLUMN 5: Contact Us Info */}
          <div className="footer-column contact-column">
            <h3 className="column-heading">Contact us</h3>
            <ul className="contact-info-list">
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>11244 Niki Lauda 455 New Zealand</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span>0000 - 123 - 456789</span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>9.30AM - 7.30PM</span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <a href="mailto:mail@example.com">mail@example.com</a>
              </li>
            </ul>
            
            {/* Payment Badges Placement */}
            <div className="payment-gateways-row">
              <span className="payment-card visa">VISA</span>
              <span className="payment-card mastercard">MC</span>
              <span className="payment-card amex">AMEX</span>
              <span className="payment-card paypal">PayPal</span>
              <span className="payment-card discover">DISCOVER</span>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="footer-bottom-bar">
        <div className="bottom-bar-container">
          <p className="copyright-text">
            © 2026  Developed by PR WEBSTOCK
          </p>
          <div className="bottom-navigation-links">
            <a href="/">Home page</a>
            <span className="divider">|</span>
            <a href="/privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="/search">Search</a>
          </div>
        </div>
        
        {/* Scroll back to top circle button */}
        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;