import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LTHeader from "../Header/LTHeader";
import LTHeaderMobile from "../Header/LTHeaderMobile";
import LTNavbar from "../Navbar/LTNavbar";
import LTFooter from "../Footer/LTFooter";
import LTFooterMobile from "../Footer/LTFooterMobile";
import LTAccountSidebar from "./LTAccountSidebar";
import { isLoggedIn } from "../../../utils/authStorage";
import "./AccountLayout.css";

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
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  // Verificación al montar - ANTES de renderizar el Outlet
  useEffect(() => {
    // Verificación síncrona inmediata
    const checkAuth = () => {
      if (!isLoggedIn()) {
        navigate("/", { replace: true });
      } else {
        // Pequeño delay para evitar flash (opcional)
        setTimeout(() => setIsChecking(false), 50);
      }
    };

    checkAuth();
  }, [navigate]);

  // Mostrar loader mientras se verifica auth
  if (isChecking) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div
            className="spinner"
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid #e0e0e0",
              borderTop: "4px solid #747bbf",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p style={{ color: "#666", fontSize: "0.875rem" }}>
            Verificando acceso...
          </p>
        </div>
      </div>
    );
  }

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

      {/* Account Layout con Sidebar y Contenido */}
      <div className="account-layout">
        <LTAccountSidebar />
        <div className="main-content sidebar-visible">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      {isMobile ? <LTFooterMobile /> : <LTFooter />}
    </div>
  );
};

export default AccountLayout;
