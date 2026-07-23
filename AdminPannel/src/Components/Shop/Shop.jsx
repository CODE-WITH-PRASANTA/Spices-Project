import React, { useState, useRef, useEffect } from 'react';
import { FaCloudUploadAlt, FaEdit, FaTrash, FaStar, FaCheckCircle } from 'react-icons/fa';
import './Shop.css';
import axiosInstance, { BACKEND_URL } from '../../api/axiosInstance';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ 
    id: null, title: '', priceOld: '', priceNew: '', 
    weight: '', category: '', description: '', status: 'Normal', image: null 
  });
  
  const fileInputRef = useRef(null);

  // Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('/products');
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Store the actual file object
  };

  const resetForm = () => {
    setFormData({ id: null, title: '', priceOld: '', priceNew: '', weight: '', category: '', description: '', status: 'Normal', image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object for file upload
    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      await axiosInstance.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchProducts(); // Refresh list
      resetForm();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  return (
    <div className="Shop">
      <div className="Shop__container">
        <form className="Shop__form" onSubmit={handleSubmit}>
          <h2 className="Shop__heading">Product Management</h2>
          
          <div className="Shop__upload" onClick={() => fileInputRef.current.click()}>
            {formData.image ? (
              <div className="Shop__upload-success"><FaCheckCircle color="green" /> {formData.image.name || 'File selected'}</div>
            ) : (
              <><FaCloudUploadAlt /> <p>Upload Image</p></>
            )}
            <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
          </div>

          <div className="Shop__grid">
            
            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Product Title" required />
            <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" required />
            <input name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight (e.g. 500g)" />
            <input name="priceOld" type="number" value={formData.priceOld} onChange={handleInputChange} placeholder="Old Price ($)" />
            <input name="priceNew" type="number" value={formData.priceNew} onChange={handleInputChange} placeholder="New Price ($)" required />
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Normal">Normal</option>
              <option value="On Sale">On Sale</option>
              <option value="Special">Special</option>
            </select>
          </div>
          
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Product Description" rows="3" />
          
          <button type="submit" className="Shop__submit-btn">
            ADD PRODUCT <FaStar />
          </button>
        </form>

        <table className="Shop__table">
          <thead><tr><th>Image</th><th>Title</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>
                {item.image && (
                  <img 
                    // Using BACKEND_URL to dynamically point to the image path
                    src={item.image.startsWith('http') ? item.image : `${BACKEND_URL}/uploads/${item.image}`} 
                    alt={item.title} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                )}
              </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>${item.priceNew}</td>
                <td><span className={`Shop__status Shop__status--${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span></td>
                <td>
                  <button onClick={() => handleDelete(item._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shop;