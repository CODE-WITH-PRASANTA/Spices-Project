import React from 'react';
import './ViewCollection.css';

// Import all 6 local images from your src/assets folder
import img1 from '../../assets/img5.png';     // Large tall left image
import img2 from '../../assets/img6.png';  // Middle top image
import img3 from '../../assets/img7 (1).png';// Middle bottom image
import img4 from '../../assets/img7 (2).png';   // Tall right-center image
import img5 from '../../assets/img7 (3).png';      // Right top image
import img6 from '../../assets/img8.png';    // Right bottom image

const ViewCollection = () => {
  const collectionItems = [
    {
      id: 1,
      tag: "Spicy",
      name: "Fenugreek",
      image: img1,
      gridClass: "ViewCollectionItem1"
    },
    {
      id: 2,
      tag: "Spicy",
      name: "Herbal Spices",
      image: img2,
      gridClass: "ViewCollectionItem2"
    },
    {
      id: 3,
      tag: "Spicy",
      name: "Seeds Spices",
      image: img3,
      gridClass: "ViewCollectionItem3"
    },
    {
      id: 4,
      tag: "Spicy",
      name: "Garam Masala",
      image: img4,
      gridClass: "ViewCollectionItem4"
    },
    {
      id: 5,
      tag: "Spicy",
      name: "Spices",
      image: img5,
      gridClass: "ViewCollectionItem5"
    },
    {
      id: 6,
      tag: "Spicy",
      name: "Dried Masala",
      image: img6,
      gridClass: "ViewCollectionItem6"
    }
  ];

  return (
    <div className="ViewCollectionContainer">
      <div className="ViewCollectionGrid">
        {collectionItems.map((item) => (
          <div key={item.id} className={`ViewCollectionCard ${item.gridClass}`}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="ViewCollectionImage" 
            />
            {/* Dark Hover Overlay matching 2nd reference image exactly */}
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