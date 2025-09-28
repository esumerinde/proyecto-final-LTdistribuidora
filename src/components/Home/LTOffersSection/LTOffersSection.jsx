import React from "react";
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

  return (
    <section className="LTOffersSectionWrapper">
      <div className="LTOffersSectionContainer">
        <h2 className="LTOffersSectionTitle">
          Las mejores ofertas de LT Electrónica
        </h2>
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
      </div>
    </section>
  );
};

export default LTOffersSection;
