import React, { useState } from 'react';
import './MenuDetailsTwo.css';

const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Monsur Rahman Lito',
    rating: 2,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    name: 'Jake Johnson',
    rating: 3,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    name: 'John Doe',
    rating: 4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const ADDITIONAL_INFO_DATA = [
  { label: 'Cheese Burger', value: 'Small, Medium & Large' },
  { label: 'Toppings', value: 'Onion, Tomato, Olives' },
  { label: 'Rating', type: 'stars', value: 4 },
  { label: 'Shipping Charges', value: 'Free Shipping' },
  { label: 'Add More', value: 'Coke, Cheese, Choco lava' },
  { label: 'Delivery Time', value: '30 mins' },
];

const MenuDetailsTwo = () => {
  const [activeTab, setActiveTab] = useState('description');

  // Review Form States
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: authorName,
      rating: selectedRating || 5,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
      comment: reviewText,
    };

    setReviews([newEntry, ...reviews]);
    setAuthorName('');
    setAuthorEmail('');
    setReviewText('');
    setSelectedRating(0);
  };

  // Star Renderer
  const renderStars = (rating) => {
    return (
      <div className="menu-details-two__star-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`menu-details-two__star ${
              star <= rating
                ? 'menu-details-two__star--filled'
                : 'menu-details-two__star--empty'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="menu-details-two">
      <div className="menu-details-two__container">
        
        {/* Navigation Tabs Header */}
        <div className="menu-details-two__tabs-nav">
          <button
            type="button"
            className={`menu-details-two__tab-btn ${
              activeTab === 'description' ? 'menu-details-two__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('description')}
          >
            {/* Globe / Earth Icon */}
            <svg
              className="menu-details-two__tab-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <span>Description</span>
          </button>

          <button
            type="button"
            className={`menu-details-two__tab-btn ${
              activeTab === 'additional' ? 'menu-details-two__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('additional')}
          >
            {/* Layout / Details Icon */}
            <svg
              className="menu-details-two__tab-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>Additional Information</span>
          </button>

          <button
            type="button"
            className={`menu-details-two__tab-btn ${
              activeTab === 'review' ? 'menu-details-two__tab-btn--active' : ''
            }`}
            onClick={() => setActiveTab('review')}
          >
            {/* Cog / Review Icon */}
            <svg
              className="menu-details-two__tab-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            <span>Product Review</span>
          </button>
        </div>

        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="menu-details-two__tab-content">
            <p className="menu-details-two__text">
              There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which don't look
              even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't hidden in the middle of text.
            </p>
            <p className="menu-details-two__text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <ul className="menu-details-two__bullet-list">
              <li className="menu-details-two__bullet-item">
                <svg
                  className="menu-details-two__bullet-check"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="#73a436"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                  pain was born and I will give you a complete account of the system, and
                </span>
              </li>
              <li className="menu-details-two__bullet-item">
                <svg
                  className="menu-details-two__bullet-check"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M4 10.5L8 14.5L16 6"
                    stroke="#73a436"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                  been the industry's standard dummy text ever since the 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen book.
                </span>
              </li>
            </ul>
          </div>
        )}

        {/* Tab 2: Additional Information */}
        {activeTab === 'additional' && (
          <div className="menu-details-two__tab-content">
            <div className="menu-details-two__table-wrapper">
              <table className="menu-details-two__table">
                <tbody>
                  {ADDITIONAL_INFO_DATA.map((row, index) => (
                    <tr key={index} className="menu-details-two__table-row">
                      <td className="menu-details-two__table-cell menu-details-two__table-cell--label">
                        {row.label}
                      </td>
                      <td className="menu-details-two__table-cell menu-details-two__table-cell--value">
                        {row.type === 'stars' ? renderStars(row.value) : row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Product Review */}
        {activeTab === 'review' && (
          <div className="menu-details-two__tab-content">
            {/* Reviews List */}
            <div className="menu-details-two__reviews-list">
              {reviews.map((rev) => (
                <div key={rev.id} className="menu-details-two__review-card">
                  <div className="menu-details-two__avatar-wrapper">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="menu-details-two__review-avatar"
                    />
                  </div>
                  <div className="menu-details-two__review-body">
                    <h4 className="menu-details-two__reviewer-name">{rev.name}</h4>
                    {renderStars(rev.rating)}
                    <p className="menu-details-two__review-text">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Review Section */}
            <div className="menu-details-two__form-section">
              <div className="menu-details-two__form-heading-wrapper">
                <h3 className="menu-details-two__form-title">Add a review</h3>
                <div className="menu-details-two__title-bar">
                  <span className="menu-details-two__title-bar-dot"></span>
                  <span className="menu-details-two__title-bar-line"></span>
                </div>
              </div>

              <form onSubmit={handleReviewSubmit} className="menu-details-two__form">
                <div className="menu-details-two__input-row">
                  <input
                    type="text"
                    placeholder="Author"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="menu-details-two__input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="menu-details-two__input"
                    required
                  />
                </div>

                {/* Rating Input */}
                <div className="menu-details-two__rating-select">
                  <span className="menu-details-two__rating-label">Your Rating</span>
                  <div className="menu-details-two__stars-picker">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`menu-details-two__picker-star ${
                          star <= (hoveredRating || selectedRating)
                            ? 'menu-details-two__picker-star--filled'
                            : ''
                        }`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setSelectedRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                {/* Review Textarea */}
                <textarea
                  placeholder="Type Review Here"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="menu-details-two__textarea"
                  rows={6}
                  required
                ></textarea>

                {/* Submit Button */}
                <div className="menu-details-two__form-actions">
                  <button type="submit" className="menu-details-two__submit-btn">
                    Submit Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MenuDetailsTwo;