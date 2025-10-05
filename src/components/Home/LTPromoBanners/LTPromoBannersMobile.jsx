import React, { useState, useEffect } from "react";
import "./LTPromoBannersMobile.css";

const LTPromoBannersMobile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Autoplay cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [promoBanners.length]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % promoBanners.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + promoBanners.length) % promoBanners.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="LTPromoBannersMobileWrapper">
      <div className="LTPromoBannersMobileContainer">
        <h2 className="LTPromoBannersMobileTitle">
          Descubrí las mejores opciones en tecnología
        </h2>

        <div className="LTPromoBannersMobileNav">
          {/* Flecha izquierda */}
          <button
            className="LTPromoBannersMobileArrow LTPromoBannersMobileArrowLeft"
            onClick={goToPrevious}
            aria-label="Banner anterior"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
          </button>

          <div className="LTPromoBannersMobileSlideTrack">
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

          {/* Flecha derecha */}
          <button
            className="LTPromoBannersMobileArrow LTPromoBannersMobileArrowRight"
            onClick={goToNext}
            aria-label="Siguiente banner"
          >
            <svg viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
          </button>
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
