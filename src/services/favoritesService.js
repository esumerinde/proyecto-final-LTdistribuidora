/**
 * Servicio de Favoritos - localStorage
 *
 * Este servicio maneja los favoritos del usuario usando localStorage.
 * Está diseñado para migrar fácilmente a un backend:
 * - Cambia las funciones por llamadas fetch/axios al backend
 * - Mantén las mismas firmas de función y retornos
 * - El componente no necesitará cambios
 */

const FAVORITES_KEY = "lt_user_favorites";

const hasWindow = () => typeof window !== "undefined" && !!window.localStorage;

/**
 * Obtiene la lista de favoritos del usuario actual
 * @param {string} userId - ID del usuario (null si no está logueado)
 * @returns {Array} Lista de productos favoritos
 *
 * MIGRACIÓN BACKEND:
 * return await fetch(`/api/favorites/${userId}`).then(res => res.json());
 */
export const getFavorites = (userId) => {
  if (!hasWindow() || !userId) return [];

  try {
    const allFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "{}"
    );
    return allFavorites[userId] || [];
  } catch (error) {
    console.warn("Error reading favorites:", error);
    return [];
  }
};

/**
 * Agrega un producto a favoritos
 * @param {string} userId - ID del usuario
 * @param {Object} product - Producto a agregar
 * @returns {Object} { success: boolean, message: string, favorites: Array }
 *
 * MIGRACIÓN BACKEND:
 * return await fetch(`/api/favorites`, {
 *   method: 'POST',
 *   body: JSON.stringify({ userId, productId: product.id })
 * }).then(res => res.json());
 */
export const addFavorite = (userId, product) => {
  if (!hasWindow() || !userId || !product) {
    return { success: false, message: "Datos inválidos", favorites: [] };
  }

  try {
    const allFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "{}"
    );
    const userFavorites = allFavorites[userId] || [];

    // Verificar si ya existe
    const exists = userFavorites.some((fav) => fav.id === product.id);
    if (exists) {
      return {
        success: false,
        message: "Este producto ya está en favoritos",
        favorites: userFavorites,
      };
    }

    // Agregar producto con timestamp
    const favoriteItem = {
      ...product,
      addedAt: new Date().toISOString(),
    };

    userFavorites.push(favoriteItem);
    allFavorites[userId] = userFavorites;

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites));

    return {
      success: true,
      message: "Producto agregado a favoritos",
      favorites: userFavorites,
    };
  } catch (error) {
    console.error("Error adding favorite:", error);
    return {
      success: false,
      message: "Error al agregar a favoritos",
      favorites: [],
    };
  }
};

/**
 * Elimina un producto de favoritos
 * @param {string} userId - ID del usuario
 * @param {string} productId - ID del producto a eliminar
 * @returns {Object} { success: boolean, message: string, favorites: Array }
 *
 * MIGRACIÓN BACKEND:
 * return await fetch(`/api/favorites/${productId}`, {
 *   method: 'DELETE',
 *   body: JSON.stringify({ userId })
 * }).then(res => res.json());
 */
export const removeFavorite = (userId, productId) => {
  if (!hasWindow() || !userId || !productId) {
    return { success: false, message: "Datos inválidos", favorites: [] };
  }

  try {
    const allFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "{}"
    );
    const userFavorites = allFavorites[userId] || [];

    const updatedFavorites = userFavorites.filter(
      (fav) => fav.id !== productId
    );
    allFavorites[userId] = updatedFavorites;

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites));

    return {
      success: true,
      message: "Producto eliminado de favoritos",
      favorites: updatedFavorites,
    };
  } catch (error) {
    console.error("Error removing favorite:", error);
    return {
      success: false,
      message: "Error al eliminar de favoritos",
      favorites: [],
    };
  }
};

/**
 * Verifica si un producto está en favoritos
 * @param {string} userId - ID del usuario
 * @param {string} productId - ID del producto
 * @returns {boolean}
 *
 * MIGRACIÓN BACKEND:
 * return await fetch(`/api/favorites/${userId}/check/${productId}`)
 *   .then(res => res.json())
 *   .then(data => data.isFavorite);
 */
export const isFavorite = (userId, productId) => {
  if (!hasWindow() || !userId || !productId) return false;

  try {
    const allFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "{}"
    );
    const userFavorites = allFavorites[userId] || [];
    return userFavorites.some((fav) => fav.id === productId);
  } catch (error) {
    console.warn("Error checking favorite:", error);
    return false;
  }
};

/**
 * Obtiene los últimos N favoritos del usuario
 * @param {string} userId - ID del usuario
 * @param {number} limit - Cantidad de favoritos a retornar
 * @returns {Array}
 *
 * MIGRACIÓN BACKEND:
 * return await fetch(`/api/favorites/${userId}?limit=${limit}`)
 *   .then(res => res.json());
 */
export const getRecentFavorites = (userId, limit = 3) => {
  const favorites = getFavorites(userId);
  // Ordenar por fecha de agregado (más recientes primero)
  return favorites
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    .slice(0, limit);
};

/**
 * Limpia todos los favoritos del usuario (útil para testing o logout)
 * @param {string} userId - ID del usuario
 *
 * MIGRACIÓN BACKEND:
 * await fetch(`/api/favorites/${userId}`, { method: 'DELETE' });
 */
export const clearFavorites = (userId) => {
  if (!hasWindow() || !userId) return;

  try {
    const allFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_KEY) || "{}"
    );
    delete allFavorites[userId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(allFavorites));
  } catch (error) {
    console.error("Error clearing favorites:", error);
  }
};

export default {
  getFavorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  getRecentFavorites,
  clearFavorites,
};
