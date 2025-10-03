import React, { useState } from "react";
import "./LTProductsCarousel3.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products3";

const LTProductsCarousel3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const itemsPerView = 4;

  const totalSlides = Math.ceil(products.length / itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex < totalSlides - 1 ? currentIndex + 1 : totalSlides - 1
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="LTProductsCarousel3Wrapper">
      <div className="LTProductsCarousel3Container">
        <h2 className="LTProductsCarousel3Title">
          Gaming — Nuevas consolas de ingreso
        </h2>

        <div className="LTProductsCarousel3Content">
          {/* Banner promocional - “Lo último en Gaming” */}
          <div className="LTProductsCarousel3Banner">
            <div className="LTProductsCarousel3BannerContent">
              <div className="LTProductsCarousel3BannerChips">
                <span className="LTProductsCarousel3BannerBadge">Gaming</span>
                <span className="LTProductsCarousel3BannerDate">Nuevo</span>
              </div>

              <div className="LTProductsCarousel3BannerHeadline">
                <span className="LTProductsCarousel3BannerKicker">
                  Descubrí
                </span>
                <h3 className="LTProductsCarousel3BannerTitle">
                  Lo último en <span>Gaming</span>
                </h3>
              </div>

              <div className="LTProductsCarousel3BannerBody">
                <div className="LTProductsCarousel3BannerBrandName">
                  ASUS ROG Strix
                </div>
                <p className="LTProductsCarousel3BannerDescription">
                  Potencia, portabilidad y rendimiento. Descubrí la ASUS ROG
                  Strix, diseñada para gamers exigentes.
                </p>

                <button className="LTProductsCarousel3BannerButton lt-button-variant2">
                  VER MÁS
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarousel3ProductsContainer">
            {/* Flecha izquierda */}
            <button
              className={`LTProductsCarousel3Arrow LTProductsCarousel3ArrowLeft ${
                currentIndex === 0 ? "disabled" : ""
              }`}
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <div
              className="LTProductsCarousel3CardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="LTProductsCarousel3Products"
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
                  <div key={product.id} className="LTProductsCarousel3Card">
                    {/* Badge de descuento */}
                    <div className="LTProductsCarousel3CardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div
                      className="LTProductsCarousel3CardImage"
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
                        className="LTProductsCarousel3CardImg"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "12px",
                        }}
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="LTProductsCarousel3CardInfo">
                      <div className="LTProductsCarousel3CardTopContent">
                        <div className="LTProductsCarousel3CardCategory">
                          {product.brand}
                        </div>
                        <h3 className="LTProductsCarousel3CardTitle">
                          {product.name}
                        </h3>

                        {product.isLaunch && (
                          <div className="LTProductsCarousel3CardLaunchBadge">
                            Lanzamiento
                          </div>
                        )}
                      </div>

                      <div className="LTProductsCarousel3CardBottomContent">
                        <div className="LTProductsCarousel3CardPricing">
                          <div className="LTProductsCarousel3CardOriginalPrice">
                            $ {product.originalPrice.toFixed(2)}
                          </div>
                          <div className="LTProductsCarousel3CardFinalPrice">
                            $ {Math.floor(product.discountPrice)}
                            <span className="LTProductsCarousel3CardPriceDecimals">
                              .
                              {String(
                                Math.round((product.discountPrice % 1) * 100)
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="LTProductsCarousel3CardActions">
                          <button className="LTProductsCarousel3CardAddToCart">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarousel3ActionIcon"
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
              className={`LTProductsCarousel3Arrow LTProductsCarousel3ArrowRight ${
                currentIndex === totalSlides - 1 ? "disabled" : ""
              }`}
              onClick={goToNext}
              disabled={currentIndex === totalSlides - 1}
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

export default LTProductsCarousel3;
