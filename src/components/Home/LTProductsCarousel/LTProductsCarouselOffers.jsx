import React, { useState, useEffect } from "react";
import "./LTProductsCarouselOffers.css";
import FavoriteButton from "../../../components/common/FavoriteButton.jsx";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products";

// Función para formatear precios en formato argentino (231.990,00)
const formatPrice = (price) => {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const LTProductsCarouselOffers = () => {
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
    <section className="LTProductsCarouselOffersWrapper">
      <div className="LTProductsCarouselOffersContainer">
        <div className="LTProductsCarouselOffersContent">
          {/* Banner promocional - "Lo último en OFERTAS" */}
          <div
            className="LTProductsCarouselOffersBanner"
            style={{
              "--ltpc-offers-banner-bg":
                "url('https://images.pexels.com/photos/6753222/pexels-photo-6753222.jpeg')",
            }}
          >
            <div className="LTProductsCarouselOffersBannerContent">
              <div className="LTProductsCarouselOffersBannerChips">
                <span className="LTProductsCarouselOffersBannerBadge">
                  OFERTAS
                </span>
                <span className="LTProductsCarouselOffersBannerDate">
                  Nuevo
                </span>
              </div>

              <div className="LTProductsCarouselOffersBannerHeadline">
                <span className="LTProductsCarouselOffersBannerKicker">
                  Descubrí
                </span>
                <h3 className="LTProductsCarouselOffersBannerTitle">
                  Lo último en <span>OFERTAS</span>
                </h3>
              </div>

              <div className="LTProductsCarouselOffersBannerBody">
                <div className="LTProductsCarouselOffersBannerBrandName">
                  Tecnología
                </div>
                <p className="LTProductsCarouselOffersBannerDescription">
                  Descubrí promociones exclusivas con descuentos imperdibles en
                  tecnologías de última generación.
                </p>

                <button className="LTProductsCarouselOffersBannerButton lt-button-light">
                  VER MÁS
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarouselOffersProductsContainer">
            {/* Flecha izquierda */}
            <button className="lt-arrow-nav--violet" onClick={goToPrevious}>
              <svg viewBox="0 0 24 24">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <div
              className="LTProductsCarouselOffersCardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
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
                  gap: "1.5rem",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="LTProductsCarouselOffersCard"
                  >
                    {/* Badge de descuento */}
                    <div className="LTProductsCarouselOffersCardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div
                      className="LTProductsCarouselOffersCardImage"
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
                        className="LTProductsCarouselOffersCardImg"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "12px",
                        }}
                      />
                    </div>

                    {/* Información del producto */}
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
                          <button className="LTProductsCarouselOffersCardAddToCart lt-button-card">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarouselOffersActionIcon"
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
            <button className="lt-arrow-nav--violet" onClick={goToNext}>
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

export default LTProductsCarouselOffers;
