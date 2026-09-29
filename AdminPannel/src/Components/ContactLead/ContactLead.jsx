import React, { useState, useMemo } from 'react';
import './ContactLead.css';

const INITIAL_LEADS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765 43210',
    message: 'Interested in bulk purchase of turmeric powder.',
    source: 'Website',
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
    message: 'Need pricing details for red chilli powder.',
    source: 'Instagram',
    status: 'Contacted',
    date: '11 Nov 2024',
    time: '04:18 PM',
    color: '#4f46e5'
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit.verma@gmail.com',
    phone: '+91 99887 66554',
    message: 'Looking for wholesale distributor opportunities.',
    source: 'Referral',
    status: 'Converted',
    date: '10 Nov 2024',
    time: '11:05 AM',
    color: '#16a34a'
  },
  {
    id: 4,
    name: 'Sneha Kapoor',
    email: 'sneha.kapoor@yahoo.com',
    phone: '+91 91234 56789',
    message: 'Would like to know about your masala range.',
    source: 'Website',
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
    message: 'Interested in private labeling options.',
    source: 'Facebook',
    status: 'Contacted',
    date: '08 Nov 2024',
    time: '09:14 AM',
    color: '#2563eb'
  },
  {
    id: 6,
    name: 'Neha Patel',
    email: 'neha.patel@gmail.com',
    phone: '+91 78787 34343',
    message: 'Need samples of garam masala and cumin powder.',
    source: 'Website',
    status: 'New',
    date: '07 Nov 2024',
    time: '05:26 PM',
    color: '#9333ea'
  },
  {
    id: 7,
    name: 'Rohit Jain',
    email: 'rohit.jain@outlook.com',
    phone: '+91 96655 77889',
    message: 'Can you share your product catalogue?',
    source: 'Google',
    status: 'Contacted',
    date: '06 Nov 2024',
    time: '12:11 PM',
    color: '#0891b2'
  },
  {
    id: 8,
    name: 'Kavita Desai',
    email: 'kavita.desai@gmail.com',
    phone: '+91 94567 82341',
    message: 'Interested in online reseller partnership.',
    source: 'Instagram',
    status: 'Converted',
    date: '05 Nov 2024',
    time: '03:36 PM',
    color: '#e11d48'
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

const ContactLead = () => {
  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedSource, setSelectedSource] = useState('All Source');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedLeadIds, setSelectedLeadIds] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 8;

  // Modal States
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'view' | 'delete'
  const [currentLead, setCurrentLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    source: 'Website',
    status: 'New'
  });

  const stats = useMemo(() => {
    return { total: 42, newCount: 12, contacted: 18, converted: 8 };
  }, []);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery);

      const matchStatus =
        selectedStatus === 'All Status' || lead.status === selectedStatus;

      const matchSource =
        selectedSource === 'All Source' || lead.source === selectedSource;

      return matchSearch && matchStatus && matchSource;
    });
  }, [leads, searchQuery, selectedStatus, selectedSource]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeadIds(filteredLeads.map((l) => l.id));
    } else {
      setSelectedLeadIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      source: 'Website',
      status: 'New'
    });
    setModalType('add');
  };

  const handleOpenView = (lead) => {
    setCurrentLead(lead);
    setModalType('view');
  };

  const handleOpenEdit = (lead) => {
    setCurrentLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: lead.source,
      status: lead.status
    });
    setModalType('edit');
  };

  const handleOpenDelete = (lead) => {
    setCurrentLead(lead);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setCurrentLead(null);
  };

  const handleSaveLead = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newEntry = {
        id: Date.now(),
        ...formData,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        }),
        time: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        color: '#' + Math.floor(Math.random() * 16777215).toString(16)
      };
      setLeads([newEntry, ...leads]);
    } else if (modalType === 'edit' && currentLead) {
      setLeads(
        leads.map((l) => (l.id === currentLead.id ? { ...l, ...formData } : l))
      );
    }
    closeModal();
  };

  const confirmDelete = () => {
    if (currentLead) {
      setLeads(leads.filter((l) => l.id !== currentLead.id));
      setSelectedLeadIds((prev) => prev.filter((id) => id !== currentLead.id));
    }
    closeModal();
  };

  return (
    <div className="contact-lead-wrapper">
      <div className="contact-lead-container">
        {/* ================= 1. STATS METRICS ================= */}
        <div className="contact-lead-stats-grid">
          {/* Total Leads */}
          <div className="contact-lead-stat-card">
            <div className="contact-lead-stat-left">
              <div className="contact-lead-stat-icon-badge gold-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="contact-lead-stat-info">
                <span className="contact-lead-stat-label">Total Leads</span>
                <span className="contact-lead-stat-value">{stats.total}</span>
              </div>
            </div>
            <div className="contact-lead-stat-trend">
              <span className="contact-lead-trend-pct">▲ +12%</span>
              <span className="contact-lead-trend-sub">this month</span>
            </div>
          </div>

          {/* New Leads */}
          <div className="contact-lead-stat-card">
            <div className="contact-lead-stat-left">
              <div className="contact-lead-stat-icon-badge ruby-badge">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div className="contact-lead-stat-info">
                <span className="contact-lead-stat-label">New Leads</span>
                <span className="contact-lead-stat-value">{stats.newCount}</span>
              </div>
            </div>
            <div className="contact-lead-stat-trend">
              <span className="contact-lead-trend-pct">▲ +8%</span>
              <span className="contact-lead-trend-sub">this week</span>
            </div>
          </div>

          {/* Contacted */}
          <div className="contact-lead-stat-card">
            <div className="contact-lead-stat-left">
              <div className="contact-lead-stat-icon-badge bronze-badge">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <div className="contact-lead-stat-info">
                <span className="contact-lead-stat-label">Contacted</span>
                <span className="contact-lead-stat-value">{stats.contacted}</span>
              </div>
            </div>
            <div className="contact-lead-stat-trend">
              <span className="contact-lead-trend-pct">▲ +5%</span>
              <span className="contact-lead-trend-sub">this week</span>
            </div>
          </div>

          {/* Converted */}
          <div className="contact-lead-stat-card">
            <div className="contact-lead-stat-left">
              <div className="contact-lead-stat-icon-badge green-badge">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </svg>
              </div>
              <div className="contact-lead-stat-info">
                <span className="contact-lead-stat-label">Converted</span>
                <span className="contact-lead-stat-value">{stats.converted}</span>
              </div>
            </div>
            <div className="contact-lead-stat-trend">
              <span className="contact-lead-trend-pct">▲ +33%</span>
              <span className="contact-lead-trend-sub">this month</span>
            </div>
          </div>
        </div>

        {/* ================= 2. TOOLBAR CONTROLS ================= */}
        <div className="contact-lead-toolbar">
          <div className="contact-lead-toolbar-left">
            <div className="contact-lead-search-box">
              <svg className="contact-lead-search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="contact-lead-search-input"
              />
            </div>

            {/* Status Selector */}
            <div className="contact-lead-select-wrapper">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="contact-lead-select"
              >
                <option value="All Status">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>
              <span className="contact-lead-select-arrow">▼</span>
            </div>

            {/* Source Selector */}
            <div className="contact-lead-select-wrapper">
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="contact-lead-select"
              >
                <option value="All Source">All Source</option>
                <option value="Website">Website</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Google">Google</option>
                <option value="Referral">Referral</option>
              </select>
              <span className="contact-lead-select-arrow">▼</span>
            </div>

            {/* Embossed Gold Calendar */}
            <div className="contact-lead-calendar-wrapper">
              <button
                type="button"
                className="contact-lead-calendar-btn"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
                </svg>
                <span>
                  {dateRange.start && dateRange.end
                    ? `${dateRange.start} - ${dateRange.end}`
                    : 'Select Date Range'}
                </span>
              </button>

              {showDatePicker && (
                <div className="contact-lead-calendar-popover">
                  <div className="contact-lead-popover-header">
                    <span>Select Date Range</span>
                    <button
                      type="button"
                      className="contact-lead-popover-close"
                      onClick={() => setShowDatePicker(false)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="contact-lead-popover-body">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, start: e.target.value })
                      }
                      className="contact-lead-date-field"
                    />
                    <label>End Date</label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) =>
                        setDateRange({ ...dateRange, end: e.target.value })
                      }
                      className="contact-lead-date-field"
                    />
                  </div>
                  <div className="contact-lead-popover-footer">
                    <button
                      type="button"
                      className="contact-lead-popover-reset"
                      onClick={() => setDateRange({ start: '', end: '' })}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className="contact-lead-popover-apply"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Apply Range
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= 3. LEADS TABLE ================= */}
        <div className="contact-lead-table-container">
          <table className="contact-lead-table">
            <thead>
              <tr>
                <th className="contact-lead-th-checkbox">
                  <label className="contact-lead-checkbox-container">
                    <input
                      type="checkbox"
                      checked={
                        filteredLeads.length > 0 &&
                        selectedLeadIds.length === filteredLeads.length
                      }
                      onChange={handleSelectAll}
                    />
                    <span className="contact-lead-checkmark"></span>
                  </label>
                </th>
                <th className="contact-lead-th-num">#</th>
                <th className="contact-lead-th-name">Name</th>
                <th className="contact-lead-th-contact">Contact</th>
                <th className="contact-lead-th-msg">Message</th>
                <th className="contact-lead-th-source">Source</th>
                <th className="contact-lead-th-status">Status</th>
                <th className="contact-lead-th-date">Date</th>
                <th className="contact-lead-th-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="9" className="contact-lead-empty-cell">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, index) => {
                  const isChecked = selectedLeadIds.includes(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className={`contact-lead-row ${isChecked ? 'row-selected' : ''}`}
                    >
                      {/* Checkbox */}
                      <td className="contact-lead-td-checkbox">
                        <label className="contact-lead-checkbox-container">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleSelectOne(lead.id)}
                          />
                          <span className="contact-lead-checkmark"></span>
                        </label>
                      </td>

                      {/* Number */}
                      <td className="contact-lead-td-num">{index + 1}</td>

                      {/* Avatar & Name */}
                      <td className="contact-lead-td-name">
                        <div className="contact-lead-name-cell">
                          <div
                            className="contact-lead-avatar"
                            style={{ backgroundColor: lead.color }}
                          >
                            {getInitials(lead.name)}
                          </div>
                          <span className="contact-lead-name-text">
                            {lead.name}
                          </span>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="contact-lead-td-contact">
                        <div className="contact-lead-contact-block">
                          <span className="contact-lead-email">{lead.email}</span>
                          <span className="contact-lead-phone">{lead.phone}</span>
                        </div>
                      </td>

                      {/* Message */}
                      <td className="contact-lead-td-msg">
                        <p className="contact-lead-msg-text" title={lead.message}>
                          {lead.message}
                        </p>
                      </td>

                      {/* Source */}
                      <td className="contact-lead-td-source">
                        <span
                          className={`contact-lead-source-tag source-${lead.source.toLowerCase()}`}
                        >
                          {lead.source}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="contact-lead-td-status">
                        <span
                          className={`contact-lead-status-pill status-${lead.status.toLowerCase()}`}
                        >
                          {lead.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="contact-lead-td-date">
                        <div className="contact-lead-date-block">
                          <span className="contact-lead-date">{lead.date}</span>
                          <span className="contact-lead-time">{lead.time}</span>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="contact-lead-td-actions">
                        <div className="contact-lead-action-btns">
                          <button
                            type="button"
                            title="View Lead"
                            className="contact-lead-action-btn view"
                            onClick={() => handleOpenView(lead)}
                          >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            title="Edit Lead"
                            className="contact-lead-action-btn edit"
                            onClick={() => handleOpenEdit(lead)}
                          >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </button>

                          <button
                            type="button"
                            title="Delete Lead"
                            className="contact-lead-action-btn delete"
                            onClick={() => handleOpenDelete(lead)}
                          >
                            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
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
        <div className="contact-lead-pagination-container">
          <div className="contact-lead-pagination-info">
            Showing 1 to {filteredLeads.length} of {stats.total} leads
          </div>

          <div className="contact-lead-pagination-controls">
            <button
              type="button"
              className="contact-lead-page-nav"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ❮
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                className={`contact-lead-page-btn ${
                  currentPage === pageNum ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button
              type="button"
              className="contact-lead-page-nav"
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
        <div className="contact-lead-modal-backdrop" onClick={closeModal}>
          <div
            className="contact-lead-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* View Lead Details */}
            {modalType === 'view' && currentLead && (
              <div className="contact-lead-modal-content">
                <div className="contact-lead-modal-header">
                  <h3 className="modal-title-view">Lead Details</h3>
                  <button className="contact-lead-close-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="contact-lead-modal-body details-view">
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{currentLead.name}</span>
                  </div>
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{currentLead.email}</span>
                  </div>
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{currentLead.phone}</span>
                  </div>
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Source:</span>
                    <span className="detail-value">{currentLead.source}</span>
                  </div>
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value">{currentLead.status}</span>
                  </div>
                  <div className="contact-lead-detail-row">
                    <span className="detail-label">Date & Time:</span>
                    <span className="detail-value">
                      {currentLead.date} at {currentLead.time}
                    </span>
                  </div>
                  <div className="contact-lead-detail-row column">
                    <span className="detail-label">Message:</span>
                    <p className="detail-message-box">{currentLead.message}</p>
                  </div>
                </div>
                <div className="contact-lead-modal-footer">
                  <button
                    type="button"
                    className="contact-lead-btn-close"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Add / Edit Form Modal */}
            {(modalType === 'add' || modalType === 'edit') && (
              <form onSubmit={handleSaveLead} className="contact-lead-modal-content">
                <div className="contact-lead-modal-header">
                  <h3 className="modal-title-view">
                    {modalType === 'add' ? 'Add New Lead' : 'Edit Lead'}
                  </h3>
                  <button
                    type="button"
                    className="contact-lead-close-btn"
                    onClick={closeModal}
                  >
                    ✕
                  </button>
                </div>
                <div className="contact-lead-modal-body">
                  <div className="contact-lead-form-group">
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
                  <div className="contact-lead-form-grid">
                    <div className="contact-lead-form-group">
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
                    <div className="contact-lead-form-group">
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
                  <div className="contact-lead-form-grid">
                    <div className="contact-lead-form-group">
                      <label>Source</label>
                      <select
                        value={formData.source}
                        onChange={(e) =>
                          setFormData({ ...formData, source: e.target.value })
                        }
                      >
                        <option value="Website">Website</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="Referral">Referral</option>
                      </select>
                    </div>
                    <div className="contact-lead-form-group">
                      <label>Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                      </select>
                    </div>
                  </div>
                  <div className="contact-lead-form-group">
                    <label>Message / Inquiries</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Enter lead message or customer requirements..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="contact-lead-modal-footer">
                  <button
                    type="button"
                    className="contact-lead-btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="contact-lead-btn-submit">
                    {modalType === 'add' ? 'Save Lead' : 'Update Lead'}
                  </button>
                </div>
              </form>
            )}

            {/* Delete Modal */}
            {modalType === 'delete' && currentLead && (
              <div className="contact-lead-modal-content">
                <div className="contact-lead-modal-header danger-header">
                  <h3 className="modal-title-danger">Delete Lead</h3>
                  <button className="contact-lead-close-btn" onClick={closeModal}>
                    ✕
                  </button>
                </div>
                <div className="contact-lead-modal-body">
                  <p className="delete-alert-text">
                    Are you sure you want to permanently delete lead for{' '}
                    <strong>{currentLead.name}</strong>?
                  </p>
                  <span className="delete-sub-text">
                    This action cannot be undone.
                  </span>
                </div>
                <div className="contact-lead-modal-footer">
                  <button
                    type="button"
                    className="contact-lead-btn-cancel"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="contact-lead-btn-danger"
                    onClick={confirmDelete}
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

export default ContactLead;