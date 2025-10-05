# LTProductsCarousel - Archivos Compartidos

## 📋 Arquitectura Unificada

Los estilos de **LTProductsCarousel2**, **LTProductsCarousel3** y **LTProductsCarousel4** están unificados usando archivos maestros compartidos.

### Archivos Maestros (Source of Truth):

- `LTProductsCarousel/LTProductsCarousel.css` - **Desktop styles master**
- `LTProductsCarousel/LTProductsCarouselMobile.css` - **Mobile styles master**

### Archivos Derivados (Auto-generados):

- `LTProductsCarousel2/LTProductsCarousel2.css` ← Generado desde master
- `LTProductsCarousel2/LTProductsCarousel2Mobile.css` ← Generado desde master
- `LTProductsCarousel3/LTProductsCarousel3.css` ← Generado desde master
- `LTProductsCarousel3/LTProductsCarousel3Mobile.css` ← Generado desde master
- `LTProductsCarousel4/LTProductsCarousel4.css` ← Generado desde master
- `LTProductsCarousel4/LTProductsCarousel4Mobile.css` ← Generado desde master

## 🔧 Mantenimiento

### Para modificar los estilos:

**✅ HACER:**

1. Editar SOLAMENTE los archivos maestros en `LTProductsCarousel/`
2. Ejecutar los comandos de sincronización (ver abajo)

**❌ NO HACER:**

- NO editar directamente los archivos CSS en LTProductsCarousel2/3/4
- Esos archivos se sobrescriben automáticamente

### Comandos de Sincronización:

Ejecutar desde la carpeta `LTProductsCarousel`:

```powershell
# Mobile Sync
(Get-Content "LTProductsCarouselMobile.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel2$1' -replace 'ltpc-banner', 'ltpc2-banner' | Set-Content "../LTProductsCarousel2/LTProductsCarousel2Mobile.css"

(Get-Content "LTProductsCarouselMobile.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel3$1' -replace 'ltpc-banner', 'ltpc3-banner' | Set-Content "../LTProductsCarousel3/LTProductsCarousel3Mobile.css"

(Get-Content "LTProductsCarouselMobile.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel4$1' -replace 'ltpc-banner', 'ltpc4-banner' | Set-Content "../LTProductsCarousel4/LTProductsCarousel4Mobile.css"

# Desktop Sync
(Get-Content "LTProductsCarousel.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel2$1' -replace 'ltpc-', 'ltpc2-' | Set-Content "../LTProductsCarousel2/LTProductsCarousel2.css"

(Get-Content "LTProductsCarousel.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel3$1' -replace 'ltpc-', 'ltpc3-' | Set-Content "../LTProductsCarousel3/LTProductsCarousel3.css"

(Get-Content "LTProductsCarousel.css") -replace 'LTProductsCarousel([^234])', 'LTProductsCarousel4$1' -replace 'ltpc-', 'ltpc4-' | Set-Content "../LTProductsCarousel4/LTProductsCarousel4.css"
```

### O ejecutar todo de una vez:

```powershell
cd "c:\Facultad\2do año-segundo-cuatrimestre\Proyecto Final\LT-Electronica-v3.0\LT-Electronica-v2\src\components\Home\LTProductsCarousel"

# Sync all Mobile CSS
foreach ($num in 2,3,4) {
  (Get-Content "LTProductsCarouselMobile.css") -replace 'LTProductsCarousel([^234])', "LTProductsCarousel$num`$1" -replace 'ltpc-banner', "ltpc$num-banner" | Set-Content "../LTProductsCarousel$num/LTProductsCarousel${num}Mobile.css"
}

# Sync all Desktop CSS
foreach ($num in 2,3,4) {
  (Get-Content "LTProductsCarousel.css") -replace 'LTProductsCarousel([^234])', "LTProductsCarousel$num`$1" -replace 'ltpc-', "ltpc$num-" | Set-Content "../LTProductsCarousel$num/LTProductsCarousel$num.css"
}
```

## 📊 Ventajas de esta Arquitectura:

✅ **DRY (Don't Repeat Yourself)**: Un solo lugar para mantener estilos
✅ **Consistencia**: Garantiza que los 3 carousels sean idénticos
✅ **Fácil mantenimiento**: Cambios en un solo archivo se propagan a todos
✅ **Performance**: Menos duplicación de código CSS
✅ **Sin cambios en JSX**: Los componentes siguen funcionando sin modificación

## 🎯 Diferencias Específicas por Carousel:

Cada carousel solo difiere en:

- **Banner background image**: `--ltpc2-banner-bg`, `--ltpc3-banner-bg`, `--ltpc4-banner-bg`
- **Contenido de texto**: Definido en cada archivo JSX
- **Productos mostrados**: Importados desde mocks diferentes (products2, products3, products4)

Todo lo demás (dimensiones, animaciones, comportamientos, responsive) es 100% idéntico.
