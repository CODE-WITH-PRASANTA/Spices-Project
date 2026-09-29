import React, { useState, useEffect, useRef } from 'react';
import'./AllProduct.css';
import { 
  LuSearch, 
  LuBell, 
  LuBox, 
  LuCircleCheck, 
  LuTriangleAlert, 
  LuCircleX,     
  LuStar, 
  LuFilter, 
  LuPlus, 
  LuDownload, 
  LuUpload, 
  LuChevronDown, 
  LuLayoutGrid, 
  LuList, 
  LuEye, 
  LuPencil, 
  LuTrash2, 
  LuChevronLeft, 
  LuChevronRight 
} from 'react-icons/lu';
import { HiEllipsisVertical } from 'react-icons/hi2';
import { TbCurrencyRupee } from 'react-icons/tb';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Black Cardamom Powder',
    tag: 'Bestseller',
    desc: 'Premium quality black cardamom powder',
    sku: 'MC-101',
    category: 'Masala',
    brand: 'Catch',
    weight: '500 gm',
    mrp: 650,
    price: 569,
    discount: '12% OFF',
    stock: 245,
    stockStatus: 'In Stock',
    rating: 4.8,
    reviews: 25,
    status: 'Active',
    createdDate: '20 Jul, 2024',
    createdTime: '10:30 AM',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 2,
    name: 'Chat Masala',
    tag: 'New',
    desc: 'Tangy and spicy chat masala',
    sku: 'MC-102',
    category: 'Chat Masala',
    brand: 'Eastern',
    weight: '100 gm',
    mrp: 120,
    price: 99,
    discount: '18% OFF',
    stock: 560,
    stockStatus: 'In Stock',
    rating: 4.6,
    reviews: 18,
    status: 'Active',
    createdDate: '19 Jul, 2024',
    createdTime: '09:15 AM',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 3,
    name: 'Red Chilli Powder',
    tag: '',
    desc: 'Pure and natural red chilli powder',
    sku: 'MC-103',
    category: 'Masala',
    brand: 'Vedaka',
    weight: '200 gm',
    mrp: 160,
    price: 129,
    discount: '19% OFF',
    stock: 120,
    stockStatus: 'In Stock',
    rating: 4.7,
    reviews: 32,
    status: 'Active',
    createdDate: '18 Jul, 2024',
    createdTime: '02:45 PM',
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 4,
    name: 'Green Cardamom',
    tag: '',
    desc: 'Whole green cardamom pods',
    sku: 'MC-104',
    category: 'Masala',
    brand: 'Catch',
    weight: '50 gm',
    mrp: 250,
    price: 199,
    discount: '20% OFF',
    stock: 85,
    stockStatus: 'Low Stock',
    rating: 4.9,
    reviews: 41,
    status: 'Low Stock',
    createdDate: '17 Jul, 2024',
    createdTime: '11:20 AM',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=120'
  },
  {
    id: 5,
    name: 'Clove',
    tag: '',
    desc: 'Premium quality cloves',
    sku: 'MC-105',
    category: 'Clove',
    brand: 'Oskino',
    weight: '100 gm',
    mrp: 180,
    price: 149,
    discount: '17% OFF',
    stock: 0,
    stockStatus: 'Out of Stock',
    rating: 4.5,
    reviews: 15,
    status: 'Out of Stock',
    createdDate: '16 Jul, 2024',
    createdTime: '04:10 PM',
    image: 'https://images.unsplash.com/photo-1615485290171-477ef27f6e80?auto=format&fit=crop&q=80&w=120'
  }
];

const AllProduct = () => {
  // State variables
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedIds, setSelectedIds] = useState([]);
  const [topSearch, setTopSearch] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [stockFilters, setStockFilters] = useState({ inStock: false, lowStock: false, outOfStock: false });
  const [statusFilters, setStatusFilters] = useState({ published: false, draft: false, hidden: false });
  const [priceRange, setPriceRange] = useState(1000);
  const [selectedRating, setSelectedRating] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [viewMode, setViewMode] = useState('list');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Reference for tracking clicks outside action menus
  const actionMenuRef = useRef(null);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '', sku: '', category: 'Masala', brand: 'Catch', weight: '100 gm', mrp: '', price: '', stock: ''
  });

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(p => {
    const matchesTopSearch = p.name.toLowerCase().includes(topSearch.toLowerCase()) || p.sku.toLowerCase().includes(topSearch.toLowerCase());
    const matchesFilterSearch = p.name.toLowerCase().includes(filterSearch.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;
    
    // Stock Checkbox
    const activeStockFilters = [];
    if (stockFilters.inStock) activeStockFilters.push('In Stock');
    if (stockFilters.lowStock) activeStockFilters.push('Low Stock');
    if (stockFilters.outOfStock) activeStockFilters.push('Out of Stock');
    const matchesStock = activeStockFilters.length === 0 || activeStockFilters.includes(p.stockStatus);

    // Price Filter
    const matchesPrice = p.price <= priceRange;

    // Rating Filter
    let matchesRating = true;
    if (selectedRating !== 'All') {
      const minRating = parseFloat(selectedRating);
      matchesRating = p.rating >= minRating;
    }

    return matchesTopSearch && matchesFilterSearch && matchesCategory && matchesBrand && matchesStock && matchesPrice && matchesRating;
  }).sort((a, b) => {
    if (sortBy === 'Newest First') return b.id - a.id;
    if (sortBy === 'Oldest First') return a.id - b.id;
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    return 0;
  });

  // Checkbox Selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Bulk Actions
  const handleBulkAction = (action) => {
    if (selectedIds.length === 0) return alert('Select products first!');
    if (action === 'delete') {
      setProducts(products.filter(p => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      alert('Selected items deleted successfully');
    }
  };

  // Delete Single Product
  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setOpenDropdownId(null);
  };

  // Add Product Handler
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return alert('Please enter Name and Price');
    const item = {
      id: Date.now(),
      name: newProd.name,
      tag: 'New',
      desc: 'Freshly added product',
      sku: newProd.sku || `MC-${Math.floor(100 + Math.random() * 900)}`,
      category: newProd.category,
      brand: newProd.brand,
      weight: newProd.weight,
      mrp: Number(newProd.mrp) || Number(newProd.price) + 20,
      price: Number(newProd.price),
      discount: '10% OFF',
      stock: Number(newProd.stock) || 50,
      stockStatus: Number(newProd.stock) > 20 ? 'In Stock' : (Number(newProd.stock) > 0 ? 'Low Stock' : 'Out of Stock'),
      rating: 5.0,
      reviews: 1,
      status: 'Active',
      createdDate: 'Today',
      createdTime: 'Just now',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=120'
    };
    setProducts([item, ...products]);
    setShowAddModal(false);
    setNewProd({ name: '', sku: '', category: 'Masala', brand: 'Catch', weight: '100 gm', mrp: '', price: '', stock: '' });
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilterSearch('');
    setSelectedCategory('');
    setSelectedBrand('');
    setStockFilters({ inStock: false, lowStock: false, outOfStock: false });
    setStatusFilters({ published: false, draft: false, hidden: false });
    setPriceRange(1000);
    setSelectedRating('All');
  };

  // Export CSV
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["Name,SKU,Category,Price,Stock"].join(",") + "\n"
      + products.map(e => `"${e.name}",${e.sku},${e.category},${e.price},${e.stock}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="AllProduct-container">
      {/* METRIC CARDS */}
      <section className="AllProduct-stats-grid">
        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-blue"><LuBox /></div>
          <div className="stat-details">
            <span className="title">Total Products</span>
            <div className="val-wrap">
              <h2>{products.length}</h2>
              <span className="trend positive">+12.5%</span>
            </div>
            <small>From last month</small>
          </div>
        </div>

        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-green"><LuCircleCheck /></div>
          <div className="stat-details">
            <span className="title">Active Products</span>
            <h2>{products.filter(p => p.status === 'Active').length}</h2>
            <small>{((products.filter(p => p.status === 'Active').length / (products.length || 1)) * 100).toFixed(1)}% of total</small>
          </div>
        </div>

        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-yellow"><LuTriangleAlert /></div>
          <div className="stat-details">
            <span className="title">Low Stock</span>
            <h2>{products.filter(p => p.stockStatus === 'Low Stock').length}</h2>
            <small className="warning">Need attention</small>
          </div>
        </div>

        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-red"><LuCircleX /></div>
          <div className="stat-details">
            <span className="title">Out Of Stock</span>
            <h2>{products.filter(p => p.stockStatus === 'Out of Stock').length}</h2>
            <small>Currently unavailable</small>
          </div>
        </div>

        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-purple"><LuStar /></div>
          <div className="stat-details">
            <span className="title">Featured Products</span>
            <h2>{products.filter(p => p.tag === 'Bestseller' || p.tag === 'New').length}</h2>
            <small>Hand picked items</small>
          </div>
        </div>

        <div className="AllProduct-stat-card">
          <div className="stat-icon icon-orange"><TbCurrencyRupee /></div>
          <div className="stat-details">
            <span className="title">Inventory Value</span>
            <h2>₹{products.reduce((acc, p) => acc + (p.price * p.stock), 0).toLocaleString('en-IN')}</h2>
            <small>All products value</small>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="AllProduct-content-layout">
        
        {/* SIDEBAR FILTERS */}
        <aside className="AllProduct-filter-sidebar">
          <div className="filter-header">
            <h3><LuFilter /> Filter Products</h3>
            <button className="clear-btn" onClick={handleResetFilters}>Clear All</button>
          </div>

          <div className="filter-group">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search product..." 
                value={filterSearch} 
                onChange={(e) => setFilterSearch(e.target.value)} 
              />
              <LuSearch />
            </div>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="Masala">Masala</option>
              <option value="Chat Masala">Chat Masala</option>
              <option value="Clove">Clove</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Brand</label>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">Select Brand</option>
              <option value="Catch">Catch</option>
              <option value="Eastern">Eastern</option>
              <option value="Vedaka">Vedaka</option>
              <option value="Oskino">Oskino</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="group-title">Stock Status</label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={stockFilters.inStock} 
                onChange={(e) => setStockFilters({...stockFilters, inStock: e.target.checked})} 
              />
              <span>In Stock</span>
              <span className="count green">{products.filter(p => p.stockStatus === 'In Stock').length}</span>
            </label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={stockFilters.lowStock} 
                onChange={(e) => setStockFilters({...stockFilters, lowStock: e.target.checked})} 
              />
              <span>Low Stock</span>
              <span className="count yellow">{products.filter(p => p.stockStatus === 'Low Stock').length}</span>
            </label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={stockFilters.outOfStock} 
                onChange={(e) => setStockFilters({...stockFilters, outOfStock: e.target.checked})} 
              />
              <span>Out of Stock</span>
              <span className="count red">{products.filter(p => p.stockStatus === 'Out of Stock').length}</span>
            </label>
          </div>

          <div className="filter-group">
            <label className="group-title">Product Status</label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={statusFilters.published} 
                onChange={(e) => setStatusFilters({...statusFilters, published: e.target.checked})} 
              />
              <span>Published</span>
              <span className="count green">{products.filter(p => p.status === 'Active').length}</span>
            </label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={statusFilters.draft} 
                onChange={(e) => setStatusFilters({...statusFilters, draft: e.target.checked})} 
              />
              <span>Draft</span>
              <span className="count gray">0</span>
            </label>
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                checked={statusFilters.hidden} 
                onChange={(e) => setStatusFilters({...statusFilters, hidden: e.target.checked})} 
              />
              <span>Hidden</span>
              <span className="count gray">0</span>
            </label>
          </div>

          <div className="filter-group">
            <label className="group-title">Price Range</label>
            <input 
              type="range" 
              min="0" 
              max="1000" 
              value={priceRange} 
              onChange={(e) => setPriceRange(Number(e.target.value))} 
              className="range-slider"
            />
            <div className="range-val">
              <span>₹0</span>
              <span>₹{priceRange}+</span>
            </div>
          </div>

          <div className="filter-group">
            <label className="group-title">Rating</label>
            <div className="rating-pills">
              {['All', '4', '3', '2'].map((val) => (
                <button 
                  key={val} 
                  className={`pill ${selectedRating === val ? 'active' : ''}`}
                  onClick={() => setSelectedRating(val)}
                >
                  {val === 'All' ? '★ All' : `${val} ★ & above`}
                </button>
              ))}
            </div>
          </div>

          <button className="apply-btn">Apply Filters</button>
          <button className="reset-btn" onClick={handleResetFilters}>Reset Filters</button>
        </aside>

        {/* DATA TABLE CONTAINER */}
        <main className="AllProduct-main-content">
          
          {/* TOOLBAR */}
          <div className="AllProduct-toolbar">
            <div className="toolbar-left">
              <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                <LuPlus /> Add Product <LuChevronDown />
              </button>
              <button className="btn btn-outline" onClick={() => alert('Import triggered')}><LuDownload /> Import</button>
              <button className="btn btn-outline" onClick={handleExport}><LuUpload /> Export</button>
              
              <div className="select-dropdown">
                <select value="" onChange={(e) => handleBulkAction(e.target.value)}>
                  <option value="" disabled>Bulk Actions</option>
                  <option value="delete">Delete Selected ({selectedIds.length})</option>
                </select>
              </div>
            </div>

            <div className="toolbar-right">
              <div className="sort-wrap">
                <span>Sort By:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Newest First">Newest First</option>
                  <option value="Oldest First">Oldest First</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
              </div>

              <div className="view-toggle">
                <span>View:</span>
                <button 
                  className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => setViewMode('grid')}
                >
                  <LuLayoutGrid />
                </button>
                <button 
                  className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`} 
                  onClick={() => setViewMode('list')}
                >
                  <LuList />
                </button>
              </div>
            </div>
          </div>

          {/* TABLE / GRID VIEW */}
          {viewMode === 'list' ? (
            <div className="table-responsive">
              <table className="AllProduct-table">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        onChange={handleSelectAll} 
                        checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0} 
                      />
                    </th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th>Weight</th>
                    <th>MRP</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedIds.includes(p.id)} 
                          onChange={() => handleSelectOne(p.id)} 
                        />
                      </td>
                      <td>
                        <div className="product-cell">
                          <img src={p.image} alt={p.name} />
                          <div>
                            <div className="name-wrap">
                              <strong>{p.name}</strong>
                              {p.tag && <span className={`tag ${p.tag.toLowerCase()}`}>{p.tag}</span>}
                            </div>
                            <p className="desc">{p.desc}</p>
                            <div className="rating-inline">
                              <LuStar className="star-icon" /> {p.rating} <span>({p.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{p.sku}</td>
                      <td><span className="cat-badge">{p.category}</span></td>
                      <td>{p.brand}</td>
                      <td>{p.weight}</td>
                      <td><del>₹{p.mrp}</del></td>
                      <td>
                        <div className="price-cell">
                          <span className="discount">{p.discount}</span>
                          <strong>₹{p.price}</strong>
                        </div>
                      </td>
                      <td>
                        <div className="stock-cell">
                          <span className={p.stock > 100 ? 'green' : p.stock > 0 ? 'yellow' : 'red'}>{p.stock}</span>
                          <small>Units</small>
                        </div>
                      </td>
                      <td>
                        <div className="rating-box">
                          <LuStar /> {p.rating}
                        </div>
                      </td>
                      <td>
                        <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {p.status}
                        </span>
                      </td>
                      <td>
                        <div className="created-cell">
                          <span>{p.createdDate}</span>
                          <small>{p.createdTime}</small>
                        </div>
                      </td>
                      <td>
                        <div className="action-menu-wrap" ref={openDropdownId === p.id ? actionMenuRef : null}>
                          <button 
                            className="action-btn"
                            onClick={() => setOpenDropdownId(openDropdownId === p.id ? null : p.id)}
                          >
                            <HiEllipsisVertical />
                          </button>
                          {openDropdownId === p.id && (
                            <div className="action-dropdown">
                              <button onClick={() => alert(`View ${p.name}`)}><LuEye /> View</button>
                              <button onClick={() => alert(`Edit ${p.name}`)}><LuPencil /> Edit</button>
                              <button onClick={() => handleDeleteProduct(p.id)} className="delete"><LuTrash2 /> Delete</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="AllProduct-grid-view">
              {filteredProducts.map((p) => (
                <div className="grid-card" key={p.id}>
                  <img src={p.image} alt={p.name} />
                  <h4>{p.name}</h4>
                  <p>{p.category} | {p.brand}</p>
                  <div className="grid-price">
                    <strong>₹{p.price}</strong> <del>₹{p.mrp}</del>
                  </div>
                  <span className={`status-pill ${p.status.toLowerCase().replace(/\s+/g, '-')}`}>{p.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <footer className="AllProduct-pagination">
            <div className="pag-left">
              Showing 1 to {filteredProducts.length} of {products.length} products
            </div>
            <div className="pag-right">
              <button className="page-nav"><LuChevronLeft /></button>
              <button className="page-num active">1</button>
              <button className="page-num">2</button>
              <button className="page-num">3</button>
              <span>...</span>
              <button className="page-num">125</button>
              <button className="page-nav"><LuChevronRight /></button>
              
              <select className="page-select" defaultValue="10 / page">
                <option value="10 / page">10 / page</option>
                <option value="20 / page">20 / page</option>
                <option value="50 / page">50 / page</option>
              </select>
            </div>
          </footer>
        </main>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddModal && (
        <div className="AllProduct-modal-overlay">
          <div className="AllProduct-modal">
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <input 
                type="text" 
                placeholder="Product Name" 
                value={newProd.name} 
                onChange={(e) => setNewProd({...newProd, name: e.target.value})} 
                required 
              />
              <input 
                type="text" 
                placeholder="SKU Code" 
                value={newProd.sku} 
                onChange={(e) => setNewProd({...newProd, sku: e.target.value})} 
              />
              <div className="form-row">
                <input 
                  type="number" 
                  placeholder="MRP (₹)" 
                  value={newProd.mrp} 
                  onChange={(e) => setNewProd({...newProd, mrp: e.target.value})} 
                />
                <input 
                  type="number" 
                  placeholder="Price (₹)" 
                  value={newProd.price} 
                  onChange={(e) => setNewProd({...newProd, price: e.target.value})} 
                  required 
                />
              </div>
              <div className="form-row">
                <input 
                  type="number" 
                  placeholder="Stock Quantity" 
                  value={newProd.stock} 
                  onChange={(e) => setNewProd({...newProd, stock: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="Weight (e.g. 200 gm)" 
                  value={newProd.weight} 
                  onChange={(e) => setNewProd({...newProd, weight: e.target.value})} 
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;