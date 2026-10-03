import React, { useState } from 'react';
import './BannerManagement.css';

// React Icons Imports
import { 
  FiImage, 
  FiEye, 
  FiPauseCircle, 
  FiRefreshCw, 
  FiPlus, 
  FiSearch, 
  FiEdit, 
  FiTrash2, 
  FiMoreVertical, 
  FiX, 
  FiUploadCloud,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

const INITIAL_BANNERS = [
  {
    id: 1,
    preview: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80',
    title: 'Spices Discount',
    subtitle: '15% OFF ON SPICES',
    status: 'Active',
    order: 1,
    views: '2.4K',
    device: 'All Devices',
    offer: '15% OFF ON SPICES',
    buttonText: 'Shop Now',
    buttonLink: '/shop'
  },
  {
    id: 2,
    preview: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=500&q=80',
    title: 'Organic Spices',
    subtitle: '100% ORGANIC SPICES',
    status: 'Active',
    order: 2,
    views: '3.1K',
    device: 'Desktop',
    offer: '100% ORGANIC SPICES',
    buttonText: 'Explore More',
    buttonLink: '/organic'
  },
  {
    id: 3,
    preview: 'https://images.unsplash.com/photo-1509358217973-883fe8a1a1e5?w=500&q=80',
    title: 'Handpicked Goodness',
    subtitle: 'FROM FARM TO YOU',
    status: 'Active',
    order: 3,
    views: '1.8K',
    device: 'Mobile',
    offer: 'FROM FARM TO YOU',
    buttonText: 'Buy Now',
    buttonLink: '/handpicked'
  },
  {
    id: 4,
    preview: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80',
    title: 'Taste the Tradition',
    subtitle: 'AUTHENTIC FLAVORS',
    status: 'Inactive',
    order: 4,
    views: '890',
    device: 'All Devices',
    offer: 'AUTHENTIC FLAVORS',
    buttonText: 'Order Now',
    buttonLink: '/tradition'
  },
  {
    id: 5,
    preview: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=500&q=80',
    title: 'New Arrivals',
    subtitle: 'EXOTIC SPICES',
    status: 'Inactive',
    order: 5,
    views: '1.2K',
    device: 'Tablet',
    offer: 'EXOTIC SPICES',
    buttonText: 'Check Out',
    buttonLink: '/new'
  }
];

const BannerManagement = () => {
  const [banners, setBanners] = useState(INITIAL_BANNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [deviceFilter, setDeviceFilter] = useState('All Devices');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    offer: '',
    buttonText: '',
    buttonLink: '',
    order: 6,
    status: 'Active',
    device: 'All Devices',
    preview: ''
  });

  // Calculate Metrics dynamically
  const totalBanners = banners.length;
  const activeBanners = banners.filter((b) => b.status === 'Active').length;
  const inactiveBanners = banners.filter((b) => b.status === 'Inactive').length;

  // Filter Banners
  const filteredBanners = banners.filter((banner) => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All Status' || banner.status === statusFilter;
    const matchesDevice =
      deviceFilter === 'All Devices' || banner.device === deviceFilter;

    return matchesSearch && matchesStatus && matchesDevice;
  });

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open Modal (Add or Edit)
  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({ ...banner });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        offer: '',
        buttonText: '',
        buttonLink: '',
        order: banners.length + 1,
        status: 'Active',
        device: 'All Devices',
        preview: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80'
      });
    }
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBanner) {
      setBanners((prev) =>
        prev.map((b) => (b.id === editingBanner.id ? { ...formData, id: b.id } : b))
      );
    } else {
      const newBanner = {
        ...formData,
        id: Date.now(),
        views: '0'
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    handleCloseModal();
  };

  // Delete Banner
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      setBanners((prev) => prev.filter((b) => b.id !== id));
      setActiveMenuId(null);
    }
  };

  // Toggle Three-Dot Action Menu
  const toggleMenu = (id) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="BannerManagement">
      {/* Header Bar */}
      <div className="BannerManagement-header">
        <div className="BannerManagement-titleSection">
          <h2>Hero Banner Management</h2>
          <p className="BannerManagement-breadcrumb">
            Dashboard <span>&gt;</span> Banner Management <span>&gt;</span> Hero Banners
          </p>
        </div>
        <button
          className="BannerManagement-addBtn"
          onClick={() => handleOpenModal()}
        >
          <FiPlus /> Add New Banner
        </button>
      </div>

      {/* Cards Metric Section */}
      <div className="BannerManagement-cardsGrid">
        <div className="BannerManagement-card">
          <div className="BannerManagement-cardIcon icon-green">
            <FiImage />
          </div>
          <div className="BannerManagement-cardContent">
            <p className="BannerManagement-cardLabel">Total Banners</p>
            <h3>{totalBanners}</h3>
            <span className="BannerManagement-cardSubtext">All Hero Banners</span>
          </div>
        </div>

        <div className="BannerManagement-card">
          <div className="BannerManagement-cardIcon icon-blue">
            <FiEye />
          </div>
          <div className="BannerManagement-cardContent">
            <p className="BannerManagement-cardLabel">Active Banners</p>
            <h3>{activeBanners}</h3>
            <span className="BannerManagement-cardSubtext">Currently Active</span>
          </div>
        </div>

        <div className="BannerManagement-card">
          <div className="BannerManagement-cardIcon icon-orange">
            <FiPauseCircle />
          </div>
          <div className="BannerManagement-cardContent">
            <p className="BannerManagement-cardLabel">Inactive Banners</p>
            <h3>{inactiveBanners}</h3>
            <span className="BannerManagement-cardSubtext">Currently Inactive</span>
          </div>
        </div>

        <div className="BannerManagement-card">
          <div className="BannerManagement-cardIcon icon-purple">
            <FiRefreshCw />
          </div>
          <div className="BannerManagement-cardContent">
            <p className="BannerManagement-cardLabel">Total Views</p>
            <h3>12.4K</h3>
            <span className="BannerManagement-cardSubtext">All Banner Views</span>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="BannerManagement-tableContainer">
        {/* Table Top Controls */}
        <div className="BannerManagement-tableHeader">
          <div className="BannerManagement-tableTitle">
            <h3>Banner List</h3>
            <p>Manage your hero section banners</p>
          </div>
          <div className="BannerManagement-filters">
            <select
              className="BannerManagement-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              className="BannerManagement-select"
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
            >
              <option value="All Devices">All Devices</option>
              <option value="Desktop">Desktop</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablet</option>
            </select>

            <div className="BannerManagement-searchBox">
              <input
                type="text"
                placeholder="Search banners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="BannerManagement-searchIcon" />
            </div>
          </div>
        </div>

        {/* Banners Table */}
        <div className="BannerManagement-responsiveTable">
          <table className="BannerManagement-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Banner Preview</th>
                <th>Title</th>
                <th>Subtitle</th>
                <th>Status</th>
                <th>Order</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.length > 0 ? (
                filteredBanners.map((banner, index) => (
                  <tr key={banner.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="BannerManagement-previewWrapper">
                        <img
                          src={banner.preview}
                          alt={banner.title}
                          className="BannerManagement-previewImg"
                        />
                      </div>
                    </td>
                    <td className="BannerManagement-boldText">{banner.title}</td>
                    <td className="BannerManagement-subtext">{banner.subtitle}</td>
                    <td>
                      <span
                        className={`BannerManagement-badge ${
                          banner.status === 'Active' ? 'badge-active' : 'badge-inactive'
                        }`}
                      >
                        {banner.status}
                      </span>
                    </td>
                    <td>{banner.order}</td>
                    <td>{banner.views}</td>
                    <td>
                      <div className="BannerManagement-actionsGroup">
                        <button
                          className="BannerManagement-actionBtn action-edit"
                          onClick={() => handleOpenModal(banner)}
                          title="Edit"
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="BannerManagement-actionBtn action-view"
                          title="View"
                        >
                          <FiEye />
                        </button>
                        <button
                          className="BannerManagement-actionBtn action-delete"
                          onClick={() => handleDelete(banner.id)}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>

                        <div className="BannerManagement-moreMenuWrapper">
                          <button
                            className="BannerManagement-actionBtn action-more"
                            onClick={() => toggleMenu(banner.id)}
                          >
                            <FiMoreVertical />
                          </button>
                          {activeMenuId === banner.id && (
                            <div className="BannerManagement-dropdownMenu">
                              <button onClick={() => handleOpenModal(banner)}>Edit Banner</button>
                              <button onClick={() => handleDelete(banner.id)}>Delete Banner</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px' }}>
                    No banners found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination */}
        <div className="BannerManagement-tableFooter">
          <p className="BannerManagement-entriesText">
            Showing 1 to {filteredBanners.length} of {banners.length} entries
          </p>
          <div className="BannerManagement-pagination">
            <button
              className="BannerManagement-pageBtn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <FiChevronLeft />
            </button>
            <button className="BannerManagement-pageBtn active">1</button>
            <button
              className="BannerManagement-pageBtn"
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div className="BannerManagement-modalOverlay">
          <div className="BannerManagement-modal">
            <div className="BannerManagement-modalHeader">
              <h3>{editingBanner ? 'Edit Banner' : 'Add New Banner'}</h3>
              <button
                className="BannerManagement-closeBtn"
                onClick={handleCloseModal}
              >
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="BannerManagement-form">
              <div className="BannerManagement-formRow">
                <div className="BannerManagement-formGroup">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder="Enter banner title"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="BannerManagement-formGroup">
                  <label>Subtitle *</label>
                  <input
                    type="text"
                    name="subtitle"
                    required
                    placeholder="Enter banner subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Upload Drop Zone */}
              <div className="BannerManagement-formGroup">
                <label>Banner Image *</label>
                <div className="BannerManagement-uploadBox">
                  <FiUploadCloud className="BannerManagement-uploadIcon" />
                  <p className="BannerManagement-uploadTitle">
                    Click to upload banner image
                  </p>
                  <p className="BannerManagement-uploadSubtitle">or drag and drop</p>
                  <span className="BannerManagement-uploadInfo">
                    JPG, PNG or WEBP (max. 2MB)
                  </span>
                  <span className="BannerManagement-uploadInfo">
                    Recommended size: 1920 x 600px
                  </span>
                </div>
              </div>

              <div className="BannerManagement-formRow">
                <div className="BannerManagement-formGroup">
                  <label>Offer / Tag (Optional)</label>
                  <input
                    type="text"
                    name="offer"
                    placeholder="e.g. 15% OFF ON SPICES"
                    value={formData.offer}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="BannerManagement-formGroup">
                  <label>Button Text (Optional)</label>
                  <input
                    type="text"
                    name="buttonText"
                    placeholder="e.g. Shop Now"
                    value={formData.buttonText}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="BannerManagement-formRow">
                <div className="BannerManagement-formGroup">
                  <label>Button Link (Optional)</label>
                  <input
                    type="text"
                    name="buttonLink"
                    placeholder="e.g. /shop"
                    value={formData.buttonLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="BannerManagement-formGroup">
                  <label>Display Order *</label>
                  <input
                    type="number"
                    name="order"
                    required
                    value={formData.order}
                    onChange={handleInputChange}
                  />
                  <small className="BannerManagement-helperText">
                    Lower number shows first
                  </small>
                </div>
              </div>

              <div className="BannerManagement-formRow">
                <div className="BannerManagement-formGroup">
                  <label>Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="BannerManagement-formGroup">
                  <label>Devices</label>
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleInputChange}
                  >
                    <option value="All Devices">All Devices</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Tablet">Tablet</option>
                  </select>
                </div>
              </div>

              <div className="BannerManagement-modalActions">
                <button
                  type="button"
                  className="BannerManagement-cancelBtn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="BannerManagement-submitBtn">
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;