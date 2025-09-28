import { useEffect, useState } from "react";

// Configuración centralizada de animación
export const HEADER_ANIMATION = {
  duration: 350, // ms
  css: "0.35s cubic-bezier(0.4, 0, 0.2, 1)",
};

// Hook para sincronizar el reacomodado animado de header, navbar y offer
export default function useHeaderReaccommodation({
  offerHeight = 32,
  headerHeight = 75,
} = {}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isOfferVisible, setIsOfferVisible] = useState(true);
  const [headerTop, setHeaderTop] = useState(offerHeight);
  const [navbarTop, setNavbarTop] = useState(headerHeight + offerHeight);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simula el estado de la barra de ofertas (puedes conectar con el estado real)
  useEffect(() => {
    // Aquí podrías escuchar un evento global, prop, o contexto para saber si la barra está visible
    // setIsOfferVisible(...)
    // Por ahora, se mantiene visible si no está sticky
    setIsOfferVisible(!isSticky);
  }, [isSticky]);

  useEffect(() => {
    // Calcula el top animado para header y navbar
    if (isSticky) {
      setHeaderTop(0);
      setNavbarTop(headerHeight);
    } else {
      setHeaderTop(offerHeight);
      setNavbarTop(headerHeight + offerHeight);
    }
  }, [isSticky, offerHeight, headerHeight]);

  return {
    isSticky,
    isOfferVisible,
    headerTop,
    navbarTop,
    animation: HEADER_ANIMATION.css,
  };
}
