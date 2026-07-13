import React from 'react';
import './ClientWords.css';

const ClientWords = () => {
  const testimonials = [
    {
      id: 1,
      text: "Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Ac felis donec et odio pellentesque diam volutpat. Justo nec ultrices dui sapien eget mi proin sed libero. Purus ut faucibus pulvinar elementum inte.",
      rating: 4, // 4 out of 5 stars
      name: "Johanna",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 2,
      text: "Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Ac felis donec et odio pellentesque diam volutpat. Justo nec ultrices dui sapien eget mi proin sed libero. Purus ut faucibus pulvinar elementum inte.",
      rating: 3, // 3 out of 5 stars
      name: "Charlotte",
      role: "Professor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      id: 3,
      text: "Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Ac felis donec et odio pellentesque diam volutpat. Justo nec ultrices dui sapien eget mi proin sed libero. Purus ut faucibus pulvinar elementum inte.",
      rating: 5, // 5 out of 5 stars
      name: "Maximilian",
      role: "Developer",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  // Helper function to render exact star ratings matching the UI image
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`cw-card-star ${i <= rating ? 'filled' : 'empty'}`}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <section className="client-words">
      {/* Component Main Header Section */}
      <div className="cw-header">
        <h2 className="cw-main-title">Our Client Words</h2>
        <p className="cw-subtitle">Pellentesque at justo porttitor quis</p>
        <div className="cw-header-stars">
          <span className="cw-h-star">★</span>
          <span className="cw-h-star black">★</span>
          <span className="cw-h-star">★</span>
        </div>
      </div>

      {/* Testimonials Grid Row */}
      <div className="cw-grid">
        {testimonials.map((item) => (
          <div key={item.id} className="cw-card">
            <p className="cw-card-text">{item.text}</p>
            
            <div className="cw-card-rating">
              {renderStars(item.rating)}
            </div>

            <div className="cw-user-profile">
              <img src={item.image} alt={item.name} className="cw-user-avatar" />
              <div className="cw-user-info">
                <span className="cw-user-name">{item.name}</span>
                <span className="cw-user-divider">-</span>
                <span className="cw-user-role">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientWords;