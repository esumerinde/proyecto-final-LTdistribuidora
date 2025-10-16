import { useEffect, useState } from "react";

// Hook para manejar el sticky dinámico del header/navbar según scroll
export default function useHeaderSticky() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // El header sube apenas se empieza a scrollear
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Devuelve si el header/navbar deben estar pegados arriba
  return isSticky;
}
