import React from 'react';
import './SelectedProduct.css';

// Importing images from your local src/assets folder
import turmericImg from '../../assets/turmeric.jpg';
import blackPepperImg from '../../assets/blackpapper.jpg';
import cloveImg from '../../assets/labanga.jpg';
import cinnamonImg from '../../assets/cinamon.jpg';
import promoBgImg from '../../assets/bg4.png'; // Background for the right banner

const SelectedProduct = () => {
  const products = [
    {
      id: 1,
      name: "Turmeric Powder",
      image: turmericImg,
    },
    {
      id: 2,
      name: "Black Pepper",
      image: blackPepperImg,
    },
    {
      id: 3,
      name: "Clove",
      image: cloveImg,
    },
    {
      id: 4,
      name: "Cinnamon",
      image: cinnamonImg,
    },
  ];

  return (
    <div className="SelectedProductContainer">
      <div className="SelectedProductGrid">
        
        {/* Left Side: 4 Product Tiles */}
        <div className="SelectedProductItemsGrid">
          {products.map((product) => (
            <div key={product.id} className="SelectedProductCard">
              <div className="SelectedProductImageWrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="SelectedProductImage"
                />
              </div>
              <div className="SelectedProductCardOverlay">
                <h3 className="SelectedProductCardTitle">{product.name}</h3>
                <button className="SelectedProductBtn">Shop Now</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Large Promo Banner */}
        <div 
          className="SelectedProductPromo"
          style={{ backgroundImage: `url(${promoBgImg})` }}
        >
          <div className="SelectedProductPromoContent">
            <h2 className="SelectedProductPromoDiscount">20% OFF</h2>
            <h1 className="SelectedProductPromoTitle">Slected Products</h1>
            <p className="SelectedProductPromoSubtext">
              PAY WITH PAYTM WALLET &
              <br />
              <strong>GET 50 CASHBACK</strong>
            </p>
            <button className="SelectedProductPromoBtn">Shop Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SelectedProduct;