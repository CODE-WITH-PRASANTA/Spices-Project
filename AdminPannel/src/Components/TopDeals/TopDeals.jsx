import React from 'react';
import './TopDeals.css';

const StatCard = ({ label, value, trend, trendValue, iconBg, icon, customClass, svgPath }) => (
  <div className={`td-card ${customClass}`}>
    <div className="td-card-top">
      <div className="td-icon" style={{ backgroundColor: iconBg }}>{icon}</div>
      <span className="td-label">{label}</span>
    </div>
    <div className="td-value">{value}</div>
    <div className={`td-trend ${trend === 'up' ? 'up' : 'down'}`}>
      {trend === 'up' ? '↑' : '↓'} {trendValue} from yesterday
    </div>
    
    {/* SVG Chart Hill */}
    <svg className="td-chart" viewBox="0 0 100 40">
      <path d={svgPath} />
    </svg>
  </div>
);

const TopDeals = () => {
  // Unique paths for each card's "hill"
  const paths = {
    sales: "M0,30 Q20,10 40,25 T80,10 T100,20",
    orders: "M0,35 Q25,5 50,30 T100,5",
    customers: "M0,25 Q20,35 40,10 T80,25 T100,15",
    stock: "M0,20 Q20,5 40,30 T80,10 T100,25"
  };

  return (
    <div className="td-dashboard-container">
      <div className="td-header">
        <div>
          <h1 className="td-title">Dashboard</h1>
          <p className="td-subtitle">Welcome back, Admin! Here's what's happening with your store today.</p>
        </div>
        <input type="date" className="td-date-picker" defaultValue="2026-07-14" />
      </div>

      <div className="td-card-grid">
        <StatCard customClass="sales" label="Total Sales" value="₹ 84,250" trend="up" trendValue="18.5%" iconBg="#22c55e" icon="$" svgPath={paths.sales} />
        <StatCard customClass="orders" label="Total Orders" value="156" trend="up" trendValue="12.3%" iconBg="#3b82f6" icon="🛒" svgPath={paths.orders} />
        <StatCard customClass="customers" label="Total Customers" value="2,450" trend="up" trendValue="8.7%" iconBg="#f59e0b" icon="👥" svgPath={paths.customers} />
        <StatCard customClass="stock" label="Low Stock Items" value="12" trend="down" trendValue="4" iconBg="#a855f7" icon="📦" svgPath={paths.stock} />
      </div>
    </div>
  );
};

export default TopDeals;