// para detectar si el usuario está en mobile o no.
// esto lo usamos para mostrar/ocultar cosas según el tamaño de pantalla.
import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 600; // Si la pantalla es menor o igual a 600px, lo consideramos mobile.

// Hook para React, te dice si el usuario está en mobile y se actualiza solo si cambia el tamaño.
// si querés cambiar el breakpoint, tocá el número de arriba.
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Si no hay window, devolvemos false.
    if (typeof window === "undefined") return false;
    return window.innerWidth <= MOBILE_BREAKPOINT;
  });
  useEffect(() => {
    // Cada vez que se redimensiona la ventana, chequeamos si sigue siendo mobile.
    const handleResize = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// Función para usar fuera de React, por si la necesitás en un archivo común.
// si querés chequear mobile en un helper, usá esta.
export function isMobile() {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

export default isMobile;
