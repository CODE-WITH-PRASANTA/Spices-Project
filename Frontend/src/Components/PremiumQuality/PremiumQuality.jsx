import React from 'react';
import './PremiumQuality.css';
import { FaStar } from 'react-icons/fa';

// Import local images from your src/assets folder
import spicyMasalasImg from '../../assets/img 11.png';
import herbsMasalasImg from '../../assets/img12.png';
import mustardSeedsImg from '../../assets/img13.png';
import garamMasalasImg from '../../assets/img14.png';

const PremiumQuality = () => {
  const premiumProducts = [
    {
      id: 1,
      title: "Spicy Masalas",
      description: "Porem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: spicyMasalasImg
    },
    {
      id: 2,
      title: "Herbs Masalas",
      description: "Korem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: herbsMasalasImg
    },
    {
      id: 3,
      title: "Mustard Seeds",
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididuntLorem ipsum dolor sit amet sit era dicati..",
      image: mustardSeedsImg
    },
    {
      id: 4,
      title: "Garam Masalas",
      description: "Mirem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      image: garamMasalasImg
    }
  ];

  return (
    <div className="PremiumQualityContainer">
      
      {/* Component Header Block */}
      <div className="PremiumQualityHeader">
        <h1 className="PremiumQualityMainTitle">Premium Quality Products</h1>
        <p className="PremiumQualitySubtitle">At volutpat diam ut venenatis tellus in metus vulputate sit set ramet sagit.</p>
        <div className="PremiumQualityStarsRow">
          <FaStar className="PremiumQualityStarIcon" />
          <FaStar className="PremiumQualityStarIcon PremiumQualityStarCenter" />
          <FaStar className="PremiumQualityStarIcon" />
        </div>
      </div>

      {/* Grid Container */}
      <div className="PremiumQualityGrid">
        {premiumProducts.map((product) => (
          <div key={product.id} className="PremiumQualityCard">
            
            {/* Image Wrapper for Scaling Effect */}
            <div className="PremiumQualityImageWrapper">
              <img 
                src={product.image} 
                alt={product.title} 
                className="PremiumQualityImage" 
              />
            </div>

            {/* Content Details */}
            <div className="PremiumQualityContent">
              <h3 className="PremiumQualityCardTitle">{product.title}</h3>
              <p className="PremiumQualityCardDescription">{product.description}</p>
              <button className="PremiumQualityReadMoreBtn">Read more</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default PremiumQuality;