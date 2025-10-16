# 🎨 Efecto 3D para Títulos de Sección

## 📋 Descripción

Sistema de títulos animados con efecto 3D que se activa automáticamente después de 2 segundos de inactividad del mouse, o manualmente al hacer hover sobre el título.

## ✨ Características

- **Texto base elegante**: Fuente variable "Meta" con peso y estilo adaptable
- **Activación dual**:
  - ⏱️ Automática: después de 2 segundos sin movimiento del mouse/scroll
  - 🖱️ Manual: hover sobre el título
- **Efecto 3D**: Múltiples sombras de colores con profundidad usando la paleta LT
- **Responsive**: Sombras optimizadas para móvil
- **Transiciones suaves**: Animación de 0.5s con ease

## 🎨 Colores del Efecto

El efecto usa tu paleta de colores:

```css
--lt-accent-color-dark: #747bbf       (Violeta principal)
--lt-accent-color-variant: #8a8fc7    (Violeta claro)
--lt-accent-color-variant2-dark: #f7b15d (Naranja/Amarillo)
--lt-accent-color-variant2: #ffd6a5   (Amarillo suave)
```

## 🚀 Uso

### Activar el Efecto 3D

Para habilitar el efecto en cualquier `LTSectionTitle`, simplemente agrega el prop `enable3DEffect={true}`:

```jsx
import LTSectionTitle from "../../common/LTSectionTitle";

function MiComponente() {
  return (
    <LTSectionTitle
      title="¡Descubrí nuestras ofertas!"
      subtitle="Hasta 50% OFF en productos seleccionados"
      gradientType="innova"
      enable3DEffect={true} // 👈 Activa el efecto 3D
    />
  );
}
```

### Modo Normal (Sin Efecto 3D)

Si NO incluyes el prop o lo seteas en `false`, el título funciona normalmente con su animación de brush stroke:

```jsx
<LTSectionTitle
  title="Título Normal"
  subtitle="Sin efecto 3D"
  gradientType="gaming"
  // enable3DEffect no está presente = comportamiento normal
/>
```

## 📱 Estados Visuales

### Estado Inicial

```
Texto limpio: Color violeta (#747bbf)
Sin sombras ni outline
Fuente: Meta con peso 700
```

### Hover o Inactividad 2s

```
Texto outline: Stroke blanco 3px
Texto transparente (color: transparent)
Font weight: 900
Font italic: Activado
Sombras múltiples:
  - 6px violeta oscuro
  - 10px violeta claro
  - 14px naranja
  - 18px amarillo
  - 30px sombra difusa gris
```

## 🎯 Comportamiento de Inactividad

### Desktop

1. Usuario mueve el mouse → **Título normal** (sin efectos)
2. Usuario deja de mover mouse por **2 segundos** → **Efecto 3D se activa**
3. Usuario vuelve a mover mouse → **Efecto se desactiva**, vuelve a normal
4. Ciclo se repite

### Mobile

1. Usuario hace scroll → **Título normal**
2. Usuario deja de hacer scroll por **2 segundos** → **Efecto 3D se activa**
3. Usuario vuelve a hacer scroll/touch → **Efecto se desactiva**

## 📐 Responsive

### Desktop (> 768px)

```css
Outline: 3px
Sombras: 6px, 10px, 14px, 18px, 30px
```

### Mobile (≤ 768px)

```css
Outline: 2px (reducido)
Sombras: 4px, 7px, 10px, 13px, 20px (reducidas proporcionalmente)
```

## 🔧 Personalización

### Cambiar Tiempo de Inactividad

Actualmente está hardcodeado en 2000ms (2 segundos). Para cambiarlo, edita `LTSectionTitle.jsx`:

```jsx
// En el useEffect de inactividad, línea ~64
inactivityTimerRef.current = setTimeout(() => {
  setAuto3DActive(true);
}, 3000); // 👈 Cambiar a 3 segundos, por ejemplo
```

### Cambiar Colores del Efecto

Edita el archivo `src/styles/index.css`, sección `TÍTULOS CON EFECTO 3D ANIMADO`:

```css
.lt-section-title-3d:hover,
.lt-section-title-3d.lt-title-auto-active {
  text-shadow: 6px 6px 0px var(--tu-color-1), 10px 10px 0px var(--tu-color-2),
    14px 14px 0px var(--tu-color-3), 18px 18px 0px var(--tu-color-4),
    30px 30px 8px rgba(0, 0, 0, 0.4);
}
```

### Cambiar Velocidad de Transición

```css
.lt-section-title-3d {
  transition: all 0.8s ease; /* 👈 0.5s por defecto, cambiar aquí */
}
```

## 🎪 Ejemplo Completo

```jsx
import React from "react";
import LTSectionTitle from "../../common/LTSectionTitle";
import "./MiSeccion.css";

export default function MiSeccion() {
  return (
    <section className="lt-section-spacing">
      {/* Título con efecto 3D */}
      <LTSectionTitle
        title="Ofertas Exclusivas"
        subtitle="Solo por tiempo limitado"
        gradientType="innova"
        threshold={0.35}
        enable3DEffect={true}
      />

      {/* Contenido de la sección */}
      <div className="mi-contenido">{/* ... */}</div>
    </section>
  );
}
```

## ⚡ Performance

### Optimizaciones Implementadas

- ✅ Event listeners limpiados en cleanup
- ✅ Timer de inactividad cancelado en unmount
- ✅ Efecto solo se activa si `enable3DEffect={true}`
- ✅ Transiciones CSS (GPU aceleradas)
- ✅ Will-change no usado (mejor para performance en este caso)

### Mejores Prácticas

- Usar en títulos principales de sección
- No abusar (máximo 3-4 títulos con efecto por página)
- Asegurar que el texto sea legible en ambos estados

## 🐛 Troubleshooting

### El efecto no se activa

1. Verificar que `enable3DEffect={true}` está presente
2. Revisar consola por errores de JavaScript
3. Confirmar que la fuente "Meta" se carga correctamente

### El efecto parpadea

- Normal durante desarrollo con Hot Reload
- En producción debería ser suave

### Las sombras se ven mal en móvil

- Las sombras ya están optimizadas para móvil (reducidas)
- Si aún se ven mal, considera deshabilitar en mobile:

```jsx
const isMobile = window.innerWidth <= 768;

<LTSectionTitle
  title="Mi Título"
  enable3DEffect={!isMobile} // 👈 Solo desktop
/>;
```

## 📚 Archivos Modificados

1. **src/styles/index.css**

   - Agregada fuente variable "Meta"
   - Clase `.lt-section-title-3d`
   - Clase `.lt-title-auto-active`
   - Media queries responsive

2. **src/common/LTSectionTitle.jsx**
   - Nuevo prop `enable3DEffect`
   - Lógica de detección de inactividad
   - Aplicación de clases CSS dinámicas

## 🎓 Inspiración

Efecto basado en técnicas de tipografía variable con múltiples sombras (layered text shadow), popularizado en diseño web moderno para crear profundidad y dimension sin usar imágenes.

---

**Creado para LT Distribuidora** 🎨✨
