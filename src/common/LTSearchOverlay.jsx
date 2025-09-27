import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./LTSearchOverlay.css";

const EXAMPLE_CELULARES = [
  {
    brand: "SAMSUNG",
    title: "Galaxy S21 Ultra 5G",
    price: "$299.999",
    oldPrice: "$399.999",
    discount: "-25%",
    img: "https://via.placeholder.com/60x60?text=Samsung",
  },
  {
    brand: "XIAOMI",
    title: "Redmi Note 10 Pro",
    price: "$189.999",
    oldPrice: "$249.999",
    discount: "-24%",
    img: "https://via.placeholder.com/60x60?text=Xiaomi",
  },
  {
    brand: "APPLE",
    title: "iPhone 13",
    price: "$799.999",
    oldPrice: "$899.999",
    discount: "-11%",
    img: "https://via.placeholder.com/60x60?text=iPhone",
  },
];

export default function LTSearchOverlay({ open, onClose, children }) {
  const [search, setSearch] = useState("");
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  // Bloquear/desbloquear scroll de body cuando el overlay está abierto (igual que LTCategoriesOverlay)
  useEffect(() => {
    if (open || closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closing]);

  // Debounce: muestra spinner solo después de 1s sin escribir, y luego los resultados
  useEffect(() => {
    if (search.trim().length === 0) {
      setLoading(false);
      setReady(false);
      return;
    }
    setLoading(false);
    setReady(false);
    const timer = setTimeout(() => {
      setLoading(true);
      setReady(false);
      const spinnerTimer = setTimeout(() => {
        setLoading(false);
        setReady(true);
      }, 1000);
      return () => clearTimeout(spinnerTimer);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setSearch("");
      onClose();
    }, 250);
  };

  const showCelulares =
    search.trim().toLowerCase().includes("celular") && ready;

  if (!open && !closing) return null;

  return createPortal(
    <div
      className={`LTSearchBarMobileOverlay${closing ? " slideOutRight" : ""}`}
      role="dialog"
      aria-modal="true"
      style={{
        zIndex: 2200,
        position: "fixed",
        right: 0,
        width: "90vw",
        maxWidth: 350,
        height: "100vh",
        ...(closing ? { pointerEvents: "none" } : {}),
      }}
    >
      <div className="LTSearchBarMobileOverlayHeader">
        {React.isValidElement(children) ? (
          React.cloneElement(children, {
            className: "LTSearchOverlay__input lt-search-bar",
            style: {
              fontFamily:
                'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            },
            value: search,
            onChange: (e) => setSearch(e.target.value),
            autoFocus: true,
            placeholder: "Buscar producto o categoría",
          })
        ) : (
          <input
            className="LTSearchOverlay__input lt-search-bar"
            style={{
              fontFamily:
                'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            placeholder="Buscar producto o categoría"
            type="text"
          />
        )}
        <button
          className="lt-button-light LTSearchBarMobileClose"
          onClick={handleClose}
          aria-label="Cerrar"
          type="button"
        >
          <svg
            className="LTSearchBarMobileCloseIcon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20M20 4L4 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {loading && search.trim().length > 0 && (
        <div
          className="LTSearchBarMobileResultsBlock"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "120px",
          }}
        >
          <div className="LTSearchBarMobileSpinner" />
        </div>
      )}
      {showCelulares && (
        <div className="LTSearchBarMobileResultsBlock">
          <div className="LTSearchBarMobileResultsTitle">
            PRODUCTOS PARA CELULAR
          </div>
          <div className="LTSearchBarMobileProducts">
            <div className="LTSearchBarMobileProductsList">
              {EXAMPLE_CELULARES.map((prod, idx) => (
                <div
                  className={`LTSearchBarMobileProductCard LTSearchBarMobileProductCardBig${
                    idx < EXAMPLE_CELULARES.length - 1 ? "" : " last"
                  }`}
                  key={idx}
                >
                  <img
                    className="LTSearchBarMobileProductImgBig"
                    src={prod.img}
                    alt={prod.title}
                  />
                  <div className="LTSearchBarMobileProductInfoBig">
                    <div className="LTSearchBarMobileProductBrandBig">
                      {prod.brand}
                    </div>
                    <div className="LTSearchBarMobileProductTitleBig">
                      {prod.title}
                    </div>
                    <div className="LTSearchBarMobileProductPriceRowBig">
                      <span className="LTSearchBarMobileProductOldPriceBig">
                        {prod.oldPrice}
                      </span>
                      <span className="LTSearchBarMobileProductPriceBig">
                        {prod.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="LTSearchBarMobileResultsFooter">
            <div className="LTSearchBarMobileResultsLinkWrapper">
              <span className="LTSearchBarMobileResultsText">
                {`Mostrar todos los productos para ${search}`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
