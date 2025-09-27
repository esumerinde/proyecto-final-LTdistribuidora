import React, { useState, useEffect } from "react";
import "./LTScrollToTop.css";

const LTScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar/ocultar el botón basado en la posición del scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Función para scrollear hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="LTScrollToTopButton"
          onClick={scrollToTop}
          aria-label="Volver arriba"
        >
          <svg className="LTScrollToTopIcon" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3L7 8M12 3L17 8M12 3V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default LTScrollToTop;
