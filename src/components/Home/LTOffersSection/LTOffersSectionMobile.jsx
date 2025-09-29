import React, { useState } from "react";
import "./LTOffersSectionMobile.css";

// SVGs de ofertas (copiados de desktop)
const CirclePercentSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15.5 8.5L8.5 15.5M9.5 9.5H9.51M14.5 14.5H14.51M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5ZM15 14.5C15 14.7761 14.7761 15 14.5 15C14.2239 15 14 14.7761 14 14.5C14 14.2239 14.2239 14 14.5 14C14.7761 14 15 14.2239 15 14.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const StarSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const CreditCardSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 9H21M7 15H9M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const GiftSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 7V20M12 7H8.46429C7.94332 7 7.4437 6.78929 7.07533 6.41421C6.70695 6.03914 6.5 5.53043 6.5 5C6.5 4.46957 6.70695 3.96086 7.07533 3.58579C7.4437 3.21071 7.94332 3 8.46429 3C11.2143 3 12 7 12 7ZM12 7H15.5357C16.0567 7 16.5563 6.78929 16.9247 6.41421C17.293 6.03914 17.5 5.53043 17.5 5C17.5 4.46957 17.293 3.96086 16.9247 3.58579C16.5567 3.21071 16.0567 3 15.5357 3C12.7857 3 12 7 12 7ZM5 12H19V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V12ZM4.6 12H19.4C19.9601 12 20.2401 12 20.454 11.891C20.6422 11.7951 20.7951 11.6422 20.891 11.454C21 11.2401 21 10.9601 21 10.4V8.6C21 8.03995 21 7.75992 20.891 7.54601C20.7951 7.35785 20.6422 7.20487 20.454 7.10899C20.2401 7 19.9601 7 19.4 7H4.6C4.03995 7 3.75992 7 3.54601 7.10899C3.35785 7.20487 3.20487 7.35785 3.10899 7.54601C3 7.75992 3 8.03995 3 8.6V10.4C3 10.9601 3 11.2401 3.10899 11.454C3.20487 11.6422 3.35785 11.7951 3.54601 11.891C3.75992 12 4.03995 12 4.6 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const LockAltSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const StopwatchSvg = (
  <svg
    className="LTOffersSectionMobileIcon"
    width="260"
    height="260"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M20.5 6.5L18.5 4.5M9.5 2.5H13.5M7.2 12.2143L9.2 10.5V16.5M19.5 13.5C19.5 17.9183 15.9183 21.5 11.5 21.5C7.08172 21.5 3.5 17.9183 3.5 13.5C3.5 9.08172 7.08172 5.5 11.5 5.5C15.9183 5.5 19.5 9.08172 19.5 13.5ZM13.7 16.5C12.8716 16.5 12.2 15.8284 12.2 15V12C12.2 11.1716 12.8716 10.5 13.7 10.5C14.5284 10.5 15.2 11.1716 15.2 12V15C15.2 15.8284 14.5284 16.5 13.7 16.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const offers = [
  { id: 1, name: "Ofertas", icon: CirclePercentSvg },
  { id: 2, name: "Exclusivos", icon: StarSvg },
  { id: 3, name: "Financiaciones", icon: CreditCardSvg },
  { id: 4, name: "Vouchers", icon: GiftSvg },
  { id: 5, name: "Privacidad", icon: LockAltSvg },
  { id: 6, name: "Limitado", icon: StopwatchSvg },
];

const LTOffersSectionMobile = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIdx((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  const offer = offers[currentIdx];

  return (
    <section className="LTOffersMobileWrapper">
      <div className="LTOffersMobileHeader">
        <h2 className="LTOffersMobileTitle lt-big-title">
          Las mejores ofertas de LT Electrónica
        </h2>
      </div>
      <div className="LTOffersMobileCarousel">
        <div className="LTOffersMobileNav__arrow LTOffersMobileNav__arrow--left">
          <button
            className="LTOffersMobileArrow"
            onClick={handlePrev}
            aria-label="Anterior"
            type="button"
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M15.41,7.41L10.83,12L15.41,16.59L14,18L8,12L14,6L15.41,7.41Z" />
            </svg>
          </button>
        </div>
        <div className="LTOffersMobileItem">
          <div className="LTOffersMobileCircle">
            <div className="LTOffersMobileIconContainer">{offer.icon}</div>
          </div>
          <div className="LTOffersMobileLabel">{offer.name}</div>
        </div>
        <div className="LTOffersMobileNav__arrow LTOffersMobileNav__arrow--right">
          <button
            className="LTOffersMobileArrow"
            onClick={handleNext}
            aria-label="Siguiente"
            type="button"
          >
            <svg width="28" height="28" viewBox="0 0 24 24">
              <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LTOffersSectionMobile;
