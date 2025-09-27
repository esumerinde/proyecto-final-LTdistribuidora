import React, { createContext, useContext, useState, useEffect } from "react";

const CarouselSyncContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCarouselSync() {
  return useContext(CarouselSyncContext);
}

export function CarouselSyncProvider({ totalSlides, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
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
