import React, { useState } from 'react';
import './DashboardTwo.css';

const STATS_DATA = {
  'Last 7 Days': [
    { date: '23 Sep', orders: 40, revenue: 29 },
    { date: '24 Sep', orders: 51, revenue: 64 },
    { date: '25 Sep', orders: 37, revenue: 43 },
    { date: '26 Sep', orders: 32, revenue: 32 },
    { date: '27 Sep', orders: 51, revenue: 35 },
    { date: '28 Sep', orders: 48, revenue: 64 },
    { date: '29 Sep', orders: 42, revenue: 57 },
  ],
  'Last 30 Days': [
    { date: 'Week 1', orders: 65, revenue: 72 },
    { date: 'Week 2', orders: 74, revenue: 80 },
    { date: 'Week 3', orders: 58, revenue: 62 },
    { date: 'Week 4', orders: 79, revenue: 76 },
  ],
  'This Month': [
    { date: '01-08', orders: 48, revenue: 54 },
    { date: '09-16', orders: 58, revenue: 65 },
    { date: '17-24', orders: 68, revenue: 74 },
    { date: '25-30', orders: 55, revenue: 62 },
  ],
};

const ORDER_STATUS_DATA = [
  { id: 'delivered', label: 'Delivered', count: 72, percent: 56, color: '#10b981' },
  { id: 'preparing', label: 'Preparing', count: 28, percent: 22, color: '#f97316' },
  { id: 'pending', label: 'Pending', count: 18, percent: 14, color: '#f59e0b' },
  { id: 'cancelled', label: 'Cancelled', count: 10, percent: 8, color: '#ef4444' },
];

const TOP_PRODUCTS = [
  {
    id: 1,
    name: "Sattu",
    orders: 120,
    price: 9600,
    img: "https://www.shutterstock.com/image-photo/sattu-flour-bowl-well-known-1860012235",
  },

  {
    id: 2,
    name: "Sooji",
    orders: 95,
    price: 7600,
    img: "https://image.cdn.shpy.in/394829/Wheat-Semolina-1-01-1725503032851.jpeg?format=webp",
  },

  {
    id: 3,
    name: "Rice Flour",
    orders: 78,
    price: 6240,
    img: "https://5.imimg.com/data5/SELLER/Default/2025/6/518167694/TS/MH/ZS/181743242/1kg-rice-flour-powder-500x500.jpg",
  },

  {
    id: 4,
    name: "Sabudana",
    orders: 65,
    price: 4550,
    img: "https://bharatmasala.net/cdn/shop/files/Sabudana-01.png?v=1746140888&width=1445",
  },

  {
    id: 5,
    name: "Chana Besan",
    orders: 60,
    price: 3900,
    img: "https://africamarket.us/cdn/shop/files/237.png?v=1759006285&width=1024",
  },
];

const DashboardTwo = () => {
  const [filterPeriod, setFilterPeriod] = useState('Last 7 Days');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredStatus, setHoveredStatus] = useState(null);

  const currentStats = STATS_DATA[filterPeriod] || STATS_DATA['Last 7 Days'];
  const totalOrders = ORDER_STATUS_DATA.reduce((acc, curr) => acc + curr.count, 0);

  // SVG Donut calculation
  const radius = 62;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;

  let cumulativeAngle = 0;
  const segments = ORDER_STATUS_DATA.map((status) => {
    const strokeDasharray = `${(status.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((cumulativeAngle / 100) * circumference);
    cumulativeAngle += status.percent;
    return {
      ...status,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="dashboard-two-container">
      <div className="dashboard-two-grid">
        
        {/* ========================================================
            CARD 1: ORDER STATISTICS
        ======================================================== */}
        <section className="dashboard-two-card dashboard-two-stats-card">
          {/* Header */}
          <div className="dashboard-two-card-header">
            <div className="dashboard-two-title-wrap">
              <span className="dashboard-two-title-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </span>
              <h2 className="dashboard-two-heading">Order Statistics</h2>
            </div>

            {/* Filter Dropdown */}
            <div className="dashboard-two-dropdown">
              <button
                type="button"
                className="dashboard-two-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>{filterPeriod}</span>
                <svg
                  className={`dashboard-two-dropdown-arrow ${dropdownOpen ? 'open' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="dashboard-two-dropdown-list">
                  {Object.keys(STATS_DATA).map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`dashboard-two-dropdown-option ${filterPeriod === item ? 'active' : ''}`}
                      onClick={() => {
                        setFilterPeriod(item);
                        setDropdownOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="dashboard-two-chart-legend">
            <div className="dashboard-two-legend-pill">
              <span className="dashboard-two-legend-swatch orders" />
              <span>Orders</span>
            </div>
            <div className="dashboard-two-legend-pill">
              <span className="dashboard-two-legend-swatch revenue" />
              <span>Revenue</span>
            </div>
          </div>

          {/* Bar Chart Area */}
          <div className="dashboard-two-chart-surface">
            {/* Horizontal Grid lines */}
            <div className="dashboard-two-grid-scaffold">
              {[80, 60, 40, 20, 0].map((level) => (
                <div key={level} className="dashboard-two-scaffold-row">
                  <span className="dashboard-two-y-label">{level}</span>
                  <div className="dashboard-two-scaffold-line" />
                </div>
              ))}
            </div>

            {/* Interactive Bars */}
            <div className="dashboard-two-bars-stage">
              {currentStats.map((item) => {
                const max = 80;
                const ordersHeight = Math.min((item.orders / max) * 100, 100);
                const revenueHeight = Math.min((item.revenue / max) * 100, 100);

                return (
                  <div
                    key={item.date}
                    className="dashboard-two-bar-cluster"
                    onMouseEnter={() => setHoveredBar(item)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Hover Floating Tooltip */}
                    {hoveredBar?.date === item.date && (
                      <div className="dashboard-two-popover">
                        <span className="dashboard-two-popover-date">{item.date}</span>
                        <div className="dashboard-two-popover-item">
                          <span className="dashboard-two-popover-dot orders" />
                          <span>Orders: <strong>{item.orders}</strong></span>
                        </div>
                        <div className="dashboard-two-popover-item">
                          <span className="dashboard-two-popover-dot revenue" />
                          <span>Revenue: <strong>₹{item.revenue}k</strong></span>
                        </div>
                      </div>
                    )}

                    {/* The Two Bars */}
                    <div className="dashboard-two-dual-stems">
                      <div
                        className="dashboard-two-stem orders"
                        style={{ height: `${ordersHeight}%` }}
                      />
                      <div
                        className="dashboard-two-stem revenue"
                        style={{ height: `${revenueHeight}%` }}
                      />
                    </div>

                    {/* Bottom Date Label */}
                    <span className="dashboard-two-x-label">{item.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 2: ORDER STATUS (Compact & Space Balanced)
        ======================================================== */}
        <section className="dashboard-two-card dashboard-two-status-card">
          {/* Header */}
          <div className="dashboard-two-card-header">
            <div className="dashboard-two-title-wrap">
              <span className="dashboard-two-title-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h2 className="dashboard-two-heading">Order Status</h2>
            </div>
          </div>

          {/* Main Visual Row: Donut + Legend */}
          <div className="dashboard-two-donut-content">
            {/* SVG Donut */}
            <div className="dashboard-two-donut-box">
              <svg className="dashboard-two-donut-svg" viewBox="0 0 170 170">
                <g transform="rotate(-90 85 85)">
                  {segments.map((seg) => {
                    const isHover = hoveredStatus?.id === seg.id;
                    return (
                      <circle
                        key={seg.id}
                        cx="85"
                        cy="85"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth={isHover ? strokeWidth + 4 : strokeWidth}
                        strokeDasharray={seg.strokeDasharray}
                        strokeDashoffset={seg.strokeDashoffset}
                        className="dashboard-two-donut-arc"
                        onMouseEnter={() => setHoveredStatus(seg)}
                        onMouseLeave={() => setHoveredStatus(null)}
                      />
                    );
                  })}
                </g>
              </svg>

              {/* Center Counter */}
              <div className="dashboard-two-donut-inner">
                <span className="dashboard-two-inner-value">
                  {hoveredStatus ? hoveredStatus.count : totalOrders}
                </span>
                <span className="dashboard-two-inner-label">
                  {hoveredStatus ? hoveredStatus.label : 'Total Orders'}
                </span>
                {hoveredStatus && (
                  <span className="dashboard-two-inner-pct">({hoveredStatus.percent}%)</span>
                )}
              </div>
            </div>

            {/* Status Legend Breakdown */}
            <div className="dashboard-two-status-legend-col">
              {ORDER_STATUS_DATA.map((item) => {
                const isActive = hoveredStatus?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`dashboard-two-status-badge ${isActive ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredStatus(item)}
                    onMouseLeave={() => setHoveredStatus(null)}
                  >
                    <div className="dashboard-two-badge-name-group">
                      <span
                        className="dashboard-two-badge-dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="dashboard-two-badge-label">{item.label}</span>
                    </div>
                    <div className="dashboard-two-badge-metrics">
                      <strong className="dashboard-two-badge-count">{item.count}</strong>
                      <span className="dashboard-two-badge-share">({item.percent}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick-Stats Bottom Ribbon (Eliminates dead empty space) */}
          <div className="dashboard-two-status-footer">
            <div className="dashboard-two-footer-stat">
              <span className="dashboard-two-footer-title">Completion Rate</span>
              <span className="dashboard-two-footer-metric text-green">56.2%</span>
            </div>
            <div className="dashboard-two-footer-divider" />
            <div className="dashboard-two-footer-stat">
              <span className="dashboard-two-footer-title">In Kitchen</span>
              <span className="dashboard-two-footer-metric text-orange">28 Orders</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 3: TOP SELLING ITEMS
        ======================================================== */}
        <section className="dashboard-two-card dashboard-two-products-card">
          {/* Header */}
          <div className="dashboard-two-card-header">
            <div className="dashboard-two-title-wrap">
              <span className="dashboard-two-title-icon flame-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 23c6.075 0 11-4.925 11-11 0-4.045-2.18-7.581-5.441-9.508a.75.75 0 0 0-1.127.766c.272 2.128-.27 4.185-1.558 5.769-.328.404-.925.394-1.258-.016-.867-1.071-1.39-2.39-1.528-3.79a.75.75 0 0 0-1.157-.563C8.428 6.446 7 9.07 7 12c0 1.25.32 2.428.885 3.454.265.481-.027 1.073-.574 1.134a4.48 4.48 0 0 1-2.091-.328.75.75 0 0 0-.962.99C5.452 20.354 8.484 23 12 23z" />
                </svg>
              </span>
              <h2 className="dashboard-two-heading">Top Selling Items</h2>
            </div>
          </div>

          {/* Products List */}
          <div className="dashboard-two-products-list">
            {TOP_PRODUCTS.map((prod) => (
              <div key={prod.id} className="dashboard-two-product-row">
                <div className="dashboard-two-product-info">
                  <div className="dashboard-two-thumb">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=80';
                      }}
                    />
                  </div>
                  <div className="dashboard-two-meta">
                    <h4 className="dashboard-two-item-title">{prod.name}</h4>
                    <span className="dashboard-two-item-sub">{prod.orders} orders</span>
                  </div>
                </div>

                <div className="dashboard-two-item-revenue">
                  ₹ {prod.price.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DashboardTwo;