import React, { useState, useEffect } from "react";
import "./LTProductsCarousel2.css"; // <- 3 -> 2
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products2"; // dejo tu mock igual

const LTProductsCarousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
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

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="LTProductsCarousel2Wrapper">
      <div className="LTProductsCarousel2Container">
        <h2 className="LTProductsCarousel2Title">
          Smartphones — Lo último de Apple y Samsung
        </h2>

        <div className="LTProductsCarousel2Content">
          {/* Banner promocional - “Lo último en Smartphones” */}
          <div
            className="LTProductsCarousel2Banner"
            style={{
              // CSS var para el ::before del banner (usalo en tu CSS)
              "--ltpc2-banner-bg":
                "url('https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="LTProductsCarousel2BannerContent">
              <div className="LTProductsCarousel2BannerChips">
                <span className="LTProductsCarousel2BannerBadge">
                  CELULARES
                </span>
                <span className="LTProductsCarousel2BannerDate">Nuevo</span>
              </div>

              <div className="LTProductsCarousel2BannerHeadline">
                <span className="LTProductsCarousel2BannerKicker">
                  Descubrí
                </span>
                <h3 className="LTProductsCarousel2BannerTitle">
                  Lo último en <span>Celulares</span>
                </h3>
              </div>

              <div className="LTProductsCarousel2BannerBody">
                <div className="LTProductsCarousel2BannerBrandName">
                  iPhone 14 Pro
                </div>
                <p className="LTProductsCarousel2BannerDescription">
                  Innovación, diseño y potencia. Descubrí el nuevo iPhone 14 Pro
                  Max con la mejor tecnología de Apple.
                </p>

                <button className="LTProductsCarousel2BannerButton lt-button-variant2">
                  VER MÁS
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarousel2ProductsContainer">
            {/* Flecha izquierda */}
            <button
              className="LTProductsCarousel2Arrow LTProductsCarousel2ArrowLeft"
              onClick={goToPrevious}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <div
              className="LTProductsCarousel2CardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="LTProductsCarousel2Products"
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
                  <div key={product.id} className="LTProductsCarousel2Card">
                    {/* Badge de descuento */}
                    <div className="LTProductsCarousel2CardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div
                      className="LTProductsCarousel2CardImage"
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
                        className="LTProductsCarousel2CardImg"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "12px",
                        }}
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="LTProductsCarousel2CardInfo">
                      <div className="LTProductsCarousel2CardTopContent">
                        <div className="LTProductsCarousel2CardCategory">
                          {product.brand}
                        </div>
                        <h3 className="LTProductsCarousel2CardTitle">
                          {product.name}
                        </h3>

                        {product.isLaunch && (
                          <div className="LTProductsCarousel2CardLaunchBadge">
                            Lanzamiento
                          </div>
                        )}
                      </div>

                      <div className="LTProductsCarousel2CardBottomContent">
                        <div className="LTProductsCarousel2CardPricing">
                          <div className="LTProductsCarousel2CardOriginalPrice">
                            $ {product.originalPrice.toFixed(2)}
                          </div>
                          <div className="LTProductsCarousel2CardFinalPrice">
                            $ {Math.floor(product.discountPrice)}
                            <span className="LTProductsCarousel2CardPriceDecimals">
                              .
                              {String(
                                Math.round((product.discountPrice % 1) * 100)
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="LTProductsCarousel2CardActions">
                          <button className="LTProductsCarousel2CardAddToCart">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarousel2ActionIcon"
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
              className="LTProductsCarousel2Arrow LTProductsCarousel2ArrowRight"
              onClick={goToNext}
            >
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

export default LTProductsCarousel2;
