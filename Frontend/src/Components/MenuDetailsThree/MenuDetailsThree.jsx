import React, { useState, useEffect, useRef } from 'react';
import './MenuDetailsThree.css';

// Crisp, verified food images with built-in SVG fallbacks
const MENU_ITEMS_DATA = [
  {
    id: 1,
    title: 'Rice',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 199,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23F4E0A5'/><circle cx='50' cy='50' r='38' fill='%23E5A93C'/><circle cx='46' cy='42' r='4' fill='%23668b22'/><circle cx='54' cy='52' r='3' fill='%23668b22'/><circle cx='40' cy='58' r='3.5' fill='%23668b22'/></svg>"
  },
  {
    id: 2,
    title: 'Green Salad',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 179,
    image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23E8F5E9'/><circle cx='50' cy='50' r='38' fill='%234CAF50'/><circle cx='44' cy='45' r='8' fill='%23E91E63'/><circle cx='58' cy='52' r='6' fill='%23FF9800'/></svg>"
  },
  {
    id: 3,
    title: 'Pasta',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 249,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23FFF3E0'/><circle cx='50' cy='50' r='38' fill='%23FF9800'/><circle cx='50' cy='48' r='12' fill='%23E53935'/></svg>"
  },
  {
    id: 4,
    title: 'Pizza',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 349,
    image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23FFE0B2'/><circle cx='50' cy='50' r='40' fill='%23D84315'/><circle cx='42' cy='40' r='5' fill='%23F44336'/><circle cx='60' cy='44' r='4' fill='%234CAF50'/><circle cx='48' cy='62' r='5' fill='%23F44336'/></svg>"
  },
  {
    id: 5,
    title: 'Crispy Burger',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 229,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23FFF8E1'/><circle cx='50' cy='50' r='38' fill='%23795548'/><circle cx='50' cy='46' r='14' fill='%238BC34A'/></svg>"
  },
  {
    id: 6,
    title: 'Veg Noodles',
    description: 'Lorem Ipsum dolor sit amet consectetur adipiscing.',
    basePrice: 189,
    image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=350',
    fallback: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23EDE7F6'/><circle cx='50' cy='50' r='38' fill='%23F57C00'/></svg>"
  },
];

// Multiplied list for infinite right-to-left loop
const EXTENDED_ITEMS = [
  ...MENU_ITEMS_DATA,
  ...MENU_ITEMS_DATA,
  ...MENU_ITEMS_DATA,
  ...MENU_ITEMS_DATA,
];

const MenuDetailsThree = () => {
  const [currentIndex, setCurrentIndex] = useState(MENU_ITEMS_DATA.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Quantities & Selected states
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1 });
  const [cartState, setCartState] = useState({});

  // 2-Second Smooth Auto Slide
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Seamless jump for loop
  const handleTransitionEnd = () => {
    if (currentIndex >= MENU_ITEMS_DATA.length * 3) {
      setIsTransitioning(false);
      setCurrentIndex(MENU_ITEMS_DATA.length);
    } else if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(MENU_ITEMS_DATA.length * 2);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleQuantity = (id, delta, e) => {
    e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleToggleCart = (id, e) => {
    e.stopPropagation();
    setCartState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="menu-details-three">
      <div className="menu-details-three__container">
        
        {/* Header Title */}
        <h2 className="menu-details-three__header-title">Special Menu</h2>

        <div
          className="menu-details-three__carousel-wrap"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            type="button"
            className="menu-details-three__nav-btn menu-details-three__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous Menu"
          >
            <span className="menu-details-three__arrow-circle">
              <svg viewBox="0 0 24 24" fill="none" className="menu-details-three__arrow-svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="menu-details-three__arrow-tail"></span>
          </button>

          {/* Viewport Mask */}
          <div className="menu-details-three__viewport">
            <div
              className="menu-details-three__track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(calc(-${currentIndex} * (var(--menu-card-w) + var(--menu-card-g))))`,
                transition: isTransitioning ? 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
            >
              {EXTENDED_ITEMS.map((item, idx) => {
                const qty = quantities[item.id] || 1;
                const totalPrice = item.basePrice * qty;
                const isAdded = !!cartState[item.id];

                return (
                  <div key={`${item.id}-${idx}`} className="menu-details-three__card">
                    {/* Top Default Light Grey Arch */}
                    <div className="menu-details-three__arch-bg"></div>

                    {/* Smooth Green Sliding Background (Top to Bottom on hover) */}
                    <div className="menu-details-three__arch-hover-bg"></div>

                    {/* Food Plate & Guaranteed Image */}
                    <div className="menu-details-three__image-circle">
                      <img
                        src={item.image}
                        alt=""
                        className="menu-details-three__image"
                        loading="eager"
                        crossOrigin="anonymous"
                        onError={(e) => {
                          // If remote image fails, automatically switch to fallback vector
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = item.fallback;
                        }}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="menu-details-three__body">
                      <h3 className="menu-details-three__title">{item.title}</h3>
                      <p className="menu-details-three__description">{item.description}</p>

                      {/* Price in Indian Rupees */}
                      <div className="menu-details-three__price-box">
                        <span className="menu-details-three__price">
                          ₹{totalPrice.toLocaleString('en-IN')}.00
                        </span>
                      </div>

                      {/* Working Stepper */}
                      <div className="menu-details-three__qty-wrapper">
                        <button
                          type="button"
                          className="menu-details-three__qty-btn"
                          onClick={(e) => handleQuantity(item.id, -1, e)}
                        >
                          −
                        </button>
                        <span className="menu-details-three__qty-value">{qty}</span>
                        <button
                          type="button"
                          className="menu-details-three__qty-btn"
                          onClick={(e) => handleQuantity(item.id, 1, e)}
                        >
                          +
                        </button>
                      </div>

                      {/* Add To Cart Button */}
                      <button
                        type="button"
                        className={`menu-details-three__action-btn ${
                          isAdded ? 'menu-details-three__action-btn--selected' : ''
                        }`}
                        onClick={(e) => handleToggleCart(item.id, e)}
                      >
                        {isAdded ? '✓ Added' : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            className="menu-details-three__nav-btn menu-details-three__nav-btn--next"
            onClick={handleNext}
            aria-label="Next Menu"
          >
            <span className="menu-details-three__arrow-tail"></span>
            <span className="menu-details-three__arrow-circle">
              <svg viewBox="0 0 24 24" fill="none" className="menu-details-three__arrow-svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default MenuDetailsThree;