import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LTHeader from "../Header/LTHeader";
import LTHeaderMobile from "../Header/LTHeaderMobile";
import LTNavbar from "../Navbar/LTNavbar";
import LTFooter from "../Footer/LTFooter";
import LTFooterMobile from "../Footer/LTFooterMobile";

// Hook para detectar si la pantalla es móvil
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
};

const AccountLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="lt-app">
      {/* Header con OfferBar fija para cuenta */}
      {isMobile ? (
        <LTHeaderMobile showOfferBar forcePinnedOffer />
      ) : (
        <LTHeader showOfferBar forcePinnedOffer />
      )}

      {/* Navbar ajustada al offerBar */}
      <LTNavbar hasOfferBar forcePinnedOffer />

      {/* Contenido Principal */}
      <Outlet />

      {/* Footer */}
      {isMobile ? <LTFooterMobile /> : <LTFooter />}
    </div>
  );
};

export default AccountLayout;
