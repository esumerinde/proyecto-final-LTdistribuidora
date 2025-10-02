import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthModalProvider } from "./context/AuthModalContext";
import Home from "./pages/Home/Home";
import LTLogin from "./pages/Login/LTLogin";
import LTRegister from "./pages/Register/LTRegister";
import LTMyAccount from "./pages/MyAccount/LTMyAccount";
import MainLayout from "./components/Layout/MainLayout/MainLayout";
import LoginLayout from "./components/Layout/LoginLayout/LoginLayout";
import AccountLayout from "./components/Layout/AccountLayout/AccountLayout";
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        {/* Modal de Login - Se renderiza globalmente */}
        <LTLogin />

        <Routes>
          {/* Rutas con Layout Principal (Header + Navbar + Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            {/* Aquí podes agregar más rutas: productos, categorías, etc. */}
          </Route>

          {/* Rutas con Layout de Autenticación (Header + Footer, sin Navbar ni HeaderOffer) */}
          <Route element={<LoginLayout />}>
            <Route path="/register" element={<LTRegister />} />
          </Route>

          {/* Rutas con Layout de Cuenta (Header sin Offer + Navbar + Footer) */}
          <Route element={<AccountLayout />}>
            <Route path="/my-account" element={<LTMyAccount />} />
          </Route>

          {/* Ruta 404 - Redirige al home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthModalProvider>
    </BrowserRouter>
  );
}

export default App;
