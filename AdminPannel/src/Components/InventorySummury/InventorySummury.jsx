import React from 'react';
import './InventorySummury.css';

const InventorySummury = () => {
  // Inventory Data
  const inventoryData = [
    { title: "Total Products", count: 320, color: "#22c55e", bg: "#f0fdf4", icon: "📦" },
    { title: "In Stock", count: 268, color: "#f59e0b", bg: "#fffbeb", icon: "📦" },
    { title: "Low Stock", count: 12, color: "#ef4444", bg: "#fef2f2", icon: "🔥" },
    { title: "Out of Stock", count: 8, color: "#8b5cf6", bg: "#f5f3ff", icon: "🛍️" },
  ];

  // Recent Orders Data
  const recentOrders = [
    { id: "#ORD1245", customer: "Rahul Singh", amount: "₹1,250", status: "Delivered", statusColor: "green" },
    { id: "#ORD1244", customer: "Priya Sharma", amount: "₹850", status: "Processing", statusColor: "blue" },
    { id: "#ORD1243", customer: "Amit Verma", amount: "₹1,450", status: "Shipped", statusColor: "orange" },
    { id: "#ORD1242", customer: "Neha Kapoor", amount: "₹675", status: "Delivered", statusColor: "green" },
  ];

  return (
    <div className="is-dashboard-container">
      {/* Inventory Summary Section */}
      <section className="is-card">
        <div className="is-card-header">
          <h3>Inventory Summary</h3>
          <span className="is-view-all">View All</span>
        </div>
        
        <div className="is-grid">
          {inventoryData.map((item, i) => (
            <div key={i} className="is-item" style={{ background: item.bg }}>
              <span className="is-icon">{item.icon}</span>
              <p className="is-title">{item.title}</p>
              <h2 className="is-count" style={{ color: item.color }}>{item.count}</h2>
            </div>
          ))}
        </div>

        <div className="is-status-section">
          <p>Inventory Status</p>
          <div className="is-progress-bar">
            <div className="is-progress-fill" style={{ width: '83%' }}></div>
            <span className="is-percentage">83%</span>
          </div>
        </div>
      </section>

      {/* Recent Orders Section */}
      <section className="ro-card">
        <div className="ro-card-header">
          <h3>Recent Orders</h3>
          <span className="ro-view-all">View All</span>
        </div>
        
        <table className="ro-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, i) => (
              <tr key={i}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`ro-status-pill ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td>10:30 AM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default InventorySummury;