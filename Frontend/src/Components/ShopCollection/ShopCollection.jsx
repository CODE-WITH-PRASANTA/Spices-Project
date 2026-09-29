import React, { useState } from 'react';
import './ShopCollection.css';

// --- STANDARD IMPORT DECLARATIONS ---
import img1 from '../../assets/Barberry.webp';
import img2 from '../../assets/Black Cardamom.webp';
import img3 from '../../assets/black mustard.webp';
import img4 from '../../assets/black sesame.webp';
import img5 from '../../assets/cardamom.webp';
import img6 from '../../assets/cinamon.jpg';
import img7 from '../../assets/clove.webp';
import img8 from '../../assets/coriander.webp';
import img9 from '../../assets/cubeb pepper.webp';
import img10 from '../../assets/White.jpeg';

// --- SEAMLESSLY MAPPED INITIAL PRODUCTS ARRAY ---
const INITIAL_PRODUCTS = [
  { id: 1, name: 'Barberry', price: 286.00, oldPrice: null, image: img1, sale: false, brand: 'catch', weight: '250 gm', category: 'masalas' },
  { id: 2, name: 'Black Cardamom', price: 569.00, oldPrice: null, image: img2, sale: false, brand: 'Vedaka', weight: '500 gm', category: 'chatMasalas' },
  { id: 3, name: 'Black Mustard', price: 286.00, oldPrice: null, image: img3, sale: false, brand: 'catch', weight: '250 gm', category: 'masalas' },
  { id: 4, name: 'Black Sesame', price: 795.00, oldPrice: 800.00, image: img4, sale: true, brand: 'Kesari', weight: '1 kg', category: 'refundOil' },
  { id: 5, name: 'Cardamom', price: 897.00, oldPrice: 900.00, image: img5, sale: true, brand: 'Eastern', weight: '2 kg', category: 'chatMasalas' },
  { id: 6, name: 'Cinnamon', price: 421.00, oldPrice: null, image: img6, sale: false, brand: 'Oskino', weight: '3 kg', category: 'clove' },
  { id: 7, name: 'Clove', price: 299.00, oldPrice: null, image: img7, sale: false, brand: 'Vedaka', weight: '250 gm', category: 'clove' },
  { id: 8, name: 'Coriander', price: 197.00, oldPrice: 300.00, image: img8, sale: true, brand: 'catch', weight: '500 gm', category: 'masalas' },
  { id: 9, name: 'Cubeb Pepper', price: 298.00, oldPrice: null, image: img9, sale: false, brand: 'Kesari', weight: '1 kg', category: 'refundOil' },
  { id: 10, name: 'White Pepper', price: 610.00, oldPrice: 650.00, image: img1, sale: true, brand: 'Oskino', weight: '500 gm', category: 'masalas' },
  { id: 11, name: 'Star Anise', price: 340.00, oldPrice: null, image: img3, sale: false, brand: 'Vedaka', weight: '250 gm', category: 'clove' },
  { id: 12, name: 'Fennel Seeds', price: 180.00, oldPrice: 210.00, image: img6, sale: true, brand: 'catch', weight: '1 kg', category: 'refundOil' }
];

const BEST_SELLERS = [
  { id: 101, name: 'Premium Cardamom', price: 897.00, oldPrice: 900.00, image: img10, sale: true },
  { id: 102, name: 'Rosehip Berries', price: 579.00, oldPrice: null, image: img2, sale: false }
];

const ShopCollection = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [paginateBy, setPaginateBy] = useState(8);
  const [sortBy, setSortBy] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaginateDropdown, setShowPaginateDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Active filters state
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // Accordion Sidebar Toggles
  const [openCategories, setOpenCategories] = useState({
    masalas: false,
    chatMasalas: false,
    refundOil: false,
    clove: false
  });

  const [activeProductForPopup, setActiveProductForPopup] = useState(null);
  const [bestSellerIndex, setBestSellerIndex] = useState(0);

  const toggleCategory = (key) => {
    setOpenCategories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const nextBestSeller = () => {
    setBestSellerIndex((prev) => (prev + 1) % BEST_SELLERS.length);
  };
  const prevBestSeller = () => {
    setBestSellerIndex((prev) => (prev - 1 + BEST_SELLERS.length) % BEST_SELLERS.length);
  };

  // --- CLIENT-SIDE FILTER LOGIC ---
  const filteredProducts = INITIAL_PRODUCTS.filter(product => {
    if (selectedCategory && product.category !== selectedCategory) return false;
    if (selectedWeight && product.weight !== selectedWeight) return false;
    if (selectedBrand && product.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.replace(/₹/g, '').split('-').map(Number);
      if (product.price < min || product.price > max) return false;
    }
    return true;
  });

  // --- SORT LOGIC ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price, low to high') return a.price - b.price;
    if (sortBy === 'Price, high to low') return b.price - a.price;
    return 0; // Default sorting layout
  });

  // --- PAGINATION MATHEMATICS & SLICING ---
  const indexOfLastProduct = currentPage * paginateBy;
  const indexOfFirstProduct = indexOfLastProduct - paginateBy;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / paginateBy);

  return (
    <div className="shop-container">
      {/* SIDEBAR FILTERS SYSTEM */}
      <aside className="shop-sidebar">
        
        {/* Dynamic Category Accordion Blocks */}
        <div className="filter-group">
          <h2 className="filter-title">Category</h2>
          
          <div className="accordion-item">
            <button className={`accordion-header ${selectedCategory === 'masalas' ? 'active-filter' : ''}`} onClick={() => { toggleCategory('masalas'); setSelectedCategory(selectedCategory === 'masalas' ? null : 'masalas'); }}>
              <span>Masalas</span> <strong>{openCategories.masalas ? '-' : '+'}</strong>
            </button>
            <div className={`accordion-content ${openCategories.masalas ? 'open' : ''}`}>
              <p>Garam Masala</p>
              <p>Chicken Masala</p>
              <p>Sabzi Masala</p>
            </div>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${selectedCategory === 'chatMasalas' ? 'active-filter' : ''}`} onClick={() => { toggleCategory('chatMasalas'); setSelectedCategory(selectedCategory === 'chatMasalas' ? null : 'chatMasalas'); }}>
              <span>Chat Masalas</span> <strong>{openCategories.chatMasalas ? '-' : '+'}</strong>
            </button>
            <div className={`accordion-content ${openCategories.chatMasalas ? 'open' : ''}`}>
              <p>Chunky Chat Masala</p>
              <p>Tangy Dry Mango Mix</p>
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-header"><span>Pepper Powder</span></button>
          </div>

          <div className="accordion-item">
            <button className="accordion-header"><span>Cooking Essentials</span></button>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${selectedCategory === 'refundOil' ? 'active-filter' : ''}`} onClick={() => { toggleCategory('refundOil'); setSelectedCategory(selectedCategory === 'refundOil' ? null : 'refundOil'); }}>
              <span>Refund Oil</span> <strong>{openCategories.refundOil ? '-' : '+'}</strong>
            </button>
            <div className={`accordion-content ${openCategories.refundOil ? 'open' : ''}`}>
              <p>Mustard Oil Blend</p>
              <p>Refined Soyabean Oil</p>
            </div>
          </div>

          <div className="accordion-item">
            <button className="accordion-header"><span>Household Items</span></button>
          </div>

          <div className="accordion-item">
            <button className="accordion-header"><span>Personal Care</span></button>
          </div>

          <div className="accordion-item">
            <button className={`accordion-header ${selectedCategory === 'clove' ? 'active-filter' : ''}`} onClick={() => { toggleCategory('clove'); setSelectedCategory(selectedCategory === 'clove' ? null : 'clove'); }}>
              <span>Clove</span> <strong>{openCategories.clove ? '-' : '+'}</strong>
            </button>
            <div className={`accordion-content ${openCategories.clove ? 'open' : ''}`}>
              <p>Whole Dried Clove</p>
              <p>Laung Powder</p>
            </div>
          </div>
        </div>

        {/* Configuration Parameter Badges */}
        <div className="filter-group">
          <h2 className="filter-title">Shop By Weight</h2>
          <div className="badge-grid">
            {['250 gm', '500 gm', '1 kg', '2 kg', '3 kg'].map(w => (
              <button 
                key={w} 
                className={`badge-btn ${selectedWeight === w ? 'badge-active' : ''}`}
                onClick={() => setSelectedWeight(selectedWeight === w ? null : w)}
              >
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h2 className="filter-title">Shop By Price</h2>
          <div className="badge-grid">
            {['₹100 - ₹200', '₹200 - ₹300', '₹300 - ₹500', '₹500 - ₹700', '₹700 - ₹1000'].map(p => (
              <button 
                key={p} 
                className={`badge-btn ${selectedPriceRange === p ? 'badge-active' : ''}`}
                onClick={() => setSelectedPriceRange(selectedPriceRange === p ? null : p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h2 className="filter-title">Shop By Brand</h2>
          <div className="badge-grid">
            {['catch', 'Vedaka', 'Kesari', 'Eastern', 'Oskino'].map(b => (
              <button 
                key={b} 
                className={`badge-btn ${selectedBrand === b ? 'badge-active' : ''}`}
                onClick={() => setSelectedBrand(selectedBrand === b ? null : b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Best Sellers Widget */}
        <div className="filter-group best-sellers-widget">
          <h2 className="filter-title">Best Sellers</h2>
          <div className="best-seller-slider-card">
            {BEST_SELLERS[bestSellerIndex].sale && <span className="sale-tag">Sale</span>}
            <div className="bs-img-wrapper">
              <img src={BEST_SELLERS[bestSellerIndex].image} alt={BEST_SELLERS[bestSellerIndex].name} />
            </div>
            <h3>{BEST_SELLERS[bestSellerIndex].name}</h3>
            <div className="price-box">
              <span className="current-price">₹{BEST_SELLERS[bestSellerIndex].price.toFixed(2)}</span>
              {BEST_SELLERS[bestSellerIndex].oldPrice && (
                <span className="old-price">₹{BEST_SELLERS[bestSellerIndex].oldPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="slider-arrows">
              <button className="arrow-btn" onClick={prevBestSeller}>&lt;</button>
              <button className="arrow-btn" onClick={nextBestSeller}>&gt;</button>
            </div>
          </div>
        </div>

      </aside>

      {/* PRODUCTS BOARD */}
      <main className="shop-main">
        
        {/* INTERACTIVE CONTROLS CONTAINER */}
        <div className="top-bar">
          <div className="view-toggle">
            <button className={`view-btn grid-layout-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              <div className="grid-icon-matrix">
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
                <span></span><span></span><span></span>
              </div>
            </button>
            <button className={`view-btn list-layout-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
              <div className="list-icon-rows">
                <div className="list-icon-row"><span></span><div></div></div>
                <div className="list-icon-row"><span></span><div></div></div>
                <div className="list-icon-row"><span></span><div></div></div>
              </div>
            </button>
          </div>

          <div className="dropdown-controls">
            <div className="control-select-wrapper">
              <span>Paginate by </span>
              <div className="custom-dropdown" onClick={() => setShowPaginateDropdown(!showPaginateDropdown)}>
                <div className="dropdown-trigger">{paginateBy} <span className="arrow-down">▼</span></div>
                {showPaginateDropdown && (
                  <ul className="dropdown-menu">
                    {[4, 8, 12, 16, 24].map(num => (
                      <li key={num} onClick={() => { setPaginateBy(num); setCurrentPage(1); setShowPaginateDropdown(false); }}>{num}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="control-select-wrapper">
              <span>Sort by </span>
              <div className="custom-dropdown" onClick={() => setShowSortDropdown(!showSortDropdown)}>
                <div className="dropdown-trigger">{sortBy} <span className="arrow-down">▼</span></div>
                {showSortDropdown && (
                  <ul className="dropdown-menu wide">
                    {['Featured', 'Price, low to high', 'Price, high to low'].map(str => (
                      <li key={str} onClick={() => { setSortBy(str); setShowSortDropdown(false); }}>{str}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS DYNAMIC WRAPPER */}
        <div className={`products-container ${viewMode === 'list' ? 'list-layout' : 'grid-layout'}`}>
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.sale && <span className="sale-tag">Sale</span>}
              
              <div className="product-img-frame">
                {/* Visual Stick/Border Animation Nodes */}
                <span className="animated-stick line-top"></span>
                <span className="animated-stick line-right"></span>
                <span className="animated-stick line-bottom"></span>
                <span className="animated-stick line-left"></span>

                <img src={product.image} alt={product.name} className="product-display-img" />
                
                {/* Actions overlay layout structured to reflect uploaded UI screenshot */}
                <div className="product-actions-overlay">
                  <div className="actions-diamond-row top-row">
                    <button className="action-circle-btn" title="Add to Basket">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    </button>
                    <button className="action-circle-btn" title="Compare Product">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                    <button className="action-circle-btn" title="Save to Wishlist">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    </button>
                  </div>
                  <div className="actions-diamond-row bottom-row">
                    <button className="action-circle-btn quick-view" title="Quick Details View" onClick={() => setActiveProductForPopup(product)}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="product-info">
                <h3 className="product-title-text">{product.name}</h3>
                <div className="price-box">
                  <span className="current-price">₹{product.price.toFixed(2)}</span>
                  {product.oldPrice && <span className="old-price">₹{product.oldPrice.toFixed(2)}</span>}
                </div>
              </div>
            </div>
          ))}
          {currentProducts.length === 0 && (
            <div className="no-products">No matches found for active sidebar filter conditions.</div>
          )}
        </div>

        {/* PAGINATION FOOTER */}
        {totalPages > 1 && (
          <div className="pagination-footer">
            <button className="page-circle-btn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}>&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button 
                key={pageNumber} 
                className={`page-circle-btn ${currentPage === pageNumber ? 'active' : ''}`} 
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button className="page-circle-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>&gt;</button>
          </div>
        )}

      </main>

      {/* QUICK-VIEW POPUP MODAL */}
      {activeProductForPopup && (
        <div className="popup-backdrop" onClick={() => setActiveProductForPopup(null)}>
          <div className="popup-form-box animate-pop" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={() => setActiveProductForPopup(null)}>×</button>
            <div className="popup-form-body">
              <div className="popup-form-left">
                <img src={activeProductForPopup.image} alt={activeProductForPopup.name} />
              </div>
              <div className="popup-form-right">
                <h2>{activeProductForPopup.name}</h2>
                <div className="price-box popup-price-box">
                  <span className="current-price text-xl">₹{activeProductForPopup.price.toFixed(2)}</span>
                  {activeProductForPopup.oldPrice && <span className="old-price">₹{activeProductForPopup.oldPrice.toFixed(2)}</span>}
                </div>
                <p className="popup-desc">Dynamic Mock Description: Premium selection of organic raw ingredients processed using ultra-hygienic automated packaging.</p>
                <div className="form-input-row">
                  <label>Quantity Set:</label>
                  <input type="number" defaultValue="1" min="1" className="popup-qty-input" />
                </div>
                <button className="popup-submit-btn" onClick={() => setActiveProductForPopup(null)}>Confirm Selection</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCollection;