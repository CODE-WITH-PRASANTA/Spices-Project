import React, { useState } from 'react';
// Only keeping the standard verified icons from lucide-react
import { Calendar, MessageSquare, User, ArrowUp } from 'lucide-react';
import './BlogDetails.css';

// Make sure this path points correctly to your image file! 
// (Or use src="/black-pepper.jpg" if it's in your public folder)
import blogImage from '../../assets/Black papper powder.webp'; 

const BlogDetails = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const comments = [
    { id: 1, number: "1.", date: 'March 6, 2025', author: 'S', text: 'ssss' },
    { id: 2, number: "2.", date: 'June 5, 2024', author: '222222222', text: '2222222222222222' },
    { id: 3, number: "3.", date: 'August 13, 2023', author: 'Parasharam', text: 'Test' },
    { id: 4, number: "4.", date: 'February 11, 2021', author: 'Fidelis K. Orji', text: 'I will like to know if you will be interested in buying black pepper seeds from me, I will give you better prices, I represent local growers and Farmers? Mr. Orji' },
    { id: 5, number: "5.", date: 'February 11, 2021', author: 'Fidelis K. Orji', text: 'I will like to know if you will be interested in buying black pepper seeds from me, I will give you better prices, I represent local growers and Farmers? Mr. Orji' },
  ];

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-container">
      <div className="blog-wrapper">
        
        {/* Main Article Image */}
        <div className="blog-image-wrapper">
          <img 
            src={blogImage} 
            alt="Black pepper powder layout" 
            className="blog-featured-image"
          />
        </div>

        {/* Dynamic Title */}
        <h1 className="blog-main-title">
          Black pepper powder
        </h1>

        {/* Post Metadata Row */}
        <div className="blog-meta-row">
          <div className="meta-item">
            <Calendar className="meta-icon" />
            <span>Nov 13, 2018</span>
          </div>
          <div className="meta-item">
            <MessageSquare className="meta-icon" />
            <span>6 Comments</span>
          </div>
          <div className="meta-item">
            <User className="meta-icon" />
            <span>Ram M</span>
          </div>
        </div>

        {/* Main Body Content */}
        <article className="blog-content-body">
          <p>
            Quis imperdiet massa tincidunt nunc pulvinar sapien et. Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet nibh praesent. Elementum facilisis leo vel fringilla est ullamcorper.
          </p>
          
          <blockquote className="blog-blockquote">
            "Ridiculus mus mauris vitae ultricies leo. Non enim praesent elementum facilisis leo vel fringilla. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada."
          </blockquote>

          <p>
            Sapien faucibus et molestie ac feugiat sed lectus. Sit amet consectetur adipiscing elit. Sed cras ornare arcu dui vivamus arcu felis. A scelerisque purus semper eget duis at tellus at urna. Vitae congue mauris rhoncus aenean vel elit. Sapien faucibus et molestie ac feugiat.
          </p>
          
          <p>
            Id semper risus in hendrerit gravida rutrum quisque non tellus. Sed lectus vestibulum mattis ullamcorper. Amet venenatis urna cursus eget nunc. Eu augue ut lectus arcu. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Amet venenatis urna cursus eget nunc.
          </p>
          
          <p>
            Massa vitae tortor condimentum lacinia quis vel eros donec ac. Enim ut tellus elementum sagittis vitae. Massa sapien faucibus et molestie ac feugiat. Tincidunt ornare massa eget egestas purus viverra accumsan. Metus aliquam eleifend mi in nulla posuere.
          </p>
        </article>

        {/* Social Share Ribbon - Using clean inline standard SVGs to prevent dependency crashes */}
        <div className="blog-share-ribbon">
          <span className="share-label">Share with us:</span>
          <div className="share-social-links">
            {/* Facebook */}
            <a href="#facebook" className="social-icon-link" aria-label="Share on Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            {/* Twitter / X */}
            <a href="#twitter" className="social-icon-link" aria-label="Share on Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            {/* Pinterest Style / Circle */}
            <a href="#pinterest" className="social-icon-link" aria-label="Share on Pinterest">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
            </a>
            {/* Google / Web Browser Style */}
            <a href="#google" className="social-icon-link" aria-label="Share Link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
            </a>
          </div>
        </div>

        {/* Older Post Button */}
        <div className="older-post-container">
          <button className="older-post-btn">
            Older Post
          </button>
        </div>

        {/* Comments Box Container */}
        <div className="comments-section-container">
          
          <div className="comments-header-title">
            <MessageSquare className="header-comment-icon" />
            <h2>6 Comments</h2>
          </div>

          {/* Comments Generation Stack */}
          <div className="comments-list-stack">
            {comments.map((comment) => (
              <div key={comment.id} className="single-comment-node">
                <span className="comment-index-number">{comment.number}</span>
                <div className="comment-bubble-body">
                  <div className="comment-node-meta">
                    <div className="meta-sub-item">
                      <Calendar className="meta-sub-icon" />
                      <span>{comment.date}</span>
                    </div>
                    <div className="meta-sub-item">
                      <User className="meta-sub-icon" />
                      <span>{comment.author}</span>
                    </div>
                  </div>
                  <p className="comment-node-text">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination UI */}
          <div className="pagination-wrapper-row">
            <button className="pagination-nav-btn">&lt;</button>
            <button className="pagination-num-btn active">1</button>
            <button className="pagination-num-btn">2</button>
            <button className="pagination-nav-btn">&gt;</button>
          </div>

          {/* Leave a Comment Form */}
          <div className="comment-form-wrapper">
            <h3 className="form-header-title">Leave a comment</h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="comment-interactive-form">
              <div className="form-input-split-row">
                <input 
                  type="text" 
                  placeholder="Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-rounded-input"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-rounded-input"
                />
              </div>
              
              <textarea 
                rows="5" 
                placeholder="Message" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="form-rounded-textarea"
              ></textarea>

              <div className="form-submit-row">
                <button type="submit" className="form-submit-action-btn">
                  Post comment
                </button>
              </div>
            </form>
          </div>

        </div>

      </div>

      {/* Floating Scroll-Back Action Handle */}
      <button 
        onClick={handleScrollTop}
        className="floating-back-to-top"
        aria-label="Scroll back up"
      >
        <ArrowUp size={20} />
      </button>

    </div>
  );
};

export default BlogDetails;