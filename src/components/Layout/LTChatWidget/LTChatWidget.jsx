import React, { useState } from "react";
import "./LTChatWidget.css";
import logoBlancoChico from "../../../assets/images/logos/logo-blanco-chico.png";

const LTChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [consultaText, setConsultaText] = useState("");

  const handleToggleChat = () => {
    if (!isOpen) {
      setIsLoading(true);
      // Simular tiempo de carga como en farmaonline
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(true);
      }, 600); // Reducido de 1500ms a 600ms
    } else {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const handleSubmitConsulta = (e) => {
    e.preventDefault();
    console.log("Consulta:", consultaText);
    // Aquí iría la lógica para enviar la consulta
  };

  const handleActionClick = (action) => {
    console.log("Acción:", action);
    // Aquí iría la lógica para cada acción
  };

  return (
    <>
      {/* Botón flotante */}
      <div className="LTChatWidgetButton" onClick={handleToggleChat}>
        {isLoading ? (
          <div className="LTChatWidgetLoader">
            <div className="LTChatWidgetSpinner"></div>
          </div>
        ) : (
          <>
            <svg className="LTChatWidgetIcon" viewBox="0 0 24 24">
              <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z" />
            </svg>
            <span className="LTChatWidgetText">Chat Online</span>
          </>
        )}
      </div>

      {/* Modal del Chat */}
      {isOpen && (
        <div className="LTChatWidgetModal">
          <div className="LTChatWidgetModalContent">
            {/* Header */}
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
              <button className="LTChatWidgetCloseButton" onClick={handleClose}>
                <svg viewBox="0 0 24 24">
                  <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
              </button>
            </div>

            {/* Content */}
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
              <form
                onSubmit={handleSubmitConsulta}
                className="LTChatWidgetForm"
              >
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
                  onClick={() => handleActionClick("buscar-producto")}
                >
                  Buscar Producto
                </button>
                <button
                  className="lt-button-light LTChatWidgetActionButton"
                  onClick={() => handleActionClick("preguntas-frecuentes")}
                >
                  Preguntas Frecuentes
                </button>
                <button
                  className="lt-button-light LTChatWidgetActionButton"
                  onClick={() => handleActionClick("contactar-operador")}
                >
                  Contactar Operador
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div className="LTChatWidgetOverlay" onClick={handleClose}></div>
      )}
    </>
  );
};

export default LTChatWidget;
