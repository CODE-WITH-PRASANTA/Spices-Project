import React from 'react';
import './SalesOverview.css';

// Importing local images from assets folder
import turmericImg from '../../assets/haldi.png';
import corianderImg from '../../assets/coriander.webp';
import cuminImg from '../../assets/cardamom.webp';
import garamMasalaImg from '../../assets/garam masla.png';

const SalesOverview = () => {
  const products = [
    { name: "Turmeric Powder", sold: 254, img: turmericImg },
    { name: "Corriander Powder", sold: 198, img: corianderImg },
    { name: "Cumin Powder", sold: 176, img: cuminImg },
    { name: "Garam Masala", sold: 145, img: garamMasalaImg }
  ];

  return (
    <div className="so-dashboard-wrapper">
      
      {/* 1. Sales Overview Chart with Hover Effect */}
      <div className="so-card">
        <div className="so-card-header">
          <h3>Sales Overview</h3>
          <select className="so-dropdown">
            <option>This Week</option>
            <option>Last Week</option>
          </select>
        </div>
        
        <div className="so-chart-container">
          {/* Dynamic tooltip appears only on hover */}
          <div className="so-dynamic-tooltip">₹ 68,450</div>
          
          <div className="so-y-axis">
            <span>100K</span><span>80K</span><span>60K</span><span>40K</span><span>20K</span><span>0</span>
          </div>

          <div className="so-chart-body">
            <svg viewBox="0 0 700 200" className="so-svg-layer" preserveAspectRatio="none">
              <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
              </linearGradient>
              <path d="M0,160 C100,140 150,80 250,90 C350,100 400,40 500,60 C600,80 650,20 700,30 L700,200 L0,200 Z" fill="url(#grad1)" />
              <path d="M0,160 C100,140 150,80 250,90 C350,100 400,40 500,60 C600,80 650,20 700,30" fill="none" stroke="#22c55e" strokeWidth="4" />
            </svg>
            <div className="so-x-axis">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Selling Products */}
      <div className="so-card">
        <div className="so-card-header"><h3>Top Selling Products</h3></div>
        <div className="so-product-list">
          {products.map((item, i) => (
            <div key={i} className="so-product-item">
              <div className="so-product-info">
                <img src={item.img} alt={item.name} className="so-product-img" />
                <span className="so-product-name">{item.name}</span>
              </div>
              <span className="so-product-sold">{item.sold}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Order Status Donut Chart */}
      <div className="so-card">
        <div className="so-card-header"><h3>Order Status</h3></div>
        <div className="so-donut-container">
          <div className="so-donut">
            <div className="so-donut-inner">
              <h2>156</h2>
              <span>Total</span>
            </div>
          </div>
        </div>
        <div className="so-status-legend">
          {[
            { label: 'Delivered', val: '98 (62.8%)', color: '#22c55e' },
            { label: 'Processing', val: '30 (19.2%)', color: '#3b82f6' },
            { label: 'Shipped', val: '20 (12.8%)', color: '#f59e0b' },
            { label: 'Cancelled', val: '8 (5.2%)', color: '#a855f7' }
          ].map((s, i) => (
            <div key={i} className="so-status-row">
              <span className="so-status-label">
                <span className="dot" style={{background: s.color}}></span> {s.label}
              </span>
              <span className="so-status-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;