import React, { useState, useEffect } from 'react';
import './DashboardOne.css';

// Running number counter hook
const useCountUp = (target, duration = 1500) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Smooth cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(easeProgress * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return value;
};

// Precise wave line matching the reference image exactly
const DashboardOneWave = ({ color, id }) => {
  return (
    <div className="dashboard-one-wave-container">
      <svg
        viewBox="0 0 110 50"
        className="dashboard-one-wave-svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`dashboard-one-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="60%" stopColor={color} stopOpacity="0.10" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Gradient shadow under wave */}
        <path
          d="M 6 42 
             C 16 38, 22 28, 32 28 
             C 42 28, 48 40, 58 40 
             C 68 40, 76 18, 86 18 
             C 94 18, 98 28, 104 20 
             L 104 50 L 6 50 Z"
          fill={`url(#dashboard-one-grad-${id})`}
        />

        {/* Foreground curved wave stroke */}
        <path
          className="dashboard-one-wave-stroke"
          d="M 6 42 
             C 16 38, 22 28, 32 28 
             C 42 28, 48 40, 58 40 
             C 68 40, 76 18, 86 18 
             C 94 18, 98 28, 104 20"
          fill="none"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

// Stat Card Component
const DashboardOneCard = ({
  id,
  theme,
  icon,
  title,
  prefix = '',
  targetNumber,
  percentage,
  waveColor,
}) => {
  const animatedNumber = useCountUp(targetNumber);

  return (
    <div className={`dashboard-one-card dashboard-one-card--${theme}`}>
      {/* Top Left: Icon Badge */}
      <div className={`dashboard-one-icon-badge dashboard-one-icon-badge--${theme}`}>
        {icon}
      </div>

      {/* Middle: Title & Main Number */}
      <div className="dashboard-one-info-block">
        <span className="dashboard-one-card-title">{title}</span>
        <h3 className="dashboard-one-card-number">
          {prefix}
          {animatedNumber.toLocaleString('en-IN')}
        </h3>
      </div>

      {/* Bottom Row: Percentage and Wave chart side-by-side */}
      <div className="dashboard-one-bottom-row">
        <div className="dashboard-one-trend-group">
          <span className="dashboard-one-trend-percentage">
            +{percentage}%
            <svg
              className="dashboard-one-trend-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
          <span className="dashboard-one-trend-label">from last week</span>
        </div>

        {/* The Exact Organic Wave */}
        <DashboardOneWave color={waveColor} id={id} />
      </div>
    </div>
  );
};

const DashboardOne = () => {
  const cardsData = [
    {
      id: 'orders',
      theme: 'orders',
      title: 'Total Orders',
      targetNumber: 128,
      percentage: 12,
      waveColor: '#16a34a',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
    },
    {
      id: 'revenue',
      theme: 'revenue',
      title: 'Total Revenue',
      prefix: '₹ ',
      targetNumber: 24580,
      percentage: 18,
      waveColor: '#f97316',
      icon: <span className="dashboard-one-rupee-sign">₹</span>,
    },
    {
      id: 'customers',
      theme: 'customers',
      title: 'Total Customers',
      targetNumber: 856,
      percentage: 10,
      waveColor: '#16a34a',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: 'reviews',
      theme: 'reviews',
      title: 'Total Reviews',
      targetNumber: 320,
      percentage: 6,
      waveColor: '#ef4444',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="dashboard-one-wrapper">
      

      {/* Grid of 4 Cards */}
      <div className="dashboard-one-grid">
        {cardsData.map((card) => (
          <DashboardOneCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default DashboardOne;