# Sistema de Favoritos - Guía de Migración al Backend

## 📋 Resumen

Este documento explica cómo migrar el sistema de favoritos desde localStorage (temporal) al backend con Node.js, Express y SQL.

## 🏗️ Arquitectura Actual (Frontend)

El sistema de favoritos está implementado con:

1. **Servicio**: `src/services/favoritesService.js`
2. **Context**: `src/context/FavoritesContext.jsx`
3. **Componente**: `src/common/FavoriteButton.jsx`
4. **Notificaciones**: `src/context/ToastContext.jsx` + `src/components/common/LTToast/`

### Estado Actual

- ✅ Funcionalidad completa en el frontend
- ✅ Validación de autenticación
- ✅ Notificaciones visuales (toasts)
- ✅ Sincronización global vía Context
- ✅ Almacenamiento temporal en localStorage por usuario

## 🔄 Migración al Backend

### Paso 1: Crear la Base de Datos

Creá una tabla `user_favorites` en tu base de datos SQL:

\`\`\`sql
CREATE TABLE user_favorites (
id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
product_id INT NOT NULL,
added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
UNIQUE KEY unique_user_product (user_id, product_id)
);

CREATE INDEX idx_user_favorites ON user_favorites(user_id);
\`\`\`

### Paso 2: Crear las Rutas del Backend (Express)

Creá un archivo `routes/favorites.js`:

\`\`\`javascript
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth'); // Tu middleware de auth

// GET /api/favorites/:userId - Obtener favoritos del usuario
router.get('/:userId', authenticateToken, async (req, res) => {
try {
const { userId } = req.params;

    // Verificar que el usuario solo acceda a sus favoritos
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    const favorites = await db.query(\`
      SELECT
        p.*,
        f.added_at as addedAt
      FROM user_favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.user_id = ?
      ORDER BY f.added_at DESC
    \`, [userId]);

    res.json(favorites);

} catch (error) {
console.error('Error getting favorites:', error);
res.status(500).json({ error: 'Error al obtener favoritos' });
}
});

// POST /api/favorites - Agregar a favoritos
router.post('/', authenticateToken, async (req, res) => {
try {
const { userId, productId } = req.body;

    // Verificar autorización
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    // Verificar si ya existe
    const existing = await db.query(
      'SELECT * FROM user_favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Este producto ya está en favoritos'
      });
    }

    // Insertar favorito
    await db.query(
      'INSERT INTO user_favorites (user_id, product_id) VALUES (?, ?)',
      [userId, productId]
    );

    // Obtener favoritos actualizados
    const favorites = await db.query(\`
      SELECT
        p.*,
        f.added_at as addedAt
      FROM user_favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.user_id = ?
      ORDER BY f.added_at DESC
    \`, [userId]);

    res.json({
      success: true,
      message: 'Producto agregado a favoritos',
      favorites
    });

} catch (error) {
console.error('Error adding favorite:', error);
res.status(500).json({
success: false,
message: 'Error al agregar a favoritos'
});
}
});

// DELETE /api/favorites/:productId - Eliminar de favoritos
router.delete('/:productId', authenticateToken, async (req, res) => {
try {
const { productId } = req.params;
const { userId } = req.body;

    // Verificar autorización
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    await db.query(
      'DELETE FROM user_favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    // Obtener favoritos actualizados
    const favorites = await db.query(\`
      SELECT
        p.*,
        f.added_at as addedAt
      FROM user_favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.user_id = ?
      ORDER BY f.added_at DESC
    \`, [userId]);

    res.json({
      success: true,
      message: 'Producto eliminado de favoritos',
      favorites
    });

} catch (error) {
console.error('Error removing favorite:', error);
res.status(500).json({
success: false,
message: 'Error al eliminar de favoritos'
});
}
});

// GET /api/favorites/:userId/check/:productId - Verificar si es favorito
router.get('/:userId/check/:productId', authenticateToken, async (req, res) => {
try {
const { userId, productId } = req.params;

    const result = await db.query(
      'SELECT * FROM user_favorites WHERE user_id = ? AND product_id = ?',
      [userId, productId]
    );

    res.json({ isFavorite: result.length > 0 });

} catch (error) {
console.error('Error checking favorite:', error);
res.status(500).json({ error: 'Error al verificar favorito' });
}
});

module.exports = router;
\`\`\`

### Paso 3: Registrar las Rutas

En tu `app.js` o `server.js`:

\`\`\`javascript
const favoritesRoutes = require('./routes/favorites');
app.use('/api/favorites', favoritesRoutes);
\`\`\`

### Paso 4: Actualizar el Frontend

Abrí `src/services/favoritesService.js` y reemplazá las funciones:

\`\`\`javascript
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/favorites'; // Ajustá tu URL

export const getFavorites = async (userId) => {
try {
const response = await axios.get(\`\${API_URL}/\${userId}\`);
return response.data;
} catch (error) {
console.error('Error getting favorites:', error);
return [];
}
};

export const addFavorite = async (userId, product) => {
try {
const response = await axios.post(API_URL, {
userId,
productId: product.id
});
return response.data;
} catch (error) {
console.error('Error adding favorite:', error);
return {
success: false,
message: error.response?.data?.message || 'Error al agregar a favoritos'
};
}
};

export const removeFavorite = async (userId, productId) => {
try {
const response = await axios.delete(\`\${API_URL}/\${productId}\`, {
data: { userId }
});
return response.data;
} catch (error) {
console.error('Error removing favorite:', error);
return {
success: false,
message: 'Error al eliminar de favoritos'
};
}
};

export const isFavorite = async (userId, productId) => {
try {
const response = await axios.get(\`\${API_URL}/\${userId}/check/\${productId}\`);
return response.data.isFavorite;
} catch (error) {
console.error('Error checking favorite:', error);
return false;
}
};

export const getRecentFavorites = async (userId, limit = 3) => {
try {
const favorites = await getFavorites(userId);
return favorites.slice(0, limit);
} catch (error) {
console.error('Error getting recent favorites:', error);
return [];
}
};
\`\`\`

### Paso 5: Actualizar el Context (FavoritesContext.jsx)

Modificá las funciones para que sean async:

\`\`\`javascript
// En FavoritesContext.jsx

const loadFavorites = useCallback(async () => {
const user = getCurrentUser();
if (user && user.id) {
setLoading(true);
const userFavorites = await favoritesService.getFavorites(user.id);
setFavorites(userFavorites);
setLoading(false);
} else {
setFavorites([]);
setLoading(false);
}
}, []);

const addToFavorites = useCallback(async (product) => {
const user = getCurrentUser();
if (!user || !user.id) {
return { success: false, message: "Debes iniciar sesión para agregar favoritos" };
}

const result = await favoritesService.addFavorite(user.id, product);
if (result.success) {
setFavorites(result.favorites);
}
return result;
}, []);

// Similar para removeFromFavorites...
\`\`\`

## 🧪 Testing

1. **Verificá la conexión**: Probá los endpoints con Postman/Thunder Client
2. **Probá el flujo**:
   - Loguéate
   - Agregá un producto a favoritos
   - Verificá que aparezca en el dropdown
   - Eliminalo
   - Verificá que desaparezca

## ⚠️ Importante

- **Autenticación**: Asegurate de que tu middleware `authenticateToken` funcione correctamente
- **CORS**: Configurá CORS en el backend para permitir requests del frontend
- **Validación**: Agregá validaciones adicionales según tus necesidades
- **Seguridad**: Nunca confíes solo en el frontend, siempre validá en el backend

## 📝 Variables de Entorno

Agregá en tu `.env`:

\`\`\`
DATABASE_URL=mysql://user:password@localhost:3306/tu_database
JWT_SECRET=tu_secret_key
PORT=3000
\`\`\`

## 🎯 Checklist de Migración

- [ ] Crear tabla `user_favorites`
- [ ] Crear rutas en Express
- [ ] Implementar middleware de autenticación
- [ ] Actualizar `favoritesService.js`
- [ ] Hacer async el `FavoritesContext.jsx`
- [ ] Probar con Postman
- [ ] Probar en el navegador
- [ ] Verificar que los toasts funcionen
- [ ] Verificar el dropdown de favoritos

## 🆘 Dudas Comunes

**P: ¿Qué pasa con los favoritos actuales en localStorage?**  
R: Se perderán al migrar. Podés crear un script para migrar los datos si es necesario.

**P: ¿Necesito cambiar algo en los componentes?**  
R: No, solo en `favoritesService.js` y `FavoritesContext.jsx`. Los componentes siguen igual.

**P: ¿Cómo manejo errores de red?**  
R: Los try/catch en el servicio ya manejan errores. Los toasts mostrarán los mensajes automáticamente.

---

**Creado por**: Sistema de Favoritos v1.0  
**Última actualización**: Octubre 2025
