import React, { useState, useEffect } from "react";
import "./LTProductsCarouselOffers.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products";
import LTSectionTitle from "../../../common/LTSectionTitle";

// Función para formatear precios en formato argentino (231.990,00)
const formatPrice = (price) => {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const LTProductsCarouselOffers = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const itemsPerView = 6;

  const totalSlides = Math.ceil(products.length / itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  // Autoplay: avanza cada 5 segundos (scroll infinito)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="LTProductsCarouselOffersWrapper">
      <div className="LTProductsCarouselOffersContainer">
        <div className="lt-section-title-spacing">
          <LTSectionTitle
            title="Nuestras Ofertas"
            subtitle="Productos exclusivos con descuentos imperdibles"
            gradientType="innova"
          />
        </div>

        {/* GRID CON NAVEGACIÓN */}
        <div className="LTProductsCarouselOffersProductsContainer">
          {/* Flecha izquierda */}
          <button
            className="LTProductsCarouselOffersArrow LTProductsCarouselOffersArrowLeft"
            onClick={goToPrevious}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          {/* Contenedor con overflow hidden para el slide */}
          <div
            className="LTProductsCarouselOffersCardsWrapper"
            style={{ overflow: "hidden", width: "100%" }}
          >
            {/* Grid de productos con animación slide */}
            <div
              className="LTProductsCarouselOffersProducts"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / totalSlides)
                }%)`,
                transition: "transform 0.5s cubic-bezier(0.7, 0.2, 0.3, 1)",
                width: `${totalSlides * 100}%`,
                display: "grid",
                gridTemplateColumns: `repeat(${products.length}, 1fr)`,
                gap: "1rem",
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="LTProductsCarouselOffersCard">
                  <div className="LTProductsCarouselOffersCardBadge">
                    -{product.discount}%
                  </div>

                  <div className="LTProductsCarouselOffersCardImage">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="LTProductsCarouselOffersCardImg"
                    />
                  </div>

                  <div className="LTProductsCarouselOffersCardInfo">
                    <div className="LTProductsCarouselOffersCardTopContent">
                      <div className="LTProductsCarouselOffersCardCategory">
                        {product.brand}
                      </div>
                      <h3 className="LTProductsCarouselOffersCardTitle">
                        {product.name}
                      </h3>

                      {product.isLaunch && (
                        <div className="LTProductsCarouselOffersCardLaunchBadge">
                          Lanzamiento
                        </div>
                      )}
                    </div>

                    <div className="LTProductsCarouselOffersCardBottomContent">
                      <div className="LTProductsCarouselOffersCardPricing">
                        <div className="LTProductsCarouselOffersCardOriginalPrice">
                          $ {formatPrice(product.originalPrice)}
                        </div>
                        <div className="LTProductsCarouselOffersCardFinalPrice">
                          $ {formatPrice(product.discountPrice)}
                        </div>
                      </div>

                      <div className="LTProductsCarouselOffersCardActions">
                        <button className="LTProductsCarouselOffersCardAddToCart">
                          <img
                            src={ShoppingBagIcon}
                            alt="Agregar"
                            className="LTProductsCarouselOffersActionIcon"
                          />
                          Agregar
                        </button>
                        <FavoriteButton
                          isFavorite={favorites.includes(product.id)}
                          onClick={() => toggleFavorite(product.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Flecha derecha */}
          <button
            className="LTProductsCarouselOffersArrow LTProductsCarouselOffersArrowRight"
            onClick={goToNext}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LTProductsCarouselOffers;
