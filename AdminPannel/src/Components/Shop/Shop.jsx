import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaEdit, FaTrash, FaStar, FaCheckCircle } from 'react-icons/fa';
import './Shop.css';

const Shop = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ id: null, title: '', price: '', image: null });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData({ ...formData, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setItems(items.map((item) => (item.id === formData.id ? formData : item)));
    } else {
      setItems([...items, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, title: '', price: '', image: null });
  };

  const handleDelete = (id) => setItems(items.filter((item) => item.id !== id));
  const handleEdit = (item) => setFormData(item);

  return (
    <div className="Shop">
      <div className="Shop__container">
        <div className="Shop__form-section">
          <form className="Shop__card" onSubmit={handleSubmit}>
            <h2 className="Shop__heading">Shop</h2>
            <label>UPLOAD IMAGE</label>
            <div className="Shop__upload" onClick={() => fileInputRef.current.click()}>
              {/* Image preview turned off: shows checkmark instead */}
              {formData.image ? (
                <div className="Shop__upload-success">
                  <FaCheckCircle size={40} color="green" />
                  <p>Image selected successfully</p>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt size={40} />
                  <p>Drag & drop or click to upload</p>
                </>
              )}
              <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} />
            </div>
            <label>PRODUCT TITLE</label>
            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter a detailed product title..." required />
            <label>PRICE</label>
            <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price here ($)..." required />
            <button type="submit" className="Shop__submit-btn">{formData.id ? "UPDATE" : "SUBMIT"} <FaStar /></button>
          </form>
        </div>
        
        <div className="Shop__table-section">
          <table className="Shop__table">
            <thead><tr><th>Title</th><th>Price</th><th>Actions</th></tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}><FaEdit /></button>
                    <button onClick={() => handleDelete(item.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Shop;