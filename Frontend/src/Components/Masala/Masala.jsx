import React from "react";
import "./Masala.css";

import masalaImg from "../../assets/abo-1.webp";

const Masala = () => {
  return (
    <section className="masala-section">
      <div className="masala-container">

        {/* Left Content */}
        <div className="masala-content">

          <h2 className="masala-title">
            The Richest Masala In The World
          </h2>

          <p className="masala-description">
            Quisque volutpat mattis eros. Nullam malesuada erat ut ki diaml ka
            dhuddu pochu turpis. Suspendisse urna nibh, viverra non, semper
            suscipit, posuere a, pede. Donec nec justo eget felis facilisis
            fermentum. Morbi in sem quis dui placerat ornare. Pellentesque odio
            nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras
            consequat.
          </p>

          <div className="masala-quote">

            <p>
              Nullam malesuada erat ut ki diaml ka dhuddu pochu turpis.
              Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
              pede. Donec nec justo eget felis facilisis fermentum. Morbi in sem
              quis dui placerat ornare. Tortor dignissim convallis aenean et
              tortor. Ac tincidunt vitae semper quis lectus nulla at volutpat
              diam.
            </p>

          </div>

        </div>

        {/* Right Image */}
        <div className="masala-image-wrapper">
          <img
            src={masalaImg}
            alt="Rich Masala"
            className="masala-image"
          />
        </div>

      </div>
    </section>
  );
};

export default Masala;