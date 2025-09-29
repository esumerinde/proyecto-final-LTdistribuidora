import React, { useState } from "react";
import "./LTProductsCarousel.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import LTProductsCarouselMobile from "./LTProductsCarouselMobile";
import { products } from "../../../mocks/products";

const LTProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // ...existing code...
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

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

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="LTProductsCarouselWrapper">
      <div className="LTProductsCarouselContainer">
        <div className="LTProductsCarouselGradientBox">
          <div className="LTProductsCarouselGradientRow">
            <div className="LTProductsCarouselGradientTitle">
              {`Descubrí nuestras\nmejores ofertas`}
            </div>
            <button
              className={`LTProductsCarouselGradientArrow${
                currentIndex === 0 ? " disabled" : ""
              }
              `}
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24">
                <path d="M14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59L14 6z" />
              </svg>
            </button>
            <div className="LTProductsCarouselCardsAndIndicators">
              <div
                className="LTProductsCarouselTrack"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 0.5s cubic-bezier(.7,.2,.3,1)",
                  display: "flex",
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                  <div
                    key={slideIdx}
                    className="LTProductsCarouselGradientCards"
                    style={{ minWidth: "100%", display: "flex" }}
                  >
                    {products
                      .slice(
                        slideIdx * itemsPerSlide,
                        (slideIdx + 1) * itemsPerSlide
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          className="LTProductsCarouselCard"
                        >
                          <div className="LTProductsCarouselDiscount">
                            -{product.discount}%
                          </div>
                          <div
                            className="LTProductsCarouselImageContainer"
                            style={{
                              background: "#fff",
                              borderRadius: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: "140px",
                              height: "140px",
                              width: "100%",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="LTProductsCarouselCardImg"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
                                borderRadius: "12px",
                              }}
                            />
                          </div>
                          <div className="LTProductsCarouselCardContent">
                            <div className="LTProductsCarouselCategory">
                              {product.brand}
                            </div>
                            <h3 className="LTProductsCarouselProductName">
                              {product.name}
                            </h3>
                            <div className="LTProductsCarouselPricing">
                              <div className="LTProductsCarouselOriginalPrice">
                                {formatPrice(product.originalPrice)}
                              </div>
                              <div className="LTProductsCarouselDiscountPrice">
                                {formatPrice(product.discountPrice)}
                              </div>
                            </div>
                            <div className="LTProductsCarouselActions">
                              <button className="LTProductsCarouselAddToCart">
                                <img
                                  src={ShoppingBagIcon}
                                  alt="Agregar"
                                  className="LTProductsCarouselActionIcon"
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
                      ))}
                  </div>
                ))}
              </div>
              <div className="LTProductsCarouselGradientIndicators">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    className={`LTProductsCarouselIndicator ${
                      index === currentIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </div>
            <button
              className={`LTProductsCarouselGradientArrow${
                currentIndex === totalSlides - 1 ? " disabled" : ""
              }
              `}
              onClick={goToNext}
              disabled={currentIndex === totalSlides - 1}
            >
              <svg viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LTProductsCarousel;
