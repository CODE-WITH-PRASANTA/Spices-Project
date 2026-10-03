import React from 'react';
import './ChifeHome.css';

const features = [
  {
    id: 1,
    title: '100% Pure & Natural',
    desc: 'Carefully selected ingredients with no unnecessary artificial colours, fillers, or compromises — bringing the natural goodness of everyday essentials to your kitchen.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Traditional Milling',
    desc: 'Inspired by traditional food preparation, our products are processed with care to retain their natural taste, aroma, texture, and wholesome goodness.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Hygienic Packaging',
    desc: 'Every product is packed with attention to cleanliness and freshness, using reliable packaging designed to protect quality from our facility to your home.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Trusted Direct Supply',
    desc: 'From everyday kitchen essentials to bulk requirements, Palash Essence focuses on dependable quality, careful handling, and consistent customer service.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 18H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1" />
        <path d="M14 9h4l3 4v4a1 1 0 0 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M2 11h5" />
      </svg>
    )
  }
];

const ChifeHome = () => {
  return (
    <section className="chife-home">
      {/* Background ambient lighting */}
      <div className="chife-home__bg-pattern" aria-hidden="true">
        <div className="chife-home__glow-sphere chife-home__glow-sphere--1" />
        <div className="chife-home__glow-sphere chife-home__glow-sphere--2" />
      </div>

      <div className="chife-home__inner">

        {/* Header */}
        <header className="chife-home__header">

          <div className="chife-home__badge">
            <span className="chife-home__dot" />
            <span>The Palash Essence Standard</span>
          </div>

          <h2 className="chife-home__title">
            Why Choose <em>Palash Essence?</em>
          </h2>

          <p className="chife-home__subtitle">
            Bringing carefully selected everyday essentials to your kitchen
            with a focus on purity, traditional goodness, freshness, and
            dependable quality.
          </p>

          <div className="chife-home__divider" />

        </header>

        {/* Feature Cards */}
        <div className="chife-home__grid">

          {features.map((item) => (
            <article
              key={item.id}
              className="chife-home__card"
            >
              <div className="chife-home__card-highlight" />

              <div className="chife-home__icon-wrapper">
                <div className="chife-home__icon-ring" />

                <div className="chife-home__icon">
                  {item.icon}
                </div>
              </div>

              <h3 className="chife-home__card-title">
                {item.title}
              </h3>

              <p className="chife-home__card-desc">
                {item.desc}
              </p>
            </article>
          ))}

        </div>

        {/* Small Brand Content */}
        <div className="chife-home__brand-note">
          <span className="chife-home__brand-line" />

          <div className="chife-home__brand-content">
            <span className="chife-home__brand-small">
              From our care to your kitchen
            </span>

            <strong>PALASH ESSENCE</strong>

            <span className="chife-home__brand-small">
              Pure • Fresh • Trusted
            </span>
          </div>

          <span className="chife-home__brand-line" />
        </div>

      </div>
    </section>
  );
};

export default ChifeHome;