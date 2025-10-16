import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./LTCategoriesOverlay.css";
import HamburgerMenuIcon from "../../assets/icons/svg/hamburger-menu-svgrepo-com.svg";
import BoxIcon from "../../assets/icons/svg/box-svgrepo-com.svg";
import StarIcon from "../../assets/icons/svg/star-svgrepo-com.svg";
import BadgeDollarIcon from "../../assets/icons/svg/badge-dollar-svgrepo-com.svg";
import GiftIcon from "../../assets/icons/svg/gift-svgrepo-com.svg";
import UserIcon from "../../assets/icons/svg/user-svgrepo-com.svg";
import AddressBookIcon from "../../assets/icons/svg/address-book-svgrepo-com.svg";
import BagIcon from "../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import MailIcon from "../../assets/icons/svg/mail-alt-2-svgrepo-com.svg";
import QuestionIcon from "../../assets/icons/svg/question-svgrepo-com.svg";

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

  // Bloquea el scroll del body de forma robusta usando una clase global
  React.useEffect(() => {
    if (open || closing) {
      document.body.classList.add("lt-overlay-open");
    } else {
      document.body.classList.remove("lt-overlay-open");
    }
    return () => {
      document.body.classList.remove("lt-overlay-open");
    };
  }, [open, closing]);

  // Saber si alguna categoría está expandida
  const isAnyExpanded = expanded !== null;

  // Delay para ocultar el menú principal antes de mostrar el submenú
  React.useEffect(() => {
    setMenuDelay(isAnyExpanded);
  }, [isAnyExpanded]);

  // Solo renderiza si está abierto o está cerrando (para la animación)
  if (!open && !closing) {
    if (expanded !== null) setExpanded(null); // Reiniciar expansión al cerrar
    return null;
  }

  // Render principal del overlay.
  return createPortal(
    <div
      className={`LTCategoriesOverlay${closing ? " slideOutLeft" : ""}`}
      tabIndex={-1}
      style={closing ? { pointerEvents: "none" } : undefined}
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
          {/* Icono de cerrar */}
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
      {/* Contenedor scrollable con categorías y menú */}
      <div className="LTCategoriesOverlay__list">
        <div className="LTCategoriesOverlay__categories">
          {/* Listado de categorías con subcategorías desplegables */}
          {categories.map((cat, idx) => {
            const isExpanded = expanded === idx;
            return (
              <React.Fragment key={cat.id}>
                {/* Item principal de la categoría */}
                <div
                  className={`LTCategoriesOverlay__item LTCategoriesOverlay__expandable${
                    isExpanded ? " expanded" : ""
                  }`}
                  onClick={() => setExpanded(isExpanded ? null : idx)}
                >
                  <span className={isExpanded ? "expanded" : ""}>
                    {cat.name}
                  </span>
                  <span className="LTCategoriesOverlay__caretContainer">
                    {/* Flechita para expandir/cerrar la subcategoría */}
                    <svg
                      className={`LTCategoriesOverlay__caret${
                        isExpanded ? " rotated" : ""
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                    isExpanded ? " LTCategoriesOverlay__sublist--open open" : ""
                  }`}
                  aria-hidden={!isExpanded}
                  style={{
                    maxHeight: isExpanded ? "400px" : "0px",
                    opacity: isExpanded ? 1 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {cat.subcategories.map((sub, subIdx) => (
                    <div className="LTCategoriesOverlay__subitem" key={subIdx}>
                      {sub}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            );
          })}
          {/* Espacio vacío entre categorías y menú de abajo */}
          <div
            className="LTCategoriesOverlay__item"
            style={{
              pointerEvents: "none",
              background: "transparent",
              boxShadow: "none",
            }}
          ></div>
          <div
            className="LTCategoriesOverlay__item"
            style={{
              pointerEvents: "none",
              background: "transparent",
              boxShadow: "none",
            }}
          ></div>
          {/* Menú de abajo, con iconos y opciones extra, renderizado al final */}
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
                  <span
                    className={`LTCategoriesOverlay__menuitemText${
                      idx === 0 ? " lt-menu-hover" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
