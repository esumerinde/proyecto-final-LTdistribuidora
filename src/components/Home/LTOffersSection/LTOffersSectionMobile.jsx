import React, { useState } from "react";
import "./LTOffersSectionMobile.css";
import circlePercentSvg from "../../../assets/icons/svg/circle-percentage-svgrepo-com.svg";
import starSvg from "../../../assets/icons/svg/star-svgrepo-com.svg";
import creditCardSvg from "../../../assets/icons/svg/credit-card-svgrepo-com.svg";
import giftSvg from "../../../assets/icons/svg/gift-svgrepo-com.svg";
import lockAltSvg from "../../../assets/icons/svg/lock-alt-svgrepo-com.svg";
import stopwatchSvg from "../../../assets/icons/svg/stopwatch-10-svgrepo-com.svg";

const offers = [
  { id: 1, icon: circlePercentSvg, main: "Ofertas", sub: "" },
  { id: 2, icon: starSvg, main: "Precios Exclusivos", sub: "" },
  { id: 3, icon: creditCardSvg, main: "Financiaciones", sub: "" },
  { id: 4, icon: giftSvg, main: "Vouchers", sub: "" },
  { id: 5, icon: lockAltSvg, main: "Privacidad", sub: "" },
  { id: 6, icon: stopwatchSvg, main: "Tiempo Limitado", sub: "" },
];

const LTOffersSectionMobile = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null); // 'left' | 'right' | null
  const [nextIdx, setNextIdx] = useState(null);

  const handlePrev = () => {
    if (animating) return;
    setDirection("right");
    setNextIdx(currentIdx === 0 ? offers.length - 1 : currentIdx - 1);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIdx(currentIdx === 0 ? offers.length - 1 : currentIdx - 1);
      setAnimating(false);
      setDirection(null);
      setNextIdx(null);
    }, 400);
  };
  const handleNext = () => {
    if (animating) return;
    setDirection("left");
    setNextIdx((currentIdx + 1) % offers.length);
    setAnimating(true);
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % offers.length);
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
  }, [animating, currentIdx]);

  return (
    <div className="LTOffersSectionContainer">
      <h2 className="LTOffersSectionMobileTitle">
        Las mejores ofertas de LT Electrónica
      </h2>
      <div className="LTOffersSectionMobileNav">
        <button
          className="LTOffersSectionMobileArrow"
          onClick={handlePrev}
          aria-label="Anterior"
          type="button"
          disabled={animating}
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path d="M15.41,7.41L10.83,12L15.41,16.59L14,18L8,12L14,6L15.41,7.41Z" />
          </svg>
        </button>
        <div className="LTOffersSectionMobile__slideTrack">
          {/* Actual card */}
          <div
            className={`LTOffersSectionItem LTOffersSectionItemMobile${
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
            <div className="LTOffersSectionCircle">
              <div className="LTOffersSectionCircle__inner">
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
          {/* Next card for animation */}
          {animating && nextIdx !== null && (
            <div
              className={`LTOffersSectionItem LTOffersSectionItemMobile slide-in-${direction}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <div className="LTOffersSectionCircle">
                <div className="LTOffersSectionCircle__inner">
                  <img
                    src={offers[nextIdx].icon}
                    alt={offers[nextIdx].main}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <div className="LTOffersSectionLabel">
                <span className="LTOffersSectionMain">
                  {offers[nextIdx].main}
                </span>
                {offers[nextIdx].sub && (
                  <span className="LTOffersSectionSub">
                    {offers[nextIdx].sub}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <button
          className="LTOffersSectionMobileArrow"
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
  );
};

export default LTOffersSectionMobile;
