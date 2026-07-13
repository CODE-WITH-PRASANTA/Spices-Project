import React from "react";
import "./Flavour.css";

// Note: Ensure these images exist in your src/assets/ folder.
// You can also change the extensions (.jpg, .png, etc.) to match your actual files.
import haldiImg from "../../assets/turmeric.jpg";
import garamMasalaImg from "../../assets/garam masla.png";
import dhaniyaImg from "../../assets/dhaniya.png";
import jeeraImg from "../../assets/jeera.png";
import heroBgImg from "../../assets/bg2.jpg"; // Background for the left banner

const Flavour = () => {
  const spiceProducts = [
    {
      id: 1,
      name: "Haldi",
      image: haldiImg,
    },
    {
      id: 2,
      name: "Jeera",
      image: jeeraImg,
    },
    {
      id: 3,
      name: "Dhaniya",
      image: dhaniyaImg,
    },
    {
      id: 4,
      name: "Garam Masala",
      image: garamMasalaImg,
    },
  ];

  return (
    <div className="FlavourContainer">
      <div className="FlavourGrid">

        {/* Left Hero Promo Banner */}
        <div 
          className="FlavourHero" 
          style={{ backgroundImage: `url(${heroBgImg})` }}
        >
          <div className="FlavourHeroOverlay">
            <h1 className="FlavourHeroTitle">The Flavors of Spices</h1>
            <p className="FlavourHeroDiscount">
              50% FLAT OFFER
              <br />
              ALL PRODUCTS
            </p>
            <button className="FlavourBtn">Shop Now</button>
          </div>
        </div>

        {/* Right Products Grid */}
        <div className="FlavourProductsGrid">
          {spiceProducts.map((spice) => (
            <div key={spice.id} className="FlavourCard">
              <img
                src={spice.image}
                alt={spice.name}
                className="FlavourImage"
              />
              <div className="FlavourCardOverlay">
                <h3 className="FlavourCardTitle">{spice.name}</h3>
                <button className="FlavourBtn">Shop Now</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Flavour;