import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./LTChatWidgetMobileOverlay.css";
import logoBlancoChico from "../../../assets/images/logos/logo-blanco-chico.png";

// Icono de chat para el botón flotante
const ChatIcon = () => (
  <svg className="LTChatWidgetIcon" viewBox="0 0 24 24">
    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z" />
  </svg>
);

const LTChatWidgetMobileOverlay = ({ open, onClose }) => {
  const [closing, setClosing] = useState(false);
  const [consultaText, setConsultaText] = useState("");

  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      if (onClose) onClose();
    }, 400);
  }

  useEffect(() => {
    if (open || closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closing]);

  if (!open && !closing) return null;

  return createPortal(
    <div
      className={`LTChatWidgetMobileOverlay${closing ? " slideOutLeft" : ""}`}
      tabIndex={-1}
    >
      <div className="LTChatWidgetMobileOverlay__header">
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ChatIcon />
          <span>Chat Asistente</span>
        </span>
        <button
          className="lt-button-light LTChatWidgetMobileOverlay__close"
          onClick={handleClose}
          aria-label="Cerrar"
          type="button"
        >
          <svg
            className="LTChatWidgetMobileOverlay__closeIcon"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 4L20 20M20 4L4 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="LTChatWidgetMobileOverlay__content">
        <div className="LTChatWidgetMobileOverlay__welcome">
          <img
            src={logoBlancoChico}
            alt="Logo LT"
            style={{ width: "32px", height: "auto", marginBottom: "10px" }}
          />
          <p className="LTChatWidgetMobileOverlay__welcomeText">
            ¡Hola! ¿En qué te podemos ayudar hoy?
          </p>
          <p className="LTChatWidgetMobileOverlay__welcomeSubtext">
            Puedes preguntar sobre productos, ofertas o contactar a un operador
          </p>
        </div>
        <form className="LTChatWidgetMobileOverlay__form">
          <div className="LTChatWidgetMobileOverlay__inputContainer">
            <input
              type="text"
              className="LTChatWidgetMobileOverlay__input lt-search-bar"
              placeholder="Escribe tu consulta..."
              value={consultaText}
              onChange={(e) => setConsultaText(e.target.value)}
            />
          </div>
        </form>
        <div className="LTChatWidgetMobileOverlay__actions">
          <button
            className="lt-button-light LTChatWidgetMobileOverlay__actionButton"
            type="button"
          >
            Buscar Producto
          </button>
          <button
            className="lt-button-light LTChatWidgetMobileOverlay__actionButton"
            type="button"
          >
            Preguntas Frecuentes
          </button>
          <button
            className="lt-button-light LTChatWidgetMobileOverlay__actionButton"
            type="button"
          >
            Contactar Operador
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LTChatWidgetMobileOverlay;
