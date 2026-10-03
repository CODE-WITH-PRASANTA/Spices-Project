import React, { useState } from 'react';
import { 
  FiShoppingBag, 
  FiTruck, 
  FiCheckCircle, 
  FiCreditCard, 
  FiChevronRight, 
  FiClock, 
  FiRotateCcw, 
  FiHeart, 
  FiMapPin, 
  FiHeadphones,
  FiSearch
} from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  // States for interactive features
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAllOrdersModal, setShowAllOrdersModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Mock data matching the UI reference
  const recentOrders = [
    { id: '#ORD12345', date: '18 May, 2025', items: '4 Items', amount: '₹528.00', status: 'Processing' },
    { id: '#ORD12221', date: '12 May, 2025', items: '3 Items', amount: '₹398.00', status: 'Delivered' },
    { id: '#ORD12110', date: '05 May, 2025', items: '2 Items', amount: '₹322.00', status: 'Delivered' },
    { id: '#ORD12005', date: '28 Apr, 2025', items: '1 Item', amount: '₹150.00', status: 'Delivered' },
    { id: '#ORD11984', date: '20 Apr, 2025', items: '5 Items', amount: '₹850.00', status: 'Cancelled' },
  ];

  // Handlers for interactive buttons
  const handleViewAllOrders = () => {
    setShowAllOrdersModal(true);
  };

  const handleTrackOrder = () => {
    alert("Navigating to live order tracking for #ORD12345...");
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleQuickAction = (actionType) => {
    switch(actionType) {
      case 'track':
        handleTrackOrder();
        break;
      case 'buy-again':
        alert("Opening your favorite items to reorder!");
        break;
      case 'wishlist':
        alert("Opening your saved wishlist items.");
        break;
      case 'address':
        alert("Opening address management settings.");
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-section">
        <h1 className="dashboard-welcome-title">
          Welcome back, Rahul! <span className="dashboard-wave-emoji">👋</span>
        </h1>
        <p className="dashboard-welcome-subtitle">Here's what's happening with your orders.</p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon-wrapper dashboard-orange-bg">
            <FiShoppingBag className="dashboard-stat-icon dashboard-orange-text" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-number">3</h3>
            <p className="dashboard-stat-label">Total Orders</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon-wrapper dashboard-blue-bg">
            <FiTruck className="dashboard-stat-icon dashboard-blue-text" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-number">1</h3>
            <p className="dashboard-stat-label">In Progress</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon-wrapper dashboard-green-bg">
            <FiCheckCircle className="dashboard-stat-icon dashboard-green-text" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-number">2</h3>
            <p className="dashboard-stat-label">Completed</p>
          </div>
        </div>

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon-wrapper dashboard-red-bg">
            <FiCreditCard className="dashboard-stat-icon dashboard-red-text" />
          </div>
          <div className="dashboard-stat-content">
            <h3 className="dashboard-stat-number">₹1,248</h3>
            <p className="dashboard-stat-label">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid Layout */}
      <div className="dashboard-main-grid">
        
        {/* Left Column (Current Order & Recent Orders) */}
        <div className="dashboard-left-column">
          
          {/* Current Order in Progress */}
          <div className="dashboard-card dashboard-current-order-card">
            <div className="dashboard-card-header">
              <h2 className="dashboard-card-title">Current Order in Progress</h2>
              <button className="dashboard-text-btn" onClick={handleViewAllOrders}>View All Orders</button>
            </div>

            <div className="dashboard-order-info-row">
              <div className="dashboard-product-img-box">
                <img 
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=200" 
                  alt="Spices seasoning" 
                  className="dashboard-product-img"
                />
              </div>
              <div className="dashboard-order-meta">
                <div className="dashboard-order-id-date">
                  <span className="dashboard-current-id">Order #ORD12345</span>
                  <span className="dashboard-status-badge dashboard-processing-badge">Processing</span>
                </div>
                <p className="dashboard-order-date-sub">18 May, 2025</p>
              </div>
            </div>

            {/* Timeline Progress Bar */}
            <div className="dashboard-timeline-container">
              <div className="dashboard-timeline-track">
                <div className="dashboard-timeline-fill"></div>
              </div>
              <div className="dashboard-timeline-steps">
                <div className="dashboard-step dashboard-step-completed">
                  <div className="dashboard-step-dot">✓</div>
                  <span className="dashboard-step-title">Order Placed</span>
                  <span className="dashboard-step-time">18 May, 10:30 AM</span>
                </div>
                <div className="dashboard-step dashboard-step-active">
                  <div className="dashboard-step-dot"></div>
                  <span className="dashboard-step-title">Processing</span>
                  <span className="dashboard-step-time">18 May, 11:15 AM</span>
                </div>
                <div className="dashboard-step">
                  <div className="dashboard-step-dot"></div>
                  <span className="dashboard-step-title">Shipped</span>
                  <span className="dashboard-step-time">-</span>
                </div>
                <div className="dashboard-step">
                  <div className="dashboard-step-dot"></div>
                  <span className="dashboard-step-title">Delivered</span>
                  <span className="dashboard-step-time">-</span>
                </div>
              </div>
            </div>

            {/* Preparation Banner */}
            <div className="dashboard-prep-banner">
              <div className="dashboard-prep-left">
                <div className="dashboard-prep-icon-box">
                  <FiTruck />
                </div>
                <div>
                  <h4 className="dashboard-prep-title">We are preparing your order</h4>
                  <p className="dashboard-prep-desc">It usually takes 1-2 days to ship your order.</p>
                </div>
              </div>
              <button className="dashboard-track-action-btn" onClick={handleTrackOrder}>
                Track Order <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Recent Orders Table Section */}
          <div className="dashboard-card dashboard-recent-orders-card">
            <h2 className="dashboard-card-title dashboard-mb-4">Recent Orders</h2>
            
            <div className="dashboard-table-responsive">
              <table className="dashboard-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 3).map((order, idx) => (
                    <tr key={idx}>
                      <td className="dashboard-bold-text">{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>{order.amount}</td>
                      <td>
                        <span className={`dashboard-status-badge ${order.status === 'Processing' ? 'dashboard-processing-badge' : order.status === 'Delivered' ? 'dashboard-delivered-badge' : 'dashboard-cancelled-badge'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button className="dashboard-table-view-btn" onClick={() => handleViewOrderDetails(order)}>
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="dashboard-center-btn-wrapper">
              <button className="dashboard-outline-btn" onClick={handleViewAllOrders}>
                View All Orders
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (Order Summary, Quick Actions, Support) */}
        <div className="dashboard-right-column">
          
          {/* Order Summary Card */}
          <div className="dashboard-card dashboard-summary-card">
            <h2 className="dashboard-card-title dashboard-mb-4">Order Summary</h2>
            
            <div className="dashboard-summary-row">
              <span className="dashboard-summary-label">Total Orders</span>
              <span className="dashboard-summary-value">3</span>
            </div>
            <div className="dashboard-summary-row">
              <span className="dashboard-summary-label">In Progress</span>
              <span className="dashboard-summary-value">1</span>
            </div>
            <div className="dashboard-summary-row">
              <span className="dashboard-summary-label">Completed</span>
              <span className="dashboard-summary-value">2</span>
            </div>
            <div className="dashboard-summary-row dashboard-mb-4">
              <span className="dashboard-summary-label">Cancelled</span>
              <span className="dashboard-summary-value">0</span>
            </div>

            <div className="dashboard-summary-divider"></div>

            <div className="dashboard-summary-total-row">
              <span className="dashboard-summary-total-label">Total Spent</span>
              <span className="dashboard-summary-total-amount">₹1,248.00</span>
            </div>

            <button className="dashboard-primary-block-btn" onClick={handleViewAllOrders}>
              View All Orders
            </button>
          </div>

          {/* Quick Actions Card */}
          <div className="dashboard-card dashboard-quick-actions-card">
            <h2 className="dashboard-card-title dashboard-mb-4">Quick Actions</h2>
            
            <div className="dashboard-action-item" onClick={() => handleQuickAction('track')}>
              <div className="dashboard-action-left">
                <div className="dashboard-action-icon-box">
                  <FiClock />
                </div>
                <div>
                  <h4 className="dashboard-action-title">Track Your Order</h4>
                  <p className="dashboard-action-desc">Track your current order status</p>
                </div>
              </div>
              <FiChevronRight className="dashboard-arrow-icon" />
            </div>

            <div className="dashboard-action-item" onClick={() => handleQuickAction('buy-again')}>
              <div className="dashboard-action-left">
                <div className="dashboard-action-icon-box">
                  <FiRotateCcw />
                </div>
                <div>
                  <h4 className="dashboard-action-title">Buy Again</h4>
                  <p className="dashboard-action-desc">Reorder your favorite items</p>
                </div>
              </div>
              <FiChevronRight className="dashboard-arrow-icon" />
            </div>

            <div className="dashboard-action-item" onClick={() => handleQuickAction('wishlist')}>
              <div className="dashboard-action-left">
                <div className="dashboard-action-icon-box">
                  <FiHeart />
                </div>
                <div>
                  <h4 className="dashboard-action-title">View Wishlist</h4>
                  <p className="dashboard-action-desc">See your saved items</p>
                </div>
              </div>
              <FiChevronRight className="dashboard-arrow-icon" />
            </div>

            <div className="dashboard-action-item" onClick={() => handleQuickAction('address')}>
              <div className="dashboard-action-left">
                <div className="dashboard-action-icon-box">
                  <FiMapPin />
                </div>
                <div>
                  <h4 className="dashboard-action-title">Update Address</h4>
                  <p className="dashboard-action-desc">Manage your delivery addresses</p>
                </div>
              </div>
              <FiChevronRight className="dashboard-arrow-icon" />
            </div>
          </div>

          {/* Need Help Card */}
          <div className="dashboard-card dashboard-help-card">
            <h2 className="dashboard-card-title">Need Help?</h2>
            <p className="dashboard-help-desc">We're here to help you!</p>
            
            <button className="dashboard-outline-block-btn" onClick={() => setShowContactModal(true)}>
              <FiHeadphones /> Contact Support
            </button>
          </div>

        </div>

      </div>

      {/* Modals for functionality preview */}
      {showAllOrdersModal && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <h3>All Orders</h3>
            <p>Here is your complete order list history.</p>
            <div className="dashboard-modal-table-container">
              <table className="dashboard-orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord, idx) => (
                    <tr key={idx}>
                      <td>{ord.id}</td>
                      <td>{ord.date}</td>
                      <td>{ord.items}</td>
                      <td>{ord.amount}</td>
                      <td><span className="dashboard-status-badge dashboard-processing-badge">{ord.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="dashboard-primary-block-btn" onClick={() => setShowAllOrdersModal(false)}>Close</button>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <h3>Order Details: {selectedOrder.id}</h3>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Items Count:</strong> {selectedOrder.items}</p>
            <p><strong>Total Amount:</strong> {selectedOrder.amount}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <button className="dashboard-primary-block-btn" onClick={() => setSelectedOrder(null)}>Close</button>
          </div>
        </div>
      )}

      {showContactModal && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-content">
            <h3>Contact Support</h3>
            <p>Our customer support team is available 24/7 to assist you with any questions regarding your delivery or account.</p>
            <button className="dashboard-primary-block-btn" onClick={() => setShowContactModal(false)}>Back to Dashboard</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;