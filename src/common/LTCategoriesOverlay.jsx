import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./LTCategoriesOverlay.css";
import HamburgerMenuIcon from "../assets/icons/svg/hamburger-menu-svgrepo-com.svg";
import BoxIcon from "../assets/icons/svg/box-svgrepo-com.svg";
import StarIcon from "../assets/icons/svg/star-svgrepo-com.svg";
import BadgeDollarIcon from "../assets/icons/svg/badge-dollar-svgrepo-com.svg";
import GiftIcon from "../assets/icons/svg/gift-svgrepo-com.svg";
import UserIcon from "../assets/icons/svg/user-svgrepo-com.svg";
import AddressBookIcon from "../assets/icons/svg/address-book-svgrepo-com.svg";
import BagIcon from "../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import MailIcon from "../assets/icons/svg/mail-alt-2-svgrepo-com.svg";
import QuestionIcon from "../assets/icons/svg/question-svgrepo-com.svg";

// ste es el overlay lateral de categorías.
// Nahuel, si querés que las categorías vengan del backend, tendrías que reemplazar el array de
// "categories" por un fetch/axios.

export default function LTCategoriesOverlay({ open, onClose }) {
  // Componente principal del overlay. Recibe "open" para saber si está abierto y "onClose" para cerrarlo.
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [, setMenuDelay] = useState(false);

  // estas categorías están hardcodeadas. Si las traés del backend, reemplazá este array
  // por lo que venga de la API.
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

  // Menú de abajo, con iconos y labels. Si querés agregar más, sumalos acá.
  const menuItems = [
    {
      label: "Todas las categorías",
      icon: HamburgerMenuIcon,
    },
    {
      label: "Nuevos Ingresos",
      icon: BoxIcon,
    },
    {
      label: "Más Vendidos",
      icon: StarIcon,
    },
    {
      label: "Ofertas",
      icon: BadgeDollarIcon,
    },
    {
      label: "Vouchers",
      icon: GiftIcon,
    },
    {
      label: "Mi Cuenta",
      icon: UserIcon,
    },
    {
      label: "Mi Pedido",
      icon: BagIcon,
    },
    {
      label: "Contacto",
      icon: MailIcon,
    },
    {
      label: "Ayuda",
      icon: QuestionIcon,
    },
  ];

  // Función para cerrar el overlay con animación. Cuando termina, llama al onClose.
  function handleClose() {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      setExpanded(null); // Reiniciar categoría expandida
      if (onClose) onClose();
    }, 400); // Duración igual a la animación
  }

  // Bloquea el scroll del body cuando el overlay está abierto, así no se mueve el fondo.
  React.useEffect(() => {
    if (open || closing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, closing]);

  // Saber si alguna categoría está expandida
  const isAnyExpanded = expanded !== null;

  // Delay para ocultar el menú principal antes de mostrar el submenú
  React.useEffect(() => {
    setMenuDelay(isAnyExpanded);
  }, [isAnyExpanded]);

  // Solo renderiza si está abierto o está cerrando (para la animación)
  if (!open && !closing) return null;

  // Render principal del overlay.
  return createPortal(
    <div
      className={`LTCategoriesOverlay${closing ? " slideOutLeft" : ""}`}
      tabIndex={-1}
    >
      {/* Header con el título y el botón para cerrar */}
      <div className="LTCategoriesOverlay__header">
        <span>Categorías</span>
        <button
          className="lt-button-light LTCategoriesOverlay__close"
          onClick={handleClose}
          aria-label="Cerrar"
          type="button"
        >
          {/* Icono de cerrar (X) */}
          <svg
            className="LTCategoriesOverlay__closeIcon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4L20 20M20 4L4 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="LTCategoriesOverlay__list" style={{ gap: 0 }}>
        <div className="LTCategoriesOverlay__categories">
          {/* Listado de categorías con subcategorías desplegables */}
          {categories.map((cat, idx) => (
            <React.Fragment key={cat.id}>
              {/* Item principal de la categoría */}
              <div
                className={`LTCategoriesOverlay__item LTCategoriesOverlay__expandable${
                  expanded === idx ? " expanded" : ""
                }`}
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                style={{
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  background:
                    expanded === idx ? "var(--lt-accent-color-dark)" : "#fff",
                  color: expanded === idx ? "#fff" : "#222",
                  borderRadius: "0px",
                  boxShadow:
                    expanded === idx ? "0 2px 8px rgba(74,81,85,0.08)" : "none",
                  width: "100%",
                  minWidth: 0,
                  boxSizing: "border-box",
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              >
                <span style={{ color: expanded === idx ? "#fff" : undefined }}>
                  {cat.name}
                </span>
                <span
                  style={{
                    marginLeft: 8,
                    display: "inline-block",
                    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {/* Flechita para expandir/cerrar la subcategoría */}
                  <svg
                    className="LTCategoriesOverlay__caret"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform:
                        expanded === idx ? "rotate(0deg)" : "rotate(180deg)",
                      transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <path
                      d="M6 15L12 9L18 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
              {/* Subcategorías desplegables */}
              <div
                className={`LTCategoriesOverlay__sublist${
                  expanded === idx ? " LTCategoriesOverlay__sublist--open" : ""
                }`}
                style={{
                  maxHeight: expanded === idx ? "400px" : "0px",
                  opacity: expanded === idx ? 1 : 0,
                  overflow: "hidden",
                  transition:
                    "max-height 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s",
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              >
                {cat.subcategories.map((sub, subIdx) => (
                  <div
                    className="LTCategoriesOverlay__subitem"
                    key={subIdx}
                    style={{
                      padding: "10px 18px",
                      background: "#f7f7f7",
                      borderRadius: "6px",
                      margin: "4px 0",
                      fontSize: "0.98em",
                      color: "#222",
                      fontWeight: 500,
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* Nombre de la subcategoría */}
                    {sub}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Menú de abajo, con iconos y opciones extra */}
      <div
        className="LTCategoriesOverlay__bottomMenuContainer"
        style={{ marginTop: 0, paddingTop: 0 }}
      >
        <div className="LTCategoriesOverlay__menu LTCategoriesOverlay__menu--visible">
          {menuItems
            .filter((item) => item.label !== "Ayuda")
            .map((item, idx) => (
              <div
                className={`LTCategoriesOverlay__item LTCategoriesOverlay__menuitem${
                  idx === 0 ? " first" : ""
                }`}
                key={idx}
              >
                {/* Icono del menú */}
                {item.icon && (
                  <img
                    src={item.icon}
                    alt="icon"
                    className="LTCategoriesOverlay__menuitemIcon"
                  />
                )}
                {/* Texto de la opción */}
                <span className="LTCategoriesOverlay__menuitemText">
                  {item.label}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
