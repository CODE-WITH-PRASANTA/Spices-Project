import React from 'react';
import './BlendedTaste.css';

const BlendedTaste = () => {
  return (
    <section className="blended-taste">
      {/* Top Header Section */}
      <div className="bt-header">
        <h2 className="bt-main-title">A unique blended taste</h2>
        <p className="bt-subtitle">
          Pellentesque habitant morbi tristique senectus et netus et male.
        </p>
        <div className="bt-stars">
          <span className="bt-star filled">★</span>
          <span className="bt-star filled black">★</span>
          <span className="bt-star filled">★</span>
        </div>
      </div>

      {/* Content Blocks Container */}
      <div className="bt-content-container">
        
        {/* Block 1: Image Left, Text Right */}
        <div className="bt-block">
          <div className="bt-image-wrapper bt-bg-left">
            <img 
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
              alt="The finest spice arrangement" 
              className="bt-image"
            />
          </div>
          <div className="bt-text-wrapper">
            <h3 className="bt-block-title">The finest spice</h3>
            <p className="bt-description">
              Donec arcu purus, euismod nec eleifend et, luctus efficitur erat. 
              Pellentesque at justo porttitor quis ornare ante integer quis ornare ante. 
              Phasellus vel aliquam libero. Donec arcu purus, euismod nec eleifend et, 
              luctus efficitur erat. Pellentesque at justo porttitor quis ornare ante 
              integer quis ornare ante. Phasellus vel aliquam libero.
            </p>
          </div>
        </div>

        {/* Block 2: Text Left, Image Right */}
        <div className="bt-block bt-reverse">
          <div className="bt-text-wrapper">
            <h3 className="bt-block-title">The premium flavor</h3>
            <p className="bt-description">
              Pellentesque at justo porttitor quis ornare ante integer quis ornare ante. 
              Phasellus vel aliquam libero. Donec arcu purus, euismod nec eleifend et, 
              luctus efficitur erat. Pellentesque at justo porttitor quis ornare ante 
              integer quis ornare ante. Phasellus vel aliquam libero. Donec arcu purus, 
              euismod nec eleifend et, luctus efficitur erat.
            </p>
          </div>
          <div className="bt-image-wrapper bt-bg-right">
            <img 
             src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800" 
              alt="The Premium Flavour" 
              className="bt-image"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default BlendedTaste;