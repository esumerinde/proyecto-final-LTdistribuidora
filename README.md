# LT Electrónica - Ecommerce

Proyecto de tienda online para LT Electrónica desarrollado con React + Vite.

## Estructura del proyecto

```
src/
├── assets/          # Recursos estáticos
│   ├── images/      # Imágenes
│   ├── fonts/       # Fuentes personalizadas
│   └── icons/       # Iconos
├── components/      # Componentes React
│   ├── Layout/      # Componentes de estructura (Header, Footer, etc.)
│   ├── UI/          # Componentes de interfaz reutilizables
│   └── Common/      # Componentes comunes
├── context/         # Context API de React
├── hooks/           # Custom hooks
├── pages/           # Componentes de páginas
├── styles/          # Archivos CSS
└── utils/           # Funciones utilitarias
```

## Convenciones

- **Prefijo CSS**: `lt-` (ej: `lt-header`, `lt-button`)
- **Componentes**: PascalCase (ej: `Header.jsx`)
- **Archivos CSS**: kebab-case (ej: `header.css`)
- **Variables CSS**: `--lt-*` (ej: `--lt-primary-color`)

## Comandos disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Instalación

````bash
npm install
npm run dev
```+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
````
