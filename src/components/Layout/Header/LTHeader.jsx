// Importación de React y dependencias

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../../context/AuthModalContext";
import { useFavorites } from "../../../hooks/useFavorites";
import { useToast } from "../../../hooks/useToast";
import useHeaderReaccommodation from "../../../hooks/useHeaderReaccommodation";
import LTSearchBar from "./LTSearchBar/LTSearchBar";
import LTHeaderOffer from "./LTHeaderOffer/LTHeaderOffer";
import "./LTHeader.css";
import logoBlanco from "../../../assets/images/logos/logo-blanco.png";
import {
  Calendar,
  Ticket,
  Mail,
  Shield,
  ShoppingBag,
  Tag,
  Settings,
  XCircle,
  Heart,
  Bell,
} from "lucide-react";
import { getInitials } from "../../../mocks/users";
import {
  getCurrentUser,
  clearCurrentUser,
  isLoggedIn as getIsLoggedIn,
} from "../../../utils/authStorage";

const LTHeader = ({
  showOfferBar = true,
  className = "",
  forcePinnedOffer = false,
}) => {
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
  const [loggedIn, setLoggedIn] = useState(() => getIsLoggedIn());

  // Verificar si el usuario está logueado desde localStorage
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleStorageChange = () => {
      setLoggedIn(getIsLoggedIn());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      setUserInfo(null);
      setIsAccountMenuOpen(false);
      return;
    }

    const storedUser = getCurrentUser();
    if (!storedUser) {
      setUserInfo(null);
      return;
    }

    const fallbackIdentifier = storedUser.username || "";
    const displayName = (storedUser.fullName || fallbackIdentifier).trim();
    const nameParts = displayName.split(/\s+/).filter(Boolean);
    const fallbackParts = fallbackIdentifier.split(/\s+/).filter(Boolean);
    const firstNameCandidate = nameParts[0] || fallbackParts[0] || "";
    const email = storedUser.email || "";
    const initialsSource = displayName || email || fallbackIdentifier || "";
    const initials = storedUser.initials || getInitials(initialsSource);

    setUserInfo({
      username: storedUser.username || "",
      fullName: displayName || "Mi Cuenta",
      firstName:
        firstNameCandidate || displayName || fallbackIdentifier || "Mi Cuenta",
      email,
      initials: (initials || "US").toUpperCase(),
      role: storedUser.role || "usuario",
    });
  }, [loggedIn]);

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  // Efecto para cerrar menú de notificaciones al hacer clic fuera
  useEffect(() => {
    if (!isNotificationsMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        notificationsMenuRef.current &&
        !notificationsMenuRef.current.contains(event.target)
      ) {
        setIsNotificationsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotificationsMenuOpen]);

  // Efecto para cerrar menú de favoritos al hacer clic fuera
  useEffect(() => {
    if (!isFavoritesMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        favoritesMenuRef.current &&
        !favoritesMenuRef.current.contains(event.target)
      ) {
        setIsFavoritesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFavoritesMenuOpen]);

  const closeAccountMenu = () => setIsAccountMenuOpen(false);
  const toggleAccountMenu = () => {
    setIsAccountMenuOpen((previousState) => !previousState);
    setIsNotificationsMenuOpen(false);
    setIsFavoritesMenuOpen(false);
  };

  const closeNotificationsMenu = () => setIsNotificationsMenuOpen(false);
  const toggleNotificationsMenu = () => {
    setIsNotificationsMenuOpen((prev) => !prev);
    setIsAccountMenuOpen(false);
    setIsFavoritesMenuOpen(false);
  };

  const closeFavoritesMenu = () => setIsFavoritesMenuOpen(false);
  const toggleFavoritesMenu = () => {
    setIsFavoritesMenuOpen((prev) => !prev);
    setIsAccountMenuOpen(false);
    setIsNotificationsMenuOpen(false);
  };

  const navigateToAccountSection = (mainId, subId) => {
    if (typeof window !== "undefined" && mainId) {
      const payload = { main: mainId };
      if (subId) payload.sub = subId;
      window.sessionStorage.setItem(
        "lt-account-target",
        JSON.stringify(payload)
      );
    }
    navigate("/my-account");
    closeAccountMenu();
  };

  const navigateToAccountHome = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("lt-account-target");
    }
    navigate("/my-account");
    closeAccountMenu();
  };

  const navigateToFavorites = () => {
    navigate("/my-account/favorites");
    closeAccountMenu();
  };

  const navigateToNotifications = () => {
    navigate("/my-account/notifications");
    closeAccountMenu();
  };

  const handleLogout = () => {
    closeAccountMenu();
    clearCurrentUser();
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("lt-account-target");
    }
    setLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const isUserLogged = Boolean(userInfo);
  const isAdmin = userInfo?.role === "admin";

  const adminOfferItems = isAdmin
    ? [
        { label: "Panel de Admin", onClick: () => navigate("/adminpanel") },
        { label: "Cerrar Sesión", onClick: handleLogout, variant: "danger" },
      ]
    : [];

  const accountMenuEntries = [
    {
      type: "item",
      label: "Mis Reservas",
      icon: Calendar,
      action: () => navigateToAccountSection("reservas", "mis-reservas"),
    },
    {
      type: "item",
      label: "Historial de reservas",
      icon: Ticket,
      action: () => navigateToAccountSection("reservas", "reservas-anteriores"),
    },
    {
      type: "item",
      label: "Preguntas",
      icon: Mail,
      action: () => navigateToAccountSection("reservas", "preguntas"),
    },
    {
      type: "item",
      label: "Opiniones",
      icon: Shield,
      action: () => navigateToAccountSection("reservas", "opiniones"),
    },
    { type: "separator" },
    {
      type: "item",
      label: "Mis Favoritos",
      icon: Heart,
      action: navigateToFavorites,
    },
    {
      type: "item",
      label: "Notificaciones",
      icon: Bell,
      action: navigateToNotifications,
    },
    { type: "separator" },
    {
      type: "item",
      label: "Todos los productos",
      icon: ShoppingBag,
      action: () => navigateToAccountSection("productos", "todos-productos"),
    },
    {
      type: "item",
      label: "Todas las marcas",
      icon: Tag,
      action: () => navigateToAccountSection("marcas", "todas-marcas"),
    },
    {
      type: "item",
      label: "Todos los vouchers",
      icon: Ticket,
      action: () => navigateToAccountSection("vouchers", "todos-vouchers"),
    },
    { type: "separator" },
    {
      type: "item",
      label: "Configuración",
      icon: Settings,
      action: () => navigateToAccountSection("configuracion", "configuracion"),
    },
    {
      type: "item",
      label: "Cerrar Sesión",
      icon: XCircle,
      action: handleLogout,
      variant: "danger",
    },
  ];

  const effectiveShowOfferBar = Boolean(
    showOfferBar || isAdmin || forcePinnedOffer
  );

  const { isSticky, headerTop, animation, isOfferVisible } =
    useHeaderReaccommodation({
      showOfferBar: effectiveShowOfferBar,
      forceOfferPinned: (isAdmin && effectiveShowOfferBar) || forcePinnedOffer,
    });

  // Renderiza siempre el header desktop
  return (
    <>
      {/* Barra de ofertas animada, se oculta si el header está sticky o si showOfferBar es false */}
      {effectiveShowOfferBar && (
        <LTHeaderOffer
          className={
            !isOfferVisible
              ? "LTHeaderOffer LTHeaderOffer--hidden"
              : "LTHeaderOffer"
          }
          style={{ transition: `top ${animation}, opacity ${animation}` }}
          isAdmin={isAdmin}
          isPinned={isAdmin || forcePinnedOffer}
          adminItems={adminOfferItems}
        />
      )}
      {/* Header principal desktop */}
      <header
        className={`LTHeaderWrapper${isSticky ? " LTHeaderSticky" : ""}${
          className ? ` ${className}` : ""
        }`}
        style={{ top: headerTop, transition: `top ${animation}` }}
      >
        <div className="LTHeaderRowContainer">
          {/* Sección del logo */}
          <div className="LTHeaderDivLogo">
            <img
              src={logoBlanco}
              alt="Logo LT Distribuidora"
              className="LTHeaderLogoImg"
              style={{ width: "200px", height: "auto", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </div>
          {/* Sección de barra de búsqueda */}
          <div className="LTHeaderDivSearchBar">
            <LTSearchBar />
          </div>
          {/* Sección de menú de acciones */}
          <div className="LTHeaderDivMenu">
            <div className="LTHeaderMenu">
              {/* Mostrar según estado de login */}
              {!isUserLogged ? (
                <>
                  {/* Botón Ingresá */}
                  <button
                    className="LTHeaderMenuButton LTHeaderMenuButtonLogin"
                    onClick={openLogin}
                  >
                    <span
                      className="lt-menu-hover"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        className="LTHeaderMenuIcon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Ingresá
                    </span>
                  </button>
                  {/* Botón Registrarme */}
                  <button
                    className="LTHeaderMenuButton LTHeaderMenuButtonRegister"
                    onClick={() => navigate("/register")}
                  >
                    <span
                      className="lt-menu-hover"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <svg
                        className="LTHeaderMenuIcon"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M15 18C14.7164 16.8589 13.481 16 12 16C10.519 16 9.28364 16.8589 9 18M12 12H12.01M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Registrarme
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {/* Botón Mi Cuenta (cuando está logueado) */}
                  <div className="LTHeaderAccountWrapper" ref={accountMenuRef}>
                    <button
                      type="button"
                      className={`LTHeaderMenuButton LTHeaderMenuButtonAccount${
                        isAccountMenuOpen
                          ? " LTHeaderMenuButtonAccount--open"
                          : ""
                      }`}
                      onClick={toggleAccountMenu}
                      aria-haspopup="menu"
                      aria-expanded={isAccountMenuOpen}
                    >
                      <span
                        className={`lt-menu-hover${
                          isAccountMenuOpen ? " lt-menu-hover--active" : ""
                        }`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <svg
                          className="LTHeaderMenuIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {userInfo?.firstName ||
                          userInfo?.fullName ||
                          "Mi Cuenta"}
                      </span>
                    </button>

                    {isAccountMenuOpen && (
                      <div className="LTHeaderAccountDropdown" role="menu">
                        <button
                          type="button"
                          className="LTHeaderAccountProfile"
                          onClick={navigateToAccountHome}
                        >
                          <div className="LTHeaderAccountInitials">
                            {userInfo?.initials || "US"}
                          </div>
                          <div className="LTHeaderAccountProfileDetails">
                            <p className="LTHeaderAccountProfileName">
                              {userInfo.fullName || "Mi Cuenta"}
                            </p>
                            {userInfo.email && (
                              <span className="LTHeaderAccountProfileEmail">
                                {userInfo.email}
                              </span>
                            )}
                            <span className="LTHeaderAccountProfileLink">
                              Mi perfil
                            </span>
                          </div>
                        </button>

                        <div className="LTHeaderAccountList">
                          {accountMenuEntries.map((entry, index) => {
                            if (entry.type === "separator") {
                              return (
                                <div
                                  key={`account-separator-${index}`}
                                  className="LTHeaderAccountSeparator"
                                />
                              );
                            }

                            const IconComponent = entry.icon;
                            return (
                              <button
                                type="button"
                                key={entry.label}
                                className={`LTHeaderAccountItem${
                                  entry.variant === "danger"
                                    ? " LTHeaderAccountItem--danger"
                                    : ""
                                }`}
                                onClick={entry.action}
                                role="menuitem"
                              >
                                <IconComponent
                                  className="LTHeaderAccountItemIcon"
                                  size={18}
                                />
                                <span>{entry.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Botón Favoritos */}
                  <div
                    className="LTHeaderFavoritesWrapper"
                    ref={favoritesMenuRef}
                  >
                    <button
                      type="button"
                      className={`LTHeaderMenuButton LTHeaderMenuButtonFavorites${
                        isFavoritesMenuOpen
                          ? " LTHeaderMenuButtonFavorites--open"
                          : ""
                      }`}
                      onClick={toggleFavoritesMenu}
                      aria-haspopup="menu"
                      aria-expanded={isFavoritesMenuOpen}
                    >
                      <span
                        className={`lt-menu-hover${
                          isFavoritesMenuOpen ? " lt-menu-hover--active" : ""
                        }`}
                      >
                        <svg
                          className="LTHeaderMenuIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {isFavoritesMenuOpen && (
                      <div className="LTHeaderFavoritesDropdown" role="menu">
                        <FavoritesDropdownContent
                          onClose={closeFavoritesMenu}
                          navigate={navigate}
                        />
                      </div>
                    )}
                  </div>
                  {/* Botón Notificaciones */}
                  <div
                    className="LTHeaderNotificationsWrapper"
                    ref={notificationsMenuRef}
                  >
                    <button
                      type="button"
                      className={`LTHeaderMenuButton LTHeaderMenuButtonNotifications${
                        isNotificationsMenuOpen
                          ? " LTHeaderMenuButtonNotifications--open"
                          : ""
                      }`}
                      onClick={toggleNotificationsMenu}
                      aria-haspopup="menu"
                      aria-expanded={isNotificationsMenuOpen}
                    >
                      <span
                        className={`lt-menu-hover${
                          isNotificationsMenuOpen
                            ? " lt-menu-hover--active"
                            : ""
                        }`}
                      >
                        <svg
                          className="LTHeaderMenuIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    {isNotificationsMenuOpen && (
                      <div
                        className="LTHeaderNotificationsDropdown"
                        role="menu"
                      >
                        <div className="LTHeaderNotificationsHeader">
                          <h3 className="LTHeaderNotificationsTitle">
                            Notificaciones
                          </h3>
                          <button
                            type="button"
                            className="LTHeaderNotificationsMarkAll"
                            onClick={() => {
                              // Aquí irá la lógica para marcar todas como leídas
                              console.log("Marcar todas como leídas");
                            }}
                          >
                            Marcar como leídas
                          </button>
                        </div>

                        <div className="LTHeaderNotificationsEmpty">
                          <svg
                            className="LTHeaderNotificationsEmptyIcon"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                          </svg>
                          <p>No tenés notificaciones nuevas</p>
                        </div>

                        <div className="LTHeaderNotificationsFooter">
                          <button
                            type="button"
                            className="LTHeaderNotificationsViewAll"
                            onClick={() => {
                              navigate("/notifications");
                              closeNotificationsMenu();
                            }}
                          >
                            Ver todas las notificaciones
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Botón Carrito */}
                  <button className="LTHeaderMenuButton LTHeaderMenuButtonCarrito">
                    <div className="LTHeaderCartContainer">
                      <span
                        className="lt-menu-hover"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          position: "relative",
                        }}
                      >
                        <svg
                          className="LTHeaderMenuIcon"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="LTHeaderCartCount">{cartCount}</span>
                      </span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

// Componente interno: Contenido del dropdown de Favoritos
const FavoritesDropdownContent = ({ onClose, navigate }) => {
  const { getRecent, removeFromFavorites } = useFavorites();
  const { success } = useToast();
  const [recentFavorites, setRecentFavorites] = useState([]);

  useEffect(() => {
    setRecentFavorites(getRecent(3));
  }, [getRecent]);

  const handleRemove = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const result = removeFromFavorites(productId);
    if (result.success) {
      setRecentFavorites(getRecent(3));
      success("Producto eliminado de favoritos");
    }
  };

  const handleViewAll = () => {
    navigate("/my-account");
    onClose();
  };

  const isEmpty = recentFavorites.length === 0;

  return (
    <>
      <div className="LTHeaderFavoritesHeader">
        <h3 className="LTHeaderFavoritesTitle">Favoritos</h3>
        <span className="LTHeaderFavoritesCount">
          {recentFavorites.length}{" "}
          {recentFavorites.length === 1 ? "producto" : "productos"}
        </span>
      </div>

      {isEmpty ? (
        <div className="LTHeaderFavoritesEmpty">
          <svg
            className="LTHeaderFavoritesEmptyIcon"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <p>No tenés productos favoritos aún</p>
        </div>
      ) : (
        <div className="LTHeaderFavoritesList">
          {recentFavorites.map((product) => (
            <div key={product.id} className="LTHeaderFavoriteCard">
              <img
                src={product.image}
                alt={product.name}
                className="LTHeaderFavoriteCardImg"
              />
              <div className="LTHeaderFavoriteCardInfo">
                <div className="LTHeaderFavoriteCardBrand">{product.brand}</div>
                <div className="LTHeaderFavoriteCardTitle">{product.name}</div>
                <div className="LTHeaderFavoriteCardPriceRow">
                  {product.originalPrice && (
                    <span className="LTHeaderFavoriteCardOldPrice">
                      ${product.originalPrice}
                    </span>
                  )}
                  {product.discountPrice && (
                    <span className="LTHeaderFavoriteCardPrice">
                      ${product.discountPrice}
                    </span>
                  )}
                </div>
              </div>
              <button
                type="button"
                className="LTHeaderFavoriteCardRemove"
                onClick={(e) => handleRemove(e, product.id)}
                aria-label="Eliminar de favoritos"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="LTHeaderFavoritesFooter">
        <button
          type="button"
          className="LTHeaderFavoritesViewAll"
          onClick={handleViewAll}
        >
          Ver todos tus productos favoritos
        </button>
      </div>
    </>
  );
};

export default LTHeader;
