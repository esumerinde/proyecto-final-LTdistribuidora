import React, { useState, useEffect } from "react";
import "./LTProductsCarousel.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import LTProductsCarouselMobile from "./LTProductsCarouselMobile";

const MOBILE_BREAKPOINT = 600;

const LTProductsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Productos de ejemplo con datos placeholder - 12 productos
  const products = [
    {
      id: 1,
      name: 'Smart TV 55" 4K Ultra HD',
      originalPrice: 899999,
      discountPrice: 649999,
      discount: 28,
      category: "Televisores",
    },
    {
      id: 2,
      name: "iPhone 15 Pro 256GB",
      originalPrice: 1599999,
      discountPrice: 1399999,
      discount: 13,
      category: "Celulares",
    },
    {
      id: 3,
      name: "Notebook Gamer RTX 4060",
      originalPrice: 1299999,
      discountPrice: 999999,
      discount: 23,
      category: "Computadoras",
    },
    {
      id: 4,
      name: "Auriculares Gaming RGB",
      originalPrice: 89999,
      discountPrice: 59999,
      discount: 33,
      category: "Gaming",
    },
    {
      id: 5,
      name: 'Tablet 10.1" Android 256GB',
      originalPrice: 299999,
      discountPrice: 219999,
      discount: 27,
      category: "Tablets",
    },
    {
      id: 6,
      name: "PlayStation 5 Console",
      originalPrice: 799999,
      discountPrice: 699999,
      discount: 13,
      category: "Gaming",
    },
    {
      id: 7,
      name: "MacBook Air M2 13.6''",
      originalPrice: 1899999,
      discountPrice: 1699999,
      discount: 11,
      category: "Computadoras",
    },
    {
      id: 8,
      name: "Samsung Galaxy Watch 6",
      originalPrice: 399999,
      discountPrice: 329999,
      discount: 18,
      category: "Wearables",
    },
    {
      id: 9,
      name: "Cámara Canon EOS R50",
      originalPrice: 899999,
      discountPrice: 749999,
      discount: 17,
      category: "Fotografía",
    },
    {
      id: 10,
      name: "Monitor Gaming 27'' 144Hz",
      originalPrice: 459999,
      discountPrice: 379999,
      discount: 17,
      category: "Monitores",
    },
    {
      id: 11,
      name: "Drone DJI Mini 3",
      originalPrice: 699999,
      discountPrice: 599999,
      discount: 14,
      category: "Drones",
    },
    {
      id: 12,
      name: "Robot Aspiradora Xiaomi",
      originalPrice: 299999,
      discountPrice: 239999,
      discount: 20,
      category: "Hogar",
    },
  ];

  if (isMobile) {
    return <LTProductsCarouselMobile products={products} />;
  }

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
                          <div className="LTProductsCarouselImageContainer">
                            <div className="LTProductsCarouselImagePlaceholder">
                              <svg
                                viewBox="0 0 24 24"
                                className="LTProductsCarouselPlaceholderIcon"
                              >
                                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                              </svg>
                            </div>
                          </div>
                          <div className="LTProductsCarouselCardContent">
                            <div className="LTProductsCarouselCategory">
                              {product.category}
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
