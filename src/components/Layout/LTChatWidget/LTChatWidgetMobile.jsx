import React, { useState, useEffect } from "react";
import "./LTChatWidgetMobile.css";
import LTChatWidgetMobileOverlay from "./LTChatWidgetMobileOverlay";
import { isMobile } from "../../../common/isMobile";

// Icono de chat para el botón flotante
const ChatIcon = () => (
  <svg className="LTChatWidgetIcon" viewBox="0 0 24 24">
    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z" />
  </svg>
);

/**
 * Componente de chat flotante para mobile.
 * Usa el util isMobile para mostrar solo en dispositivos móviles.
 */
/**
 * Componente de chat flotante para mobile.
 * - El botón de chat sube arriba del botón de scroll-to-top cuando este aparece.
 * - Usa el util isMobile para mostrar solo en dispositivos móviles.
 * - Animación y posición controlada por CSS y estado local.
 */
const LTChatWidgetMobile = () => {
  // Estado para abrir/cerrar el overlay lateral
  const [isOpen, setIsOpen] = useState(false);
  // Estado para mostrar el loader al abrir el chat
  const [isLoading, setIsLoading] = useState(false);
  // Estado para saber si el botón de scroll está visible
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  // Hook para detectar si el botón de scroll-to-top está visible
  // Se llama SIEMPRE antes de cualquier return condicional (regla de React)
  useEffect(() => {
    const toggleVisibility = () => {
      setIsScrollVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Solo renderiza el widget si es mobile
  if (!isMobile()) return null;

  // Abre/cierra el overlay lateral con spinner
  const handleToggleChat = () => {
    if (!isOpen) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(true);
      }, 600);
    } else {
      setIsOpen(false);
      setIsLoading(false);
    }
  };
  // Clase dinámica para el botón flotante de chat
  // El botón solo sube si el scroll está visible, nunca por el estado del chat
  const buttonClass = isScrollVisible
    ? "LTChatWidgetMobileButton LTChatWidgetMobileButton--aboveScroll"
    : "LTChatWidgetMobileButton";

  return (
    <>
      {/* Botón flotante para abrir el chat overlay lateral */}
      <button
        className={buttonClass}
        aria-label="Abrir chat"
        onClick={handleToggleChat}
      >
        {isLoading ? (
          <div className="LTChatWidgetLoader">
            <div className="LTChatWidgetSpinner"></div>
          </div>
        ) : (
          <svg className="LTChatWidgetIcon" viewBox="0 0 24 24">
            <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z" />
          </svg>
        )}
      </button>
      {/* Overlay lateral de chat */}
      <LTChatWidgetMobileOverlay open={isOpen} onClose={handleToggleChat} />
    </>
  );
};

export default LTChatWidgetMobile;
