import React, { useState } from "react";
import "./LTSearchBar.css";

const LTSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log("Buscar:", searchTerm);
  };

  return (
    <div className="LTSearchBarWrapper">
      <form className="LTSearchBarForm" onSubmit={handleSubmit}>
        <div className="LTSearchBarInputContainer">
          <input
            type="text"
            className="LTSearchBarInput"
            placeholder="Buscar producto o categoría"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="LTSearchBarButton"
            aria-label="Buscar"
          >
            <svg className="LTSearchBarIcon" viewBox="0 0 24 24">
              <path d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.39zM11 18a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LTSearchBar;
