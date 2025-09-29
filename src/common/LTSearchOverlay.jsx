import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./LTSearchOverlay.css";

import { products as products1 } from "../mocks/products";
import { products as products2 } from "../mocks/products2";
import { products as products3 } from "../mocks/products3";

// Unifica todos los productos en un solo array
const ALL_PRODUCTS = [...products1, ...products2, ...products3];

export default function LTSearchOverlay({ open, onClose, children }) {
  const [search, setSearch] = useState("");
  const [closing, setClosing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

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

  // Filtra productos por nombre o marca
  const filteredProducts =
    ready && search.trim().length > 0
      ? ALL_PRODUCTS.filter(
          (prod) =>
            prod.name.toLowerCase().includes(search.trim().toLowerCase()) ||
            prod.brand.toLowerCase().includes(search.trim().toLowerCase())
        )
      : [];

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
      {ready && search.trim().length > 0 && (
        <div className="LTSearchBarMobileResultsBlock">
          <div className="LTSearchBarMobileResultsTitle">
            {filteredProducts.length > 0
              ? `RESULTADOS PARA "${search}"`
              : "Sin resultados"}
          </div>
          <div className="LTSearchBarMobileProducts">
            <div className="LTSearchBarMobileProductsList">
              {filteredProducts.map((prod, idx) => (
                <div
                  className={`LTSearchBarMobileProductCard LTSearchBarMobileProductCardBig${
                    idx < filteredProducts.length - 1 ? "" : " last"
                  }`}
                  key={idx}
                >
                  <img
                    className="LTSearchBarMobileProductImgBig"
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "contain",
                      background: "#fff",
                      borderRadius: "8px",
                    }}
                  />
                  <div className="LTSearchBarMobileProductInfoBig">
                    <div className="LTSearchBarMobileProductBrandBig">
                      {prod.brand}
                    </div>
                    <div className="LTSearchBarMobileProductTitleBig">
                      {prod.name}
                    </div>
                    <div className="LTSearchBarMobileProductPriceRowBig">
                      <span className="LTSearchBarMobileProductOldPriceBig">
                        {prod.originalPrice ? `$${prod.originalPrice}` : ""}
                      </span>
                      <span className="LTSearchBarMobileProductPriceBig">
                        {prod.discountPrice ? `$${prod.discountPrice}` : ""}
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
                {filteredProducts.length > 0
                  ? `Mostrar todos los productos para "${search}"`
                  : ""}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
