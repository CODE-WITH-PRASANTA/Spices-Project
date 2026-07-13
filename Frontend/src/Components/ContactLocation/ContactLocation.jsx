import React from 'react';
import './ContactLocation.css';

const ContactLocation = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="cl-section-container">
      {/* Top Header Area */}
      <header className="cl-header">
        <h1 className="cl-main-title">Contact us</h1>
        <p className="cl-subtitle">Tortor at risus viverra adipiscing at in tellus integer.</p>
        <div className="cl-stars">
          <span className="cl-star cl-gold">★</span>
          <span className="cl-star cl-black">★</span>
          <span className="cl-star cl-gold">★</span>
        </div>
      </header>

      {/* Info Cards Grid */}
      <div className="cl-cards-grid">
        {/* Phone Card */}
        <div className="cl-card">
          <div className="cl-icon-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </div>
          <h2 className="cl-card-title">Phone</h2>
          <p className="cl-card-text"><strong>Toll-Free:</strong> 0000 - 123 - 456789</p>
          <p className="cl-card-text"><strong>Fax:</strong> 0000 - 123 - 456789</p>
        </div>

        {/* Email Card */}
        <div className="cl-card">
          <div className="cl-icon-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </div>
          <h2 className="cl-card-title">Email</h2>
          <p className="cl-card-text">mail@example.com</p>
          <p className="cl-card-text">support@example.com</p>
        </div>

        {/* Address Card */}
        <div className="cl-card">
          <div className="cl-icon-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h2 className="cl-card-title">Address</h2>
          <p className="cl-card-text">No: 58 A, East Madison Street,</p>
          <p className="cl-card-text">Baltimore, MD, USA 4508</p>
        </div>
      </div>

      {/* Map and Form Split Section */}
      <div className="cl-split-layout">
        {/* Updated Interactive Map Embed pointing to Kolkata */}
        <div className="cl-map-wrapper">
          <iframe
            title="Kolkata Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58920.401334612346!2d88.32486029312152!3d22.5414872291583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal%2c%20India!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Input Form Fields */}
        <form className="cl-contact-form" onSubmit={handleSubmit}>
          <div className="cl-form-group">
            <input type="text" id="name" placeholder=" " required className="cl-input" />
            <label htmlFor="name" className="cl-label">Name</label>
          </div>
          
          <div className="cl-form-group">
            <input type="email" id="email" placeholder=" " required className="cl-input" />
            <label htmlFor="email" className="cl-label">Email</label>
          </div>

          <div className="cl-form-group">
            <input type="tel" id="phone" placeholder=" " className="cl-input" />
            <label htmlFor="phone" className="cl-label">Phone</label>
          </div>

          <div className="cl-form-group">
            <textarea id="message" placeholder=" " required className="cl-textarea"></textarea>
            <label htmlFor="message" className="cl-label">Message</label>
          </div>

          <button type="submit" className="cl-submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ContactLocation;