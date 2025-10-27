import React from "react";
import { Outlet } from "react-router-dom";
import LTSimpleHeader from "../Header/LTSimpleHeader";
import { useIsMobile } from "../../../hooks/useIsMobile";
import "../Header/LTHeader.onlylogo.css";

/**
 * Layout para páginas de autenticación (Login, Register)
 * Solo muestra SimpleHeader (logo únicamente) sin navbar ni footer
 */
const LoginLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="lt-app">
      <LTSimpleHeader />
      <Outlet />
    </div>
  );
};

export default LoginLayout;
