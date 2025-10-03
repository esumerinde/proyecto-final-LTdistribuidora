import React, { useState } from "react";
import "./LTProductsCarousel4.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products4";

const LTProductsCarousel4 = () => {
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
    <section className="LTProductsCarousel4Wrapper">
      <div className="LTProductsCarousel4Container">
        <h2 className="LTProductsCarousel4Title">
          Cámaras — Fotografía y Video
        </h2>

        <div className="LTProductsCarousel4Content">
          {/* Banner promocional - “Lo último en Cámaras” */}
          <div className="LTProductsCarousel4Banner">
            <div className="LTProductsCarousel4BannerContent">
              <div className="LTProductsCarousel4BannerChips">
                <span className="LTProductsCarousel4BannerBadge">CÁMARAS</span>
                <span className="LTProductsCarousel4BannerDate">Nuevo</span>
              </div>

              <div className="LTProductsCarousel4BannerHeadline">
                <span className="LTProductsCarousel4BannerKicker">
                  Descubrí
                </span>
                <h3 className="LTProductsCarousel4BannerTitle">
                  Lo último en <span>Cámaras</span>
                </h3>
              </div>

              <div className="LTProductsCarousel4BannerBody">
                <div className="LTProductsCarousel4BannerBrandName">
                  Canon EOS R5
                </div>
                <p className="LTProductsCarousel4BannerDescription">
                  Precisión, calidad y tecnología avanzada. Descubrí la Canon
                  EOS R5, diseñada para fotógrafos profesionales y creadores
                  exigentes.
                </p>

                <button className="LTProductsCarousel4BannerButton lt-button-variant2">
                  VER MÁS
                </button>
              </div>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarousel4ProductsContainer">
            {/* Flecha izquierda */}
            <button
              className={`LTProductsCarousel4Arrow LTProductsCarousel4ArrowLeft ${
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
              className="LTProductsCarousel4CardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="LTProductsCarousel4Products"
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
                  <div key={product.id} className="LTProductsCarousel4Card">
                    {/* Badge de descuento */}
                    <div className="LTProductsCarousel4CardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div
                      className="LTProductsCarousel4CardImage"
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
                        className="LTProductsCarousel4CardImg"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          borderRadius: "12px",
                        }}
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="LTProductsCarousel4CardInfo">
                      <div className="LTProductsCarousel4CardTopContent">
                        <div className="LTProductsCarousel4CardCategory">
                          {product.brand}
                        </div>
                        <h3 className="LTProductsCarousel4CardTitle">
                          {product.name}
                        </h3>

                        {product.isLaunch && (
                          <div className="LTProductsCarousel4CardLaunchBadge">
                            Lanzamiento
                          </div>
                        )}
                      </div>

                      <div className="LTProductsCarousel4CardBottomContent">
                        <div className="LTProductsCarousel4CardPricing">
                          <div className="LTProductsCarousel4CardOriginalPrice">
                            $ {product.originalPrice.toFixed(2)}
                          </div>
                          <div className="LTProductsCarousel4CardFinalPrice">
                            $ {Math.floor(product.discountPrice)}
                            <span className="LTProductsCarousel4CardPriceDecimals">
                              .
                              {String(
                                Math.round((product.discountPrice % 1) * 100)
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="LTProductsCarousel4CardActions">
                          <button className="LTProductsCarousel4CardAddToCart">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarousel4ActionIcon"
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
              className={`LTProductsCarousel4Arrow LTProductsCarousel4ArrowRight ${
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

export default LTProductsCarousel4;
