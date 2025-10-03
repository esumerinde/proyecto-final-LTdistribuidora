import { useEffect, useLayoutEffect, useState } from "react";

// Configuración centralizada de animación
export const HEADER_ANIMATION = {
  duration: 350, // ms
  css: "0.35s cubic-bezier(0.4, 0, 0.2, 1)",
};

// Hook para sincronizar el reacomodado animado de header, navbar y offer
export default function useHeaderReaccommodation({
  offerHeight = 32,
  headerHeight = 75,
  forceOfferPinned = false,
} = {}) {
  const [isSticky, setIsSticky] = useState(false);
  const [isOfferVisible, setIsOfferVisible] = useState(true);
  const [measuredOfferHeight, setMeasuredOfferHeight] = useState(offerHeight);
  const [measuredHeaderHeight, setMeasuredHeaderHeight] =
    useState(headerHeight);
  const [headerTop, setHeaderTop] = useState(offerHeight);
  const [navbarTop, setNavbarTop] = useState(headerHeight + offerHeight);

  const resolvedOfferHeight = Number.isFinite(measuredOfferHeight)
    ? measuredOfferHeight
    : offerHeight;
  const resolvedHeaderHeight = Number.isFinite(measuredHeaderHeight)
    ? measuredHeaderHeight
    : headerHeight;

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!forceOfferPinned && offerHeight === 0) {
      setMeasuredOfferHeight(0);
      return undefined;
    }

    const offerElement = document.querySelector(".LTHeaderOfferBar");
    if (!offerElement) {
      setMeasuredOfferHeight(offerHeight);
      return undefined;
    }

    const applyHeight = () => {
      const nextHeight = offerElement.getBoundingClientRect().height;
      if (!Number.isFinite(nextHeight)) return;
      setMeasuredOfferHeight((previous) => {
        if (!Number.isFinite(previous)) return nextHeight;
        return Math.abs(previous - nextHeight) > 0.5 ? nextHeight : previous;
      });
    };

    applyHeight();

    if (typeof ResizeObserver === "undefined") {
      const intervalId = window.setInterval(applyHeight, 250);
      return () => window.clearInterval(intervalId);
    }

    const resizeObserver = new ResizeObserver(applyHeight);
    resizeObserver.observe(offerElement);

    return () => resizeObserver.disconnect();
  }, [offerHeight, forceOfferPinned]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const headerElement = document.querySelector(".LTHeaderWrapper");
    if (!headerElement) {
      setMeasuredHeaderHeight(headerHeight);
      return undefined;
    }

    const applyHeight = () => {
      const nextHeight = headerElement.getBoundingClientRect().height;
      if (!Number.isFinite(nextHeight)) return;
      setMeasuredHeaderHeight((previous) => {
        if (!Number.isFinite(previous)) return nextHeight;
        return Math.abs(previous - nextHeight) > 0.5 ? nextHeight : previous;
      });
    };

    applyHeight();

    if (typeof ResizeObserver === "undefined") {
      const intervalId = window.setInterval(applyHeight, 250);
      return () => window.clearInterval(intervalId);
    }

    const resizeObserver = new ResizeObserver(applyHeight);
    resizeObserver.observe(headerElement);

    return () => resizeObserver.disconnect();
  }, [headerHeight]);

  // Simula el estado de la barra de ofertas (puedes conectar con el estado real)
  useEffect(() => {
    // Aquí podrías escuchar un evento global, prop, o contexto para saber si la barra está visible
    // setIsOfferVisible(...)
    // Por ahora, se mantiene visible si no está sticky
    setIsOfferVisible(!isSticky);
  }, [isSticky]);

  useEffect(() => {
    if (forceOfferPinned) {
      setHeaderTop(resolvedOfferHeight);
      setNavbarTop(resolvedHeaderHeight + resolvedOfferHeight);
      return;
    }

    // Calcula el top animado para header y navbar
    if (isSticky) {
      setHeaderTop(0);
      setNavbarTop(resolvedHeaderHeight);
    } else {
      setHeaderTop(resolvedOfferHeight);
      setNavbarTop(resolvedHeaderHeight + resolvedOfferHeight);
    }
  }, [
    isSticky,
    resolvedOfferHeight,
    resolvedHeaderHeight,
    headerHeight,
    forceOfferPinned,
  ]);

  return {
    isSticky,
    isOfferVisible,
    headerTop,
    navbarTop,
    animation: HEADER_ANIMATION.css,
  };
}
