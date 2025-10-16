/**
 * Botón de Favoritos - Versión con lógica completa
 *
 * Este componente maneja automáticamente:
 * - Validación de autenticación
 * - Agregar/quitar de favoritos
 * - Mostrar notificaciones toast
 * - Sincronización con el contexto global
 *
 * Props:
 * - product: Objeto del producto completo
 * - className: Clases CSS adicionales (opcional)
 * - onToggle: Callback después de toggle exitoso (opcional)
 *
 * NOTA PARA BACKEND:
 * El servicio favoritesService.js ya está preparado para migración.
 * Solo cambiá las funciones por llamadas al API.
 */
import React, { useState, useEffect } from "react";
import { isLoggedIn } from "../../utils/authStorage";
import { useFavorites } from "../../hooks/useFavorites";
import { useToast } from "../../hooks/useToast";
import "./FavoriteButton.css";

const FavoriteButton = ({ product, className = "", onToggle }) => {
  const { checkIsFavorite, addToFavorites, removeFromFavorites, favorites } =
    useFavorites();
  const { success, error, warning } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Verificar si está en favoritos al montar y cuando cambia la lista de favoritos
  useEffect(() => {
    if (product && product.id) {
      setIsFavorite(checkIsFavorite(product.id));
    }
  }, [product, checkIsFavorite, favorites]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Verificar autenticación
    if (!isLoggedIn()) {
      warning("Tenés que iniciar sesión para agregar favoritos", 4000);
      return;
    }

    // Validar producto
    if (!product || !product.id) {
      error("Producto inválido");
      return;
    }

    // Animación
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    // Toggle favorito
    if (isFavorite) {
      // Quitar de favoritos
      const result = removeFromFavorites(product.id);
      if (result.success) {
        setIsFavorite(false);
        success("Producto eliminado de favoritos");
        if (onToggle) onToggle(false);
      } else {
        error(result.message || "Error al eliminar de favoritos");
      }
    } else {
      // Agregar a favoritos
      const result = addToFavorites(product);
      if (result.success) {
        setIsFavorite(true);
        success("¡Agregado a favoritos!");
        if (onToggle) onToggle(true);
      } else {
        if (result.message.includes("ya está")) {
          warning(result.message);
        } else {
          error(result.message || "Error al agregar a favoritos");
        }
      }
    }
  };

  return (
    <button
      className={`FavoriteButton${isFavorite ? " active" : ""} ${
        isAnimating ? " animating" : ""
      } ${className}`}
      onClick={handleClick}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      type="button"
    >
      <svg
        viewBox="0 0 24 24"
        width={18}
        height={18}
        className="FavoriteButtonIcon"
        style={{ transition: "fill 0.3s, transform 0.3s" }}
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
