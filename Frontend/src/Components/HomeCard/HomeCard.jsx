import React from 'react';
import './HomeCard.css';
import { FiRefreshCw, FiBriefcase, FiClock } from 'react-icons/fi';

const HomeCard = () => {
  const features = [
    {
      id: 1,
      icon: <FiRefreshCw className="HomeCardIcon" />,
      title: "Money Back Guarantee",
      description: "Consecteur adipisicing elitsed do eiusmod tempor incididunt ulabore et dolore ulabore et dolore dolor sit amet ."
    },
    {
      id: 2,
      icon: <FiBriefcase className="HomeCardIcon" />,
      title: "Free Shipping",
      description: "Sit amet dolor consecteur adipisicing elitsed do eiusmod tempor incididunt ulabore et dolore ulabore et dolore."
    },
    {
      id: 3,
      icon: <FiClock className="HomeCardIcon" />,
      title: "24/7 Customer Service",
      description: "Dolor sit amet consecteur adipisicing elitsed do eiusmod tempor incididunt ulabore et dolore ulabore et dolore."
    }
  ];

  return (
    <div className="HomeCardContainer">
      <div className="HomeCardGrid">
        {features.map((item) => (
          <div key={item.id} className="HomeCardItem">
            {/* Top Floating Badge Circle */}
            <div className="HomeCardBadge">
              {item.icon}
            </div>
            
            {/* Card Main Inner Content Panel */}
            <div className="HomeCardContent">
              <h3 className="HomeCardTitle">{item.title}</h3>
              <p className="HomeCardDescription">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;