import React, { useState, useEffect, useRef } from "react";
import "./LTPromoBannersMobile.css";
import LTSectionTitle from "../../../components/common/LTSectionTitle";

const LTPromoBannersMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const promoBanners = [
    {
      id: 1,
      category: "Nuevo",
      badge: "Audio",
      kicker: "Escuchá",
      title: "Calidad de sonido",
      titleHighlight: "sin límites",
      brandName: "Sony WH-1000XM5",
      description:
        "Sumergite en tu música con cancelación de ruido inteligente",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://headphones.com/cdn/shop/articles/WH-1000XM5_50_9e2d423a-c589-4465-89fd-6a43380243ea.jpg?v=1707861939&width=1100')",
    },
    {
      id: 2,
      category: "Nuevo",
      badge: "Televisores",
      kicker: "Descubrí",
      title: "Entretenimiento en",
      titleHighlight: "4K inmersivo",
      brandName: 'Samsung QN95B 65"',
      description:
        "Contraste perfecto, negros profundos y brillo HDR para cada detalle",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://img.us.news.samsung.com/us/wp-content/uploads/2022/03/16165405/Samsung-Neo-QLED-4K-QN95B-Front-Sand-Black-950x696.jpg')",
    },
    {
      id: 3,
      category: "Nuevo",
      badge: "Notebooks",
      kicker: "Potenciá",
      title: "Productividad y",
      titleHighlight: "creatividad",
      brandName: 'MacBook Pro 14"',
      description: "Renderizá, editá y diseñá con la nueva arquitectura M3",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/tile/Apple-MacBook-Pro-2up-231030.jpg.landing-big_2x.jpg')",
    },
  ];

  // Autoplay cada 5 segundos (más lento para mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [promoBanners.length]);

  // Manejo de swipe táctil
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe izquierda (siguiente)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length);
    }

    if (touchStart - touchEnd < -75) {
      // Swipe derecha (anterior)
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex - 1 + promoBanners.length) % promoBanners.length
      );
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="LTPromoBannersMobileWrapper">
      <div className="LTPromoBannersMobileContainer">
        <div className="lt-section-title-spacing">
          <LTSectionTitle title="Las mejores opciones en tecnología" />
        </div>

        <div className="LTPromoBannersMobileNav">
          <div
            className="LTPromoBannersMobileSlideTrack"
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="LTPromoBannersMobileCards"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {promoBanners.map((banner) => (
                <article
                  key={banner.id}
                  className="LTPromoBannerMobile"
                  style={{ "--ltpbm-banner-bg": banner.backgroundImage }}
                >
                  <div className="LTPromoBannerMobileContent">
                    <header className="LTPromoBannerMobileHeader">
                      <div className="LTPromoBannerMobileTopRow">
                        <span className="LTPromoBannerMobileBadge">
                          {banner.badge}
                        </span>
                        <span className="LTPromoBannerMobileCategory">
                          {banner.category}
                        </span>
                      </div>

                      <div className="LTPromoBannerMobileHeadline">
                        <span className="LTPromoBannerMobileKicker">
                          {banner.kicker}
                        </span>
                        <h3 className="LTPromoBannerMobileTitle">
                          {banner.title} <span>{banner.titleHighlight}</span>
                        </h3>
                      </div>
                    </header>

                    <div className="LTPromoBannerMobileBody">
                      <div className="LTPromoBannerMobileBrandName">
                        {banner.brandName}
                      </div>
                      <p className="LTPromoBannerMobileDescription">
                        {banner.description}
                      </p>
                    </div>

                    <footer className="LTPromoBannerMobileFooter">
                      <button className="LTPromoBannerMobileButton lt-button-light">
                        {banner.buttonText}
                      </button>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="LTPromoBannersMobileIndicators">
          {promoBanners.map((_, index) => (
            <button
              key={index}
              className={`LTPromoBannersMobileIndicator ${
                index === currentIndex
                  ? "LTPromoBannersMobileIndicator--active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir al banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LTPromoBannersMobile;

