import React from "react";
import "./FavoriteButton.css";

/**
 * Botón de favorito reutilizable
 * Props:
 * - isFavorite: boolean (si está marcado)
 * - onClick: función para manejar el click
 * - className: string (clases extra)
 */
const FavoriteButton = ({ isFavorite, onClick, className = "" }) => {
  return (
    <button
      className={`FavoriteButton${isFavorite ? " active" : ""} ${className}`}
      onClick={onClick}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        className="FavoriteButtonIcon"
        style={{ transition: "fill 0.3s" }}
      >
        <path
          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
          fill={isFavorite ? "#e85a85" : "none"}
          stroke={isFavorite ? "#e85a85" : "var(--lt-border-color)"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
