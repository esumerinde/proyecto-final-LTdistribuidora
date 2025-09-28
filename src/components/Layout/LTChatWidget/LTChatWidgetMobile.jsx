import React, { useState, useEffect } from "react";
import "./LTChatWidgetMobile.css";
import logoBlancoChico from "../../../assets/images/logos/logo-blanco-chico.png";
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
  // Animación de cierre eliminada
  // Estado para abrir/cerrar el chat
  const [isOpen, setIsOpen] = useState(false);
  // Estado para mostrar el loader al abrir el chat
  const [isLoading, setIsLoading] = useState(false);
  // Estado para el texto de consulta
  const [consultaText, setConsultaText] = useState("");
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

  // Abre/cierra el chat, muestra loader al abrir
  // El loader simula una carga de 600ms antes de mostrar el chat
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
      {/* Botón flotante para abrir el chat. Siempre visible y no se mueve al abrir el chatbox */}
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
          <ChatIcon />
        )}
      </button>

      {/* Modal del chat. Solo se muestra si isOpen es true. */}
      {isOpen && (
        <>
          {/* Overlay primero para que el modal quede arriba */}
          <div className="LTChatWidgetOverlay" onClick={handleToggleChat}></div>
          <div className="LTChatWidgetModal">
            <div className="LTChatWidgetModalContent">
              {/* Header igual a desktop */}
              <div className="LTChatWidgetHeader">
                <div
                  className="LTChatWidgetTitle"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#fff",
                    padding: "8px 0 8px 0",
                    width: "100%",
                  }}
                >
                  <img
                    src={logoBlancoChico}
                    alt="Logo LT"
                    style={{
                      width: "32px",
                      height: "auto",
                      marginLeft: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <span
                    style={{
                      color: "var(--lt-black-text-color)",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    Asistente Personal
                  </span>
                </div>
                <button
                  className="LTChatWidgetCloseButton"
                  onClick={handleToggleChat}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                  </svg>
                </button>
              </div>

              {/* Content igual a desktop */}
              <div className="LTChatWidgetContent">
                <div className="LTChatWidgetWelcome">
                  <p className="LTChatWidgetWelcomeText">
                    ¡Hola! ¿En qué te podemos ayudar hoy?
                  </p>
                  <p className="LTChatWidgetWelcomeSubtext">
                    Puedes preguntar sobre productos, ofertas o contactar a un
                    operador
                  </p>
                </div>

                {/* Form de consulta */}
                <form className="LTChatWidgetForm">
                  <div className="LTChatWidgetInputContainer">
                    <input
                      type="text"
                      className="LTChatWidgetInput lt-search-bar"
                      placeholder="Escribe tu consulta..."
                      value={consultaText}
                      onChange={(e) => setConsultaText(e.target.value)}
                    />
                  </div>
                </form>

                {/* Botones de acción */}
                <div className="LTChatWidgetActions">
                  <button
                    className="lt-button-light LTChatWidgetActionButton"
                    type="button"
                  >
                    Buscar Producto
                  </button>
                  <button
                    className="lt-button-light LTChatWidgetActionButton"
                    type="button"
                  >
                    Preguntas Frecuentes
                  </button>
                  <button
                    className="lt-button-light LTChatWidgetActionButton"
                    type="button"
                  >
                    Contactar Operador
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LTChatWidgetMobile;
