import React, { createContext, useState, useEffect, useCallback } from "react";
import { getCurrentUser } from "../utils/authStorage";
import * as favoritesService from "../services/favoritesService";

// Valor por defecto seguro (no-ops) para evitar crashear si falta el provider
const defaultValue = {
  favorites: [],
  loading: true,
  addToFavorites: () => ({ success: false, message: "Provider no listo" }),
  removeFromFavorites: () => ({ success: false, message: "Provider no listo" }),
  checkIsFavorite: () => false,
  getRecent: () => [],
  refreshFavorites: () => {},
};

const FavoritesContext = createContext(defaultValue);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(() => {
    const user = getCurrentUser();
    if (user && user.id) {
      const userFavorites = favoritesService.getFavorites(user.id);
      setFavorites(userFavorites);
    } else {
      setFavorites([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // 👉 No retornes null: mantené el Provider montado SIEMPRE
  const value = {
    favorites,
    loading,
    addToFavorites: useCallback((product) => {
      const user = getCurrentUser();
      if (!user || !user.id) {
        return {
          success: false,
          message: "Debes iniciar sesión para agregar favoritos",
        };
      }
      const result = favoritesService.addFavorite(user.id, product);
      if (result.success) setFavorites(result.favorites);
      return result;
    }, []),
    removeFromFavorites: useCallback((productId) => {
      const user = getCurrentUser();
      if (!user || !user.id) {
        return { success: false, message: "Debes iniciar sesión" };
      }
      const result = favoritesService.removeFavorite(user.id, productId);
      if (result.success) setFavorites(result.favorites);
      return result;
    }, []),
    checkIsFavorite: useCallback((productId) => {
      const user = getCurrentUser();
      if (!user || !user.id) return false;
      return favoritesService.isFavorite(user.id, productId);
    }, []),
    getRecent: useCallback((limit = 3) => {
      const user = getCurrentUser();
      if (!user || !user.id) return [];
      return favoritesService.getRecentFavorites(user.id, limit);
    }, []),
    refreshFavorites: loadFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
