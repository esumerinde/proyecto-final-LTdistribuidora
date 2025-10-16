import React, { useState, useEffect } from "react";
import FavoriteButton from "../../../components/common/FavoriteButton.jsx";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import LTSectionTitle from "../../../components/common/LTSectionTitle";
import "./LTProductsCarouselOffersMobile.css";
import { products } from "../../../mocks/products";

// Función para formatear precios en formato argentino (231.990,00)
const formatPrice = (price) => {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const LTProductsCarouselOffersMobile = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Mostrar solo las primeras 6 cards (igual que desktop)
  const displayedProducts = products.slice(0, 6);

  // Auto-scroll con fade cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % displayedProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayedProducts.length]);

  const handleIndicatorClick = (index) => {
    setCurrentIdx(index);
  };

  if (!displayedProducts || !displayedProducts.length) return null;

  return (
    <div className="LTProductsCarouselOffersMobile__wrapper">
      <div className="LTProductsCarouselOffersMobile__container">
        {/* Título de la sección */}
        <div className="LTProductsCarouselOffersMobile__header">
          <LTSectionTitle title="NUESTRAS OFERTAS" />
        </div>

        {/* Contenedor de cards con fade */}
        <div className="LTProductsCarouselOffersMobile__cards-container">
          {displayedProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`LTProductsCarouselOffersMobile__card ${
                currentIdx === idx ? "active" : ""
              }`}
            >
              <div className="LTProductsCarouselOffersMobile__discount">
                -{product.discount}%
              </div>

              <div className="LTProductsCarouselOffersMobile__image">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="LTProductsCarouselOffersMobile__info">
                <div className="LTProductsCarouselOffersMobile__brand">
                  {product.brand}
                </div>
                <h3 className="LTProductsCarouselOffersMobile__titleCard">
                  {product.name}
                </h3>
                <div className="LTProductsCarouselOffersMobile__priceOld">
                  $ {formatPrice(product.originalPrice)}
                </div>
                <div className="LTProductsCarouselOffersMobile__priceNew">
                  $ {formatPrice(product.discountPrice)}
                </div>
              </div>

              <div className="LTProductsCarouselOffersMobile__actions">
                <button className="LTProductsCarouselOffersMobile__addBtn">
                  <img
                    src={ShoppingBagIcon}
                    alt="Agregar"
                    className="LTProductsCarouselOffersMobile__actionIcon"
                  />
                  Agregar
                </button>
                <FavoriteButton product={product} />
              </div>
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="LTProductsCarouselOffersMobile__indicators">
          {displayedProducts.map((_, index) => (
            <button
              key={index}
              className={`LTProductsCarouselOffersMobile__indicator ${
                index === currentIdx
                  ? "LTProductsCarouselOffersMobile__indicator--active"
                  : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Ir al producto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LTProductsCarouselOffersMobile;
