import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@styles": "/src/styles",
      "@assets": "/src/assets",
      "@pages": "/src/pages",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
      "@context": "/src/context",
    },
  },
});
