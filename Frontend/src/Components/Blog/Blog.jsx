import React, { useState } from 'react';
import './Blog.css';

// ============================================================================
// FIXED RELATIVE PATHS (Moving up two directory levels to reach src/assets/)
// ============================================================================
import pepperImg from '../../assets/Black papper powder.webp';
import cardamomImg from '../../assets/The Full Cardamom.webp';
import spicesPowderImg from '../../assets/Various Spices Powder.webp';
import groceryItemsImg from '../../assets/Gorcery items.webp';
import threeFlavourImg from '../../assets/Usual Three Flavour.webp';
import glassContainersImg from '../../assets/Class Containers.webp';
import organicMasalaImg from '../../assets/Herbal Chat Garam.webp';
import clovePackImg from '../../assets/Spicy Masalas.webp'; 

import gingerImg from '../../assets/Dried Cinger.webp';
import pimentoImg from '../../assets/Pimento.webp';
import redChillyImg from '../../assets/Red Chilly.webp';
import Nutmeg from '../../assets/Nutmeg.webp';
import Cardamom from '../../assets/Black Cardamom.webp';


import BestSeller1 from '../../assets/BestSeller1.webp'
import BestSeller2 from '../../assets/BestSeller2.webp'
import BestSeller3 from '../../assets/BestSeller3.webp'
import BestSeller4 from '../../assets/BestSeller4.webp'
import BestSeller5 from '../../assets/BestSeller5.webp'

// ============================================================================
// DATA SOURCE USING YOUR ACTUAL WORKING LOCAL ASSETS
// ============================================================================
const INITIAL_BLOG_POSTS = [
  { id: 1, title: 'Black pepper powder', rawPrice: 120.00, text: 'Quis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac.', img: pepperImg, tag: 'Flavour Masalas' },
  { id: 2, title: 'The full cardamom', rawPrice: 450.00, text: 'Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet nibh praesent.', img: cardamomImg, tag: 'Gorcery' },
  { id: 3, title: 'Various Spices powder', rawPrice: 250.00, text: 'Fames ac turpis egestas integer eget aliquet nibh praesent. Elementum facilisis leo vel fringilla est ul.', img: spicesPowderImg, tag: 'Masala Powder' },
  { id: 4, title: 'Collection of gorcery items', rawPrice: 350.00, text: 'Ruis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac.', img: groceryItemsImg, tag: 'Gorcery' },
  { id: 5, title: 'Usual three flavour', rawPrice: 180.00, text: 'Muis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac.', img: threeFlavourImg, tag: 'Flavour Masalas' },
  { id: 6, title: 'Glass containers', rawPrice: 90.00, text: 'Hnis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac.', img: glassContainersImg, tag: 'Container' },
  { id: 7, title: 'Garam Organic Masala', rawPrice: 150.00, text: 'Aliquam erat volutpat. Inner core value properties with classic elements of dynamic spice assembly.', img: organicMasalaImg, tag: 'Garam' },
  { id: 8, title: 'Premium Clove Pack', rawPrice: 210.00, text: 'Perfect selection of handpicked spice items processed carefully under controlled eco conditions.', img: clovePackImg, tag: 'Gorcery' },
];

const SIDEBAR_CATEGORIES = [
  { id: 101, title: 'Dried Ginger', rawPrice: 299.00, img: BestSeller1, hoverImg: gingerImg, tag: 'Gorcery' },
  { id: 102, title: 'Pimento', rawPrice: 629.00, img: BestSeller2, hoverImg: pimentoImg, tag: 'Flavour Masalas' }
];

const BEST_SELLERS = [
  { id: 201, title: 'Dried Ginger', rawPrice: 299.00, img: BestSeller1, hoverImg: gingerImg, tag: 'Gorcery' },
  { id: 202, title: 'Pimento', rawPrice: 649.00, img:  BestSeller2, hoverImg: pimentoImg, tag: 'Flavour Masalas' },
  { id: 203, title: 'Nutmeg', rawPrice: 120.00, img:BestSeller3, hoverImg:  Nutmeg, tag: 'Flavour Masalas' },
  { id: 204, title: 'Black Cardamom', rawPrice: 450.00, img: BestSeller4, hoverImg: Cardamom , tag: 'Gorcery' },
  { id: 205, title: 'Red Chilly', rawPrice: 180.00, img: BestSeller5, hoverImg: redChillyImg, tag: 'Flavour Masalas' }
];

const Blog = () => {
  // App Mechanics State Hooks
  const [currentPage, setCurrentPage] = useState(1);
  const [bestSellerIndex, setBestSellerIndex] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // ACTIVE TAG FILTER STATE (null means "Show All Items")
  const [activeTag, setActiveTag] = useState(null);
  
  // Custom Interaction Tracking Hover States 
  const [hoveredHeader, setHoveredHeader] = useState(null);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [hoveredTag, setHoveredTag] = useState(null);
  const [hoveredReadMore, setHoveredReadMore] = useState(null);
  const [hoveredBSStep, setHoveredBSStep] = useState(null);
  const [hoveredCatIndex, setHoveredCatIndex] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // DYNAMIC FILTER LOGIC: Filters products instantly based on chosen tag
  const filteredBlogPosts = activeTag 
    ? INITIAL_BLOG_POSTS.filter(post => post.tag === activeTag)
    : INITIAL_BLOG_POSTS;

  // Pagination calculations adapt dynamically to filtered size
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogPosts.length / itemsPerPage);
  const currentBlogPosts = filteredBlogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevBestSeller = () => {
    setBestSellerIndex((prev) => (prev === 0 ? BEST_SELLERS.length - 1 : prev - 1));
  };

  const handleNextBestSeller = () => {
    setBestSellerIndex((prev) => (prev === BEST_SELLERS.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
    setCartOpen(true); 
  };

  const updateQuantity = (itemId, amount) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + amount };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.rawPrice * item.quantity, 0).toFixed(2);
  };

  // Tag click handler reset standard layout view back to page 1
  const handleTagSelection = (tagName) => {
    setActiveTag(tagName);
    setCurrentPage(1); 
  };

  return (
    <div className="blog-container">
      <div className="blog-layout">
        
        {/* ====================================================================
            LEFT SIDEBAR SECTION PANEL
           ==================================================================== */}
        <div className="blog-sidebar side-panel-item">
          
          {/* Recent Articles Block */}
          <div>
            <div 
              className="section-header" 
              style={{ color: '#000000' }}
            >
              Recent articles
            </div>
            {INITIAL_BLOG_POSTS.slice(0, 3).map((article) => (
              <div key={article.id} className="recent-article-item">
                <img src={article.img} alt={article.title} className="recent-article-img" />
                <div>
                  <div 
                    className="item-title"
                    style={{ color: '#000000', fontSize: '15px' }}
                  >
                    {article.title}
                  </div>
                  <div style={{ color: '#777', fontSize: '12px', marginTop: '4px' }}>Quis imperdiet massa...</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tags Block - Fully Dynamic Functional Filtering */}
          <div>
            <div 
              className="section-header"
              style={{ color: '#000000' }}
            >
              Tags
            </div>
            <div style={{ paddingLeft: '5px' }}>
              {/* Show All Master Button */}
              <span 
                className="tag-item"
                style={{ 
                  color: activeTag === null ? '#8B4513' : (hoveredTag === 'All' ? '#FFD700' : '#444444'),
                  fontWeight: activeTag === null ? 'bold' : 'normal',
                  borderLeft: activeTag === null ? '2px solid #8B4513' : 'none',
                  paddingLeft: activeTag === null ? '6px' : '0px'
                }}
                onMouseEnter={() => setHoveredTag('All')}
                onMouseLeave={() => setHoveredTag(null)}
                onClick={() => handleTagSelection(null)}
              >
                All Products
              </span>

              {['Container', 'Flavour Masalas', 'Garam', 'Gorcery', 'Masala Powder'].map((tag) => (
                <span 
                  key={tag} 
                  className="tag-item"
                  style={{ 
                    color: activeTag === tag ? '#8B4513' : (hoveredTag === tag ? '#FFD700' : '#444444'),
                    fontWeight: activeTag === tag ? 'bold' : 'normal',
                    borderLeft: activeTag === tag ? '2px solid #8B4513' : 'none',
                    paddingLeft: activeTag === tag ? '6px' : '0px'
                  }}
                  onMouseEnter={() => setHoveredTag(tag)}
                  onMouseLeave={() => setHoveredTag(null)}
                  onClick={() => handleTagSelection(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Categories Block */}
          <div>
            <div 
              className="section-header"
              style={{ color: '#000000' }}
            >
              Categories
            </div>
            
            {SIDEBAR_CATEGORIES.map((cat, index) => (
              <div 
                key={cat.id} 
                className="animated-border-box" 
                style={{ padding: '15px', marginBottom: '20px' }}
                onMouseEnter={() => setHoveredCatIndex(index)}
                onMouseLeave={() => setHoveredCatIndex(null)}
                onClick={() => handleAddToCart(cat)}
              >
                <div className="border-line line-top" />
                <div className="border-line line-right" />
                <div className="border-line line-bottom" />
                <div className="border-line line-left" />

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative', zIndex: 2 }}>
                  <img 
                    src={hoveredCatIndex === index ? cat.hoverImg : cat.img} 
                    alt={cat.title} 
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} 
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div className="item-title" style={{ color: '#000000' }}>{cat.title}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#333', marginTop: '3px' }}>${cat.rawPrice.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Sellers Block */}
          <div>
            <div 
              className="section-header"
              style={{ color: '#000000' }}
            >
              Best Sellers
            </div>

            <div 
              className="animated-border-box"
              onMouseEnter={() => setHoveredProduct(BEST_SELLERS[bestSellerIndex].id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="border-line line-top" />
              <div className="border-line line-right" />
              <div className="border-line line-bottom" />
              <div className="border-line line-left" />

              <div className="product-img-wrapper">
                <img 
                  src={hoveredProduct === BEST_SELLERS[bestSellerIndex].id ? BEST_SELLERS[bestSellerIndex].hoverImg : BEST_SELLERS[bestSellerIndex].img} 
                  alt={BEST_SELLERS[bestSellerIndex].title} 
                />

                {hoveredProduct === BEST_SELLERS[bestSellerIndex].id && (
                  <div className="overlay-icons">
                    <button className="icon-circle" onClick={() => handleAddToCart(BEST_SELLERS[bestSellerIndex])} title="Add to Cart">🛒</button>
                    <button className="icon-circle" onClick={() => alert('Link Copied!')} title="Copy">📋</button>
                    <button className="icon-circle" onClick={() => alert('Added to Favorites!')} title="Love">❤️</button>
                    <button className="icon-circle" onClick={() => alert('Searching item details')} title="Search">🔍</button>
                  </div>
                )}
              </div>

              <div className="item-title" style={{ fontSize: '16px', marginTop: '15px', color: '#000000' }}>
                {BEST_SELLERS[bestSellerIndex].title}
              </div>
              <div style={{ fontWeight: 'bold', marginTop: '5px' }}>${BEST_SELLERS[bestSellerIndex].rawPrice.toFixed(2)}</div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
              <button 
                onClick={handlePrevBestSeller} 
                className="page-button"
                style={{ backgroundColor: hoveredBSStep === 'prev' ? '#FFD700' : 'transparent' }}
                onMouseEnter={() => setHoveredBSStep('prev')}
                onMouseLeave={() => setHoveredBSStep(null)}
              >
                ‹
              </button>
              <button 
                onClick={handleNextBestSeller} 
                className="page-button"
                style={{ backgroundColor: hoveredBSStep === 'next' ? '#FFD700' : 'transparent' }}
                onMouseEnter={() => setHoveredBSStep('next')}
                onMouseLeave={() => setHoveredBSStep(null)}
              >
                ›
              </button>
            </div>
          </div>

        </div>

        {/* ====================================================================
            MAIN FEED GRID CONTAINER (Reacts directly to filters)
           ==================================================================== */}
        <div className="main-content main-panel-item">
          
          {currentBlogPosts.length > 0 ? (
            <div className="blog-grid">
              {currentBlogPosts.map((post) => (
                <div key={post.id} className="blog-card">
                  <div className="blog-img-container">
                    <img src={post.img} alt={post.title} className="blog-img" />
                  </div>
                  
                  <h3 className="item-title" style={{ fontSize: '18px', margin: '10px 0', color: '#000000' }} onClick={() => handleAddToCart(post)}>
                    {post.title}
                  </h3>
                  
                  <p style={{ fontSize: '16px', color: '#080808', lineHeight: '1.6', padding: '0 10px' }}>
                    {post.text}
                  </p>

                  <button
                    className="read-more-btn"
                    style={{
                      backgroundColor: hoveredReadMore === post.id ? '#FFD700' : 'transparent',
                      color: hoveredReadMore === post.id ? '#000000' : '#8B4513',
                      transform: hoveredReadMore === post.id ? 'translateY(-2px)' : 'none'
                    }}
                    onMouseEnter={() => setHoveredReadMore(post.id)}
                    onMouseLeave={() => setHoveredReadMore(null)}
                    onClick={() => handleAddToCart(post)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#666', fontFamily: 'Georgia, serif', fontSize: '18px' }}>
              No spice items match this tag view right now.
            </div>
          )}

          {/* Pagination System */}
          {totalPages > 1 && (
            <div className="pagination-wrapper">
              <button 
                className="page-button"
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              >
                ‹
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className="page-button"
                  style={{
                    backgroundColor: currentPage === i + 1 ? '#FFD700' : 'transparent',
                    fontWeight: currentPage === i + 1 ? 'bold' : 'normal',
                  }}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                className="page-button"
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              >
                ›
              </button>
            </div>
          )}

        </div>

      </div>

      {/* ====================================================================
          CART DRAWER OVERLAY
         ==================================================================== */}
      {cartOpen && (
        <div className="drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            
            <button className="cart-close-btn" onClick={() => setCartOpen(false)}>✕</button>

            <h2 className="cart-title">Your Cart</h2>

            <div className="cart-items-wrapper">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item-container">
                    <img src={item.img} alt={item.title} className="cart-item-img" />
                    
                    <div className="cart-item-details">
                      <span className="cart-item-name" style={{ color: '#000000' }}>{item.title}</span>
                      <span className="cart-item-weight">250 gm</span>
                      <span className="cart-item-price">${(item.rawPrice * item.quantity).toFixed(2)}</span>
                      
                      <div className="quantity-counter-box">
                        <button className="quantity-btn minus" onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <div className="quantity-display">{item.quantity}</div>
                        <button className="quantity-btn plus" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ marginTop: '40px', textAlign: 'center', color: '#777', fontFamily: 'Georgia, serif', fontSize: '16px' }}>
                  Your cart is empty
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                <span style={{ fontFamily: 'Georgia, serif' }}>Total</span>
                <span>${calculateCartTotal()}</span>
              </div>
              
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: '15px 0 25px 0', textAlign: 'left' }}>
                Shipping, taxes, and discounts will be calculated at checkout.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button 
                  className="cart-action-btn-rounded" 
                  style={{ backgroundColor: '#8B4513', color: '#ffffff' }}
                  onClick={() => alert('Proceeding to payment engine...')}
                >
                  Proceed to Checkout
                </button>
                <button 
                  className="cart-action-btn-rounded"
                  onClick={() => alert('Loading full detailed cart profile page...')}
                >
                  View Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;