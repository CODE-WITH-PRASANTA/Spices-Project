import React, { useState } from 'react';
import './Frequently.css';

const Frequently = () => {
  // Track which FAQ index is currently open. 
  // Set to 0 by default to keep the first one open like in the image.
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question: "How will my order be delivered to me?",
      answer: "Ut labore et dolore magna aliqua consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui official."
    },
    {
      question: "what do I need to know?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
    },
    {
      question: "How will I know if order is placed successfully?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
    },
    {
      question: "How do I check the status of my order?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
    },
    {
      question: "Can I cancel my order?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* Header Section */}
      <header className="faq-header">
        <h1>Frequently Asked Questions</h1>
        <p>A lot more questions</p>
        <div className="star-rating">
          <span className="star gold">★</span>
          <span className="star black">★</span>
          <span className="star gold">★</span>
        </div>
      </header>

      {/* Accordion/Dropdown Section */}
      <div className="faq-accordion">
        {faqData.map((item, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item ${isOpen ? 'open' : ''}`}
            >
              <button 
                className="faq-toggle-btn" 
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
              >
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
                <span className="faq-question">{item.question}</span>
              </button>
              
              <div className="faq-content-wrapper">
                <div className="faq-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Frequently;