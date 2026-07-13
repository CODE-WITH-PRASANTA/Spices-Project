import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import './Products.css';

// Import background image asset
import productsBg from '../../assets/bg.png';

// Import product imagery assets
import haldiImg from '../../assets/haldi.png';
import dhaniyaImg from '../../assets/dhaniya.png';
import garamMasalaImg from '../../assets/garam masla.png';
import jeeraImg from '../../assets/jeera.png';

const Products = () => {
  const [activeTab, setActiveTab] = useState('dried-seeds');
  const [startIndex, setStartIndex] = useState(0);
  const [isZoomedOut, setIsZoomedOut] = useState(false);

  const driedSeedsProducts = [
    { id: 1, name: 'Fennel Seeds', price: '₹489.00', image: haldiImg },
    { id: 2, name: 'Cubeb Pepper', price: '₹298.00', image: dhaniyaImg },
    { id: 3, name: 'White Mustard', price: '₹529.00', image: garamMasalaImg },
    { id: 4, name: 'Barberry', price: '₹286.00', image: jeeraImg },
    { id: 5, name: 'Fenugreek Dal', price: '₹129.00', oldPrice: '₹300.00', image: haldiImg, tag: 'Sale' }
  ];

  const spicyMasalasProducts = [
    { id: 6, name: 'Black Cardamom', price: '₹569.00', image: haldiImg },
    { id: 7, name: 'Black Mustard', price: '₹286.00', image: dhaniyaImg },
    { id: 8, name: 'Pippali Pepper', price: '₹629.00', oldPrice: '₹700.00', image: garamMasalaImg, tag: 'Sale' },
    { id: 9, name: 'Rosehip Berries', price: '₹579.00', image: jeeraImg },
    { id: 10, name: 'Red Chilly', price: '₹649.00', image: dhaniyaImg }
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
            if(activeTab !== 'dried-seeds') {
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
            if(activeTab !== 'spicy-masalas') {
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
    </section>
  );
};

export default Products;