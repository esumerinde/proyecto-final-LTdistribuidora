import React, { useEffect, useState, useCallback } from "react";
import "./LTToast.css";

/**
 * Componente de Toast para notificaciones
 *
 * @param {Object} props
 * @param {string} props.message - Mensaje a mostrar
 * @param {string} props.type - Tipo: 'success' | 'error' | 'warning' | 'info'
 * @param {number} props.duration - Duración en ms (default: 3000)
 * @param {function} props.onClose - Callback cuando se cierra
 */
const LTToast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isHiding, setIsHiding] = useState(false);

  const handleClose = useCallback(() => {
    setIsHiding(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 200); // Espera la animación de salida
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "error":
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      case "warning":
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`LTToast LTToast--${type} ${
        isHiding ? "LTToast--hiding" : ""
      }`}
    >
      <div className="LTToastIcon">{getIcon()}</div>
      <div className="LTToastContent">
        <p className="LTToastMessage">{message}</p>
      </div>
      <button
        className="LTToastClose"
        onClick={handleClose}
        aria-label="Cerrar notificación"
      >
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default LTToast;
