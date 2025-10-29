import React from "react";
import { Outlet } from "react-router-dom";
import LTSimpleHeader from "../Header/LTSimpleHeader";

/**
 * Layout para páginas de autenticación (Login, Register)
 * Solo muestra SimpleHeader (logo únicamente) sin navbar ni footer
 */
const LoginLayout = () => (
  <div className="lt-app">
    <LTSimpleHeader />
    <Outlet />
  </div>
);

export default LoginLayout;
