import React from 'react';
import './AllProducts.css';

// Note: Ensure this image exists in your src/assets/ folder.
// You can use a dark spices-on-table style wallpaper image.
import backgroundBannerImg from '../../assets/bg5.jpg';

const AllProducts = () => {
  return (
    <div 
      className="AllProductsContainer"
      style={{ backgroundImage: `url(${backgroundBannerImg})` }}
    >
      <div className="AllProductsOverlay">
        <div className="AllProductsContent">
          <h3 className="AllProductsSubtitle">Cardamom / Clove / Cumin</h3>
          <h1 className="AllProductsTitle">50% OFF</h1>
          <p className="AllProductsHeading">ALL PRODUCTS</p>
          
          <div className="AllProductsBtnGroup">
            <button className="AllProductsBtn AllProductsBtnShop">Shop Now</button>
            <button className="AllProductsBtn AllProductsBtnView">View More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;