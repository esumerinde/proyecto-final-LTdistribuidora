import { useEffect, useState } from "react";

/**
 * Configuración centralizada de animación para transiciones del header
 */
export const HEADER_ANIMATION = {
  duration: 350, // ms
  css: "0.35s cubic-bezier(0.4, 0, 0.2, 1)",
};

/**
 * Hook para gestionar el posicionamiento y visibilidad del header y navbar
 *
 * @param {Object} options - Opciones de configuración
 * @param {boolean} options.showOfferBar - Si la barra de ofertas está activa
 * @param {boolean} options.forceOfferPinned - Si la barra debe permanecer fija (para admins)
 * @returns {Object} Estado del header y navbar
 */
export default function useHeaderReaccommodation({
  showOfferBar = false,
  forceOfferPinned = false,
} = {}) {
  // Estado de scroll: true cuando scrollY > 0
  const [isSticky, setIsSticky] = useState(false);

  // Alturas fijas conocidas (en px) - ajustadas para eliminar gaps
  const OFFER_HEIGHT = 32;
  const HEADER_HEIGHT = 75;
  const NAVBAR_HEIGHT = 55;

  /**
   * Determina si la barra de ofertas debe estar visible
   * - Si está forzada (admin), siempre visible
   * - Si no hay scroll y showOfferBar es true, visible
   * - Si hay scroll y no está forzada, oculta
   */
  const isOfferVisible = forceOfferPinned || (showOfferBar && !isSticky);

  /**
   * Calcula el offset superior del header
   * - Si la oferta está visible: OFFER_HEIGHT
   * - Si no: 0
   */
  const headerTop = isOfferVisible ? OFFER_HEIGHT : 0;

  /**
   * Calcula el offset superior del navbar
   * - Siempre es: headerTop + HEADER_HEIGHT
   */
  const navbarTop = headerTop + HEADER_HEIGHT;

  /**
   * Listener de scroll para actualizar el estado sticky
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsSticky(scrolled);
    };

    // Verificar estado inicial
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    isSticky,
    isOfferVisible,
    headerTop,
    navbarTop,
    animation: HEADER_ANIMATION.css,
    // Valores útiles para debugging o estilos
    offerHeight: OFFER_HEIGHT,
    headerHeight: HEADER_HEIGHT,
    navbarHeight: NAVBAR_HEIGHT,
  };
}
