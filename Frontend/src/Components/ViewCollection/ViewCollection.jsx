import React, { useRef } from 'react';
import './ViewCollection.css';

// Import all 6 local images from your src/assets folder
import img1 from '../../assets/img5.png';
import img2 from '../../assets/img6.png';
import img3 from '../../assets/img7 (1).png';
import img4 from '../../assets/img7 (2).png';
import img5 from '../../assets/img7 (3).png';
import img6 from '../../assets/img8.png';

const ViewCollection = () => {
  const gridRef = useRef(null);

  const collectionItems = [
    { id: 1, tag: "Spicy", name: "Fenugreek", image: img1, gridClass: "ViewCollectionItem1" },
    { id: 2, tag: "Spicy", name: "Herbal Spices", image: img2, gridClass: "ViewCollectionItem2" },
    { id: 3, tag: "Spicy", name: "Seeds Spices", image: img3, gridClass: "ViewCollectionItem3" },
    { id: 4, tag: "Spicy", name: "Garam Masala", image: img4, gridClass: "ViewCollectionItem4" },
    { id: 5, tag: "Spicy", name: "Spices", image: img5, gridClass: "ViewCollectionItem5" },
    { id: 6, tag: "Spicy", name: "Dried Masala", image: img6, gridClass: "ViewCollectionItem6" }
  ];

  // Handles smooth scrolling horizontally
  const handleScroll = (direction) => {
    if (gridRef.current) {
      const cardWidth = gridRef.current.querySelector('.ViewCollectionCard').offsetWidth;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      gridRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="ViewCollectionContainer">
      {/* Mobile Navigation Arrows */}
      <div className="MobileNavArrows">
        <button 
          className="NavArrowBtn LeftArrow" 
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button 
          className="NavArrowBtn RightArrow" 
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="ViewCollectionGrid" ref={gridRef}>
        {collectionItems.map((item) => (
          <div key={item.id} className={`ViewCollectionCard ${item.gridClass}`}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="ViewCollectionImage" 
            />
            <div className="ViewCollectionOverlay">
              <h2 className="ViewCollectionTag">{item.tag}</h2>
              <p className="ViewCollectionName">{item.name}</p>
              <button className="ViewCollectionBtn">View Collection</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCollection;