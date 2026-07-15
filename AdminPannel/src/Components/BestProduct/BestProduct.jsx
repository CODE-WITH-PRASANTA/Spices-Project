import React, { useState } from 'react';
import { 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaUpload, 
  FaShoppingBag 
} from 'react-icons/fa';
import './BestProduct.css';

const BestProduct = () => {
  // Mock data matching the layout items
  const [products, setProducts] = useState([
    { 
      id: 1, 
      title: 'jeera', 
      price: '200.00', 
      image: null, 
      category: 'General', 
      date: '2026-07-15', 
      description: 'No description provided.' 
    },
    { 
      id: 2, 
      title: 'Fennel Seeds', 
      price: '489.00', 
      image: null, 
      category: 'Dried Seeds', 
      date: '2026-07-15', 
      description: 'Pellentesque massa placerat duis ultricies.' 
    }
  ]);

  // Form input field states
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');

  // Handles image upload changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productTitle || !productPrice) {
      alert('Please fill out the required text inputs.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: productTitle,
      price: parseFloat(productPrice).toFixed(2),
      image: imagePreview || null,
      category: 'General', 
      date: new Date().toISOString().split('T')[0],
      description: 'Pellentesque massa placerat duis ultricies.'
    };

    setProducts([newProduct, ...products]);
    
    // Form field resets
    setProductTitle('');
    setProductPrice('');
    setProductImage(null);
    setImagePreview('');
  };

  // Delete product action trigger
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div className="BestProduct-container">
      
      {/* Left Column Box: Form Panel (50% Width) */}
      <div className="BestProduct-form-section">
        <h2 className="BestProduct-heading">Add Best Product</h2>
        <form onSubmit={handleSubmit} className="BestProduct-form">
          
          {/* 1st Position: Upload Field */}
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
                {productImage ? productImage.name : 'No file ch...'}
              </span>
            </div>
            {imagePreview && (
              <div className="BestProduct-preview-box">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          {/* 2nd Position: Title Input */}
          <div className="BestProduct-form-group">
            <label htmlFor="productTitle">Product Title</label>
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

          {/* 3rd Position: Price Input */}
          <div className="BestProduct-form-group">
            <label htmlFor="productPrice">Product Price (₹)</label>
            <input
              type="number"
              id="productPrice"
              className="BestProduct-input-field"
              placeholder="Enter price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              step="0.01"
              required
            />
          </div>

          <button type="submit" className="BestProduct-submit-btn">
            <FaPlus /> Add Product
          </button>
        </form>
      </div>

      {/* Right Column Box: Product List Table Grid (50% Width) */}
      <div className="BestProduct-list-section">
        <h2 className="BestProduct-heading">Product List</h2>
        
        <div className="BestProduct-table-container">
          <table className="BestProduct-table">
            <thead>
              <tr>
                <th>Upload Image</th>
                <th>Product Title</th>
                <th>Product Price</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    {/* Column 1: Image Frame */}
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

                    {/* Column 2: Plain Clean Product Title Text */}
                    <td>
                      <span className="BestProduct-title-text">{product.title}</span>
                    </td>

                    {/* Column 3: Product Price */}
                    <td className="BestProduct-table-price">
                      ₹{product.price}
                    </td>

                    {/* Column 4: Actions */}
                    <td>
                      <div className="BestProduct-action-buttons">
                        <button type="button" className="BestProduct-action-btn edit" title="Edit">
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
                  <td colSpan="4" className="BestProduct-no-data">
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