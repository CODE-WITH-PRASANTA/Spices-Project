import React, { useState } from 'react';
import { 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaUpload, 
  FaShoppingBag,
  FaCheck,
  FaTimes 
} from 'react-icons/fa';
import './BestProduct.css';

const BestProduct = () => {
  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: 'Jeera', 
      oldPrice: '250.00',
      newPrice: '200.00', 
      quantity: 50,
      status: 'live',
      image: null
    },
    { 
      id: 2, 
      title: 'Fennel Seeds', 
      oldPrice: '550.00',
      newPrice: '489.00', 
      quantity: 25,
      status: 'sale',
      image: null
    }
  ]);

  // Form input field states
  const [editingId, setEditingId] = useState(null); // Tracks edit mode
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [status, setStatus] = useState('live');

  // Handles image upload changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Resets all form fields to default state
  const resetForm = () => {
    setEditingId(null);
    setProductTitle('');
    setOldPrice('');
    setNewPrice('');
    setQuantity('1');
    setStatus('live');
    setProductImage(null);
    setImagePreview('');
  };

  // Populates form fields with product details for editing
  const handleEdit = (product) => {
    setEditingId(product.id);
    setProductTitle(product.title);
    setOldPrice(product.oldPrice || '');
    setNewPrice(product.newPrice);
    setQuantity(product.quantity.toString());
    setStatus(product.status);
    setImagePreview(product.image || '');
    setProductImage(null); // Keep original image reference via imagePreview unless changed
  };

  // Form submit handler (Handles both Add and Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productTitle || !newPrice) {
      alert('Please fill out required fields: Title and New Price.');
      return;
    }

    const formattedOldPrice = oldPrice ? parseFloat(oldPrice).toFixed(2) : null;
    const formattedNewPrice = parseFloat(newPrice).toFixed(2);
    const parsedQuantity = parseInt(quantity, 10) || 1;

    if (editingId !== null) {
      // UPDATE existing product
      setProducts(products.map(product => {
        if (product.id === editingId) {
          return {
            ...product,
            title: productTitle,
            oldPrice: formattedOldPrice,
            newPrice: formattedNewPrice,
            quantity: parsedQuantity,
            status: status,
            // Keep existing image if no new file was selected
            image: imagePreview || product.image 
          };
        }
        return product;
      }));
    } else {
      // ADD new product
      const newProduct = {
        id: Date.now(),
        title: productTitle,
        oldPrice: formattedOldPrice,
        newPrice: formattedNewPrice,
        quantity: parsedQuantity,
        status: status,
        image: imagePreview || null
      };
      setProducts([newProduct, ...products]);
    }

    resetForm();
  };

  // Delete product action trigger
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      // Reset form if the product currently being edited gets deleted
      if (editingId === id) {
        resetForm();
      }
    }
  };

  return (
    <div className="BestProduct-container">
      
      {/* Form Section */}
      <div className="BestProduct-form-section">
        <h2 className="BestProduct-heading">
          {editingId ? 'Edit Product' : 'Add Best Product'}
        </h2>
        
        <form onSubmit={handleSubmit} className="BestProduct-form">
          
          {/* Upload Field */}
          <div className="BestProduct-form-group">
            <label>Upload Image</label>
            <div className="BestProduct-file-upload-wrapper">
              <input
                type="file"
                id="productImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="productImage" className="BestProduct-file-upload-btn">
                <FaUpload /> Choose File
              </label>
              <span className="BestProduct-file-name">
                {productImage ? productImage.name : (imagePreview ? 'Image loaded' : 'No file chosen...')}
              </span>
            </div>
            {imagePreview && (
              <div className="BestProduct-preview-box">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {/* Title Input */}
          <div className="BestProduct-form-group">
            <label htmlFor="productTitle">Product Title *</label>
            <input
              type="text"
              id="productTitle"
              className="BestProduct-input-field"
              placeholder="Enter product title..."
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
          </div>

          {/* Pricing, Quantity & Status Grid */}
          <div className="BestProduct-grid-2col">
            <div className="BestProduct-form-group">
              <label htmlFor="oldPrice">Old Price (₹)</label>
              <input
                type="number"
                id="oldPrice"
                className="BestProduct-input-field"
                placeholder="e.g. 299.00"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                step="0.01"
              />
            </div>

            <div className="BestProduct-form-group">
              <label htmlFor="newPrice">New Price (₹) *</label>
              <input
                type="number"
                id="newPrice"
                className="BestProduct-input-field"
                placeholder="e.g. 199.00"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                step="0.01"
                required
              />
            </div>

            <div className="BestProduct-form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                className="BestProduct-input-field"
                placeholder="1"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>

            <div className="BestProduct-form-group">
              <label htmlFor="status">Product Status</label>
              <select
                id="status"
                className="BestProduct-select-field"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="live">Live</option>
                <option value="sale">Sale</option>
              </select>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="BestProduct-button-group">
            <button type="submit" className={`BestProduct-submit-btn ${editingId ? 'update' : ''}`}>
              {editingId ? (
                <>
                  <FaCheck /> Update Product
                </>
              ) : (
                <>
                  <FaPlus /> Add Product
                </>
              )}
            </button>

            {editingId && (
              <button 
                type="button" 
                className="BestProduct-cancel-btn"
                onClick={resetForm}
              >
                <FaTimes /> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Product List Table Section */}
      <div className="BestProduct-list-section">
        <h2 className="BestProduct-heading">Product List</h2>
        
        <div className="BestProduct-table-container">
          <table className="BestProduct-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price Details</th>
                <th>Qty</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr 
                    key={product.id} 
                    className={editingId === product.id ? 'BestProduct-editing-row' : ''}
                  >
                    <td>
                      <div className="BestProduct-table-img-wrapper">
                        {product.image ? (
                          <img src={product.image} alt={product.title} />
                        ) : (
                          <div className="BestProduct-placeholder-icon">
                            <FaShoppingBag />
                          </div>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className="BestProduct-title-text">{product.title}</span>
                    </td>

                    <td className="BestProduct-table-price">
                      <div className="BestProduct-price-stack">
                        <span className="BestProduct-new-price">₹{product.newPrice}</span>
                        {product.oldPrice && (
                          <span className="BestProduct-old-price">₹{product.oldPrice}</span>
                        )}
                      </div>
                    </td>

                    <td className="BestProduct-qty-text">{product.quantity}</td>

                    <td>
                      <span className={`BestProduct-status-badge ${product.status}`}>
                        {product.status === 'sale' ? 'Sale' : 'Live'}
                      </span>
                    </td>

                    <td>
                      <div className="BestProduct-action-buttons">
                        <button 
                          type="button" 
                          className="BestProduct-action-btn edit" 
                          title="Edit"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          type="button"
                          className="BestProduct-action-btn delete" 
                          title="Delete"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="BestProduct-no-data">
                    No Products Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BestProduct;