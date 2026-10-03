import React, { useState } from 'react';
import './DashboardThree.css';

const ORDERS_DATA = [
  {
    id: '#1085',
    customer: 'Rahul Das',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    items: 'Chicken Burger x2',
    amount: 320,
    status: 'Delivered',
    date: '29 Sep, 10:32 AM',
  },
  {
    id: '#1084',
    customer: 'Priya Sahu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    items: 'Paneer Wrap x1',
    amount: 180,
    status: 'Preparing',
    date: '29 Sep, 10:15 AM',
  },
  {
    id: '#1083',
    customer: 'Amit Kumar',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    items: 'Chicken Roll x2',
    amount: 260,
    status: 'Pending',
    date: '29 Sep, 09:45 AM',
  },
  {
    id: '#1082',
    customer: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    items: 'Veg Burger x1',
    amount: 150,
    status: 'Delivered',
    date: '29 Sep, 09:20 AM',
  },
  {
    id: '#1081',
    customer: 'Rakesh Rout',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    items: 'Combo Meal x1',
    amount: 420,
    status: 'Cancelled',
    date: '29 Sep, 08:55 AM',
  },
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Sunny Mishra',
    initial: 'S',
    avatarBg: '#0f766e',
    rating: 5,
    comment: 'Amazing food and great service! Loved the chicken roll.',
    time: '2 hours ago',
  },
  {
    id: 2,
    name: 'Priya Patel',
    initial: 'P',
    avatarBg: '#16a34a',
    rating: 5,
    comment: 'Fresh ingredients and excellent taste. Highly recommend!',
    time: '5 hours ago',
  },
  {
    id: 3,
    name: 'Rohan Das',
    initial: 'R',
    avatarBg: '#0d9488',
    rating: 4,
    comment: 'Good food, quick delivery. Will order again!',
    time: '1 day ago',
  },
  {
    id: 4,
    name: 'Anita Sahu',
    initial: 'A',
    avatarBg: '#65a30d',
    rating: 5,
    comment: 'Best burgers in town! 😍',
    time: '2 days ago',
  },
];

const DashboardThree = () => {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleActionMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'dashboard-three-status--delivered';
      case 'preparing':
        return 'dashboard-three-status--preparing';
      case 'pending':
        return 'dashboard-three-status--pending';
      case 'cancelled':
        return 'dashboard-three-status--cancelled';
      default:
        return '';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`dashboard-three-star ${
          i < rating ? 'dashboard-three-star--filled' : 'dashboard-three-star--empty'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="dashboard-three-wrapper">
      <div className="dashboard-three-grid">

        {/* ========================================================
            CARD 1: RECENT ORDERS
        ======================================================== */}
        <section className="dashboard-three-card dashboard-three-orders-card">
          {/* Card Header */}
          <div className="dashboard-three-card-header">
            <div className="dashboard-three-title-wrap">
              <span className="dashboard-three-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <h2 className="dashboard-three-card-title">Recent Orders</h2>
            </div>

            <button type="button" className="dashboard-three-action-pill-btn">
              <span>View All Orders</span>
              <svg className="dashboard-three-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Table Container (Never overflows or causes browser scroll) */}
          <div className="dashboard-three-table-responsive">
            <table className="dashboard-three-table">
              <thead>
                <tr>
                  <th className="dashboard-three-th th-col-id">#</th>
                  <th className="dashboard-three-th th-col-customer">Customer</th>
                  <th className="dashboard-three-th th-col-items">Items</th>
                  <th className="dashboard-three-th th-col-amount">Amount</th>
                  <th className="dashboard-three-th th-col-status">Status</th>
                  <th className="dashboard-three-th th-col-date">Date</th>
                  <th className="dashboard-three-th th-col-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {ORDERS_DATA.map((order) => (
                  <tr key={order.id} className="dashboard-three-tr">
                    <td className="dashboard-three-td td-id">{order.id}</td>
                    <td className="dashboard-three-td td-customer">
                      <div className="dashboard-three-customer-flex">
                        <img
                          src={order.avatar}
                          alt={order.customer}
                          className="dashboard-three-customer-avatar"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100';
                          }}
                        />
                        <span className="dashboard-three-customer-name">{order.customer}</span>
                      </div>
                    </td>
                    <td className="dashboard-three-td td-items">{order.items}</td>
                    <td className="dashboard-three-td td-amount">₹ {order.amount}</td>
                    <td className="dashboard-three-td td-status">
                      <span className={`dashboard-three-badge ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="dashboard-three-td td-date">{order.date}</td>
                    <td className="dashboard-three-td td-action">
                      <div className="dashboard-three-action-menu-wrap">
                        <button
                          type="button"
                          className="dashboard-three-dots-btn"
                          onClick={() => toggleActionMenu(order.id)}
                          aria-label="More options"
                        >
                          •••
                        </button>

                        {activeMenuId === order.id && (
                          <div className="dashboard-three-dropdown-popup">
                            <button
                              type="button"
                              className="dashboard-three-dropdown-row"
                              onClick={() => setActiveMenuId(null)}
                            >
                              View Details
                            </button>
                            <button
                              type="button"
                              className="dashboard-three-dropdown-row"
                              onClick={() => setActiveMenuId(null)}
                            >
                              Print Receipt
                            </button>
                            <button
                              type="button"
                              className="dashboard-three-dropdown-row text-danger"
                              onClick={() => setActiveMenuId(null)}
                            >
                              Cancel Order
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================
            CARD 2: RECENT CUSTOMER REVIEWS
        ======================================================== */}
        <section className="dashboard-three-card dashboard-three-reviews-card">
          {/* Header */}
          <div className="dashboard-three-card-header">
            <div className="dashboard-three-title-wrap">
              <span className="dashboard-three-header-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <h2 className="dashboard-three-card-title">Recent Customer Reviews</h2>
            </div>

            <button type="button" className="dashboard-three-action-pill-btn">
              <span>View All</span>
              <svg className="dashboard-three-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Reviews List */}
          <div className="dashboard-three-reviews-container">
            {REVIEWS_DATA.map((rev) => (
              <div key={rev.id} className="dashboard-three-review-card">
                <div
                  className="dashboard-three-avatar-badge"
                  style={{ backgroundColor: rev.avatarBg }}
                >
                  {rev.initial}
                </div>

                <div className="dashboard-three-review-body">
                  <div className="dashboard-three-review-headline">
                    <div className="dashboard-three-author-rating">
                      <span className="dashboard-three-author-text">{rev.name}</span>
                      <div className="dashboard-three-stars-row">
                        {renderStars(rev.rating)}
                      </div>
                    </div>
                    <span className="dashboard-three-timestamp">{rev.time}</span>
                  </div>
                  <p className="dashboard-three-comment-text">{rev.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardThree;