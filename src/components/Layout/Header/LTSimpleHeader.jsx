import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../../context/AuthModalContext";
import { useFavorites } from "../../../hooks/useFavorites";
import { useToast } from "../../../hooks/useToast";
import useHeaderReaccommodation from "../../../hooks/useHeaderReaccommodation";
import LTSearchBar from "./LTSearchBar/LTSearchBar";
import LTHeaderOffer from "./LTHeaderOffer/LTHeaderOffer";
import logoBlanco from "../../../assets/images/logos/logo-blanco.png";
import "./LTSimpleHeader.css";

const LTSimpleHeader = ({ showOfferBar = true, className = "", forcePinnedOffer = false }) => {
  const navigate = useNavigate();
  const { openLogin } = useAuthModal();
  const [cartCount] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isFavoritesMenuOpen, setIsFavoritesMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);
  const notificationsMenuRef = useRef(null);
  const favoritesMenuRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Copia lógica de LTHeader.jsx para estado de usuario, menús, etc.
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    setLoggedIn(!!window.localStorage.getItem("lt-current-user"));
    const handleStorageChange = () => {
      setLoggedIn(!!window.localStorage.getItem("lt-current-user"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ...aquí iría el resto de la lógica de menús, handlers, etc. (idéntico a LTHeader.jsx)...

  // Render igual al header normal
  return (
    <header className={`LTHeaderWrapper${className ? ` ${className}` : ""}`}>
      <div className="LTHeaderRowContainer" style={{ justifyContent: "flex-start" }}>
        {/* Sección del logo */}
        <div className="LTHeaderDivLogo" style={{ justifyContent: "flex-start" }}>
          <img
            src={logoBlanco}
            alt="Logo LT Distribuidora"
            className="LTHeaderLogoImg"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </header>
  );
};

export default LTSimpleHeader;
