import React, { useState, useEffect } from "react";
import "./LTProductsCarousel3.css";
import FavoriteButton from "../../../components/common/FavoriteButton.jsx";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products3";
import LTSectionTitle from "../../../components/common/LTSectionTitle";

// Funci�n para formatear precios en formato argentino (231.990,00)
const formatPrice = (price) => {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const LTProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

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

  // Autoplay: avanza cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="LTProductsCarouselWrapper lt-section-spacing">
      <div className="LTProductsCarouselContainer">
        <div className="lt-section-title-spacing">
          <LTSectionTitle
            title="Gaming - Nuevas consolas"
            gradientType="gaming"
          />
        </div>

        <div className="LTProductsCarouselContent">
          {/* Banner promocional - “Lo último en Gaming” */}
          <div
            className="LTProductsCarouselBanner"
            style={{
              "--ltpc3-banner-bg":
                "url('https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="LTProductsCarouselBannerContent">
              <div className="LTProductsCarouselBannerChips">
                <span className="LTProductsCarouselBannerBadge">Gaming</span>
                <span className="LTProductsCarouselBannerDate">Nuevo</span>
              </div>

              <div className="LTProductsCarouselBannerHeadline">
                <span className="LTProductsCarouselBannerKicker">descubrí</span>
                <h3 className="LTProductsCarouselBannerTitle">
                  Lo último en <span>Gaming</span>
                </h3>
              </div>

              <div className="LTProductsCarouselBannerBody">
                <div className="LTProductsCarouselBannerBrandName">
                  ASUS ROG Strix
                </div>
                <p className="LTProductsCarouselBannerDescription">
                  Potencia, portabilidad y rendimiento. Descubrí la ASUS ROG
                  Strix, diseñada para gamers exigentes.
                </p>

                <button className="LTProductsCarouselBannerButton lt-button-variant2">
                  VER MÁS
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarouselProductsContainer">
            {/* Flecha izquierda */}
            <button className="lt-arrow-nav" onClick={goToPrevious}>
              <svg viewBox="0 0 24 24">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <div
              className="LTProductsCarouselCardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="LTProductsCarouselProducts"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / totalSlides)
                  }%)`,
                  transition: "transform 0.5s cubic-bezier(0.7, 0.2, 0.3, 1)",
                  width: `${totalSlides * 100}%`,
                  display: "grid",
                  gridTemplateColumns: `repeat(${products.length}, 1fr)`,
                  gap: "1.5rem",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="LTProductsCarouselCard">
                    {/* Badge de descuento */}
                    <div className="LTProductsCarouselCardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div
                      className="LTProductsCarouselCardImage"
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

                    {/* Información del producto */}
                    <div className="LTProductsCarouselCardInfo">
                      <div className="LTProductsCarouselCardTopContent">
                        <div className="LTProductsCarouselCardCategory">
                          {product.brand}
                        </div>
                        <h3 className="LTProductsCarouselCardTitle">
                          {product.name}
                        </h3>

                        {product.isLaunch && (
                          <div className="LTProductsCarouselCardLaunchBadge">
                            Lanzamiento
                          </div>
                        )}
                      </div>

                      <div className="LTProductsCarouselCardBottomContent">
                        <div className="LTProductsCarouselCardPricing">
                          <div className="LTProductsCarouselCardOriginalPrice">
                            $ {formatPrice(product.originalPrice)}
                          </div>
                          <div className="LTProductsCarouselCardFinalPrice">
                            $ {formatPrice(product.discountPrice)}
                          </div>
                        </div>

                        <div className="LTProductsCarouselCardActions">
                          <button className="LTProductsCarouselCardAddToCart lt-button-card-variant2">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarouselActionIcon"
                            />
                            Agregar
                          </button>
                          <FavoriteButton product={product} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha derecha */}
            <button className="lt-arrow-nav" onClick={goToNext}>
              <svg viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LTProductsCarousel;
