import React from "react";
import { Outlet } from "react-router-dom";
import LTHeader from "../Header/LTHeader";
import SimpleHeader from "../Header/SimpleHeader/SimpleHeader";
import LTHeaderMobile from "../Header/LTHeaderMobile";
import { useIsMobile } from "../../../common/isMobile";
import "../Header/LTHeader.onlylogo.css";

/**
 * Layout para páginas de autenticación (Login, Register)
 * Solo muestra SimpleHeader (logo únicamente) sin navbar ni footer
 */
const LoginLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="lt-app">
      {isMobile ? (
        <LTHeaderMobile />
      ) : (
        <LTHeader showOfferBar={false} className="LTHeaderOnlyLogo" />
      )}
      <Outlet />
    </div>
  );
};

export default LoginLayout;
