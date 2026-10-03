import React, { useState } from 'react';
import './MenuDetailsOne.css';

const ADD_ONS_DATA = [
  {
    id: 'fries',
    name: 'French Frise',
    price: 69,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'cheese',
    name: 'Extra Cheese',
    price: 40,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'coke',
    name: 'Coca Cola',
    price: 50,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'cake',
    name: 'Choco Lava',
    price: 89,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=150&auto=format&fit=crop&q=80',
  },
];

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80',
];

const MenuDetailsOne = () => {
  const BASE_PRICE = 249; // Base price in INR (₹)
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState({
    fries: true, // Selected by default as in reference
  });

  // Toggle Add-on checkbox
  const handleToggleAddOn = (id) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Quantity handlers
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Compute Indian Price total
  const addOnsTotal = ADD_ONS_DATA.reduce((acc, item) => {
    return selectedAddOns[item.id] ? acc + item.price : acc;
  }, 0);

  const totalPrice = (BASE_PRICE + addOnsTotal) * quantity;

  return (
    <section className="menu-details-one">
      <div className="menu-details-one__container">
        
        {/* Left Column: Food Image */}
        <div className="menu-details-one__image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=85"
            alt="Double Patty Veg Burger"
            className="menu-details-one__image"
          />
        </div>

        {/* Right Column: Details & Actions */}
        <div className="menu-details-one__content">
          
          {/* Veg Badge */}
          <div className="menu-details-one__veg-badge">
            <span className="menu-details-one__veg-icon">
              <span className="menu-details-one__veg-dot"></span>
            </span>
            <span className="menu-details-one__veg-text">Pure veg</span>
          </div>

          {/* Title */}
          <h1 className="menu-details-one__title">Double Patty Veg Burger</h1>

          {/* Rating */}
          <div className="menu-details-one__rating-wrap">
            <span className="menu-details-one__star">★</span>
            <span className="menu-details-one__rating-text">4.5 · 20 Reviews</span>
          </div>

          {/* Description */}
          <p className="menu-details-one__description">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          {/* Price & Quantity Section */}
          <div className="menu-details-one__meta-row">
            {/* Price */}
            <div className="menu-details-one__price-group">
              <span className="menu-details-one__label">Price</span>
              <span className="menu-details-one__price">
                ₹{totalPrice.toLocaleString('en-IN')}.00
              </span>
            </div>

            {/* Quantity Stepper */}
            <div className="menu-details-one__quantity-group">
              <span className="menu-details-one__label">Quantity</span>
              <div className="menu-details-one__stepper">
                <button
                  type="button"
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="menu-details-one__stepper-btn"
                >
                  −
                </button>
                <span className="menu-details-one__stepper-value">{quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="menu-details-one__stepper-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add-on Section */}
          <div className="menu-details-one__addon-section">
            <h3 className="menu-details-one__addon-title">Add On</h3>
            <div className="menu-details-one__addon-grid">
              {ADD_ONS_DATA.map((addon) => {
                const isChecked = !!selectedAddOns[addon.id];
                return (
                  <div
                    key={addon.id}
                    className={`menu-details-one__addon-card ${
                      isChecked ? 'menu-details-one__addon-card--active' : ''
                    }`}
                    onClick={() => handleToggleAddOn(addon.id)}
                    role="checkbox"
                    aria-checked={isChecked}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleToggleAddOn(addon.id);
                      }
                    }}
                  >
                    <div className="menu-details-one__addon-info">
                      <img
                        src={addon.image}
                        alt={addon.name}
                        className="menu-details-one__addon-thumb"
                      />
                      <span className="menu-details-one__addon-name">{addon.name}</span>
                    </div>

                    {/* Custom Checkbox */}
                    <div
                      className={`menu-details-one__checkbox ${
                        isChecked ? 'menu-details-one__checkbox--checked' : ''
                      }`}
                    >
                      {isChecked && (
                        <svg
                          className="menu-details-one__checkmark"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.5 8.5L6.5 11.5L12.5 4.5"
                            stroke="#ffffff"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons & Customer Social Proof */}
          <div className="menu-details-one__action-row">
            <div className="menu-details-one__button-group">
              <button type="button" className="menu-details-one__btn-cart">
                <span>Add To Cart</span>
                <svg
                  className="menu-details-one__btn-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </button>

              <button type="button" className="menu-details-one__btn-buy">
                <span>Buy Now</span>
                <svg
                  className="menu-details-one__btn-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            </div>

            {/* Avatar Stack */}
            <div className="menu-details-one__avatar-stack">
              {AVATARS.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Customer ${index + 1}`}
                  className="menu-details-one__avatar"
                />
              ))}
              <div className="menu-details-one__avatar-badge">150+</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MenuDetailsOne;