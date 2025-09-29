import React from "react";
import "./LTPromoBannersMobile.css";

const promoBanners = [
  {
    id: 1,
    title: "GAMING WEEK",
    subtitle: "HASTA 40% OFF",
    description: "En productos gaming seleccionados",
    dateRange: "15 al 30 de septiembre",
    buttonText: "Ver ofertas",
    backgroundColor: "red",
    textColor: "white",
    accentColor: "#ff4757",
  },
  {
    id: 2,
    title: "SEPTIEMBRE",
    subtitle: "MES DE LA TECNOLOGÍA",
    description: "Renovate con la última tecnología",
    dateRange: "Todo el mes de septiembre",
    buttonText: "Ver más",
    backgroundColor: "gray",
    textColor: "dark",
    accentColor: "#2c2c2c",
  },
  {
    id: 3,
    title: "HASTA 50%",
    subtitle: "SMARTPHONES",
    description: "En celulares y accesorios seleccionados",
    dateRange: "15 al 25 de septiembre",
    buttonText: "Ver ofertas",
    backgroundColor: "blue",
    textColor: "white",
    accentColor: "#3742fa",
  },
];

const LTPromoBannersMobile = () => {
  return (
    <section className="LTPromoBannersMobileWrapper">
      <h2 className="LTPromoBannersMobileTitle">
        Descubrí las mejores ofertas en tecnología
      </h2>
      <div className="LTPromoBannersMobileCards">
        {promoBanners.map((banner) => (
          <div
            key={banner.id}
            className="LTPromoBannerMobileCard"
            style={{
              background:
                banner.backgroundColor === "red"
                  ? "linear-gradient(135deg, var(--lt-accent-color-dark), var(--lt-accent-color))"
                  : banner.backgroundColor === "gray"
                  ? "linear-gradient(135deg, var(--lt-accent-color-variant), var(--lt-accent-color))"
                  : banner.backgroundColor === "blue"
                  ? "linear-gradient(135deg, var(--lt-accent-color-variant), var(--lt-accent-color-dark))"
                  : undefined,
              color:
                banner.backgroundColor === "gray"
                  ? "var(--lt-black-text-color)"
                  : "var(--lt-white-text-color)",
            }}
          >
            <div className="LTPromoBannerMobileContent">
              <div className="LTPromoBannerMobileDate">{banner.dateRange}</div>
              <div className="LTPromoBannerMobileMain">
                <div className="LTPromoBannerMobileTitleCard">
                  {banner.title}
                </div>
                <div className="LTPromoBannerMobileSubtitle">
                  {banner.subtitle}
                </div>
                <div className="LTPromoBannerMobileDescription">
                  {banner.description}
                </div>
              </div>
              <div className="LTPromoBannerMobileImagePlaceholder">
                <div className="LTPromoBannerMobileImageIcon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                  </svg>
                </div>
              </div>
              <button className="LTPromoBannersMobileButton lt-button-light">
                {banner.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LTPromoBannersMobile;
