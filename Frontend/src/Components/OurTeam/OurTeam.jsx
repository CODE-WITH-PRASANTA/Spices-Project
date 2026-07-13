import React from "react";
import "./OurTeam.css";

import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
  FaStar,
} from "react-icons/fa";

import team1 from "../../assets/t1.webp";
import team2 from "../../assets/t2.webp";
import team3 from "../../assets/t3.webp";
import team4 from "../../assets/t4.webp";

const teamMembers = [
  {
    id: 1,
    image: team1,
    name: "Mila",
    role: "Proprietor",
  },
  {
    id: 2,
    image: team2,
    name: "Andreas",
    role: "Customer Support",
  },
  {
    id: 3,
    image: team3,
    name: "Ingrid",
    role: "Product Manager",
  },
  {
    id: 4,
    image: team4,
    name: "Hermann",
    role: "Delivery Manager",
  },
];

const OurTeam = () => {
  return (
    <section className="ourTeam-section">
      <div className="ourTeam-container">
        {/* Heading */}
        <div className="ourTeam-heading">
          <h2 className="ourTeam-title">Our Team</h2>

          <p className="ourTeam-subtitle">
            In iaculis nunc sed augue lacus viverra vitae congue eu.
          </p>

          <div className="ourTeam-stars">
            <FaStar className="ourTeam-star-small" />
            <FaStar className="ourTeam-star-big" />
            <FaStar className="ourTeam-star-small" />
          </div>
        </div>

        {/* Team Grid */}
        <div className="ourTeam-grid">
          {teamMembers.map((member) => (
            <div className="ourTeam-card" key={member.id}>
              {/* Image */}
              <div className="ourTeam-imageWrapper">
                <img
                  src={member.image}
                  alt={member.name}
                  className="ourTeam-image"
                />

                {/* Dark Overlay */}
                <div className="ourTeam-overlay"></div>

                {/* Social Icons */}
                <div className="ourTeam-socials">
                  <a href="/">
                    <FaFacebookF />
                  </a>

                  <a href="/">
                    <FaTwitter />
                  </a>

                  <a href="/">
                    <FaPinterestP />
                  </a>

                  <a href="/">
                    <FaYoutube />
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="ourTeam-content">
                <h3 className="ourTeam-name">{member.name}</h3>

                <span className="ourTeam-role">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;