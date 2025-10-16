import { useContext } from "react";
import FavoritesContext from "../context/FavoritesContext";

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  // Si por alguna razón no hay provider, devolvé el defaultValue del context (no-ops)
  return (
    context || {
      favorites: [],
      loading: true,
      addToFavorites: () => ({ success: false, message: "Sin provider" }),
      removeFromFavorites: () => ({ success: false, message: "Sin provider" }),
      checkIsFavorite: () => false,
      getRecent: () => [],
      refreshFavorites: () => {},
    }
  );
};
