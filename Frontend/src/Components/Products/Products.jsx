import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiShoppingCart, FiRepeat, FiHeart, FiSearch, FiX, FiMinus, FiPlus } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './Products.css';

// Import background image asset
import productsBg from '../../assets/bg.png';

// Import product imagery assets
import haldiImg from '../../assets/turmeric.jpg';
import dhaniyaImg from '../../assets/dhaniya.png';
import garamMasalaImg from '../../assets/garam masla.png';
import jeeraImg from '../../assets/jeera.png';

const Products = () => {
  const [activeTab, setActiveTab] = useState('dried-seeds');
  const [startIndex, setStartIndex] = useState(0);
  const [isZoomedOut, setIsZoomedOut] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const driedSeedsProducts = [
    { id: 1, name: 'Fennel Seeds', price: '₹489.00', image: haldiImg, desc: 'Sun-dried and hand-sorted fennel seeds with a sweet, aromatic finish — perfect for tempering and after-meal digestifs.' },
    { id: 2, name: 'Cubeb Pepper', price: '₹298.00', image: dhaniyaImg, desc: 'Wild-harvested cubeb pepper prized for its peppery bite and subtle camphor-like aroma.' },
    { id: 3, name: 'White Mustard', price: '₹529.00', image: garamMasalaImg, desc: 'Cold-pressed grade white mustard seeds, mild and nutty, ideal for pickling and tadka.' },
    { id: 4, name: 'Barberry', price: '₹286.00', image: jeeraImg, desc: 'Tart, ruby-red dried barberries, slow-dried to preserve their signature tang.' },
    { id: 5, name: 'Fenugreek Dal', price: '₹129.00', oldPrice: '₹300.00', image: haldiImg, tag: 'Sale', desc: 'Split fenugreek dal with a warm, slightly bitter edge that mellows beautifully when cooked.' }
  ];

  const spicyMasalasProducts = [
    { id: 6, name: 'Black Cardamom', price: '₹569.00', image: haldiImg, desc: 'Smoke-dried black cardamom pods with a deep, resinous aroma — a staple of slow-cooked masalas.' },
    { id: 7, name: 'Black Mustard', price: '₹286.00', image: dhaniyaImg, desc: 'Pungent black mustard seeds that bloom into a nutty sweetness the moment they hit hot oil.' },
    { id: 8, name: 'Pippali Pepper', price: '₹629.00', oldPrice: '₹700.00', image: garamMasalaImg, tag: 'Sale', desc: 'Long pepper with a warm, complex heat — an ayurvedic favourite for both flavour and wellness.' },
    { id: 9, name: 'Rosehip Berries', price: '₹579.00', image: jeeraImg, desc: 'Hand-picked rosehip berries, tangy and vitamin-rich, sun-dried to lock in their colour.' },
    { id: 10, name: 'Red Chilly', price: '₹649.00', image: dhaniyaImg, desc: 'Sun-ripened red chillies with a bold colour and balanced heat, stone-ground to order.' }
  ];

  const currentProducts = activeTab === 'dried-seeds' ? driedSeedsProducts : spicyMasalasProducts;

  // Handles the distinct zoom animation sequence
  const triggerZoomAnimation = (updateStateCallback) => {
    setIsZoomedOut(true); // Step 1: Trigger Zoom-Out scale down

    setTimeout(() => {
      updateStateCallback(); // Step 2: Swap items while scaled down
      setIsZoomedOut(false); // Step 3: Trigger Zoom-In scale up back to 1
    }, 250); // Exact time it takes to complete half the animation cycle
  };

  const handleNext = () => {
    triggerZoomAnimation(() => {
      setStartIndex((prevIndex) => (prevIndex + 1 >= currentProducts.length ? 0 : prevIndex + 1));
    });
  };

  const handlePrev = () => {
    triggerZoomAnimation(() => {
      setStartIndex((prevIndex) => (prevIndex === 0 ? currentProducts.length - 1 : prevIndex - 1));
    });
  };

  const visibleProducts = [];
  for (let i = 0; i < 5; i++) {
    visibleProducts.push(currentProducts[(startIndex + i) % currentProducts.length]);
  }

  const openQuickView = (product) => {
    setQuantity(1);
    setQuickViewProduct(product);
  };

  const closeQuickView = () => setQuickViewProduct(null);

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  return (
    <section
      className="products"
      style={{ backgroundImage: `url(${productsBg})` }}
    >
      <div className="products__header">
        <h2 className="products__main-title">Best Products</h2>
        <p className="products__subtitle">Pellentesque massa placerat duis ultricies lacus sit sed.</p>
        <div className="products__stars">
          <FaStar className="products__star-icon products__star-icon--active" />
          <FaStar className="products__star-icon products__star-icon--active" />
          <FaStar className="products__star-icon" />
        </div>
      </div>

      <div className="products__tabs">
        <button
          className={`products__tab-btn ${activeTab === 'dried-seeds' ? 'products__tab-btn--active' : ''}`}
          onClick={() => {
            if (activeTab !== 'dried-seeds') {
              triggerZoomAnimation(() => {
                setActiveTab('dried-seeds');
                setStartIndex(0);
              });
            }
          }}
        >
          Dried seeds
        </button>
        <button
          className={`products__tab-btn ${activeTab === 'spicy-masalas' ? 'products__tab-btn--active' : ''}`}
          onClick={() => {
            if (activeTab !== 'spicy-masalas') {
              triggerZoomAnimation(() => {
                setActiveTab('spicy-masalas');
                setStartIndex(0);
              });
            }
          }}
        >
          Spicy Masalas
        </button>
      </div>

      <div className="products__carousel-wrapper">
        <div className="products__grid">
          {visibleProducts.map((product, idx) => (
            <div
              key={`${product.id}-${idx}`}
              className={`products__card ${idx === 2 ? 'products__card--highlighted' : ''}`}
            >
              {product.tag && <span className="products__badge">{product.tag}</span>}

              <div className="products__image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className={`products__img ${isZoomedOut ? 'products__img--zoom-out' : 'products__img--zoom-in'}`}
                />

                {/* Hover action icons */}
                <div className="products__hover-icons">
                  <button
                    className="products__icon-btn products__icon-btn--cart"
                    aria-label="Add to cart"
                    onClick={() => openQuickView(product)}
                  >
                    <FiShoppingCart />
                  </button>
                  <button
                    className="products__icon-btn products__icon-btn--compare"
                    aria-label="Compare product"
                  >
                    <FiRepeat />
                  </button>
                  <button
                    className={`products__icon-btn products__icon-btn--wishlist ${wishlist.includes(product.id) ? 'products__icon-btn--active' : ''}`}
                    aria-label="Add to wishlist"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <FiHeart />
                  </button>
                  <button
                    className="products__icon-btn products__icon-btn--search"
                    aria-label="Quick view"
                    onClick={() => openQuickView(product)}
                  >
                    <FiSearch />
                  </button>
                </div>
              </div>

              <h3 className="products__name">{product.name}</h3>
              <div className="products__price-row">
                <span className="products__price">{product.price}</span>
                {product.oldPrice && <span className="products__old-price">{product.oldPrice}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="products__pagination">
        <button className="products__arrow-btn" onClick={handlePrev} aria-label="Previous slide">
          <FiChevronLeft className="products__arrow-icon" />
        </button>
        <button className="products__arrow-btn" onClick={handleNext} aria-label="Next slide">
          <FiChevronRight className="products__arrow-icon" />
        </button>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="products__modal-overlay" onClick={closeQuickView}>
          <div className="products__modal" onClick={(e) => e.stopPropagation()}>
            <button className="products__modal-close" aria-label="Close quick view" onClick={closeQuickView}>
              <FiX />
            </button>

            <div className="products__modal-image">
              {quickViewProduct.tag && <span className="products__badge products__badge--modal">{quickViewProduct.tag}</span>}
              <img src={quickViewProduct.image} alt={quickViewProduct.name} />
            </div>

            <div className="products__modal-details">
              <span className="products__modal-eyebrow">
                {activeTab === 'dried-seeds' ? 'Dried Seeds' : 'Spicy Masalas'}
              </span>
              <h3 className="products__modal-title">{quickViewProduct.name}</h3>

              <div className="products__modal-stars">
                <FaStar className="products__star-icon products__star-icon--active" />
                <FaStar className="products__star-icon products__star-icon--active" />
                <FaStar className="products__star-icon products__star-icon--active" />
                <FaStar className="products__star-icon products__star-icon--active" />
                <FaStar className="products__star-icon" />
              </div>

              <div className="products__modal-price-row">
                <span className="products__modal-price">{quickViewProduct.price}</span>
                {quickViewProduct.oldPrice && (
                  <span className="products__old-price">{quickViewProduct.oldPrice}</span>
                )}
              </div>

              <p className="products__modal-desc">{quickViewProduct.desc}</p>

              <div className="products__modal-actions">
                <div className="products__qty-selector">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <FiMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <FiPlus />
                  </button>
                </div>

                <button className="products__modal-add-btn">
                  <FiShoppingCart /> Add to Cart
                </button>

                <button
                  className={`products__modal-wishlist-btn ${wishlist.includes(quickViewProduct.id) ? 'products__modal-wishlist-btn--active' : ''}`}
                  aria-label="Add to wishlist"
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                >
                  <FiHeart />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;