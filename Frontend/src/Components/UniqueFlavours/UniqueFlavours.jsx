import React from "react";
import "./UniqueFlavours.css";

import {
  FaCoffee,
  FaGlobeAmericas,
  FaUser,
  FaEye,
  FaStar,
} from "react-icons/fa";

const data = [
  {
    icon: <FaCoffee />,
    title: "Flavors",
    description:
      "Sed vestibulum nulla elementum auctor tincidunt. Aliquam sit amet cursus mauris. Sed vitae mattis ipsum. Vestibulum enim nulla, sollicitudin ac hendrerit nec, tempor quis nisl.",
  },
  {
    icon: <FaGlobeAmericas />,
    title: "Export",
    description:
      "Sollicitudin ac hendrerit nec, tempor quis nisl. Sed vestibulum nulla elementum auctor tincidunt. Aliquam sit amet cursus mauris. Sed vitae mattis ipsum.",
  },
  {
    icon: <FaUser />,
    title: "Cultivation",
    description:
      "Vestibulum enim nulla, sollicitudin ac hendrerit nec, tempor quis nisl. Sed vestibulum nulla elementum auctor tincidunt. Aliquam sit amet cursus mauris. Sed vitae mattis ipsum.",
  },
  {
    icon: <FaEye />,
    title: "Testing",
    description:
      "Aliquam sit amet cursus mauris. Sed vitae mattis ipsum. Vestibulum enim nulla, sollicitudin ac hendrerit nec, tempor quis nisl. Sed vestibulum nulla elementum auctor tincidunt.",
  },
];

const UniqueFlavours = () => {
  return (
    <section className="uniqueFlavours-section">

      <div className="uniqueFlavours-heading">

        <h2>Unique flavors spices</h2>

        <p>Quisque volutpat mattis eros.</p>

        <div className="uniqueFlavours-stars">
          <FaStar className="small-star" />
          <FaStar className="big-star" />
          <FaStar className="small-star" />
        </div>

      </div>

      <div className="uniqueFlavours-grid">
        {data.map((item, index) => (
          <div className="uniqueFlavours-card" key={index}>

            <div className="uniqueFlavours-icon">
              {item.icon}
            </div>

            <div className="uniqueFlavours-content">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

export default UniqueFlavours;