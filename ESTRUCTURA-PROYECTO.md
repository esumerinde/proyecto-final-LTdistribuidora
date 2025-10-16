# 📁 Estructura del Proyecto - LT Electronica v3.0

## 🎯 Organización General

```
src/
├── assets/              # Recursos estáticos (imágenes, iconos, logos, brands)
├── components/          # Componentes React organizados por funcionalidad
│   ├── common/          # Componentes reutilizables
│   ├── Home/            # Componentes específicos de la página Home
│   ├── Layout/          # Componentes de estructura (Header, Footer, Navbar)
│   └── widgets/         # Widgets globales (ScrollToTop, ChatWidget)
├── context/             # Contextos de React
├── hooks/               # Custom hooks
├── layouts/             # ❌ ELIMINADO - Estaba duplicado con components/Layout
├── mocks/               # Datos de prueba
├── pages/               # Páginas principales de la aplicación
├── styles/              # Estilos globales
└── utils/               # Utilidades puras (sin dependencias de React)
```

---

## 📂 Detalle de Carpetas

### `/src/components`

#### `/components/common` - Componentes Reutilizables

```
common/
├── FavoriteButton.jsx/css        # Botón de favoritos con animación
├── LTCategoriesOverlay.jsx/css   # Overlay de categorías mobile
├── LTSearchDesktop.jsx/css       # Barra de búsqueda desktop
├── LTSearchDesktopCards.jsx/css  # Cards de resultados de búsqueda
├── LTSearchDesktopSuggestions.jsx/css # Sugerencias de búsqueda
├── LTSearchOverlay.jsx/css       # Overlay de búsqueda mobile
├── LTSectionTitle.jsx/css        # Títulos de sección con efecto 3D
└── LTToast/                      # Sistema de notificaciones toast
```

#### `/components/Home` - Componentes de la Home

```
Home/
├── LTBrandsCarousel/             # Carrusel de marcas
├── LTCircles1Offers/             # Ofertas circulares (sección 1)
├── LTCircles2Categories/         # Categorías circulares (sección 2)
├── LTFeatureBanner/              # Banner de características
├── LTHeroCarousel/               # Carrusel principal hero
├── LTNewsletter/                 # Sección de newsletter
├── LTProductsCarousel/           # Carrusel de productos con ofertas
├── LTProductsCarousel2/          # Carrusel de productos (sección 2)
├── LTProductsCarousel3/          # Carrusel de productos (sección 3)
├── LTProductsCarousel4/          # Carrusel de productos (sección 4)
└── LTPromoBanners/               # Banners promocionales
```

Cada componente tiene versiones Desktop y Mobile cuando es necesario.

#### `/components/Layout` - Estructura de la App

```
Layout/
├── Header/
│   ├── LTHeader.jsx/css          # Header desktop
│   ├── LTHeaderMobile.jsx/css    # Header mobile
│   ├── SimpleHeader/             # Header simplificado (login/register)
│   ├── LTHeaderOffer/            # Barra de ofertas
│   └── LTSearchBar/              # Barra de búsqueda integrada
├── Footer/
│   ├── LTFooter.jsx/css          # Footer desktop
│   └── LTFooterMobile.jsx/css    # Footer mobile
├── Navbar/
│   └── LTNavbar.jsx/css          # Navbar con categorías
├── AccountLayout/
│   ├── AccountLayout.jsx/css     # Layout para páginas de cuenta
│   └── LTAccountSidebar.jsx/css  # Sidebar de navegación de cuenta
├── MainLayout/
│   └── MainLayout.jsx            # Layout principal (Home, productos)
└── LoginLayout/
    └── LoginLayout.jsx           # Layout para autenticación
```

#### `/components/widgets` - Widgets Globales

```
widgets/
├── LTScrollToTop/
│   ├── LTScrollToTop.jsx/css           # Botón scroll to top desktop
│   └── LTScrollToTopMobile.jsx/css     # Botón scroll to top mobile
└── LTChatWidget/
    ├── LTChatWidget.jsx/css            # Widget de chat desktop
    ├── LTChatWidgetMobile.jsx/css      # Widget de chat mobile
    └── LTChatWidgetMobileOverlay.jsx   # Overlay del chat mobile
```

---

### `/src/pages` - Páginas Principales

```
pages/
├── Home/
│   ├── Home.jsx              # PÁGINA principal (importa componentes de /components/Home)
│   └── Home.css
├── MyAccount/
│   ├── LTMyAccount.jsx       # Dashboard de cuenta
│   ├── LTFavorites.jsx       # Productos favoritos
│   ├── LTNotifications.jsx   # Notificaciones
│   └── LTPersonalInfo.jsx    # Información personal
├── Login/
│   └── LTLogin.jsx           # Modal de login (se renderiza globalmente)
├── Register/
│   └── LTRegister.jsx        # Página de registro
└── Cart/
    └── Cart.jsx              # Carrito de compras
```

**Nota importante:**

- `/pages/Home/Home.jsx` → Es la PÁGINA (contenedor)
- `/components/Home/*` → Son los COMPONENTES que usa esa página

---

### `/src/hooks` - Custom Hooks

```
hooks/
├── useIsMobile.js                # Hook para detectar mobile/desktop
├── useHeaderReaccommodation.js   # Hook para sticky header
├── useHeaderSticky.js            # Hook alternativo para sticky
├── useFavorites.js               # Hook para gestionar favoritos
└── useToast.js                   # Hook para notificaciones toast
```

**Exportaciones:**

- `useIsMobile()` → Hook de React
- `isMobile()` → Función standalone (para uso fuera de componentes)

---

### `/src/context` - Contextos de React

```
context/
├── AuthModalContext.jsx        # Contexto para modal de autenticación
├── CarouselSyncContext.jsx     # Contexto para sincronizar carousels
├── FavoritesContext.jsx        # Contexto global de favoritos
└── ToastContext.jsx            # Contexto para sistema de toast
```

---

### `/src/utils` - Utilidades Puras

```
utils/
└── authStorage.js              # Gestión de autenticación en localStorage
```

Funciones exportadas:

- `getCurrentUser()`
- `setCurrentUser(user)`
- `clearCurrentUser()`
- `isLoggedIn()`

---

## 🔄 Cambios Realizados en la Reestructuración

### ✅ Eliminado (Duplicados)

- ❌ `/src/layouts` → Estaba duplicado con `/components/Layout`
- ❌ `/components/Layout/LTScrollToTop` → Movido a `/components/widgets`
- ❌ `/components/Layout/LTChatWidget` → Movido a `/components/widgets`
- ❌ `PersonalInfo.OLD.jsx/css` → Archivos obsoletos

### ✅ Reorganizado (desde `/src/common`)

| Antes (common/)               | Después                 | Tipo       |
| ----------------------------- | ----------------------- | ---------- |
| `isMobile.js`                 | `/hooks/useIsMobile.js` | Hook       |
| `useHeaderReaccommodation.js` | `/hooks/`               | Hook       |
| `useHeaderSticky.js`          | `/hooks/`               | Hook       |
| `authStorage.js`              | `/utils/`               | Utilidad   |
| `CarouselSyncContext.jsx`     | `/context/`             | Contexto   |
| `FavoriteButton.jsx`          | `/components/common/`   | Componente |
| `LTSectionTitle.jsx`          | `/components/common/`   | Componente |
| `LTCategoriesOverlay.jsx`     | `/components/common/`   | Componente |
| `LTSearchDesktop.jsx`         | `/components/common/`   | Componente |
| `LTSearchOverlay.jsx`         | `/components/common/`   | Componente |

---

## 📝 Reglas de Imports

### Imports Relativos (Recomendado)

```javascript
// Desde un componente en /components/Home/LTProductsCarousel/
import FavoriteButton from "../../../components/common/FavoriteButton";
import LTSectionTitle from "../../../components/common/LTSectionTitle";
import { useIsMobile } from "../../../hooks/useIsMobile";

// Desde una página en /pages/Home/
import { useIsMobile } from "../../hooks/useIsMobile";
import { CarouselSyncProvider } from "../../context/CarouselSyncContext";

// Desde Layout components
import { getCurrentUser } from "../../../utils/authStorage";
import useHeaderReaccommodation from "../../../hooks/useHeaderReaccommodation";
```

### Alias de Vite (Configurados pero no usados consistentemente)

```javascript
// Definidos en vite.config.js pero NO recomendados por inconsistencias
import Component from "@components/..."; // ⚠️ Evitar
import { hook } from "@hooks/..."; // ⚠️ Evitar
```

---

## 🎨 CSS y Estilos

### Estilos Globales (`/src/styles`)

```
styles/
├── index.css       # Variables CSS, clases globales, botones, account-cards
└── App.css         # Estilos base de .lt-app
```

### Variables CSS Principales (index.css)

```css
--lt-accent-color: #b3b8e6;
--lt-accent-color-dark: #747bbf;
--lt-accent-color-variant2: #ffd6a5;
--lt-spacing-xs / sm / md / lg / xl / 2xl / 3xl
--lt-font-family: 'Montserrat', sans-serif;
```

### Clases Globales Reutilizables

```css
.lt-button-dark           /* Botón primario violeta */
/* Botón primario violeta */
.lt-button-light          /* Botón secundario violeta claro */
.lt-button-variant2       /* Botón terciario naranja */
.lt-button-card           /* Botón pequeño para cards (violeta) */
.lt-button-card-variant2  /* Botón pequeño para cards (naranja) */
.lt-account-card          /* Card estándar para páginas de cuenta */
.lt-menu-hover            /* Efecto hover para menús */
.lt-search-bar; /* Input estilo barra de búsqueda */
```

---

## 🚀 Próximos Pasos Recomendados

### Prioridad Media

1. **Unificar breadcrumbs** → Crear componente `<LTBreadcrumb />` global
2. **Unificar títulos de página** → Crear componente `<LTPageHeader title subtitle />` global
3. **Limpiar vite.config.js** → Decidir si usar o eliminar los alias

### Prioridad Baja

4. **Documentar cada componente** → Agregar JSDoc comments
5. **Crear tests unitarios** → Para hooks y utils
6. **Optimizar imports** → Considerar barrel exports (index.js en carpetas)

---

## 📊 Estadísticas del Proyecto

- **Total de componentes:** ~50+
- **Hooks personalizados:** 5
- **Contextos:** 4
- **Páginas:** 7
- **Estilos modulares:** Cada componente con su propio CSS
- **Mobile-first:** Versiones mobile/desktop separadas cuando es necesario

---

## ✅ Estado Actual: REESTRUCTURACIÓN COMPLETADA

✓ Estructura de carpetas optimizada
✓ Imports actualizados
✓ Duplicados eliminados
✓ Separación clara de responsabilidades
✓ Documentación actualizada

---

**Última actualización:** Octubre 2025  
**Versión:** 3.0
