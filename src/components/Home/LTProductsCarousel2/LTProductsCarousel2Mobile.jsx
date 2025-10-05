import React, { useState, useRef } from "react";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import "./LTProductsCarousel2Mobile.css";
import { products as products2 } from "../../../mocks/products2";

const LTProductsCarousel2Mobile = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const [nextIdx, setNextIdx] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const touch = useRef({ startX: null, endX: null });
  const products = products2;

  const handleNext = React.useCallback(() => {
    if (animating) return;
    setDirection("left");
    setNextIdx((currentIdx + 1) % products.length);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % products.length);
      setAnimating(false);
      setDirection(null);
      setNextIdx(null);
    }, 400);
  }, [animating, currentIdx, products.length]);

  const handlePrev = () => {
    if (animating) return;
    setDirection("right");
    setNextIdx(currentIdx === 0 ? products.length - 1 : currentIdx - 1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIdx(currentIdx === 0 ? products.length - 1 : currentIdx - 1);
      setAnimating(false);
      setDirection(null);
      setNextIdx(null);
    }, 400);
  };

  // Auto-scroll every 4 seconds (only mobile)
  React.useEffect(() => {
    const MOBILE_BREAKPOINT = 600;
    if (typeof window !== "undefined" && window.innerWidth > MOBILE_BREAKPOINT)
      return;
    const interval = setInterval(() => {
      if (!animating) {
        handleNext();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [animating, currentIdx, handleNext]);

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

  // Swipe logic
  const handleTouchStart = (e) => {
    touch.current.startX = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touch.current.endX = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touch.current.startX !== null && touch.current.endX !== null) {
      const deltaX = touch.current.endX - touch.current.startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          handleNext();
        } else {
          handlePrev();
        }
      }
    }
    touch.current.startX = null;
    touch.current.endX = null;
  };

  if (!products || !products.length) return null;

  return (
    <section className="LTProductsCarousel2Mobile__wrapper">
      <div className="LTProductsCarousel2Mobile__container">
        <div
          className="LTProductsCarousel2MobileBanner"
          style={{
            "--ltpc2-banner-bg":
              "url('https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop')",
          }}
        >
          <div className="LTProductsCarousel2MobileBannerContent">
            <div className="LTProductsCarousel2MobileBannerChips">
              <span className="LTProductsCarousel2MobileBannerBadge">
                CELULARES
              </span>
              <span className="LTProductsCarousel2MobileBannerDate">Nuevo</span>
            </div>

            <div className="LTProductsCarousel2MobileBannerHeadline">
              <span className="LTProductsCarousel2MobileBannerKicker">
                Descubrí
              </span>
              <h3 className="LTProductsCarousel2MobileBannerTitle">
                Lo último en <span>Celulares</span>
              </h3>
            </div>

            <div className="LTProductsCarousel2MobileBannerBody">
              <div className="LTProductsCarousel2MobileBannerBrandName">
                iPhone 14 Pro
              </div>
              <p className="LTProductsCarousel2MobileBannerDescription">
                Innovación, diseño y potencia
              </p>

              <button className="LTProductsCarousel2MobileBannerButton lt-button-variant2">
                VER MÁS
              </button>
            </div>
          </div>
        </div>
        <div className="LTProductsCarousel2MobileNav">
          <div className="LTProductsCarousel2MobileNav__arrow LTProductsCarousel2MobileNav__arrow--left">
            <button
              className="LTProductsCarousel2MobileArrow"
              onClick={handlePrev}
              aria-label="Anterior"
              type="button"
              disabled={animating}
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path d="M15.41,7.41L10.83,12L15.41,16.59L14,18L8,12L14,6L15.41,7.41Z" />
              </svg>
            </button>
          </div>
          <div className="LTProductsCarousel2MobileNav__center">
            <div
              className="LTProductsCarousel2Mobile__slideTrack"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={`LTProductsCarousel2Mobile__card${
                  animating && direction ? ` slide-out-${direction}` : ""
                }`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  pointerEvents: animating ? "none" : "auto",
                }}
              >
                {/* Card content actual */}
                <div className="LTProductsCarousel2Mobile__discount">
                  -{products[currentIdx].discount}%
                </div>
                <div className="LTProductsCarousel2Mobile__image">
                  {products[currentIdx].image ? (
                    <img
                      src={products[currentIdx].image}
                      alt={products[currentIdx].name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        background: "#fff",
                        borderRadius: "8px",
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="LTProductsCarousel2Mobile__placeholderIcon"
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto",
                      }}
                    >
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  )}
                </div>
                <div className="LTProductsCarousel2Mobile__info">
                  <div className="LTProductsCarousel2Mobile__brand">
                    {products[currentIdx].brand}
                  </div>
                  <div
                    className="LTProductsCarousel2Mobile__titleCard"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                    }}
                  >
                    {products[currentIdx].name}
                  </div>
                  <div className="LTProductsCarousel2Mobile__priceOld">
                    {formatPrice(products[currentIdx].originalPrice)}
                  </div>
                  <div className="LTProductsCarousel2Mobile__priceNew">
                    {formatPrice(products[currentIdx].discountPrice)}
                  </div>
                </div>
                <div className="LTProductsCarousel2Mobile__actions">
                  <button className="LTProductsCarousel2Mobile__addBtn">
                    <img
                      src={ShoppingBagIcon}
                      alt="Agregar"
                      className="LTProductsCarousel2Mobile__actionIcon"
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "6px",
                      }}
                    />
                    Agregar
                  </button>
                  <FavoriteButton
                    isFavorite={favorites.includes(products[currentIdx].id)}
                    onClick={() => toggleFavorite(products[currentIdx].id)}
                  />
                </div>
              </div>
              {/* Card nueva que entra */}
              {animating && nextIdx !== null && (
                <div
                  className={`LTProductsCarousel2Mobile__card slide-in-${direction}`}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 3,
                    pointerEvents: "none",
                  }}
                >
                  {/* Card content nueva */}
                  <div className="LTProductsCarousel2Mobile__discount">
                    -{products[nextIdx].discount}%
                  </div>
                  <div className="LTProductsCarousel2Mobile__image">
                    {products[nextIdx].image ? (
                      <img
                        src={products[nextIdx].image}
                        alt={products[nextIdx].name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          background: "#fff",
                          borderRadius: "8px",
                          display: "block",
                          margin: "0 auto",
                        }}
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="LTProductsCarousel2Mobile__placeholderIcon"
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "0 auto",
                        }}
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                    )}
                  </div>
                  <div className="LTProductsCarousel2Mobile__info">
                    <div className="LTProductsCarousel2Mobile__brand">
                      {products[nextIdx].brand}
                    </div>
                    <div
                      className="LTProductsCarousel2Mobile__titleCard"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                      }}
                    >
                      {products[nextIdx].name}
                    </div>
                    <div className="LTProductsCarousel2Mobile__priceOld">
                      {formatPrice(products[nextIdx].originalPrice)}
                    </div>
                    <div className="LTProductsCarousel2Mobile__priceNew">
                      {formatPrice(products[nextIdx].discountPrice)}
                    </div>
                  </div>
                  <div className="LTProductsCarousel2Mobile__actions">
                    <button className="LTProductsCarousel2Mobile__addBtn">
                      <img
                        src={ShoppingBagIcon}
                        alt="Agregar"
                        className="LTProductsCarousel2Mobile__actionIcon"
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "6px",
                        }}
                      />
                      Agregar
                    </button>
                    <FavoriteButton
                      isFavorite={favorites.includes(products[nextIdx].id)}
                      onClick={() => toggleFavorite(products[nextIdx].id)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="LTProductsCarousel2Mobile__indicators">
              {products.map((_, idx) => (
                <div
                  key={idx}
                  className={`LTProductsCarousel2Mobile__indicator${
                    idx === currentIdx
                      ? " LTProductsCarousel2Mobile__indicator--active"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="LTProductsCarousel2MobileNav__arrow LTProductsCarousel2MobileNav__arrow--right">
            <button
              className="LTProductsCarousel2MobileArrow"
              onClick={handleNext}
              aria-label="Siguiente"
              type="button"
              disabled={animating}
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LTProductsCarousel2Mobile;
