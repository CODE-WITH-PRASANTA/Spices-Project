import React, { useState } from 'react';
import './BlogPost.css';
import { FaRegUser, FaRegCalendarAlt, FaRegComment, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

// Import local images from your src/assets folder
import blackPepperPowderImg from '../../assets/img9.jpg';
import fullCardamomImg from '../../assets/img10.webp';

const BlogPost = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const posts = [
    {
      id: 1,
      title: "Black pepper powder",
      author: "Ram M",
      date: "November 13, 2018",
      comments: "6 Comments",
      excerpt: "Quis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet nibh...",
      image: blackPepperPowderImg
    },
    {
      id: 2,
      title: "The full cardamom",
      author: "Ram M",
      date: "November 13, 2018",
      comments: "2 Comments",
      excerpt: "Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet nibh praesent. Elementum facilisis leo vel fringilla est ul...",
      image: fullCardamomImg
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  return (
    <div className="BlogPostContainer">
      
      {/* Section Header */}
      <div className="BlogPostHeader">
        <h1 className="BlogPostMainTitle">Blog Post</h1>
        <p className="BlogPostSubtitle">Suspendisse potenti nullam ac tortor vitae purus faucibus orn.</p>
        <div className="BlogPostStarsRow">
          <FaStar className="BlogPostStarIcon" />
          <FaStar className="BlogPostStarIcon BlogPostStarCenter" />
          <FaStar className="BlogPostStarIcon" />
        </div>
      </div>

      {/* Main Carousel Slider Block Wrapper */}
      <div className="BlogPostCarousel">
        
        {/* Left Arrow Button */}
        <button className="BlogPostArrowBtn BlogPostLeftArrow" onClick={handlePrev} aria-label="Previous Post">
          <FaChevronLeft />
        </button>

        {/* Outer Window Window */}
        <div className="BlogPostSliderWindow">
          <div 
            className="BlogPostSliderTrack"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {posts.map((post) => (
              <div key={post.id} className="BlogPostSlide">
                
                {/* Left Side: Product Feature Image */}
                <div className="BlogPostImageWrapper">
                  <img src={post.image} alt={post.title} className="BlogPostImage" />
                </div>

                {/* Right Side: Copy/Content Elements */}
                <div className="BlogPostContent">
                  <h2 className="BlogPostTitle">{post.title}</h2>
                  
                  {/* Meta Details Row */}
                  <div className="BlogPostMetaRow">
                    <span className="BlogPostMetaItem">
                      <FaRegUser className="BlogPostMetaIcon" /> By {post.author}
                    </span>
                    <span className="BlogPostMetaDivider">|</span>
                    <span className="BlogPostMetaItem">
                      <FaRegCalendarAlt className="BlogPostMetaIcon" /> {post.date}
                    </span>
                    <span className="BlogPostMetaDivider">|</span>
                    <span className="BlogPostMetaItem">
                      <FaRegComment className="BlogPostMetaIcon" /> {post.comments}
                    </span>
                  </div>

                  <p className="BlogPostExcerpt">{post.excerpt}</p>
                  
                  <button className="BlogPostReadMoreBtn">Read more</button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button className="BlogPostArrowBtn BlogPostRightArrow" onClick={handleNext} aria-label="Next Post">
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
};

export default BlogPost;