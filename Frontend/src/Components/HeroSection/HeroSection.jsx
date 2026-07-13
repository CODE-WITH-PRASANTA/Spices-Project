import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './HeroSection.css';

// Importing your relative background assets
import slideBg1 from '../../assets/slider1_1.webp';
import slideBg2 from '../../assets/slider2_1.webp';
import slideBg3 from '../../assets/slider3_1.webp';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: slideBg1,
      title: 'Herbs & Spices',
      discount: 'FLAT 10% OFF',
      coupon: 'USE COUPON : SPI18',
    },
    {
      id: 2,
      image: slideBg2,
      title: 'All Organic Spices...',
      discount: '20% OFF ALL PRODUCTS',
      coupon: 'USE COUPON : SPI18',
    },
    {
      id: 3,
      image: slideBg3,
      title: 'The choice of chefs',
      discount: '15% OFF ON SPICES',
      coupon: 'USE COUPON : SPI18',
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Smooth auto-slide loop
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="hero-section" aria-label="Featured Offers Carousel">
      <div className="hero-section__wrapper">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`hero-section__slide ${isActive ? 'hero-section__slide--active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
            >
              {/* Overlay added directly via background styling layer inside CSS for better blending */}
              <div className="hero-section__content">
                <h1 className="hero-section__title">{slide.title}</h1>
                <div className="hero-section__divider" />
                <h2 className="hero-section__discount">{slide.discount}</h2>
                <p className="hero-section__coupon">{slide.coupon}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slider Controls Matching Reference Layout */}
      <button
        type="button"
        className="hero-section__arrow hero-section__arrow--left"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <FiChevronLeft className="hero-section__icon" />
      </button>

      <button
        type="button"
        className="hero-section__arrow hero-section__arrow--right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <FiChevronRight className="hero-section__icon" />
      </button>
    </section>
  );
};

export default HeroSection;