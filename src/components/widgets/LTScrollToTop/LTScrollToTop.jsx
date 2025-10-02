import React, { useState, useEffect } from "react";
import "./LTScrollToTop.css";
import { isMobile } from "@utils/responsive/isMobile";

/**
 * Botón Scroll to Top para desktop.
 * - Solo se renderiza en desktop usando isMobile.js
 * - Muestra el botón solo si el usuario scrollea más de 300px
 * - Sin lógica redundante ni duplicada
 */
const LTScrollToTop = () => {
  // Estado para mostrar/ocultar el botón según el scroll
  const [isVisible, setIsVisible] = useState(false);
  // Estado para animación de salida
  const [hideAnim, setHideAnim] = useState(false);

  // Escucha el scroll y actualiza la visibilidad del botón
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Maneja la animación de salida cuando el botón desaparece
  useEffect(() => {
    if (!isVisible) {
      setHideAnim(true);
      const timeout = setTimeout(() => setHideAnim(false), 450);
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  // Solo renderiza el botón si NO es mobile (desktop)
  if (isMobile()) return null;

  // Función para scrollear suavemente hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Botón flotante solo visible si el usuario scrollea más de 300px */}
      {(isVisible || hideAnim) && (
        <button
          className={`LTScrollToTopButton ${
            isVisible
              ? "LTScrollToTopButton--show"
              : "LTScrollToTopButton--hide"
          }`}
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
