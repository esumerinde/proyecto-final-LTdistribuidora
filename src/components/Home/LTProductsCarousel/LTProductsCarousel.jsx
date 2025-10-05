import React, { useState, useEffect } from "react";
import "./LTProductsCarousel.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import LTProductsCarouselMobile from "./LTProductsCarousel1Mobile";
import { products } from "../../../mocks/products";

// Componente principal del carrusel de productos. Acá se renderizan los productos y se maneja el slide.
const LTProductsCarousel = () => {
  // Estado para el slide actual
  const [currentIndex, setCurrentIndex] = useState(0);
  // Estado para favoritos (se puede conectar al backend)
  const [favorites, setFavorites] = useState([]);

  // Cantidad de productos por slide (ajustar según diseño)
  const itemsPerSlide = 4;
  // Calcula cuántos slides hay en total
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  // Navegación: ir al slide anterior (infinito)
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  // Navegación: ir al slide siguiente (infinito)
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

  // Marcar/desmarcar favorito (esto se puede conectar al backend)
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Formatea el precio en formato argentino
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Render principal del carrusel
  return (
    <section className="LTProductsCarouselWrapper">
      <div className="LTProductsCarouselContainer">
        <div className="LTProductsCarouselGradientBox">
          <div className="LTProductsCarouselGradientRow">
            {/* Título principal, se puede personalizar desde backend si hace falta */}
            <div className="LTProductsCarouselGradientTitle">
              {`Descubrí nuestras\nmejores ofertas`}
            </div>
            {/* Flecha para ir al slide anterior */}
            <button
              className="LTProductsCarouselGradientArrow"
              onClick={goToPrevious}
            >
              <svg viewBox="0 0 24 24">
                <path d="M14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59L14 6z" />
              </svg>
            </button>
            {/* Carrusel de productos y los indicadores */}
            <div className="LTProductsCarouselCardsAndIndicators">
              <div
                className="LTProductsCarouselTrack"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                  transition: "transform 0.5s cubic-bezier(.7,.2,.3,1)",
                  display: "flex",
                }}
              >
                {/* Renderiza cada slide con sus productos. Cuando el backend esté, mapear los productos reales acá */}
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
                          {/* Badge de descuento, viene del backend */}
                          <div className="LTProductsCarouselDiscount">
                            -{product.discount}%
                          </div>
                          {/* Imagen del producto, reemplazar por la URL real del backend */}
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
                          {/* Contenido textual: marca, nombre, precios */}
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
                            {/* Botones de acción: agregar al carrito y favorito. Integrar con backend si hace falta */}
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
              {/* Indicadores de slide, para mostrar en qué slide está el usuario */}
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
            {/* Flecha para ir al slide siguiente */}
            <button
              className="LTProductsCarouselGradientArrow"
              onClick={goToNext}
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
