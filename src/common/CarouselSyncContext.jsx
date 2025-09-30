// Contexto para sincronizar los carouseles. Nahuel, esto es para que todos los carouseles se muevan juntos si hace falta.
// Usamos React Context para compartir el índice actual entre componentes. Si querés que todos los carouseles pasen de slide juntos, este es el lugar.
import React, { createContext, useContext, useState, useEffect } from "react";

const CarouselSyncContext = createContext();

// Hook para usar el contexto fácil en cualquier componente Nahuel si querés acceder al índice del slide, usá esto.
// eslint-disable-next-line react-refresh/only-export-components
export function useCarouselSync() {
  return useContext(CarouselSyncContext);
}

// Provider para envolver los carouseles. Acá se maneja el índice actual y el auto-slide cada 4 segundos.
// bueno nahuel si querés cambiar el tiempo del autoslide, tocá el número de milisegundos acá.
export function CarouselSyncProvider({ totalSlides, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    // esto es el intervalo que hace que el carousel pase solo cada 4 segundos.
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);
  return (
    <CarouselSyncContext.Provider
      value={{ currentIndex, setCurrentIndex, totalSlides }}
    >
      {children}
    </CarouselSyncContext.Provider>
  );
}
