import React, { useState, useRef } from 'react';
import { 
  FiCamera, 
  FiCalendar, 
  FiLock, 
  FiShield, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiAlertTriangle,
  FiPlus,
  FiEye
} from 'react-icons/fi';
import './ProfileSettings.css';

const initialProfile = {
  fullName: 'Rahul Kumar',
  email: 'rahulkumar@email.com',
  mobileNumber: '+91 9876543210',
  dob: '1995-08-15',
  gender: 'Male',
  country: 'India',
};

const ProfileSettings = () => {
  // Profile State
  const [profileData, setProfileData] = useState(initialProfile);
  const [tempFormData, setTempFormData] = useState(initialProfile);

  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  );

  // Address/Additional Data Table States
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', address: '123 Park Street, Sector 4', city: 'Bhubaneswar', pincode: '751024', isDefault: true },
    { id: 2, type: 'Office', address: 'Tech Park, Infocity, Patia', city: 'Bhubaneswar', pincode: '751024', isDefault: false }
  ]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: 'Home', address: '', city: '', pincode: '' });

  const fileInputRef = useRef(null);

  // Format YYYY-MM-DD to DD / MM / YYYY for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day} / ${month} / ${year}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnableEdit = () => {
    setTempFormData(profileData);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setTempFormData(profileData);
    setIsEditing(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setProfileData(tempFormData);
    setIsEditing(false);
    alert('Profile details updated successfully!');
  };

  const handleConfirmDelete = () => {
    const emptyProfile = {
      fullName: '',
      email: '',
      mobileNumber: '',
      dob: '',
      gender: '',
      country: '',
    };
    setProfileData(emptyProfile);
    setTempFormData(emptyProfile);
    setProfileImage('https://api.dicebear.com/7.x/avataaars/svg?seed=Empty');
    setIsDeleteModalOpen(false);
    setIsEditing(false);
    setAddresses([]);
    alert('Profile details deleted successfully.');
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, newEntry]);
    setNewAddress({ type: 'Home', address: '', city: '', pincode: '' });
    setIsAddressModalOpen(false);
    alert('New address added successfully!');
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(item => item.id !== id));
  };

  return (
    <div className="profile-settings">
      {/* 1. UPPER SIDE: Header Title & Main Controls */}
      <div className="profile-top-bar">
        <div className="profile-settings-header">
          <h1>Profile Settings</h1>
          <p>Manage your personal information and account details.</p>
        </div>

        {/* Action Buttons in Upper Side */}
        <div className="profile-top-actions">
          {!isEditing ? (
            <button
              type="button"
              className="profile-btn profile-btn-edit"
              onClick={handleEnableEdit}
            >
              <FiEdit2 /> Edit Profile
            </button>
          ) : (
            <button
              type="button"
              className="profile-btn profile-btn-cancel"
              onClick={handleCancelEdit}
            >
              Cancel Editing
            </button>
          )}

          <button
            type="button"
            className="profile-btn profile-btn-delete"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <FiTrash2 /> Delete Profile
          </button>
        </div>
      </div>

      <div className="profile-settings-container">
        {/* 2. UNDERNEATH: Profile Details Form Card */}
        <div className="profile-settings-card profile-settings-main-card">
          <div className="profile-card-header">
            <h3>{isEditing ? 'Edit Profile Details' : 'Personal Details'}</h3>
            <span className="profile-status-badge">
              {isEditing ? 'Editing Mode' : 'View Mode'}
            </span>
          </div>

          <form className="profile-settings-form" onSubmit={handleSaveChanges}>
            <div className="profile-settings-content">
              
              {/* Left Side: Avatar Section */}
              <div className="profile-settings-avatar-section">
                <div className="profile-settings-avatar-wrapper">
                  <img
                    src={profileImage}
                    alt="Profile Avatar"
                    className="profile-settings-avatar"
                  />
                  {isEditing && (
                    <button
                      type="button"
                      className="profile-settings-camera-badge"
                      onClick={() => fileInputRef.current?.click()}
                      title="Upload Photo"
                    >
                      <FiCamera />
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg, image/png"
                  style={{ display: 'none' }}
                />

                {isEditing && (
                  <button
                    type="button"
                    className="profile-settings-upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Photo
                  </button>
                )}

                <span className="profile-settings-hint">JPG, PNG (Max 2MB)</span>
              </div>

              <div className="profile-settings-divider"></div>

              {/* Right Side: Details Form Grid */}
              <div className="profile-settings-form-grid">
                
                {/* Full Name */}
                <div className="profile-settings-group">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={tempFormData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                    />
                  ) : (
                    <div className="profile-settings-detail-value">
                      {profileData.fullName || '—'}
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div className="profile-settings-group">
                  <label>Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempFormData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                    />
                  ) : (
                    <div className="profile-settings-detail-value">
                      {profileData.email || '—'}
                    </div>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="profile-settings-group">
                  <label>Mobile Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="mobileNumber"
                      value={tempFormData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="Enter mobile number"
                      required
                    />
                  ) : (
                    <div className="profile-settings-detail-value">
                      {profileData.mobileNumber || '—'}
                    </div>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="profile-settings-group">
                  <label>Date of Birth</label>
                  {isEditing ? (
                    <div className="profile-settings-date-input-wrapper">
                      <input
                        type="date"
                        name="dob"
                        value={tempFormData.dob}
                        onChange={handleInputChange}
                        className="profile-settings-date-input"
                      />
                      <FiCalendar className="profile-settings-calendar-icon" />
                    </div>
                  ) : (
                    <div className="profile-settings-detail-value profile-settings-date-display">
                      <span>{formatDateForDisplay(profileData.dob) || '—'}</span>
                      <FiCalendar className="profile-settings-calendar-icon-inline" />
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div className="profile-settings-group">
                  <label>Gender</label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={tempFormData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="profile-settings-detail-value">
                      {profileData.gender || '—'}
                    </div>
                  )}
                </div>

                {/* Country */}
                <div className="profile-settings-group">
                  <label>Country</label>
                  {isEditing ? (
                    <select
                      name="country"
                      value={tempFormData.country}
                      onChange={handleInputChange}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  ) : (
                    <div className="profile-settings-detail-value">
                      {profileData.country || '—'}
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Bottom Actions (Only Visible During Editing) */}
            {isEditing && (
              <div className="profile-settings-actions">
                <button
                  type="button"
                  className="profile-btn profile-btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="profile-btn profile-btn-save">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar Info Card */}
        <div className="profile-settings-card profile-settings-sidebar-card">
          <h2>Account Information</h2>

          <div className="profile-settings-info-list">
            <div className="profile-settings-info-row">
              <span className="profile-settings-info-label">Member Since</span>
              <span className="profile-settings-info-value">18 May, 2025</span>
            </div>

            <div className="profile-settings-info-row">
              <span className="profile-settings-info-label">Account Type</span>
              <span className="profile-settings-info-value">Registered User</span>
            </div>

            <div className="profile-settings-info-row">
              <span className="profile-settings-info-label">Total Orders</span>
              <span className="profile-settings-info-value">3</span>
            </div>

            <div className="profile-settings-info-row">
              <span className="profile-settings-info-label">Total Spent</span>
              <span className="profile-settings-info-value">₹1,248.00</span>
            </div>
          </div>

          <div className="profile-settings-status-box">
            <div className="profile-settings-status-icon-wrapper">
              <FiLock className="profile-settings-status-icon" />
            </div>
            <div className="profile-settings-status-text">
              <h4>Email Verified</h4>
              <p>Your email address is verified.</p>
            </div>
          </div>

          <div className="profile-settings-status-box">
            <div className="profile-settings-status-icon-wrapper">
              <FiShield className="profile-settings-status-icon" />
            </div>
            <div className="profile-settings-status-text">
              <h4>Secure Account</h4>
              <p>Your account is protected with strong security.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. NEW SECTION: Saved Delivery Addresses Table */}
      <div className="profile-settings-card profile-table-card">
        <div className="profile-card-header">
          <h3>Saved Delivery Addresses</h3>
          <button 
            type="button" 
            className="profile-btn profile-btn-edit"
            onClick={() => setIsAddressModalOpen(true)}
          >
            <FiPlus /> Add New Address
          </button>
        </div>

        <div className="profile-table-responsive">
          <table className="profile-data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Address Details</th>
                <th>City</th>
                <th>Pincode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {addresses.length > 0 ? (
                addresses.map((item) => (
                  <tr key={item.id}>
                    <td><span className="profile-table-type-badge">{item.type}</span></td>
                    <td>{item.address}</td>
                    <td>{item.city}</td>
                    <td>{item.pincode}</td>
                    <td>
                      {item.isDefault ? (
                        <span className="profile-status-default">Default</span>
                      ) : (
                        <span className="profile-status-secondary">Standard</span>
                      )}
                    </td>
                    <td>
                      <div className="profile-table-actions">
                        <button 
                          className="profile-table-action-btn delete" 
                          onClick={() => handleDeleteAddress(item.id)}
                          title="Delete Address"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="profile-table-empty">No delivery addresses found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Address Modal */}
      {isAddressModalOpen && (
        <div className="profile-settings-modal-overlay">
          <div className="profile-settings-modal">
            <div className="profile-settings-modal-header">
              <div className="profile-settings-modal-title">
                <h2>Add Delivery Address</h2>
              </div>
              <button
                type="button"
                className="profile-settings-modal-close"
                onClick={() => setIsAddressModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleAddAddressSubmit}>
              <div className="profile-settings-modal-body">
                <div className="profile-settings-group" style={{ marginBottom: '12px' }}>
                  <label>Address Type</label>
                  <select 
                    value={newAddress.type} 
                    onChange={(e) => setNewAddress({...newAddress, type: e.target.value})}
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="profile-settings-group" style={{ marginBottom: '12px' }}>
                  <label>Street Address</label>
                  <input 
                    type="text" 
                    placeholder="Enter street address" 
                    value={newAddress.address} 
                    onChange={(e) => setNewAddress({...newAddress, address: e.target.value})}
                    required 
                  />
                </div>
                <div className="profile-settings-group" style={{ marginBottom: '12px' }}>
                  <label>City</label>
                  <input 
                    type="text" 
                    placeholder="Enter city" 
                    value={newAddress.city} 
                    onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    required 
                  />
                </div>
                <div className="profile-settings-group">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    placeholder="Enter pincode" 
                    value={newAddress.pincode} 
                    onChange={(e) => setNewAddress({...newAddress, pincode: e.target.value})}
                    required 
                  />
                </div>
              </div>

              <div className="profile-settings-modal-footer">
                <button
                  type="button"
                  className="profile-btn profile-btn-cancel"
                  onClick={() => setIsAddressModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="profile-btn profile-btn-save"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="profile-settings-modal-overlay">
          <div className="profile-settings-modal">
            <div className="profile-settings-modal-header">
              <div className="profile-settings-modal-title">
                <FiAlertTriangle className="profile-settings-alert-icon" />
                <h2>Delete Profile Details</h2>
              </div>
              <button
                type="button"
                className="profile-settings-modal-close"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                <FiX />
              </button>
            </div>

            <div className="profile-settings-modal-body">
              <p>
                Are you sure you want to delete your profile details? This action will reset all your saved personal information.
              </p>
            </div>

            <div className="profile-settings-modal-footer">
              <button
                type="button"
                className="profile-btn profile-btn-cancel"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="profile-btn profile-btn-confirm-delete"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;