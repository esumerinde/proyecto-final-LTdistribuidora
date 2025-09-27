import React, { useState, useEffect } from "react";
import "./LTHeaderOffer.css";

const offers = [
  "3 cuotas sin interés con bancos afiliados · Aplican Legales",
  "Envío gratis en CABA y GBA · Solo hoy",
  "2x1 en productos seleccionados · Ver más",
  "Descuentos exclusivos en la app · Descargala ahora",
  "Retiro en sucursal sin cargo · ¡Aprovechá!",
];

const LTHeaderOffer = () => {
  const [offerIndex, setOfferIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation state for fade/slide effect
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 500); // match animation duration
    return () => clearTimeout(timer);
  }, [offerIndex]);

  return (
    <div className="LTHeaderOfferBar">
      <span
        key={offerIndex}
        className={`LTHeaderOfferText${
          animating ? " LTHeaderOfferSlideRight" : ""
        }`}
      >
        {offers[offerIndex]}
      </span>
    </div>
  );
};

export default LTHeaderOffer;
