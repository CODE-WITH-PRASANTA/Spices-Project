import React, { useState } from 'react';
import { FaUpload, FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
  const [contacts, setContacts] = useState([
    { id: 1, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', name: 'Jeera Dev', phone: '+91 98765 43210', email: 'jeera@example.com', address: '123 Spice Street' },
    { id: 2, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', name: 'John Doe', phone: '+1 555-0199', email: 'john@example.com', address: '456 Oak Ave' },
    { id: 3, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', name: 'Jane Smith', phone: '+44 20 7946 0958', email: 'jane@example.com', address: '789 Pine Rd' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    image: null,
    imagePreview: ''
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; 
  const totalPages = Math.ceil(contacts.length / itemsPerPage) || 1;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    
    // Adjust page index if deleting the last item on a page
    const totalPagesAfterDelete = Math.ceil(updatedContacts.length / itemsPerPage) || 1;
    if (currentPage > totalPagesAfterDelete) {
      setCurrentPage(totalPagesAfterDelete);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newContact = {
      id: Date.now(),
      image: formData.imagePreview || 'https://via.placeholder.com/100',
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address
    };

    setContacts([newContact, ...contacts]);
    setCurrentPage(1);
    setFormData({ name: '', phone: '', email: '', address: '', image: null, imagePreview: '' });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-us-wrapper">
        
        {/* Left Side: Form */}
        <div className="contact-us-card">
          <h2 className="contact-us-card-title">Add Contact List</h2>
          <form onSubmit={handleSubmit} className="contact-us-form">
            
            <div className="contact-us-form-group">
              <label className="contact-us-label">Upload Image</label>
              <div className="contact-us-file-input-wrapper">
                <label className="contact-us-file-label">
                  <FaUpload className="contact-us-upload-icon" />
                  <span>Choose File</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="contact-us-file-input" />
                </label>
                <span className="contact-us-file-name">
                  {formData.image ? formData.image.name : 'No file chosen'}
                </span>
              </div>
            </div>

            <div className="contact-us-form-group">
              <label className="contact-us-label">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name..." className="contact-us-input" required />
            </div>

            <div className="contact-us-form-group">
              <label className="contact-us-label">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number..." className="contact-us-input" required />
            </div>

            <div className="contact-us-form-group">
              <label className="contact-us-label">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address..." className="contact-us-input" />
            </div>

            <div className="contact-us-form-group">
              <label className="contact-us-label">Address</label>
              <textarea name="address" value={formData.address} onChange={handleInputChange} placeholder="Enter physical address..." className="contact-us-input contact-us-textarea" rows="2" />
            </div>

            <button type="submit" className="contact-us-submit-btn">
              <FaPlus className="contact-us-btn-icon" /> Add Contact
            </button>
          </form>
        </div>

        {/* Right Side: Table with Actions */}
        <div className="contact-us-card">
          <h2 className="contact-us-card-title">Contact List</h2>
          <div className="contact-us-table-container">
            <table className="contact-us-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentContacts.length > 0 ? (
                  currentContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td><img src={contact.image} alt={contact.name} className="contact-us-table-img" /></td>
                      <td className="contact-us-bold-text">{contact.name}</td>
                      <td>{contact.phone}</td>
                      <td>{contact.email || '-'}</td>
                      <td>{contact.address || '-'}</td>
                      <td>
                        <div className="contact-us-action-buttons">
                          <button className="contact-us-action-btn edit-btn" title="Edit">
                            <FaEdit />
                          </button>
                          <button 
                            className="contact-us-action-btn delete-btn" 
                            title="Delete"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="contact-us-no-data">No contacts added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Slider Pagination Controls */}
          {contacts.length > itemsPerPage && (
            <div className="contact-us-pagination-slider-container">
              <span className="contact-us-page-indicator">Page <strong>{currentPage}</strong> of {totalPages}</span>
              <div className="contact-us-slider-wrapper">
                <button className="contact-us-slider-arrow-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                  <FaChevronLeft />
                </button>
                <input type="range" min="1" max={totalPages} value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="contact-us-page-slider" />
                <button className="contact-us-slider-arrow-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactUs;