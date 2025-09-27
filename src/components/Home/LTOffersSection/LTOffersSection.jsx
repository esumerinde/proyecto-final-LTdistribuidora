import React, { useState } from "react";
import "./LTOffersSection.css";

// Importar iconos SVG de ofertas
import circlePercentSvg from "../../../assets/icons/svg/circle-percentage-svgrepo-com.svg";
import starSvg from "../../../assets/icons/svg/star-svgrepo-com.svg";
import creditCardSvg from "../../../assets/icons/svg/credit-card-svgrepo-com.svg";
import giftSvg from "../../../assets/icons/svg/gift-svgrepo-com.svg";
import lockAltSvg from "../../../assets/icons/svg/lock-alt-svgrepo-com.svg";
import stopwatchSvg from "../../../assets/icons/svg/stopwatch-10-svgrepo-com.svg";

const LTOffersSection = () => {
  const offers = [
    {
      id: 1,
      icon: circlePercentSvg,
      main: "Ofertas",
      sub: "",
    },
    {
      id: 2,
      icon: starSvg,
      main: "Precios Exclusivos",
      sub: "",
    },
    {
      id: 3,
      icon: creditCardSvg,
      main: "Financiaciones",
      sub: "",
    },
    {
      id: 4,
      icon: giftSvg,
      main: "Vouchers",
      sub: "",
    },
    {
      id: 5,
      icon: lockAltSvg,
      main: "Privacidad",
      sub: "",
    },
    {
      id: 6,
      icon: stopwatchSvg,
      main: "Tiempo Limitado",
      sub: "",
    },
  ];

  // Estado para navegación en mobile
  const [currentIdx, setCurrentIdx] = useState(0);

  // Detectar mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIdx((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="LTOffersSectionWrapper">
      <div className="LTOffersSectionContainer">
        <h2 className="LTOffersSectionTitle">
          Las mejores ofertas de LT Electrónica
        </h2>
        {isMobile ? (
          <div className="LTOffersSectionMobileNav">
            <button
              className="LTOffersSectionMobileArrow"
              onClick={handlePrev}
              aria-label="Anterior"
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path d="M15.41,7.41L10.83,12L15.41,16.59L14,18L8,12L14,6L15.41,7.41Z" />
              </svg>
            </button>
            <div className="LTOffersSectionItem LTOffersSectionItemMobile">
              <div className="LTOffersSectionCircle">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={offers[currentIdx].icon}
                    alt={offers[currentIdx].main}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className="LTOffersSectionLabel">
                <span className="LTOffersSectionMain">
                  {offers[currentIdx].main}
                </span>
                {offers[currentIdx].sub && (
                  <span className="LTOffersSectionSub">
                    {offers[currentIdx].sub}
                  </span>
                )}
              </div>
            </div>
            <button
              className="LTOffersSectionMobileArrow"
              onClick={handleNext}
              aria-label="Siguiente"
            >
              <svg width="28" height="28" viewBox="0 0 24 24">
                <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="LTOffersSectionGrid">
            {offers.map((offer, idx) => (
              <div key={idx} className="LTOffersSectionItem">
                <div className="LTOffersSectionCircle">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={offer.icon}
                      alt={offer.main}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </div>
                <div className="LTOffersSectionLabel">
                  <span className="LTOffersSectionMain">{offer.main}</span>
                  {offer.sub && (
                    <span className="LTOffersSectionSub">{offer.sub}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LTOffersSection;
