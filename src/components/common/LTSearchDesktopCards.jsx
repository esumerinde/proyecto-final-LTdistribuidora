import React from "react";
import "./LTSearchDesktopCards.css";
import { useEffect, useState } from "react";

const getFilteredProducts = (searchTerm, products, max = 3) => {
  if (!searchTerm) return [];
  const term = searchTerm.trim().toLowerCase();
  return products
    .filter(
      (prod) =>
        prod.name.toLowerCase().includes(term) ||
        prod.brand.toLowerCase().includes(term) ||
        (prod.category && prod.category.toLowerCase().includes(term))
    )
    .slice(0, max);
};

const LTSearchDesktopCards = ({ searchTerm, products }) => {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    let typingTimer, spinnerTimer;
    // Always reset immediately on searchTerm change
    setLoading(false);
    setReady(false);
    setTyping(false);
    if (!searchTerm || searchTerm.trim().length === 0) {
      return;
    }
    setTyping(true);
    typingTimer = setTimeout(() => {
      setTyping(false);
      setLoading(true);
      spinnerTimer = setTimeout(() => {
        setLoading(false);
        setReady(true);
      }, 1000);
    }, 1000);
    return () => {
      clearTimeout(typingTimer);
      clearTimeout(spinnerTimer);
      setLoading(false);
      setReady(false);
      setTyping(false);
    };
  }, [searchTerm]);

  const filtered = ready ? getFilteredProducts(searchTerm, products) : [];
  if (!searchTerm || searchTerm.trim().length === 0) return null;
  if (typing) {
    // Show absolutely nothing while typing
    return null;
  }
  if (loading) {
    // Show spinner only after 1s of no typing, centered vertically
    return (
      <div className="LTSearchDesktopCardsCol" style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            minHeight: 120,
            marginTop: "160px", // ajusta el valor según lo que necesites
          }}
        >
          <div className="LTSearchBarMobileSpinner" />
        </div>
      </div>
    );
  }
  if (ready) {
    return (
      <div className="LTSearchDesktopCardsCol">
        <div
          className="LTSearchDesktopCardsTitle"
          style={{ fontFamily: "var(--lt-font-family-alt)" }}
        >
          RESULTADOS PARA{" "}
          <span style={{ fontWeight: "var(--lt-font-weight-light)" }}>
            &quot;{searchTerm}&quot;
          </span>
        </div>
        <div className="LTSearchDesktopCardsList">
          {filtered.length === 0 ? (
            <div className="LTSearchDesktopCardsNoResults">Sin resultados</div>
          ) : (
            filtered.map((prod) => (
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
            ))
          )}
        </div>
        <div className="LTSearchDesktopCardsFooter">
          {filtered.length > 0 && (
            <span
              className="LTSearchDesktopCardsShowAll"
              style={{
                color: "var(--lt-muted-text-color)",
                fontFamily: "var(--lt-font-family-alt)",
              }}
            >
              Mostrar todos los productos para{" "}
              <span style={{ fontWeight: "var(--lt-font-weight-light)" }}>
                &quot;{searchTerm}&quot;
              </span>
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default LTSearchDesktopCards;
