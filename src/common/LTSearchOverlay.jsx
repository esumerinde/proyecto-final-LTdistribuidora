import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./LTSearchOverlay.css";

// Estos imports son solo para mock. Reemplazar por la llamada al backend cuando se integre la API.
// Ejemplo: usar axios/fetch en un useEffect para traer los productos y guardarlos en un estado.
// import axios from 'axios';
// useEffect(() => {
//   axios.get('/api/productos').then(res => setAllProducts(res.data));
// }, []);

import { products as products1 } from "../mocks/products";
import { products as products2 } from "../mocks/products2";
import { products as products3 } from "../mocks/products3";

// Solo para mock. Cuando esté el backend, usar el estado con los productos traídos de la API.
const ALL_PRODUCTS = [...products1, ...products2, ...products3];

// Extraer términos más buscados dinámicamente
function getPopularTerms(products, max = 10) {
  const termCounts = {};
  products.forEach((p) => {
    [p.name, p.category, p.brand].forEach((field) => {
      if (field) {
        field
          .toLowerCase()
          .split(/\s|,|\./)
          .filter((w) => w.length > 2)
          .forEach((word) => {
            termCounts[word] = (termCounts[word] || 0) + 1;
          });
      }
    });
  });
  return Object.entries(termCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([term]) => term)
    .slice(0, max);
}

const popularTerms = getPopularTerms(ALL_PRODUCTS, 10);

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

  // Cuando se integre el backend, filtrar sobre el estado con los productos traídos de la API.
  // Filtra productos por nombre o marca
  const filteredProducts =
    ready && search.trim().length > 0
      ? ALL_PRODUCTS.filter(
          (prod) =>
            prod.name.toLowerCase().includes(search.trim().toLowerCase()) ||
            prod.brand.toLowerCase().includes(search.trim().toLowerCase()) ||
            (prod.category &&
              prod.category.toLowerCase().includes(search.trim().toLowerCase()))
        )
      : [];

  // Si el overlay no está abierto ni cerrándose, no renderiza nada
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
      {/* Header con input de búsqueda y botón de cerrar */}
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
      {/* Términos más buscados dinámicos estilo desktop */}
      {search.trim().length === 0 && !loading && !ready && (
        <div className="LTSearchBarMobileResultsBlock">
          <div className="LTSearchBarMobileResultsTitle">
            Términos más buscados
          </div>
          <ul className="LTSearchBarMobileSuggestionsList">
            {popularTerms.map((term) => (
              <li key={term} onClick={() => setSearch(term)}>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Spinner de carga mientras busca productos */}
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
      {/* Resultados de la búsqueda */}
      {ready && search.trim().length > 0 && (
        <div className="LTSearchBarMobileResultsBlock">
          {/* Título de resultados */}
          <div
            className="LTSearchDesktopCardsTitle"
            style={{
              fontFamily: "var(--lt-font-family-alt)",
              fontSize: "1.08rem",
              fontWeight: "var(--lt-font-weight-light)",
              marginBottom: "1.1rem",
              color: "var(--lt-text-color, #222)",
              paddingLeft: "18px",
              paddingTop: "18px",
            }}
          >
            {filteredProducts.length > 0 ? (
              <>
                RESULTADOS PARA{" "}
                <span style={{ fontWeight: "var(--lt-font-weight-light)" }}>
                  &quot;{search}&quot;
                </span>
              </>
            ) : (
              "Sin resultados"
            )}
          </div>
          {/* Lista de productos filtrados */}
          <div
            className="LTSearchDesktopCardsList"
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            {filteredProducts.slice(0, 3).map((prod) => (
              <div className="LTSearchDesktopCard" key={prod.id}>
                <img
                  className="LTSearchDesktopCardImg"
                  src={prod.image}
                  alt={prod.name}
                />
                <div className="LTSearchDesktopCardInfo">
                  <div className="LTSearchDesktopCardBrand">{prod.brand}</div>
                  <div className="LTSearchDesktopCardTitle">{prod.name}</div>
                  <div className="LTSearchDesktopCardPriceRow">
                    <span className="LTSearchDesktopCardOldPrice">
                      {prod.originalPrice ? `$${prod.originalPrice}` : ""}
                    </span>
                    <span
                      className="LTSearchDesktopCardPrice"
                      style={{ color: "var(--lt-accent-color-variant)" }}
                    >
                      {prod.discountPrice ? `$${prod.discountPrice}` : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Footer con link para ver todos los productos filtrados */}
          <div
            className="LTSearchDesktopCardsFooter"
            style={{
              marginTop: "1.7rem",
              fontSize: "0.98rem",
              color: "var(--lt-muted-text-color)",
              fontFamily: "var(--lt-font-family-alt)",
              paddingLeft: "18px",
            }}
          >
            {filteredProducts.length > 0 && (
              <span className="LTSearchDesktopCardsShowAll">
                Mostrar todos los productos para{" "}
                <span style={{ fontWeight: "var(--lt-font-weight-medium)" }}>
                  &quot;{search}&quot;
                </span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
