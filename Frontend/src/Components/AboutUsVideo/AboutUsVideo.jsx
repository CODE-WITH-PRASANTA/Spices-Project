import React, { useEffect, useState } from "react";
import "./AboutUsVideo.css";

// Production unit / agro-processing thumbnail
import productionImageDefault from "../../assets/AboutUsVideo.jpg";

// YouTube Video ID
const YOUTUBE_VIDEO_ID = "Lfl_YqWv_3o";

const AboutUsVideo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // =====================================================
  // ESCAPE KEY + BODY SCROLL CONTROL
  // =====================================================

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeVideo();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  return (
    <section className="AboutUsVideo">
      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}
      <div
        className="AboutUsVideo__ambient"
        aria-hidden="true"
      >
        <span className="AboutUsVideo__ambientGlow AboutUsVideo__ambientGlow--one" />
        <span className="AboutUsVideo__ambientGlow AboutUsVideo__ambientGlow--two" />
        <span className="AboutUsVideo__ambientLine AboutUsVideo__ambientLine--one" />
        <span className="AboutUsVideo__ambientLine AboutUsVideo__ambientLine--two" />
      </div>

      <div className="AboutUsVideo__container">
        {/* =================================================
            SECTION HEADING
        ================================================= */}
        <header className="AboutUsVideo__heading">
          <span className="AboutUsVideo__eyebrow">
            <span className="AboutUsVideo__eyebrowDot" />
            INSIDE PALASH ESSENCE
            <span className="AboutUsVideo__eyebrowDot" />
          </span>

          <h2 className="AboutUsVideo__title">
            From Pure Ingredients
            <span> To Your Kitchen</span>
          </h2>

          <p className="AboutUsVideo__description">
            Step inside Palash Essence and discover how we turn carefully
            selected ingredients into everyday essentials with purity,
            traditional goodness and attention to quality at every stage.
          </p>

          {/* Small Brand Statement */}
          <div className="AboutUsVideo__brandLine">
            <span />
            <strong>PURE • TRADITIONAL • TRUSTED</strong>
            <span />
          </div>
        </header>

        {/* =================================================
            VIDEO BANNER
        ================================================= */}
        <div
          className="AboutUsVideo__banner"
          onClick={openVideo}
          role="button"
          tabIndex={0}
          aria-label="Click to watch the Palash Essence production story"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openVideo();
            }
          }}
        >
          <img
            src={productionImageDefault}
            onError={(event) => {
              event.target.onerror = null;

              event.target.src =
                "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1400&q=85";
            }}
            alt="Palash Essence production and packaging facility"
            className="AboutUsVideo__bannerImg"
            loading="lazy"
          />

          {/* Dark cinematic overlay */}
          <div className="AboutUsVideo__overlay" />

          {/* Gold light overlay */}
          <div className="AboutUsVideo__goldOverlay" />

          {/* =================================================
              VIDEO CENTER
          ================================================= */}
          <div className="AboutUsVideo__playCenter">
            <button
              type="button"
              className="AboutUsVideo__playBtn"
              onClick={(event) => {
                event.stopPropagation();
                openVideo();
              }}
              aria-label="Play Palash Essence production video"
            >
              <span className="AboutUsVideo__ripple AboutUsVideo__ripple--outer" />

              <span className="AboutUsVideo__ripple AboutUsVideo__ripple--middle" />

              <span className="AboutUsVideo__ripple AboutUsVideo__ripple--inner" />

              <span className="AboutUsVideo__playCircle">
                <svg
                  className="AboutUsVideo__playIcon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8.5 6.2v11.6a1 1 0 0 0 1.54.84l9.2-5.8a1 1 0 0 0 0-1.68l-9.2-5.8A1 1 0 0 0 8.5 6.2z" />
                </svg>
              </span>
            </button>

            <span className="AboutUsVideo__watchText">
              Watch Our Production Story
            </span>

            <span className="AboutUsVideo__watchSubText">
              See the care behind every pack
            </span>
          </div>

          {/* =================================================
              VIDEO CORNER CONTENT
          ================================================= */}
          <div className="AboutUsVideo__bannerInfo">
            <div className="AboutUsVideo__bannerInfoItem">
              <span className="AboutUsVideo__bannerInfoIcon">
                ✓
              </span>

              <div>
                <strong>Pure Ingredients</strong>
                <small>Carefully selected</small>
              </div>
            </div>

            <div className="AboutUsVideo__bannerInfoItem">
              <span className="AboutUsVideo__bannerInfoIcon">
                ✓
              </span>

              <div>
                <strong>Quality Processing</strong>
                <small>Handled with care</small>
              </div>
            </div>

            <div className="AboutUsVideo__bannerInfoItem">
              <span className="AboutUsVideo__bannerInfoIcon">
                ✓
              </span>

              <div>
                <strong>Hygienic Packing</strong>
                <small>Freshness protected</small>
              </div>
            </div>
          </div>

          {/* Brand watermark */}
          <div className="AboutUsVideo__watermark">
            PALASH ESSENCE
          </div>
        </div>

        {/* =================================================
            CONTENT BELOW VIDEO
        ================================================= */}
        <div className="AboutUsVideo__contentGrid">
          <article className="AboutUsVideo__contentCard">
            <div className="AboutUsVideo__contentIcon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div>
              <span>01</span>
              <h3>Pure By Choice</h3>

              <p>
                We focus on carefully selected ingredients and responsible
                processing so every Palash Essence product reflects the
                goodness of its source.
              </p>
            </div>
          </article>

          <article className="AboutUsVideo__contentCard">
            <div className="AboutUsVideo__contentIcon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="3" />
                <path d="M12 3v3" />
                <path d="M12 18v3" />
                <path d="M3 12h3" />
                <path d="M18 12h3" />
              </svg>
            </div>

            <div>
              <span>02</span>
              <h3>Traditional Goodness</h3>

              <p>
                Inspired by traditional Indian food practices, we respect the
                natural character, texture and aroma of everyday staples.
              </p>
            </div>
          </article>

          <article className="AboutUsVideo__contentCard">
            <div className="AboutUsVideo__contentIcon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
            </div>

            <div>
              <span>03</span>
              <h3>Freshness Protected</h3>

              <p>
                Thoughtful packaging helps protect freshness and maintain the
                quality of our products from our facility to your kitchen.
              </p>
            </div>
          </article>
        </div>

        {/* =================================================
            BRAND FOOTER NOTE
        ================================================= */}
        <div className="AboutUsVideo__bottomNote">
          <div className="AboutUsVideo__bottomLogo">
            PE
          </div>

          <div className="AboutUsVideo__bottomText">
            <strong>PALASH ESSENCE</strong>

            <span>
              Everyday essentials, prepared with care.
            </span>
          </div>

          <div className="AboutUsVideo__bottomLine" />
        </div>
      </div>

      {/* =================================================
          VIDEO MODAL
      ================================================= */}
      {isVideoOpen && (
        <div
          className="AboutUsVideo__modal"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
          aria-label="Palash Essence Brand Story Video"
        >
          <div
            className="AboutUsVideo__modalContent"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="AboutUsVideo__modalClose"
              onClick={closeVideo}
              aria-label="Close video"
              title="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="AboutUsVideo__modalBrand">
              PALASH ESSENCE
            </div>

            <div className="AboutUsVideo__videoFrame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Palash Essence Production Story Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUsVideo;