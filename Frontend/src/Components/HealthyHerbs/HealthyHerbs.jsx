import React, { useState } from 'react';
import './HealthyHerbs.css';

// Import your background asset directly from your src/assets folder
import healthyHerbsBg from '../../assets/bg3.jpg';

const HealthyHerbs = () => {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <section 
      className="healthy-herbs" 
      style={{ backgroundImage: `url(${healthyHerbsBg})` }}
    >
      <div className="healthy-herbs__container">
        <div className="healthy-herbs__content-box">
          <span className="healthy-herbs__tagline">Healthy Herbs</span>
          
          <h1 className="healthy-herbs__main-title">
            Get 10% off <br />
            On all Spicy & Herbs
          </h1>
          
          <p className="healthy-herbs__description">
            Lorem ipsum has become the industry standard for design mockups and prototypes. 
            By adding a little bit of Latin to a mockup.
          </p>
          
          <div className="healthy-herbs__action-row">
            <button 
              className={`healthy-herbs__btn ${activeButton === 'view-more' ? 'healthy-herbs__btn--active' : ''}`}
              onClick={() => setActiveButton('view-more')}
            >
              View more
            </button>
            <button 
              className={`healthy-herbs__btn ${activeButton === 'shop-now' ? 'healthy-herbs__btn--active' : ''}`}
              onClick={() => setActiveButton('shop-now')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthyHerbs;