import React, { useState } from "react";
import "./LTHeroProductsCarousel.css";
// Removed FavoriteButton and ShoppingBagIcon imports

// 20 productos de ejemplo
const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1} Ejemplo`,
  brand: [
    "SAMSUNG",
    "APPLE",
    "SONY",
    "DELL",
    "NINTENDO",
    "HP",
    "JBL",
    "GARMIN",
    "TP-LINK",
    "MICROSOFT",
  ][i % 10],
  originalPrice: 1000 + i * 50,
  discountPrice: 800 + i * 45,
  discount: 10 + (i % 15),
  size: "256GB, Titanium Gray",
  category: [
    "Smartphones",
    "Laptops",
    "Audio",
    "Tablets",
    "Gaming",
    "Impresoras",
    "Wearables",
    "Redes",
  ][i % 8],
  isLaunch: i % 3 === 0,
}));

const LTHeroProductsCarousel = () => {
  // Removed favorites state
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 5;
  const totalSlides = Math.ceil(products.length / itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex < totalSlides - 1 ? currentIndex + 1 : totalSlides - 1
    );
  };

  // Removed toggleFavorite logic

  // Slice products for current slide
  const startIdx = currentIndex * itemsPerView;
  const endIdx = startIdx + itemsPerView;
  const visibleProducts = products.slice(startIdx, endIdx);

  return (
    <div className="lt-hero-products-carousel-wrapper">
      <div className="lt-hero-products-carousel-products-container">
        {/* Flecha izquierda */}
        <button
          className={`lt-hero-products-carousel-arrow lt-hero-products-carousel-arrow-left${
            currentIndex === 0 ? " disabled" : ""
          }`}
          onClick={goToPrevious}
          disabled={currentIndex === 0}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </button>

        <div
          className="lt-hero-products-carousel-cards-and-indicators"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <div
            className="lt-hero-products-carousel-cards-row"
            style={{
              transform: `translateX(-${currentIndex * (100 / totalSlides)}%)`,
              transition: "transform 0.5s cubic-bezier(0.7, 0.2, 0.3, 1)",
              width: `${totalSlides * 100}%`,
              display: "grid",
              gridTemplateColumns: `repeat(${products.length}, 1fr)`,
              gap: "1.1rem",
              paddingLeft: "8px",
              paddingRight: "8px",
            }}
          >
            {products.map((product, idx) => (
              <div key={product.id} className="lt-hero-products-carousel-card">
                <div className="lt-hero-products-carousel-card-top-title">
                  {
                    [
                      "Llevate tu favorito",
                      "Lo querés",
                      "Porque te interesa",
                      "Visto recientemente",
                      "Medios de pago",
                      "Menos de $20.000",
                    ][idx % 6]
                  }
                </div>
                <div className="lt-hero-products-carousel-card-image">
                  <div className="lt-hero-products-carousel-card-image-placeholder">
                    <svg viewBox="0 0 24 24">
                      <path d="M21,9V7L15,1H5A2,2 0 0,0 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M14,2L20,8H14V2Z" />
                    </svg>
                  </div>
                </div>
                <div className="lt-hero-products-carousel-card-info">
                  <div className="lt-hero-products-carousel-card-category">
                    {product.brand}
                  </div>
                  <h3 className="lt-hero-products-carousel-card-title">
                    {product.name}
                  </h3>
                  <div className="lt-hero-products-carousel-card-bottom-content">
                    <div className="lt-hero-products-carousel-card-pricing">
                      <div className="lt-hero-products-carousel-card-original-price">
                        $ {product.originalPrice.toFixed(2)}
                      </div>
                      <div className="lt-hero-products-carousel-card-final-price">
                        $ {Math.floor(product.discountPrice)}
                        <span className="lt-hero-products-carousel-card-price-decimals">
                          .
                          {String(
                            Math.round((product.discountPrice % 1) * 100)
                          ).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        <button
          className={`lt-hero-products-carousel-arrow lt-hero-products-carousel-arrow-right${
            currentIndex === totalSlides - 1 ? " disabled" : ""
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
  );
};

export default LTHeroProductsCarousel;
