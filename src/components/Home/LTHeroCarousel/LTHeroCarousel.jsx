import React, { useState, useEffect } from "react";
import "./LTHeroCarousel.css";

// Acá importamos las imágenes del carrusel. Si el backend trae las imágenes, reemplazá estos imports por un fetch y armá el array dinámico.
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

// Si el backend trae las imágenes, armá este array con los datos que vengan del backend.
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

// Carrusel de imágenes principal. Si el backend trae las imágenes, reemplazá heroImages por el array que venga del backend.
export default function LTHeroCarousel() {
  // current: índice de la imagen actual. Si querés controlar el slide desde afuera, podés pasar el estado por props.
  const [current, setCurrent] = useState(0);

  // Efecto para cambiar de imagen cada 4 segundos. Si el backend quiere controlar el tiempo, hacelo configurable por props.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Renderiza el carrusel. Cada slide es una imagen de fondo. El gradiente es para que el texto o las cards se lean mejor arriba.
  return (
    <div
      className="lt-hero-carousel-slider-wrapper"
      style={{ position: "relative" }}
    >
      <div className="lt-hero-carousel-slider">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`lt-hero-carousel-slide${
              current === idx ? " active" : ""
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* El gradiente abajo ayuda a que se lea el contenido superpuesto. */}
        <div className="lt-hero-carousel-gradient" />
      </div>
    </div>
  );
}
