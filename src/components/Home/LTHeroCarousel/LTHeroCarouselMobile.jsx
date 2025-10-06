import React, { useState, useEffect, useRef } from "react";
import "./LTHeroCarouselMobile.css";

// Importamos las imágenes del carrusel hero
import hero1 from "../../../assets/images/hero/hero1.jpg";
import hero2 from "../../../assets/images/hero/hero2.jpg";
import hero3 from "../../../assets/images/hero/hero3.jpg";
import hero4 from "../../../assets/images/hero/hero4.jpg";
import hero5 from "../../../assets/images/hero/hero5.jpg";
import hero6 from "../../../assets/images/hero/hero6.jpg";
import hero7 from "../../../assets/images/hero/hero7.jpg";
import hero8 from "../../../assets/images/hero/hero8.jpg";
import hero9 from "../../../assets/images/hero/hero9.jpg";
import hero10 from "../../../assets/images/hero/hero10.jpg";
import hero11 from "../../../assets/images/hero/hero11.jpg";
import hero12 from "../../../assets/images/hero/hero12.jpg";
import hero13 from "../../../assets/images/hero/hero13.jpg";
import hero14 from "../../../assets/images/hero/hero14.jpg";
import hero15 from "../../../assets/images/hero/hero15.jpg";
import hero16 from "../../../assets/images/hero/hero16.jpg";
import hero17 from "../../../assets/images/hero/hero17.jpg";
import hero18 from "../../../assets/images/hero/hero18.jpg";
import hero19 from "../../../assets/images/hero/hero19.jpg";
import hero20 from "../../../assets/images/hero/hero20.jpg";
import hero21 from "../../../assets/images/hero/hero21.jpg";
import hero22 from "../../../assets/images/hero/hero22.jpg";
import hero23 from "../../../assets/images/hero/hero23.jpg";
import hero24 from "../../../assets/images/hero/hero24.jpg";
import hero25 from "../../../assets/images/hero/hero25.jpg";

const heroImages = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
  hero6,
  hero7,
  hero8,
  hero9,
  hero10,
  hero11,
  hero12,
  hero13,
  hero14,
  hero15,
  hero16,
  hero17,
  hero18,
  hero19,
  hero20,
  hero21,
  hero22,
  hero23,
  hero24,
  hero25,
];

export default function LTHeroCarouselMobile() {
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(null);

  // Autoplay cada 5 segundos con fade
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [current]);

  return (
    <div className="lt-hero-carousel-mobile-wrapper">
      <div className="lt-hero-carousel-mobile-slider">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`lt-hero-carousel-mobile-slide${
              current === idx ? " active" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}

        {/* Gradiente inferior para mejorar legibilidad */}
        <div className="lt-hero-carousel-mobile-gradient" />
      </div>
    </div>
  );
}
