import React, { useState } from 'react';
import { 
  FiHome, 
  FiBriefcase, 
  FiMapPin, 
  FiPlus, 
  FiMoreVertical, 
  FiCheck, 
  FiEdit2, 
  FiTrash2, 
  FiShield, 
  FiX 
} from 'react-icons/fi';
import './ManageAddress.css';

const initialAddresses = [
  {
    id: 1,
    type: 'Home',
    fullName: 'Rahul Kumar',
    mobile: '+91 9876543210',
    addressLine1: '123, Green Park Road',
    addressLine2: '',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751001',
    country: 'India',
    isDefault: true,
  },
  {
    id: 2,
    type: 'Work',
    fullName: 'Rahul Kumar',
    mobile: '+91 9876543210',
    addressLine1: 'Tech Park, Tower 2, Office 501',
    addressLine2: 'Infocity',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751024',
    country: 'India',
    isDefault: false,
  },
  {
    id: 3,
    type: 'Other',
    fullName: 'Rahul Kumar',
    mobile: '+91 9876543210',
    addressLine1: 'Plot No. 45, Lane 3',
    addressLine2: 'Khandagiri',
    city: 'Bhubaneswar',
    state: 'Odisha',
    pincode: '751030',
    country: 'India',
    isDefault: false,
  },
];

const emptyFormState = {
  type: 'Home',
  fullName: '',
  mobile: '',
  pincode: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: 'India',
  instructions: '',
  isDefault: false,
};

const ManageAddress = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyFormState);

  // Helper to render type icons
  const renderAddressIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'home':
        return <FiHome className="manage-address-card-icon" />;
      case 'work':
        return <FiBriefcase className="manage-address-card-icon" />;
      default:
        return <FiMapPin className="manage-address-card-icon" />;
    }
  };

  // Three dots toggle
  const toggleMenu = (id, e) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Set default address
  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    setActiveMenuId(null);
  };

  // Delete address
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    setActiveMenuId(null);
  };

  // Open modal for add
  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData(emptyFormState);
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleOpenEditModal = (addr) => {
    setEditingId(addr.id);
    setFormData({
      type: addr.type,
      fullName: addr.fullName,
      mobile: addr.mobile,
      pincode: addr.pincode,
      addressLine1: addr.addressLine1,
      addressLine2: addr.addressLine2 || '',
      city: addr.city,
      state: addr.state,
      country: addr.country || 'India',
      instructions: addr.instructions || '',
      isDefault: addr.isDefault,
    });
    setActiveMenuId(null);
    setIsModalOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAddresses((prev) =>
        prev.map((addr) => {
          if (addr.id === editingId) {
            return { ...formData, id: editingId };
          }
          if (formData.isDefault) {
            return { ...addr, isDefault: false };
          }
          return addr;
        })
      );
    } else {
      const newAddress = {
        ...formData,
        id: Date.now(),
      };
      if (formData.isDefault) {
        setAddresses((prev) =>
          prev.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
        );
      } else {
        setAddresses((prev) => [...prev, newAddress]);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="manage-address" onClick={() => setActiveMenuId(null)}>
      {/* Header Bar */}
      <div className="manage-address-header">
        <div className="manage-address-header-text">
          <h1>Manage Addresses</h1>
          <p>Add, edit or remove your delivery addresses.</p>
        </div>
        <button className="manage-address-add-btn" onClick={handleOpenAddModal}>
          <FiPlus /> Add New Address
        </button>
      </div>

      {/* Cards Grid */}
      <div className="manage-address-grid">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`manage-address-card ${
              addr.isDefault ? 'manage-address-card-default' : ''
            }`}
          >
            {/* Top row with icon, title, badge & 3 dots */}
            <div className="manage-address-card-top">
              <div className="manage-address-card-type">
                <div className="manage-address-icon-circle">
                  {renderAddressIcon(addr.type)}
                </div>
                <div className="manage-address-type-title">
                  {addr.isDefault && (
                    <span className="manage-address-default-badge">Default</span>
                  )}
                  <h3>{addr.type}</h3>
                </div>
              </div>

              <div className="manage-address-menu-container">
                <button
                  className="manage-address-three-dots"
                  onClick={(e) => toggleMenu(addr.id, e)}
                >
                  <FiMoreVertical />
                </button>

                {/* Dropdown Menu */}
                {activeMenuId === addr.id && (
                  <div className="manage-address-dropdown">
                    {!addr.isDefault && (
                      <button onClick={() => handleSetDefault(addr.id)}>
                        <FiCheck /> Set as Default
                      </button>
                    )}
                    <button onClick={() => handleOpenEditModal(addr)}>
                      <FiEdit2 /> Edit
                    </button>
                    <button
                      className="manage-address-delete-opt"
                      onClick={() => handleDelete(addr.id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="manage-address-card-body">
              <p className="manage-address-name">{addr.fullName}</p>
              <p className="manage-address-phone">{addr.mobile}</p>
              <p className="manage-address-street">
                {addr.addressLine1}
                {addr.addressLine2 ? `, ${addr.addressLine2}` : ''}
              </p>
              <p className="manage-address-location">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="manage-address-country">{addr.country}</p>
            </div>

            {/* Card Footer Actions */}
            <div className="manage-address-card-footer">
              {addr.isDefault ? (
                <span className="manage-address-default-indicator">
                  <FiCheck /> Default Address
                </span>
              ) : (
                <button
                  className="manage-address-btn-link"
                  onClick={() => handleSetDefault(addr.id)}
                >
                  Set as Default
                </button>
              )}

              <div className="manage-address-footer-actions">
                <button
                  className="manage-address-btn-action"
                  onClick={() => handleOpenEditModal(addr)}
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  className="manage-address-btn-action manage-address-btn-delete"
                  onClick={() => handleDelete(addr.id)}
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Banner */}
      <div className="manage-address-safety-banner">
        <div className="manage-address-safety-icon">
          <FiShield />
        </div>
        <div>
          <h4>Your addresses are safe with us</h4>
          <p>We use secure encryption to protect your address details.</p>
        </div>
      </div>

      {/* Modal Popup (Add / Edit) */}
      {isModalOpen && (
        <div className="manage-address-modal-overlay">
          <div className="manage-address-modal">
            <div className="manage-address-modal-header">
              <h2>{editingId ? 'Edit Address' : 'Add New Address'}</h2>
              <button
                className="manage-address-modal-close"
                onClick={() => setIsModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="manage-address-modal-body">
              {/* Row 1 */}
              <div className="manage-address-form-row">
                <div className="manage-address-form-group">
                  <label>
                    Address Type <span className="manage-address-required">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="manage-address-form-group">
                  <label>
                    Full Name <span className="manage-address-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="manage-address-form-row">
                <div className="manage-address-form-group">
                  <label>
                    Mobile Number <span className="manage-address-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="manage-address-form-group">
                  <label>
                    Pincode <span className="manage-address-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Address Line 1 */}
              <div className="manage-address-form-group">
                <label>
                  Address Line 1 <span className="manage-address-required">*</span>
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  placeholder="House no., Building, Street"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Address Line 2 */}
              <div className="manage-address-form-group">
                <label>Address Line 2 (Optional)</label>
                <input
                  type="text"
                  name="addressLine2"
                  placeholder="Area, Landmark, Colony"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                />
              </div>

              {/* Row 3 - City, State, Country */}
              <div className="manage-address-form-row manage-address-three-cols">
                <div className="manage-address-form-group">
                  <label>
                    City <span className="manage-address-required">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="manage-address-form-group">
                  <label>
                    State <span className="manage-address-required">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select state</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div className="manage-address-form-group">
                  <label>
                    Country <span className="manage-address-required">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                  </select>
                </div>
              </div>

              {/* Additional Instructions */}
              <div className="manage-address-form-group">
                <label>Additional Instructions (Optional)</label>
                <textarea
                  name="instructions"
                  rows="3"
                  placeholder="E.g., Near Green Park, Behind ICICI Bank, etc."
                  value={formData.instructions}
                  onChange={handleInputChange}
                />
              </div>

              {/* Footer Controls */}
              <div className="manage-address-modal-footer">
                <label className="manage-address-checkbox-label">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleInputChange}
                  />
                  <span>Set as Default Address</span>
                </label>

                <div className="manage-address-modal-actions">
                  <button
                    type="button"
                    className="manage-address-cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="manage-address-save-btn">
                    Save Address
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAddress;