import React, { useState } from "react";
import "./LTSearchBar.css";
import LTSearchDesktop from "../../../../common/LTSearchDesktop";

const LTSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log("Buscar:", searchTerm);
  };

  const handleFocus = () => setInputFocused(true);
  // Prevent closing when clicking a term
  const blurTimeoutRef = React.useRef();
  const handleBlur = () => {
    blurTimeoutRef.current = setTimeout(() => setInputFocused(false), 120);
  };
  const handlePopularTermClick = (term) => {
    if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    setSearchTerm(term);
    setInputFocused(true);
  };

  // Click outside logic
  React.useEffect(() => {
    function handleClickOutside(e) {
      const wrapper = document.querySelector(".LTSearchBarWrapper");
      if (wrapper && !wrapper.contains(e.target)) {
        setInputFocused(false);
        setSearchTerm("");
      }
    }
    if (inputFocused) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputFocused]);

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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
      {inputFocused && (
        <LTSearchDesktop
          searchTerm={searchTerm}
          onPopularTermClick={handlePopularTermClick}
        />
      )}
    </div>
  );
};

export default LTSearchBar;
