import React, { useState, useMemo } from 'react';
import './Enquires.css';

const INITIAL_ENQUIRES = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    subject: 'Product Inquiry',
    message: 'Interested in bulk purchase of turmeric powd...',
    status: 'New',
    date: '12 Nov 2024',
    time: '10:32 AM',
    color: '#d97706'
  },
  {
    id: 2,
    name: 'Priya Mehta',
    email: 'priya.mehta@outlook.com',
    phone: '+91 87654 32109',
    subject: 'Order Inquiry',
    message: 'Need pricing details for red chilli powder.',
    status: 'In Progress',
    date: '11 Nov 2024',
    time: '04:18 PM',
    color: '#4f46e5'
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit.verma@gmail.com',
    phone: '+91 99887 66554',
    subject: 'Product Availability',
    message: 'Looking for wholesale distributor opportuniti...',
    status: 'Resolved',
    date: '10 Nov 2024',
    time: '11:05 AM',
    color: '#16a34a'
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    email: 'sneha.kapoor@yahoo.com',
    phone: '+91 91234 56789',
    subject: 'Franchise Inquiry',
    message: 'Would like to know about your masala range.',
    status: 'New',
    date: '09 Nov 2024',
    time: '02:47 PM',
    color: '#db2777'
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@icloud.com',
    phone: '+91 90011 22334',
    subject: 'General Inquiry',
    message: 'Interested in private labeling options.',
    status: 'In Progress',
    date: '08 Nov 2024',
    time: '09:14 AM',
    color: '#2563eb'
  },
  {
    id: 6,
    name: 'Neha Patel',
    email: 'neha.patel@gmail.com',
    phone: '+91 78787 34343',
    subject: 'Return/Exchange',
    message: 'Need samples of garam masala and cumin powder.',
    status: 'Resolved',
    date: '07 Nov 2024',
    time: '05:26 PM',
    color: '#9333ea'
  },
  {
    id: 7,
    name: 'Rohit Jain',
    email: 'rohit.jain@outlook.com',
    phone: '+91 96655 77889',
    subject: 'Corporate Order',
    message: 'We need monthly supply for our restaurant chain...',
    status: 'In Progress',
    date: '06 Nov 2024',
    time: '12:11 PM',
    color: '#0891b2'
  },
  {
    id: 8,
    name: 'Kavita Desai',
    email: 'kavita.desai@gmail.com',
    phone: '+91 94567 82341',
    subject: 'Product Suggestion',
    message: 'Can you suggest the best masala for biryani?',
    status: 'New',
    date: '05 Nov 2024',
    time: '03:36 PM',
    color: '#e11d48'
  },
  {
    id: 9,
    name: 'Arjun Tiwari',
    email: 'arjun.tiwari@gmail.com',
    phone: '+91 81234 56790',
    subject: 'Price Inquiry',
    message: 'What is the price of 500g red chilli powder?',
    status: 'Resolved',
    date: '04 Nov 2024',
    time: '11:20 AM',
    color: '#ea580c'
  },
  {
    id: 10,
    name: 'Sunita Panda',
    email: 'sunita.panda@gmail.com',
    phone: '+91 78456 32987',
    subject: 'Delivery Inquiry',
    message: 'Please confirm if COD is available for my location.',
    status: 'In Progress',
    date: '03 Nov 2024',
    time: '04:05 PM',
    color: '#7c3aed'
  }
];

const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const getSubjectClassName = (subj) => {
  const map = {
    'Product Inquiry': 'subj-product',
    'Order Inquiry': 'subj-order',
    'Product Availability': 'subj-avail',
    'Franchise Inquiry': 'subj-franchise',
    'General Inquiry': 'subj-general',
    'Return/Exchange': 'subj-return',
    'Corporate Order': 'subj-corporate',
    'Product Suggestion': 'subj-suggestion',
    'Price Inquiry': 'subj-price',
    'Delivery Inquiry': 'subj-delivery'
  };
  return map[subj] || 'subj-default';
};

const Enquires = () => {
  const [enquires, setEnquires] = useState(INITIAL_ENQUIRES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSubject, setSelectedSubject] = useState('All Subject');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  // Modal State
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | 'delete'
  const [activeItem, setActiveItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Inquiry',
    message: '',
    status: 'New'
  });

  const stats = useMemo(() => {
    return {
      total: 36,
      newCount: 10,
      inProgress: 14,
      resolved: 12
    };
  }, []);

  const filteredEnquires = useMemo(() => {
    return enquires.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === 'All Status' || item.status === selectedStatus;

      const matchSubject =
        selectedSubject === 'All Subject' || item.subject === selectedSubject;

      return matchSearch && matchStatus && matchSubject;
    });
  }, [enquires, searchQuery, selectedStatus, selectedSubject]);

  // Checkbox Select Handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredEnquires.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Modals
  const handleOpenView = (item) => {
    setActiveItem(item);
    setModalType('view');
  };

  const handleOpenEdit = (item) => {
    setActiveItem(item);
    setFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject,
      message: item.message,
      status: item.status
    });
    setModalType('edit');
  };

  const handleOpenDelete = (item) => {
    setActiveItem(item);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setActiveItem(null);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (modalType === 'edit' && activeItem) {
      setEnquires(
        enquires.map((item) =>
          item.id === activeItem.id ? { ...item, ...formData } : item
        )
      );
    }
    closeModal();
  };

  const handleConfirmDelete = () => {
    if (activeItem) {
      setEnquires(enquires.filter((item) => item.id !== activeItem.id));
      setSelectedIds((prev) => prev.filter((id) => id !== activeItem.id));
    }
    closeModal();
  };

  return (
    <div className="enquires-wrapper">
      <div className="enquires-container">
        {/* ================= 1. STATS OVERVIEW ================= */}
        <div className="enquires-stats-grid">
          {/* Total Enquires */}
          <div className="enquires-stat-card">
            <div className="enquires-stat-left">
              <div className="enquires-stat-badge gold-badge">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="enquires-stat-info">
                <span className="enquires-stat-label">Total Enquires</span>
                <span className="enquires-stat-value">{stats.total}</span>
              </div>
            </div>
            <div className="enquires-stat-trend">
              <span className="enquires-trend-pct">▲ +12%</span>
              <span className="enquires-trend-sub">this month</span>
            </div>
          </div>

          {/* New Enquires */}
          <div className="enquires-stat-card">
            <div className="enquires-stat-left">
              <div className="enquires-stat-badge red-badge">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
              <div className="enquires-stat-info">
                <span className="enquires-stat-label">New Enquires</span>
                <span className="enquires-stat-value">{stats.newCount}</span>
              </div>
            </div>
            <div className="enquires-stat-trend">
              <span className="enquires-trend-pct">▲ +25%</span>
              <span className="enquires-trend-sub">this week</span>
            </div>
          </div>

          {/* In Progress */}
          <div className="enquires-stat-card">
            <div className="enquires-stat-left">
              <div className="enquires-stat-badge blue-badge">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </div>
              <div className="enquires-stat-info">
                <span className="enquires-stat-label">In Progress</span>
                <span className="enquires-stat-value">{stats.inProgress}</span>
              </div>
            </div>
            <div className="enquires-stat-trend">
              <span className="enquires-trend-pct">▲ +8%</span>
              <span className="enquires-trend-sub">this week</span>
            </div>
          </div>

          {/* Resolved */}
          <div className="enquires-stat-card">
            <div className="enquires-stat-left">
              <div className="enquires-stat-badge green-badge">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              </div>
              <div className="enquires-stat-info">
                <span className="enquires-stat-label">Resolved</span>
                <span className="enquires-stat-value">{stats.resolved}</span>
              </div>
            </div>
            <div className="enquires-stat-trend">
              <span className="enquires-trend-pct">▲ +50%</span>
              <span className="enquires-trend-sub">this month</span>
            </div>
          </div>
        </div>

        {/* ================= 2. TOOLBAR (NO ADD BUTTON) ================= */}
        <div className="enquires-toolbar">
          <div className="enquires-toolbar-left">
            {/* Search Box */}
            <div className="enquires-search-box">
              <svg className="enquires-search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="enquires-search-input"
              />
            </div>

            {/* Status Select */}
            <div className="enquires-select-wrapper">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="enquires-select"
              >
                <option value="All Status">All Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <span className="enquires-select-arrow">▼</span>
            </div>

            {/* Subject Select */}
            <div className="enquires-select-wrapper">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="enquires-select"
              >
                <option value="All Subject">All Subject</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Product Availability">Product Availability</option>
                <option value="Franchise Inquiry">Franchise Inquiry</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Return/Exchange">Return/Exchange</option>
                <option value="Corporate Order">Corporate Order</option>
                <option value="Product Suggestion">Product Suggestion</option>
                <option value="Price Inquiry">Price Inquiry</option>
                <option value="Delivery Inquiry">Delivery Inquiry</option>
              </select>
              <span className="enquires-select-arrow">▼</span>
            </div>

            {/* Embossed Calendar Range Selector */}
            <div className="enquires-calendar-wrapper">
              <button
                type="button"
                className="enquires-calendar-btn"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                </svg>
                <span>
                  {dateRange.start && dateRange.end
                    ? `${dateRange.start} - ${dateRange.end}`
                    : 'Select Date Range'}
                </span>
              </button>

              {showDatePicker && (
                <div className="enquires-calendar-popover">
                  <div className="enquires-popover-header">
                    <span>Choose Date Range</span>
                    <button
                      type="button"
                      className="enquires-popover-close"
                      onClick={() => setShowDatePicker(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="enquires-popover-body">
                    <label>From:</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="enquires-date-field"
                    />
                    <label>To:</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="enquires-date-field"
                    />
                  </div>
                  <div className="enquires-popover-footer">
                    <button
                      type="button"
                      className="enquires-popover-reset"
                      onClick={() => setDateRange({ start: '', end: '' })}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="enquires-popover-apply"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= 3. COMPACT DATA TABLE ================= */}
        <div className="enquires-table-container">
          <table className="enquires-table">
            <thead>
              <tr>
                <th className="enquires-th-checkbox">
                  <label className="enquires-checkbox-container">
                    <input
                      type="checkbox"
                      checked={
                        filteredEnquires.length > 0 &&
                        selectedIds.length === filteredEnquires.length
                      }
                      onChange={handleSelectAll}
                    />
                    <span className="enquires-checkmark"></span>
                  </label>
                </th>
                <th className="enquires-th-num">#</th>
                <th className="enquires-th-name">Name</th>
                <th className="enquires-th-contact">Contact</th>
                <th className="enquires-th-msg">Message</th>
                <th className="enquires-th-subject">Source</th>
                <th className="enquires-th-status">Status</th>
                <th className="enquires-th-date">Date</th>
                <th className="enquires-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnquires.length === 0 ? (
                <tr>
                  <td colSpan="9" className="enquires-empty-cell">
                    No enquires found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredEnquires.map((item, index) => {
                  const isChecked = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`enquires-row ${isChecked ? 'row-selected' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="enquires-td-checkbox">
                        <label className="enquires-checkbox-container">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(item.id)}
                          />
                          <span className="enquires-checkmark"></span>
                        </label>
                      </td>

                      {/* Number */}
                      <td className="enquires-td-num">{index + 1}</td>

                      {/* Avatar & Name */}
                      <td className="enquires-td-name">
                        <div className="enquires-name-cell">
                          <div
                            className="enquires-avatar"
                            style={{ backgroundColor: item.color }}
                          >
                            {getInitials(item.name)}
                          </div>
                          <span className="enquires-name-text">{item.name}</span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="enquires-td-contact">
                        <div className="enquires-contact-block">
                          <span className="enquires-email">{item.email}</span>
                          <span className="enquires-phone">{item.phone}</span>
                        </div>
                      </td>

                      {/* Message Snippet */}
                      <td className="enquires-td-msg">
                        <p className="enquires-msg-text" title={item.message}>
                          {item.message}
                        </p>
                      </td>

                      {/* Subject (Pill Tag) */}
                      <td className="enquires-td-subject">
                        <span
                          className={`enquires-subject-tag ${getSubjectClassName(
                            item.subject
                          )}`}
                        >
                          {item.subject}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="enquires-td-status">
                        <span
                          className={`enquires-status-pill status-${item.status
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="enquires-td-date">
                        <div className="enquires-date-block">
                          <span className="enquires-date">{item.date}</span>
                          <span className="enquires-time">{item.time}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="enquires-td-actions">
                        <div className="enquires-action-btns">
                          <button
                            type="button"
                            title="View Enquiry"
                            className="enquires-action-btn view"
                            onClick={() => handleOpenView(item)}
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            title="Edit Enquiry"
                            className="enquires-action-btn edit"
                            onClick={() => handleOpenEdit(item)}
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            title="Delete Enquiry"
                            className="enquires-action-btn delete"
                            onClick={() => handleOpenDelete(item)}
                          >
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ================= 4. PAGINATION ================= */}
        <div className="enquires-pagination-container">
          <div className="enquires-pagination-info">
            Showing 1 to {filteredEnquires.length} of {stats.total} enquires
          </div>

          <div className="enquires-pagination-controls">
            <button
              type="button"
              className="enquires-page-nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ❮
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`enquires-page-btn ${
                  currentPage === pageNum ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              className="enquires-page-nav"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      {/* ================= 5. POPUP MODALS ================= */}
      {modalType && (
        <div className="enquires-modal-backdrop" onClick={closeModal}>
          <div
            className="enquires-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* View Modal */}
            {modalType === 'view' && activeItem && (
              <div className="enquires-modal-content">
                <div className="enquires-modal-header">
                  <h3 className="modal-title-view">Enquiry Details</h3>
                  <button className="enquires-close-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="enquires-modal-body details-view">
                  <div className="enquires-detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{activeItem.name}</span>
                  </div>
                  <div className="enquires-detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{activeItem.email}</span>
                  </div>
                  <div className="enquires-detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{activeItem.phone}</span>
                  </div>
                  <div className="enquires-detail-row">
                    <span className="detail-label">Subject:</span>
                    <span className="detail-value">{activeItem.subject}</span>
                  </div>
                  <div className="enquires-detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{activeItem.status}</span>
                  </div>
                  <div className="enquires-detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">
                      {activeItem.date} at {activeItem.time}
                    </span>
                  </div>
                  <div className="enquires-detail-row column">
                    <span className="detail-label">Message:</span>
                    <p className="detail-message-box">{activeItem.message}</p>
                  </div>
                </div>
                <div className="enquires-modal-footer">
                  <button
                    type="button"
                    className="enquires-btn-close"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Edit Modal */}
            {modalType === 'edit' && activeItem && (
              <form onSubmit={handleSaveForm} className="enquires-modal-content">
                <div className="enquires-modal-header">
                  <h3 className="modal-title-view">Edit Enquiry</h3>
                  <button
                    type="button"
                    className="enquires-close-btn"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className="enquires-modal-body">
                  <div className="enquires-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="enquires-form-grid">
                    <div className="enquires-form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="enquires-form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="enquires-form-grid">
                    <div className="enquires-form-group">
                      <label>Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      >
                        <option value="Product Inquiry">Product Inquiry</option>
                        <option value="Order Inquiry">Order Inquiry</option>
                        <option value="Product Availability">Product Availability</option>
                        <option value="Franchise Inquiry">Franchise Inquiry</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Return/Exchange">Return/Exchange</option>
                        <option value="Corporate Order">Corporate Order</option>
                        <option value="Product Suggestion">Product Suggestion</option>
                        <option value="Price Inquiry">Price Inquiry</option>
                        <option value="Delivery Inquiry">Delivery Inquiry</option>
                      </select>
                    </div>
                    <div className="enquires-form-group">
                      <label>Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                      >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>
                  <div className="enquires-form-group">
                    <label>Enquiry Message</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Enter customer enquiry text or requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="enquires-modal-footer">
                  <button
                    type="button"
                    className="enquires-btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="enquires-btn-submit">
                    Update Enquiry
                  </button>
                </div>
              </form>
            )}

            {/* Delete Modal */}
            {modalType === 'delete' && activeItem && (
              <div className="enquires-modal-content">
                <div className="enquires-modal-header danger-header">
                  <h3 className="modal-title-danger">Delete Enquiry</h3>
                  <button className="enquires-close-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="enquires-modal-body">
                  <p className="delete-alert-text">
                    Are you sure you want to permanently delete the enquiry for{' '}
                    <strong>{activeItem.name}</strong>?
                  </p>
                  <span className="delete-sub-text">
                    This action cannot be undone.
                  </span>
                </div>
                <div className="enquires-modal-footer">
                  <button
                    type="button"
                    className="enquires-btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="enquires-btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Confirm Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Enquires;