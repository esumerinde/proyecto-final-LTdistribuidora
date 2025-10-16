# Página de Direcciones - LT Electrónica

## 📍 Descripción

Página completa de gestión de direcciones de envío para usuarios registrados. Permite agregar, editar, eliminar y establecer una dirección como predeterminada.

## ✨ Características

### 🎨 Estados de la Vista

1. **Estado Vacío**: Mensaje motivador cuando no hay direcciones guardadas
2. **Lista de Direcciones**: Grid responsive con todas las direcciones del usuario
3. **Formulario**: Vista completa para agregar/editar direcciones

### 🔧 Funcionalidades

- ✅ **Agregar dirección nueva** con todos los campos necesarios
- ✅ **Editar dirección existente** manteniendo los datos previos
- ✅ **Eliminar dirección** con confirmación
- ✅ **Establecer dirección predeterminada** (solo una a la vez)
- ✅ **Badge visual** para la dirección predeterminada
- ✅ **Íconos dinámicos** según el alias (Casa, Oficina, etc.)
- ✅ **Validación de formulario** en campos requeridos
- ✅ **Búsqueda simulada** de dirección (preparado para Google Maps API)
- ✅ **Persistencia en localStorage** por usuario

### 📱 Diseño Responsive

- Desktop: Grid de 2 columnas para las cards
- Tablet: Grid adaptativo
- Mobile: Una columna, botones en ancho completo

## 🎨 Estilo y Diseño

Sigue completamente la paleta de colores y sistema de diseño de LT Electrónica:

### Colores Utilizados

- **Violeta principal** (`--lt-big-text-color`): Títulos y headers
- **Naranja accent** (`--lt-accent-color-variant2-dark`): Badge predeterminada, botón validar
- **Violeta accent** (`--lt-accent-color`): Hover states, borders
- **Rojo error** (`--lt-error-color`): Botón eliminar, mensajes de error

### Componentes Globales Usados

- `.lt-button-dark`: Botón principal "Agregar Dirección"
- `.lt-button-variant2`: Botón de guardar formulario
- `.lt-button-card`: Botones de editar/eliminar
- `.lt-search-bar`: Todos los inputs del formulario
- `.lt-account-card`: Cards de direcciones

### Animaciones

- ✨ `fadeIn`: Entrada suave de elementos
- ✨ `badgePulse`: Animación sutil del badge predeterminada
- ✨ Transiciones suaves en hover

## 📁 Estructura de Archivos

```
src/pages/MyAccount/
├── LTAddresses.jsx     # Componente principal
└── LTAddresses.css     # Estilos específicos
```

## 🗺️ Rutas

- **Dashboard**: `/my-account` → Card "Mis direcciones"
- **Lista/Formulario**: `/my-account/addresses`

## 💾 Estructura de Datos

### Objeto Address

```javascript
{
  id: Number,              // Timestamp único
  alias: String,           // "Casa", "Oficina", etc.
  street: String,          // Calle o avenida
  number: String,          // Número de calle
  complement: String,      // Piso, depto (opcional)
  city: String,            // Ciudad
  zipCode: String,         // Código postal
  country: String,         // Código de país (AR, CL, etc.)
  contactName: String,     // Nombre del contacto
  phone: String,           // Teléfono de contacto
  isDefault: Boolean       // Si es predeterminada
}
```

### LocalStorage

- **Key**: `addresses_${userId}`
- **Formato**: Array de objetos Address en JSON

## 🔄 Flujo de Usuario

### Agregar Dirección

1. Click en "Agregar Dirección"
2. Se muestra el formulario
3. Usuario completa todos los campos requeridos (\*)
4. Opcionalmente marca como predeterminada
5. Click en "Guardar Dirección"
6. Validación de campos
7. Se guarda en localStorage
8. Regresa a la vista de lista

### Editar Dirección

1. Click en "Editar" en cualquier card
2. Formulario se pre-rellena con datos existentes
3. Usuario modifica campos deseados
4. Click en "Guardar Dirección"
5. Actualiza la dirección en localStorage
6. Regresa a la vista de lista

### Eliminar Dirección

1. Click en "Eliminar"
2. Aparece confirmación nativa del navegador
3. Si confirma, se elimina de localStorage
4. Si era predeterminada, la primera dirección restante se marca como default

### Establecer Predeterminada

1. Click en "Establecer como Predeterminada"
2. Se remueve el flag de la anterior predeterminada
3. Se marca la nueva como default
4. Se actualiza localStorage
5. Visual: aparece el badge naranja

## 🎯 Características Técnicas

### Hooks Utilizados

- `useState`: Gestión de estados (formulario, lista, errores)
- `useEffect`: Carga de direcciones desde localStorage
- `useNavigate`: Navegación entre vistas

### Validación

- Campos requeridos verificados antes de guardar
- Mensaje de error visible si falta algún campo
- Visual: inputs con borde rojo en error

### Iconos Dinámicos

El componente detecta el alias y muestra el ícono apropiado:

- 🏠 **Home**: "casa", "hogar"
- 💼 **Briefcase**: "oficina", "trabajo", "work"
- 📍 **MapPin**: cualquier otro alias

## 🚀 Próximas Mejoras

- [ ] Integración con Google Maps API real
- [ ] Autocompletado de dirección
- [ ] Validación de código postal por país
- [ ] Límite de direcciones por usuario
- [ ] Backend real con API REST
- [ ] Compartir dirección entre usuarios (familia)

## 🎨 Capturas de Pantalla

### Vista Vacía

- Header con título "Mis Direcciones"
- Botón "Agregar Dirección"
- Card vacía con ícono de mapa
- Mensaje motivador
- Botón CTA naranja "Añadir Dirección"

### Vista Lista

- Breadcrumb: Mi cuenta > Mis direcciones
- Header con botón de acción
- Grid de cards con direcciones
- Badge naranja en predeterminada
- Botones: Editar, Eliminar, Establecer predeterminada

### Vista Formulario

- Breadcrumb completo
- Título dinámico (Agregar/Editar)
- Dos secciones: Ubicación + Referencia y Contacto
- Búsqueda simulada con botón "Validar"
- Grid responsive de inputs
- Checkbox para predeterminada
- Botones: Cancelar (gris) + Guardar (naranja)
- Mensaje de error si campos incompletos

## 🔧 Instalación y Uso

Ya está todo integrado. Solo navega a `/my-account/addresses` o haz click en la card "Mis direcciones" del dashboard.

---

**Desarrollado con ❤️ siguiendo el sistema de diseño de LT Electrónica**
