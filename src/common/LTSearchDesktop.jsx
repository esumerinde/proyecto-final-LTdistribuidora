import React from "react";
import "./LTSearchDesktop.css";
import { products as products1 } from "../mocks/products";
import { products as products2 } from "../mocks/products2";
import { products as products3 } from "../mocks/products3";
import LTSearchDesktopSuggestions from "./LTSearchDesktopSuggestions";
import LTSearchDesktopCards from "./LTSearchDesktopCards";

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

const allProducts = [...products1, ...products2, ...products3];
const popularTerms = getPopularTerms(allProducts, 10);

const LTSearchDesktop = ({ searchTerm, onPopularTermClick }) => {
  const hasSearch = searchTerm && searchTerm.trim().length > 0;
  return (
    <div className="LTSearchDesktopWrapper">
      <div className="LTSearchDesktopSuggestionsBox">
        {!hasSearch ? (
          <>
            <div className="LTSearchDesktopSuggestionsTitle">
              TÉRMINOS MÁS BUSCADOS
            </div>
            <ul className="LTSearchDesktopSuggestionsList">
              {popularTerms.map((term) => (
                <li
                  key={term}
                  onClick={() => onPopularTermClick && onPopularTermClick(term)}
                  style={{ cursor: "pointer" }}
                >
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="LTSearchDesktopColumns">
            <LTSearchDesktopSuggestions
              searchTerm={searchTerm}
              products={allProducts}
            />
            <LTSearchDesktopCards
              key={searchTerm}
              searchTerm={searchTerm}
              products={allProducts}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LTSearchDesktop;
