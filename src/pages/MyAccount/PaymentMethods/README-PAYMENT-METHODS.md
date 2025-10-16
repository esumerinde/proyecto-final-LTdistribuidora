# 💳 LTPaymentMethods - Gestión de Medios de Pago

## 📋 Descripción

`LTPaymentMethods` es el componente que permite a los usuarios gestionar sus tarjetas de crédito/débito y ver otros métodos de pago disponibles en la plataforma LT Electrónica.

## ✨ Características

### 🎯 Funcionalidades Principales

1. **CRUD de Tarjetas**

   - ✅ Agregar nuevas tarjetas
   - ✅ Editar tarjetas existentes
   - ✅ Eliminar tarjetas
   - ✅ Establecer tarjeta predeterminada

2. **Vista Previa 3D**

   - 💳 Tarjeta animada con efecto flip
   - 🎨 Actualización en tiempo real
   - 🏦 Detección automática de marca (Visa, Mastercard, Amex)
   - 🔒 Vista del CVV en el dorso

3. **Validación Inteligente**

   - ✓ Validación de número de tarjeta (16 dígitos)
   - ✓ Validación de fecha de vencimiento
   - ✓ Validación de CVV (3 dígitos)
   - ✓ Verificación de expiración

4. **Persistencia Local**

   - 💾 Almacenamiento en localStorage
   - 👤 Separación por usuario
   - 🔄 Sincronización automática

5. **Otros Métodos de Pago**
   - 💳 Mercado Pago
   - 💵 Efectivo
   - 🏦 Transferencia bancaria

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
--lt-accent-color-dark: #747bbf     /* Violeta - Color principal */
--lt-accent-color-variant2-dark: #f7b15d  /* Naranja - Acentos */
```

### Clases Globales Utilizadas

- `.lt-button-dark` - Botones primarios
- `.lt-button-variant2` - Botones secundarios
- `.lt-search-bar` - Inputs de formulario
- `.lt-account-card` - Tarjetas de contenido
- `.fadeIn` - Animación de entrada

## 📂 Estructura de Archivos

```
src/pages/MyAccount/PaymentMethods/
├── LTPaymentMethods.jsx    # Componente principal
└── LTPaymentMethods.css    # Estilos personalizados
```

## 🔧 Uso

### Integración en Routing

```jsx
// App.jsx
import LTPaymentMethods from "./pages/MyAccount/PaymentMethods/LTPaymentMethods";

<Route path="/my-account/payment-methods" element={<LTPaymentMethods />} />;
```

### Navegación desde Dashboard

```jsx
// LTMyAccount.jsx
{
  id: "medios-de-pago",
  title: "Medios de pago",
  description: "Gestioná tus tarjetas y métodos de pago.",
  icon: CreditCard,
  main: "micuenta",
}
```

### Navegación desde Sidebar

```jsx
// LTAccountSidebar.jsx
{
  id: "medios-de-pago",
  label: "Medios de pago",
  route: "/my-account/payment-methods",
}
```

## 💾 Estructura de Datos

### Objeto de Tarjeta

```javascript
{
  id: "1234567890",              // Timestamp único
  cardNumber: "1234 5678 9012 3456",
  cardHolder: "JUAN PEREZ",
  expiryMonth: "12",
  expiryYear: "25",
  cvv: "123",
  cardType: "credit",            // "credit" | "debit"
  brand: "visa",                 // "visa" | "mastercard" | "amex" | "unknown"
  lastFour: "3456",              // Últimos 4 dígitos
  isDefault: false               // Tarjeta predeterminada
}
```

### LocalStorage

```javascript
// Clave: paymentMethods_${userId}
// Valor: Array de objetos de tarjeta
localStorage.setItem("paymentMethods_guest", JSON.stringify(cards));
```

## 🎬 Flujos de Usuario

### 1. Agregar Nueva Tarjeta

1. Usuario hace clic en "Agregar Tarjeta"
2. Se muestra formulario con vista previa animada
3. Usuario completa los datos
4. Vista previa se actualiza en tiempo real
5. Al completar, se valida el formulario
6. Si es válida, se agrega al array
7. Si es la primera, se marca como predeterminada
8. Se guarda en localStorage
9. Se muestra en la lista

### 2. Editar Tarjeta

1. Usuario hace clic en ícono de editar
2. Se carga el formulario con datos existentes
3. Usuario modifica los campos
4. Al guardar, se actualiza en el array
5. Se persiste en localStorage

### 3. Eliminar Tarjeta

1. Usuario hace clic en ícono de eliminar
2. Se muestra confirmación
3. Si confirma, se elimina del array
4. Si era predeterminada, la primera se marca como default
5. Se actualiza localStorage

### 4. Establecer como Predeterminada

1. Usuario hace clic en "Predeterminada"
2. Se quita el flag de la anterior
3. Se establece en la seleccionada
4. Se actualiza localStorage

## 🎨 Componentes Visuales

### Vista Previa de Tarjeta

```jsx
<div className="lt-credit-card">
  <div className="lt-card-front">
    {/* Chip, número, titular, vencimiento */}
  </div>
  <div className="lt-card-back">{/* Banda magnética, CVV */}</div>
</div>
```

### Tarjeta Guardada

```jsx
<div className="lt-saved-card">
  <div className="lt-saved-card-header">
    {/* Logo + Badge predeterminada */}
  </div>
  <div className="lt-saved-card-number">•••• •••• •••• 3456</div>
  <div className="lt-saved-card-info">{/* Titular, Vencimiento, Tipo */}</div>
  <div className="lt-saved-card-actions">
    {/* Botones: Predeterminada, Editar, Eliminar */}
  </div>
</div>
```

## 🔐 Validaciones

### Número de Tarjeta

- Solo números
- Exactamente 16 dígitos
- Formato automático con espacios (cada 4 dígitos)

### Nombre del Titular

- No puede estar vacío
- Se convierte a mayúsculas en la tarjeta

### Fecha de Vencimiento

- Mes: 01-12
- Año: 2 dígitos
- No puede estar vencida

### CVV

- Solo números
- Exactamente 3 dígitos

## 🎯 Detección de Marca

```javascript
const detectCardBrand = (number) => {
  const cleaned = number.replace(/\s/g, "");
  if (/^4/.test(cleaned)) return "visa"; // Comienza con 4
  if (/^5[1-5]/.test(cleaned)) return "mastercard"; // Comienza con 51-55
  if (/^3[47]/.test(cleaned)) return "amex"; // Comienza con 34 o 37
  return "unknown";
};
```

## 📱 Responsive Design

### Desktop (> 1024px)

- Vista previa al lado del formulario
- Grid de 3 columnas para otros métodos
- Tarjetas en grid adaptativo

### Tablet (768px - 1024px)

- Vista previa arriba del formulario
- Grid de 2 columnas

### Mobile (< 768px)

- Formulario de 1 columna
- Botones full-width
- Grid de 1 columna para tarjetas

## 🎨 Animaciones

### fadeIn

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### badgePulse

```css
@keyframes badgePulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(247, 177, 93, 0.7);
  }
  50% {
    box-shadow: 0 0 0 6px rgba(247, 177, 93, 0);
  }
}
```

### Card Flip

```css
.lt-credit-card.flipped {
  transform: rotateY(180deg);
}
```

## 🔄 Estados del Componente

### Estados Principales

```javascript
const [cards, setCards] = useState([]);           // Array de tarjetas
const [showForm, setShowForm] = useState(false);  // Mostrar formulario
const [editingCard, setEditingCard] = useState(null); // Tarjeta en edición
const [formData, setFormData] = useState({...});  // Datos del formulario
const [focused, setFocused] = useState("");       // Campo con foco
```

## 🎯 Casos de Uso

### Usuario sin tarjetas

- Se muestra estado vacío con ilustración
- Mensaje invitando a agregar la primera tarjeta
- Botón grande de "Agregar Primera Tarjeta"

### Usuario con tarjetas

- Grid de tarjetas guardadas
- Badge en la predeterminada
- Acciones: Editar, Eliminar, Predeterminada
- Botón "Agregar Tarjeta" en el header

### Modo formulario

- Vista previa animada
- Formulario con validación
- Botones: Cancelar / Guardar

## 🚀 Mejoras Futuras

- [ ] Encriptación de datos sensibles
- [ ] Integración con pasarelas de pago reales
- [ ] Soporte para más marcas (Diners, Discover, etc.)
- [ ] Validación con algoritmo de Luhn
- [ ] CVV de 4 dígitos para Amex
- [ ] Tokenización de tarjetas
- [ ] Verificación 3D Secure
- [ ] Recordar CVV temporalmente
- [ ] Agregar apodo a las tarjetas
- [ ] Estadísticas de uso por tarjeta

## 🐛 Notas Técnicas

### Seguridad

⚠️ **IMPORTANTE**: En un entorno de producción:

- NO almacenar CVV
- NO almacenar número completo de tarjeta
- Usar tokenización (Stripe, MercadoPago, etc.)
- Cumplir con PCI DSS
- Encriptar datos sensibles
- Usar HTTPS siempre

### Compatibilidad

- React 19.1.1+
- Lucide-react icons
- localStorage API
- CSS Grid & Flexbox
- CSS Animations

## 📚 Dependencias

```json
{
  "react": "^19.1.1",
  "react-router-dom": "^7.9.3",
  "lucide-react": "^0.469.0"
}
```

## 🎨 Paleta de Colores de Tarjetas

### Frente

```css
background: linear-gradient(135deg, #747bbf 0%, #5a61a0 100%);
```

### Dorso

```css
background: linear-gradient(135deg, #5a61a0 0%, #747bbf 100%);
```

### Chip

```css
background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%);
```

## 📊 Accesibilidad

- ✅ Navegación por teclado
- ✅ Labels en todos los inputs
- ✅ Mensajes de error claros
- ✅ Contraste adecuado
- ✅ Iconos con title/aria-label
- ✅ Botones con labels descriptivos

## 🔗 Enlaces Relacionados

- [LTMyAccount](../LTMyAccount.jsx) - Dashboard principal
- [LTAddresses](../LTAddresses.jsx) - Gestión de direcciones (patrón similar)
- [LTFavorites](../LTFavorites.jsx) - Gestión de favoritos (patrón similar)
- [AccountLayout](../../components/Layout/AccountLayout/AccountLayout.jsx) - Layout protegido

---

**Desarrollado con 💜 siguiendo el sistema de diseño de LT Electrónica**
