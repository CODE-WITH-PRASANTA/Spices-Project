import React, { useState } from 'react';
import { 
  FaPlus, 
  FaTrashAlt, 
  FaEdit, 
  FaChevronLeft, 
  FaChevronRight, 
  FaUpload, 
  FaShoppingBag 
} from 'react-icons/fa';
import './BestProduct.css';

const BestProduct = () => {
  // State for products list (initialized with mockup data matching the 2nd image layout style)
  const [products, setProducts] = useState([
    { id: 1, title: 'Fennel Seeds', price: '489.00', image: null },
    { id: 2, title: 'Cubeb Pepper', price: '298.00', image: null },
    { id: 3, title: 'White Mustard', price: '529.00', image: null },
    { id: 4, title: 'Barberry', price: '286.00', image: null },
    { id: 5, title: 'Fenugreek Dal', price: '129.00', image: null },
  ]);

  // Form states
  const [productTitle, setProductTitle] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle image upload change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productTitle || !productPrice) {
      alert('Please fill out all required fields.');
      return;
    }

    const newProduct = {
      id: Date.now(),
      title: productTitle,
      price: parseFloat(productPrice).toFixed(2),
      image: imagePreview || null,
    };

    setProducts([newProduct, ...products]);
    
    // Reset Form
    setProductTitle('');
    setProductPrice('');
    setProductImage(null);
    setImagePreview('');
  };

  // Delete product handler
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="BestProduct-container">
      
      {/* Left Column: Create Product Form */}
      <div className="BestProduct-form-section">
        <h2 className="BestProduct-heading">Add Best Product</h2>
        <form onSubmit={handleSubmit} className="BestProduct-form">
          
          <div className="BestProduct-form-group">
            <label htmlFor="productTitle">Product Title</label>
            <input
              type="text"
              id="productTitle"
              placeholder="Enter product title..."
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />
          </div>

          <div className="BestProduct-form-group">
            <label htmlFor="productPrice">Product Price (₹)</label>
            <input
              type="number"
              id="productPrice"
              placeholder="Enter price (e.g. 299.00)"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              step="0.01"
              required
            />
          </div>

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
                {productImage ? productImage.name : 'No file chosen'}
              </span>
            </div>
            {imagePreview && (
              <div className="BestProduct-preview-box">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="BestProduct-submit-btn">
            <FaPlus /> Add Product
          </button>
        </form>
      </div>

      {/* Right Column: Product List Table */}
      <div className="BestProduct-list-section">
        <h2 className="BestProduct-heading">Product List</h2>
        
        <div className="BestProduct-table-container">
          <table className="BestProduct-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Title</th>
                <th>Price (₹)</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id}>
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
                    <td><strong className="BestProduct-table-title">{product.title}</strong></td>
                    <td>₹{product.price}</td>
                    <td>
                      <div className="BestProduct-action-buttons">
                        <button className="BestProduct-action-btn edit" title="Edit">
                          <FaEdit />
                        </button>
                        <button 
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="BestProduct-pagination">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="BestProduct-page-btn"
            >
              <FaChevronLeft /> Prev
            </button>
            <span className="BestProduct-page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="BestProduct-page-btn"
            >
              Next <FaChevronRight />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default BestProduct;