import React, { useState } from 'react';
import './BestProduct.css';
import { 
  FiPlus, 
  FiEye, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiX, 
  FiUploadCloud, 
  FiChevronLeft, 
  FiChevronRight,
  FiChevronDown,
  FiCheck,
  FiPauseCircle,
  FiPackage
} from 'react-icons/fi';

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'Fennel Seeds',
    subTitle: 'Saunf',
    category: 'Spices',
    price: '120.00',
    status: 'Active',
    order: 1,
    description: '',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Cubeb Pepper',
    subTitle: 'Kabeb',
    category: 'Spices',
    price: '281.00',
    status: 'Active',
    order: 2,
    description: '',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 3,
    name: 'White Mustard',
    subTitle: 'Rai',
    category: 'Spices',
    price: '52.00',
    status: 'Active',
    order: 3,
    description: '',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 4,
    name: 'Barberry',
    subTitle: 'Berberis',
    category: 'Spices',
    price: '218.00',
    status: 'Inactive',
    order: 4,
    description: '',
    image: 'https://images.unsplash.com/photo-1509358271058-acd05cc93898?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 5,
    name: 'Fenugreek Dal',
    subTitle: 'Methi Dal',
    category: 'Spices',
    price: '120.00',
    status: 'Inactive',
    order: 5,
    description: '',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=150'
  }
];

const BestProduct = () => {
  // Main Data States
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State for Add / Edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Drawer Side Panel State (Right side panel if needed)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Preview & View Modals state
  const [viewingProduct, setViewingProduct] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    productName: '',
    subTitle: '',
    category: 'Spices',
    price: '',
    image: null,
    imagePreview: '',
    status: 'Active',
    displayOrder: '',
    shortDescription: ''
  });

  // Dynamic Statistics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'Active').length;
  const inactiveProducts = products.filter((p) => p.status === 'Inactive').length;

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Pop-Up Modal for Adding New Product
  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      productName: '',
      subTitle: '',
      category: '',
      price: '',
      image: null,
      imagePreview: '',
      status: 'Active',
      displayOrder: (products.length + 1).toString(),
      shortDescription: ''
    });
    setIsAddModalOpen(true);
  };

  // Open Edit Mode (Side panel or Modal)
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      productName: product.name,
      subTitle: product.subTitle || '',
      category: product.category,
      price: product.price,
      image: null,
      imagePreview: product.image,
      status: product.status,
      displayOrder: product.order ? product.order.toString() : '',
      shortDescription: product.description || ''
    });
    setIsAddModalOpen(true);
  };

  // Close Add/Edit Modal
  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setEditingId(null);
  };

  // Close Side Panel Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Reset Modal Form
  const handleResetForm = () => {
    setFormData({
      productName: '',
      subTitle: '',
      category: '',
      price: '',
      image: null,
      imagePreview: '',
      status: 'Active',
      displayOrder: (products.length + 1).toString(),
      shortDescription: ''
    });
  };

  // Save / Update Product
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.price) {
      alert('Please fill in required fields (Product Name and Price)');
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                name: formData.productName,
                subTitle: formData.subTitle,
                category: formData.category || 'Spices',
                price: parseFloat(formData.price).toFixed(2),
                status: formData.status,
                order: parseInt(formData.displayOrder) || item.order,
                image: formData.imagePreview || item.image,
                description: formData.shortDescription
              }
            : item
        )
      );
    } else {
      const newEntry = {
        id: Date.now(),
        name: formData.productName,
        subTitle: formData.subTitle,
        category: formData.category || 'Spices',
        price: parseFloat(formData.price).toFixed(2),
        status: formData.status,
        order: parseInt(formData.displayOrder) || products.length + 1,
        image:
          formData.imagePreview ||
          'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=150',
        description: formData.shortDescription
      };
      setProducts((prev) => [...prev, newEntry]);
    }

    alert(editingId ? 'Product updated successfully!' : 'New product saved successfully!');
    handleCloseAddModal();
  };

  // Delete Product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Toggle Active/Inactive status directly from table row
  const handleToggleStatus = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
          : item
      )
    );
  };

  // Filter products by search and dropdown
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.subTitle && p.subTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus =
      statusFilter === 'All Status' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="BestProduct-container">
      
      {/* Top Header */}
      <div className="BestProduct-header">
        <div>
          <h1 className="BestProduct-title">Best Products (Spices)</h1>
          <div className="BestProduct-breadcrumb">
            Dashboard &gt; Products &gt; <span>Best Products (Spices)</span>
          </div>
        </div>

        <div className="BestProduct-header-actions">
          <button 
            type="button" 
            className="BestProduct-btn BestProduct-btn-secondary"
            onClick={() => setShowPreviewModal(true)}
          >
            <FiEye className="BestProduct-btn-icon" /> Preview Section
          </button>
          <button 
            type="button" 
            className="BestProduct-btn BestProduct-btn-primary"
            onClick={handleAddNew}
          >
            <FiPlus className="BestProduct-btn-icon" /> Add New Product
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="BestProduct-stats-grid">
        <div className="BestProduct-stat-card">
          <div className="BestProduct-stat-icon-box BestProduct-bg-gray">
            <FiPackage />
          </div>
          <div className="BestProduct-stat-details">
            <span className="BestProduct-stat-label">Total Products</span>
            <h2 className="BestProduct-stat-value">{totalProducts}</h2>
            <span className="BestProduct-stat-sub">All Best Products</span>
          </div>
        </div>

        <div className="BestProduct-stat-card">
          <div className="BestProduct-stat-icon-box BestProduct-bg-green">
            <FiCheck />
          </div>
          <div className="BestProduct-stat-details">
            <span className="BestProduct-stat-label">Active Products</span>
            <h2 className="BestProduct-stat-value">{activeProducts}</h2>
            <span className="BestProduct-stat-sub">Currently Active</span>
          </div>
        </div>

        <div className="BestProduct-stat-card">
          <div className="BestProduct-stat-icon-box BestProduct-bg-yellow">
            <FiPauseCircle />
          </div>
          <div className="BestProduct-stat-details">
            <span className="BestProduct-stat-label">Inactive Products</span>
            <h2 className="BestProduct-stat-value">{inactiveProducts}</h2>
            <span className="BestProduct-stat-sub">Currently Inactive</span>
          </div>
        </div>
      </div>

      {/* Layout Grid */}
      <div className={`BestProduct-workspace ${isDrawerOpen ? 'drawer-active' : 'drawer-closed'}`}>
        
        {/* Table Section */}
        <div className="BestProduct-table-card">
          <div className="BestProduct-table-header">
            <div>
              <h3 className="BestProduct-card-title">Best Products List</h3>
              <p className="BestProduct-card-sub">Manage best products shown in homepage (spices only)</p>
            </div>

            <div className="BestProduct-filter-controls">
              <div className="BestProduct-select-wrapper">
                <select 
                  className="BestProduct-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <FiChevronDown className="BestProduct-select-icon" />
              </div>

              <div className="BestProduct-search-wrapper">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="BestProduct-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="BestProduct-search-icon" />
              </div>
            </div>
          </div>

          <div className="BestProduct-table-responsive">
            <table className="BestProduct-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>#</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item, index) => (
                    <tr key={item.id}>
                      <td className="BestProduct-td-num">{index + 1}</td>
                      <td>
                        <div className="BestProduct-item-cell">
                          <img src={item.image} alt={item.name} className="BestProduct-item-thumb" />
                          <div>
                            <div className="BestProduct-item-name">{item.name}</div>
                            {item.subTitle && <div className="BestProduct-item-sub">({item.subTitle})</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="BestProduct-category-tag">{item.category}</span>
                      </td>
                      <td className="BestProduct-price">₹{item.price}</td>
                      <td>
                        <span className={`BestProduct-badge ${item.status === 'Active' ? 'badge-active' : 'badge-inactive'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td>{item.order}</td>
                      <td>
                        <div className="BestProduct-action-btns">
                          <button 
                            type="button" 
                            className="BestProduct-icon-btn" 
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FiEdit2 />
                          </button>
                          <button 
                            type="button" 
                            className="BestProduct-icon-btn" 
                            title="View"
                            onClick={() => setViewingProduct(item)}
                          >
                            <FiEye />
                          </button>
                          
                          <label className="BestProduct-toggle-switch" title="Toggle Status">
                            <input 
                              type="checkbox" 
                              checked={item.status === 'Active'}
                              onChange={() => handleToggleStatus(item.id)}
                            />
                            <span className="BestProduct-toggle-slider" />
                          </label>

                          <button 
                            type="button" 
                            className="BestProduct-icon-btn btn-danger" 
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="BestProduct-empty-row">
                      No products found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="BestProduct-pagination-row">
            <span className="BestProduct-pagination-text">
              Showing 1 to {filteredProducts.length} of {products.length} entries
            </span>
            <div className="BestProduct-pagination-controls">
              <button type="button" className="BestProduct-page-btn" disabled><FiChevronLeft /></button>
              <button type="button" className="BestProduct-page-btn active">1</button>
              <button type="button" className="BestProduct-page-btn">2</button>
              <button type="button" className="BestProduct-page-btn"><FiChevronRight /></button>
            </div>
          </div>
        </div>

        {/* Right Drawer Side Panel */}
        {isDrawerOpen && (
          <div className="BestProduct-drawer-card">
            <div className="BestProduct-drawer-header">
              <h3 className="BestProduct-drawer-title">
                {editingId ? 'Edit Product' : 'Add / Edit Product'}
              </h3>
              <button 
                type="button" 
                className="BestProduct-close-btn"
                onClick={handleCloseDrawer}
                title="Close Side Panel"
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="BestProduct-drawer-form">
              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Product Name <span className="BestProduct-required">*</span>
                </label>
                <input 
                  type="text" 
                  name="productName"
                  placeholder="Enter product name"
                  className="BestProduct-input"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="BestProduct-form-group">
                <label className="BestProduct-label">Sub Title (Optional)</label>
                <input 
                  type="text" 
                  name="subTitle"
                  placeholder="Eg. Saunf, Rai etc."
                  className="BestProduct-input"
                  value={formData.subTitle}
                  onChange={handleInputChange}
                />
              </div>

              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Category <span className="BestProduct-required">*</span>
                </label>
                <div className="BestProduct-select-wrapper">
                  <select 
                    name="category"
                    className="BestProduct-select full-width"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Spices">Spices</option>
                    <option value="Herbs">Herbs</option>
                    <option value="Masalas">Masalas</option>
                    <option value="Dry Fruits">Dry Fruits</option>
                  </select>
                  <FiChevronDown className="BestProduct-select-icon" />
                </div>
              </div>

              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Price (₹) <span className="BestProduct-required">*</span>
                </label>
                <input 
                  type="number" 
                  step="0.01"
                  name="price"
                  placeholder="0.00"
                  className="BestProduct-input"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Product Image <span className="BestProduct-required">*</span>
                </label>
                
                <div className="BestProduct-dropzone">
                  <input 
                    type="file" 
                    id="drawer-img-upload" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="drawer-img-upload" className="BestProduct-dropzone-label">
                    {formData.imagePreview ? (
                      <div className="BestProduct-upload-preview">
                        <img src={formData.imagePreview} alt="Uploaded preview" />
                        <span className="BestProduct-change-photo">Click to Change</span>
                      </div>
                    ) : (
                      <>
                        <FiUploadCloud className="BestProduct-dropzone-icon" />
                        <div className="BestProduct-dropzone-text">Click to upload</div>
                        <div className="BestProduct-dropzone-sub">or drag and drop</div>
                        <div className="BestProduct-dropzone-hint">JPG, PNG or WEBP (max. 2MB)</div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Status <span className="BestProduct-required">*</span>
                </label>
                <div className="BestProduct-select-wrapper">
                  <select 
                    name="status"
                    className="BestProduct-select full-width"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <FiChevronDown className="BestProduct-select-icon" />
                </div>
              </div>

              <div className="BestProduct-drawer-footer">
                <button 
                  type="button" 
                  className="BestProduct-btn BestProduct-btn-outline"
                  onClick={handleResetForm}
                >
                  Reset
                </button>
                <button 
                  type="submit" 
                  className="BestProduct-btn BestProduct-btn-primary"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* =========================================
          ADD NEW PRODUCT POP-UP MODAL (REFERENCE MATCH)
         ========================================= */}
      {isAddModalOpen && (
        <div className="BestProduct-modal-backdrop" onClick={handleCloseAddModal}>
          <div className="BestProduct-add-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="BestProduct-add-modal-header">
              <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="BestProduct-close-btn" onClick={handleCloseAddModal}>
                <FiX />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="BestProduct-add-modal-body">
              
              {/* Row 1: Name & Subtitle */}
              <div className="BestProduct-form-row">
                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">
                    Product Name <span className="BestProduct-required">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="productName"
                    placeholder="Enter product name"
                    className="BestProduct-input"
                    value={formData.productName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">Sub Title (Optional)</label>
                  <input 
                    type="text" 
                    name="subTitle"
                    placeholder="Eg. Saunf, Rai etc."
                    className="BestProduct-input"
                    value={formData.subTitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2: Category & Price */}
              <div className="BestProduct-form-row">
                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">
                    Category <span className="BestProduct-required">*</span>
                  </label>
                  <div className="BestProduct-select-wrapper">
                    <select 
                      name="category"
                      className="BestProduct-select full-width"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select category</option>
                      <option value="Spices">Spices</option>
                      <option value="Herbs">Herbs</option>
                      <option value="Masalas">Masalas</option>
                      <option value="Dry Fruits">Dry Fruits</option>
                    </select>
                    <FiChevronDown className="BestProduct-select-icon" />
                  </div>
                </div>

                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">
                    Price (₹) <span className="BestProduct-required">*</span>
                  </label>
                  <input 
                    type="number" 
                    step="0.01"
                    name="price"
                    placeholder="0.00"
                    className="BestProduct-input"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 3: Image Dropzone */}
              <div className="BestProduct-form-group">
                <label className="BestProduct-label">
                  Product Image <span className="BestProduct-required">*</span>
                </label>
                <div className="BestProduct-dropzone">
                  <input 
                    type="file" 
                    id="modal-img-upload" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="modal-img-upload" className="BestProduct-dropzone-label">
                    {formData.imagePreview ? (
                      <div className="BestProduct-upload-preview">
                        <img src={formData.imagePreview} alt="Uploaded preview" />
                        <span className="BestProduct-change-photo">Click to Change</span>
                      </div>
                    ) : (
                      <>
                        <FiUploadCloud className="BestProduct-dropzone-icon" />
                        <div className="BestProduct-dropzone-text">Click to upload</div>
                        <div className="BestProduct-dropzone-sub">or drag and drop</div>
                        <div className="BestProduct-dropzone-hint">JPG, PNG or WEBP (max. 2MB)</div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Row 4: Status & Order */}
              <div className="BestProduct-form-row">
                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">
                    Status <span className="BestProduct-required">*</span>
                  </label>
                  <div className="BestProduct-select-wrapper">
                    <select 
                      name="status"
                      className="BestProduct-select full-width"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <FiChevronDown className="BestProduct-select-icon" />
                  </div>
                </div>

                <div className="BestProduct-form-group">
                  <label className="BestProduct-label">Order</label>
                  <input 
                    type="number" 
                    name="displayOrder"
                    placeholder="Enter display order"
                    className="BestProduct-input"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                  />
                  <span className="BestProduct-field-hint">Lower number shows first</span>
                </div>
              </div>

              {/* Row 5: Short Description */}
              <div className="BestProduct-form-group">
                <label className="BestProduct-label">Short Description (Optional)</label>
                <textarea 
                  name="shortDescription"
                  rows="3"
                  placeholder="Enter short description about the product..."
                  className="BestProduct-textarea"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="BestProduct-add-modal-footer">
                <button 
                  type="button" 
                  className="BestProduct-btn BestProduct-btn-cancel"
                  onClick={handleCloseAddModal}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="BestProduct-btn BestProduct-btn-purple"
                >
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Modal for Viewing Product Details */}
      {viewingProduct && (
        <div className="BestProduct-modal-backdrop" onClick={() => setViewingProduct(null)}>
          <div className="BestProduct-modal" onClick={(e) => e.stopPropagation()}>
            <div className="BestProduct-modal-header">
              <h3>Product Details</h3>
              <button className="BestProduct-close-btn" onClick={() => setViewingProduct(null)}><FiX /></button>
            </div>
            <div className="BestProduct-modal-body">
              <img src={viewingProduct.image} alt={viewingProduct.name} className="BestProduct-modal-img" />
              <h4>{viewingProduct.name} {viewingProduct.subTitle && `(${viewingProduct.subTitle})`}</h4>
              <p><strong>Category:</strong> {viewingProduct.category}</p>
              <p><strong>Price:</strong> ₹{viewingProduct.price}</p>
              <p><strong>Status:</strong> {viewingProduct.status}</p>
              <p><strong>Display Order:</strong> {viewingProduct.order}</p>
              {viewingProduct.description && <p><strong>Description:</strong> {viewingProduct.description}</p>}
            </div>
            <div className="BestProduct-modal-footer">
              <button className="BestProduct-btn BestProduct-btn-outline" onClick={() => setViewingProduct(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Section Preview */}
      {showPreviewModal && (
        <div className="BestProduct-modal-backdrop" onClick={() => setShowPreviewModal(false)}>
          <div className="BestProduct-modal BestProduct-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="BestProduct-modal-header">
              <h3>Best Spices Homepage Section Preview</h3>
              <button className="BestProduct-close-btn" onClick={() => setShowPreviewModal(false)}><FiX /></button>
            </div>
            <div className="BestProduct-modal-body">
              <div className="BestProduct-preview-grid">
                {products.filter(p => p.status === 'Active').map(p => (
                  <div key={p.id} className="BestProduct-preview-card">
                    <img src={p.image} alt={p.name} />
                    <h5>{p.name}</h5>
                    <span>₹{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BestProduct;