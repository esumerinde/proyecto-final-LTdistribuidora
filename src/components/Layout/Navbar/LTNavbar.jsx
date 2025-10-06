import React, { useState, useEffect, useRef } from "react";
import useHeaderReaccommodation from "../../../common/useHeaderReaccommodation";
import LTNavbarNavmenu from "./LTNavbarNavmenu/LTNavbarNavmenu";
import "./LTNavbar.css";
import {
  getCurrentUser,
  isLoggedIn as getIsLoggedIn,
} from "../../../common/authStorage";

const LTNavbar = ({ hasOfferBar = true, forcePinnedOffer = false }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const submenuRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(() => getIsLoggedIn());
  const [isAdmin, setIsAdmin] = useState(() => {
    const storedUser = getCurrentUser();
    return storedUser?.role === "admin";
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleStorageChange = () => {
      const newLoggedIn = getIsLoggedIn();
      setLoggedIn(newLoggedIn);
      if (!newLoggedIn) {
        setIsAdmin(false);
        return;
      }
      const user = getCurrentUser();
      setIsAdmin(user?.role === "admin");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    const user = getCurrentUser();
    setIsAdmin(user?.role === "admin");
  }, [loggedIn]);

  const offerBarActive = hasOfferBar || isAdmin || forcePinnedOffer;

  const { isSticky, navbarTop, animation } = useHeaderReaccommodation({
    showOfferBar: offerBarActive,
    forceOfferPinned: (isAdmin && offerBarActive) || forcePinnedOffer,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target)) {
        setIsSubmenuOpen(false);
        setHoveredCategory(null);
      }
    };

    if (isSubmenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSubmenuOpen]);

  const toggleSubmenu = () => {
    if (isSubmenuOpen) {
      setIsSubmenuOpen(false);
      setHoveredCategory(null); // Reiniciar submenú al cerrar
    } else {
      setIsSubmenuOpen(true);
    }
  };

  const handleCategoryHover = (categoryId) => {
    setHoveredCategory(categoryId);
  };

  const categories = [
    {
      id: 1,
      name: "Televisores",
      subcategories: [
        "Smart TV",
        "TV LED",
        "TV OLED",
        "TV 4K",
        "TV 8K",
        "Soportes para TV",
        "Decodificadores",
      ],
    },
    {
      id: 2,
      name: "Celulares",
      subcategories: [
        "Smartphones",
        "Teléfonos básicos",
        "iPhones",
        "Samsung Galaxy",
        "Xiaomi",
        "Motorola",
        "Liberados",
      ],
    },
    {
      id: 3,
      name: "Accesorios para Celulares",
      subcategories: [
        "Fundas y carcasas",
        "Protectores de pantalla",
        "Cargadores",
        "Auriculares",
        "Power banks",
        "Soportes",
        "Cables USB",
      ],
    },
    {
      id: 4,
      name: "Computadoras",
      subcategories: [
        "Notebooks",
        "PC de escritorio",
        "All in One",
        "Gaming PCs",
        "Workstations",
        "Mini PCs",
        "Chromebooks",
      ],
    },
    {
      id: 5,
      name: "Gaming",
      subcategories: [
        "Consolas",
        "Juegos",
        "Controles",
        "Headsets Gaming",
        "Teclados Gaming",
        "Mouse Gaming",
        "Sillas Gamer",
      ],
    },
    {
      id: 6,
      name: "Audio y Video",
      subcategories: [
        "Auriculares",
        "Parlantes",
        "Soundbars",
        "Home Theater",
        "Micrófonos",
        "Cámaras web",
        "Streaming",
      ],
    },
    {
      id: 7,
      name: "Componentes PC",
      subcategories: [
        "Procesadores",
        "Placas de video",
        "Memorias RAM",
        "Discos SSD",
        "Motherboards",
        "Fuentes",
        "Gabinetes",
      ],
    },
    {
      id: 8,
      name: "Electrodomésticos",
      subcategories: [
        "Aires acondicionados",
        "Heladeras",
        "Lavarropas",
        "Microondas",
        "Aspiradoras",
        "Cafeteras",
        "Ventiladores",
      ],
    },
  ];

  return (
    <nav
      className={`LTNavbarWrapper${isSticky ? " LTNavbarSticky" : ""}`}
      style={{ top: navbarTop, transition: `top ${animation}` }}
    >
      <div
        className="LTNavbarContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div className="LTNavbarCategorias" ref={submenuRef}>
          <button
            className={`lt-button-light lt-navbar-button-small${
              isSubmenuOpen ? " active" : ""
            }`}
            onClick={toggleSubmenu}
          >
            {/* SVG Hamburger icon inline, same style as Nuevos Ingresos */}
            <svg
              className="LTNavbarCategoriasIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="3"
                y="6"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="3"
                y="11"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
              />
              <rect
                x="3"
                y="16"
                width="18"
                height="2"
                rx="1"
                fill="currentColor"
              />
            </svg>
            <span>Categorías</span>
            <svg
              className={`LTNavbarCategoriasArrow${
                isSubmenuOpen ? " rotated" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Arrow / Caret_Down_MD">
                <path
                  id="Vector"
                  d="M16 10L12 14L8 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </g>
            </svg>
          </button>

          {isSubmenuOpen && (
            <div className="LTNavbarSubmenu">
              <div className="LTNavbarSubmenuContent">
                <ul className="LTNavbarSubmenuList">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="LTNavbarSubmenuItem"
                      onMouseEnter={() => handleCategoryHover(category.id)}
                    >
                      <a href="#" className="LTNavbarSubmenuLink">
                        {category.name}
                        <svg
                          className="LTNavbarSubmenuArrow"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5l7 7-7 7z" />
                        </svg>
                      </a>

                      {hoveredCategory === category.id && (
                        <div className="LTNavbarSubmenuExpanded">
                          <div className="LTNavbarSubmenuExpandedContent">
                            <h4 className="LTNavbarSubmenuExpandedTitle">
                              {category.name}
                            </h4>
                            <ul className="LTNavbarSubmenuExpandedList">
                              {category.subcategories.map(
                                (subcategory, index) => (
                                  <li key={index}>
                                    <a
                                      href="#"
                                      className="LTNavbarSubmenuExpandedLink"
                                    >
                                      {subcategory}
                                    </a>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* Espaciador para mover el navmenu a la derecha */}
        <div style={{ flex: "0 0 60px" }}></div>
        <div
          className="LTNavbarNavmenu"
          style={{
            flex: "0 1 500px",
            maxWidth: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <LTNavbarNavmenu />
        </div>
        {/* Espaciador flexible para empujar el botón a la derecha */}
        <div style={{ flex: 1 }}></div>
        <button className="lt-button-light lt-navbar-button-small">
          <svg
            className="LTButtonNavbarIcon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="LTButtonNavbarText">Nuevos Ingresos</span>
        </button>
      </div>
    </nav>
  );
};

export default LTNavbar;
