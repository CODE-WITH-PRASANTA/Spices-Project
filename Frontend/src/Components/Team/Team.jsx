import React from 'react';
import './Team.css';
import { FaFacebookF, FaTwitter, FaPinterestP, FaYoutube, FaStar } from 'react-icons/fa';

// Import images from your local src/assets folder
import member1 from '../../assets/img1.avif';
import member2 from '../../assets/img2.avif';
import member3 from '../../assets/img3.avif';
import member4 from '../../assets/img4.avif';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ethelyn Hilaire",
      role: "CEO",
      image: member1,
    },
    {
      id: 2,
      name: "Timmy Bard",
      role: "Product Manager",
      image: member2,
    },
    {
      id: 3,
      name: "Willie Hagel",
      role: "Customer support",
      image: member3,
    },
    {
      id: 4,
      name: "Soraya Rolston",
      role: "Manager",
      image: member4,
    },
  ];

  return (
    <div className="TeamContainer">
      {/* Section Header */}
      <div className="TeamHeader">
        <h1 className="TeamMainTitle">Our Team</h1>
        <p className="TeamSubtitle">Lacus vestibulum sed arcu non sit eru racdi odio euismod.</p>
        <div className="TeamStarsRow">
          <FaStar className="TeamStarIcon" />
          <FaStar className="TeamStarIcon TeamStarCenter" />
          <FaStar className="TeamStarIcon" />
        </div>
      </div>

      {/* Grid Layout of Cards */}
      <div className="TeamGrid">
        {teamMembers.map((member) => (
          <div key={member.id} className="TeamCard">
            {/* Top Yellow Segment */}
            <div className="TeamCardTopVisual">
              <div className="TeamAvatarWrapper">
                <img src={member.image} alt={member.name} className="TeamAvatarImage" />
              </div>
            </div>
            
            {/* Bottom Info Segment */}
            <div className="TeamCardDetails">
              <h3 className="TeamMemberName">{member.name}</h3>
              <p className="TeamMemberRole">{member.role}</p>
              
              <div className="TeamSocialIcons">
                <a href="#facebook" className="TeamSocialLink" aria-label="Facebook"><FaFacebookF /></a>
                <a href="#twitter" className="TeamSocialLink" aria-label="Twitter"><FaTwitter /></a>
                <a href="#pinterest" className="TeamSocialLink" aria-label="Pinterest"><FaPinterestP /></a>
                <a href="#youtube" className="TeamSocialLink" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;