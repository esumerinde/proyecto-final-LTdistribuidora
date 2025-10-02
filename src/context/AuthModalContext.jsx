import React, { createContext, useContext, useState } from "react";

const AuthModalContext = createContext();

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal debe usarse dentro de AuthModalProvider");
  }
  return context;
};

export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // 'login' o 'register'

  const openLogin = () => {
    setModalType("login");
    setIsOpen(true);
  };

  const openRegister = () => {
    setModalType("register");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchToRegister = () => {
    setModalType("register");
  };

  const switchToLogin = () => {
    setModalType("login");
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        modalType,
        openLogin,
        openRegister,
        closeModal,
        switchToRegister,
        switchToLogin,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
