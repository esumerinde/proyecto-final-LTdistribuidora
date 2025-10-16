import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  Calendar,
  ShoppingBag,
  Ticket,
  Tag,
  ChevronRight,
  Truck,
  MapPin,
} from "lucide-react";
import CaretUpIcon from "../../../assets/icons/svg/caret-up-md-svgrepo-com.svg";
import CaretDownIcon from "../../../assets/icons/svg/caret-down-md-svgrepo-com.svg";
import { getCurrentUser } from "../../../utils/authStorage";
import { getInitials } from "../../../mocks/users";
import "./LTAccountSidebar.css";

const FALLBACK_PROFILE = {
  fullName: "Mi Cuenta",
  firstName: "Mi Cuenta",
  email: "",
  initials: "MC",
  avatarUrl: "",
  role: "guest",
};

const buildUserProfile = (rawUser) => {
  if (!rawUser) {
    return { ...FALLBACK_PROFILE };
  }

  const primaryFirstName = (
    rawUser.firstName ||
    rawUser.givenName ||
    ""
  ).trim();
  const primaryLastName = (rawUser.lastName || rawUser.familyName || "").trim();
  const combined = [primaryFirstName, primaryLastName]
    .filter(Boolean)
    .join(" ");
  const fullName =
    rawUser.fullName?.trim() ||
    combined ||
    rawUser.displayName?.trim() ||
    rawUser.username ||
    FALLBACK_PROFILE.fullName;

  const firstName =
    primaryFirstName ||
    fullName.split(" ")[0] ||
    rawUser.username ||
    FALLBACK_PROFILE.firstName;

  const email = rawUser.email || FALLBACK_PROFILE.email;
  const avatarUrl =
    rawUser.avatarUrl ||
    rawUser.photoURL ||
    rawUser.photoUrl ||
    rawUser.avatar ||
    "";
  const role = rawUser.role || FALLBACK_PROFILE.role;

  const initialsSource = fullName || email || rawUser.username || "";
  const computedInitials = (
    rawUser.initials ||
    getInitials(initialsSource) ||
    ""
  ).toUpperCase();

  return {
    fullName,
    firstName,
    email,
    avatarUrl,
    initials: computedInitials || FALLBACK_PROFILE.initials,
    role,
  };
};

// Datos y Estructura de la Navegación
const accountNavigation = [
  {
    id: "micuenta",
    label: "Mi Cuenta",
    icon: User,
    subitems: [
      {
        id: "perfil",
        label: "Información personal",
        route: "/my-account/personal-info",
      },
      {
        id: "seguridad",
        label: "Seguridad",
        route: "/my-account/security",
      },
      {
        id: "medios-de-pago",
        label: "Medios de pago",
        route: "/my-account/payment-methods",
      },
      {
        id: "notificaciones",
        label: "Notificaciones",
        route: "/my-account/notifications",
      },
    ],
  },
  {
    id: "reservas",
    label: "Reservas",
    icon: Calendar,
    subitems: [
      {
        id: "reservas-activas",
        label: "Reservas Activas",
        route: "/my-account/pre-orders",
      },
      {
        id: "historial-reservas",
        label: "Historial de Reservas",
        route: "/my-account/history",
      },
      { id: "preguntas", label: "Preguntas" },
      { id: "opiniones", label: "Opiniones" },
    ],
  },
  {
    id: "productos",
    label: "Productos",
    icon: ShoppingBag,
    subitems: [
      {
        id: "mis-productos-favoritos",
        label: "Mis Productos Favoritos",
        route: "/my-account/favorites",
      },
      { id: "todos-productos", label: "Todos los Productos" },
      { id: "nuevos-ingresos", label: "Nuevos Ingresos" },
      { id: "mas-vendidos", label: "Más Vendidos" },
      { id: "ofertas", label: "Ofertas" },
    ],
  },
  {
    id: "marcas",
    label: "Marcas",
    icon: Tag,
    subitems: [
      {
        id: "mis-marcas-favoritas",
        label: "Mis Marcas Favoritas",
        route: "/my-account/favorite-brands",
      },
      { id: "todas-marcas", label: "Todas las Marcas" },
    ],
  },
  {
    id: "vouchers",
    label: "Vouchers",
    icon: Ticket,
    subitems: [
      {
        id: "vouchers-activos",
        label: "Vouchers Activos",
        route: "/my-account/vouchers",
      },
      { id: "todos-vouchers", label: "Todos los Vouchers" },
      { id: "historial-vouchers", label: "Historial de Vouchers" },
    ],
  },
  {
    id: "envios",
    label: "Envíos",
    icon: Truck,
    subitems: [
      {
        id: "mis-direcciones",
        label: "Mis Direcciones",
        route: "/my-account/addresses",
      },
      {
        id: "estado-envio",
        label: "Estado del Envío",
        route: "/my-account/shipping-status",
      },
      { id: "contactar-vendedor", label: "Contactarse con el vendedor" },
    ],
  },
];

const LTAccountSidebar = ({ className = "" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState(() =>
    buildUserProfile(getCurrentUser())
  );
  const [openSections, setOpenSections] = useState({});
  const [activeSection, setActiveSection] = useState({
    main: "micuenta",
    sub: "dashboard",
  });

  // Sincronizar estado de usuario
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncAuthState = () => {
      setUserProfile(buildUserProfile(getCurrentUser()));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  // Detectar la página actual y actualizar activeSection
  useEffect(() => {
    const path = location.pathname;

    if (path === "/my-account/favorites") {
      setActiveSection({ main: "productos", sub: "mis-productos-favoritos" });
      setOpenSections({ productos: true });
    } else if (path === "/my-account/notifications") {
      setActiveSection({ main: "micuenta", sub: "notificaciones" });
      setOpenSections({ micuenta: true });
    } else if (path === "/my-account/personal-info") {
      setActiveSection({ main: "micuenta", sub: "perfil" });
      setOpenSections({ micuenta: true });
    } else if (path === "/my-account/addresses") {
      setActiveSection({ main: "envios", sub: "mis-direcciones" });
      setOpenSections({ envios: true });
    } else if (path === "/my-account/payment-methods") {
      setActiveSection({ main: "micuenta", sub: "medios-de-pago" });
      setOpenSections({ micuenta: true });
    } else if (path === "/my-account/security") {
      setActiveSection({ main: "micuenta", sub: "seguridad" });
      setOpenSections({ micuenta: true });
    } else if (path === "/my-account/pre-orders") {
      setActiveSection({ main: "reservas", sub: "reservas-activas" });
      setOpenSections({ reservas: true });
    } else if (path === "/my-account/vouchers") {
      setActiveSection({ main: "vouchers", sub: "vouchers-activos" });
      setOpenSections({ vouchers: true });
    } else if (path === "/my-account/shipping-status") {
      setActiveSection({ main: "envios", sub: "estado-envio" });
      setOpenSections({ envios: true });
    } else if (path === "/my-account/history") {
      setActiveSection({ main: "reservas", sub: "historial-reservas" });
      setOpenSections({ reservas: true });
    } else if (path === "/my-account/favorite-brands") {
      setActiveSection({ main: "marcas", sub: "mis-marcas-favoritas" });
      setOpenSections({ marcas: true });
    } else if (path === "/my-account") {
      setActiveSection({ main: "micuenta", sub: "dashboard" });
    }
  }, [location.pathname]);

  const handleSubItemClick = (mainId, subItem) => {
    // Si el subitem tiene ruta, navegar
    if (subItem.route) {
      navigate(subItem.route);
      return;
    }

    // Si no tiene ruta, solo actualizar estado local
    setActiveSection({ main: mainId, sub: subItem.id });
    setOpenSections((prev) => ({ ...prev, [mainId]: true }));
  };

  const handleMainItemClick = (section) => {
    const sectionId = section.id;
    const isCurrentlyOpen = openSections[sectionId];

    if (isCurrentlyOpen) {
      setOpenSections((prev) => {
        const next = { ...prev };
        delete next[sectionId];
        return next;
      });
      navigate("/my-account");
    } else {
      if (section.subitems.length > 0) {
        setOpenSections({ [sectionId]: true });
      } else {
        setOpenSections({});
      }

      if (section.subitems.length === 0) {
        const nextSub = sectionId === "micuenta" ? "dashboard" : sectionId;
        setActiveSection({ main: sectionId, sub: nextSub });
      } else {
        setActiveSection((prev) => ({
          ...prev,
          main: sectionId,
          sub: "dashboard",
        }));
      }
    }
  };

  const handleProfileClick = () => {
    navigate("/my-account");
  };

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-header-title">Mi Perfil</h2>
      </div>

      <div className="sidebar-profile">
        <button
          type="button"
          onClick={handleProfileClick}
          className="sidebar-profile-card"
        >
          <div className="sidebar-profile-main">
            {userProfile?.avatarUrl ? (
              <img
                src={userProfile.avatarUrl}
                alt={`Foto de ${userProfile.fullName}`}
                className="sidebar-avatar-image"
              />
            ) : (
              <div className="sidebar-avatar" aria-hidden>
                {userProfile?.initials || FALLBACK_PROFILE.initials}
              </div>
            )}
            <div className="sidebar-profile-data">
              <p className="sidebar-profile-name">
                {userProfile?.fullName || FALLBACK_PROFILE.fullName}
              </p>
              {userProfile?.email ? (
                <p className="sidebar-profile-email">{userProfile.email}</p>
              ) : null}
            </div>
          </div>
          <ChevronRight size={16} className="sidebar-profile-chevron" />
        </button>
      </div>

      <nav className="sidebar-nav">
        {accountNavigation.map((section) => {
          const isMiCuenta = section.id === "micuenta";
          const isActiveMain = activeSection.main === section.id;

          const isMiCuentaActive =
            isMiCuenta &&
            (activeSection.main === "micuenta" ||
              activeSection.sub === "dashboard");

          const isItemActive = isMiCuenta ? isMiCuentaActive : isActiveMain;
          const itemClassNames = ["lt-nav-item", "lt-nav-item-button"];

          if (isItemActive) {
            itemClassNames.push("lt-nav-item-active");
          }

          if (isMiCuenta) {
            itemClassNames.push("lt-mi-cuenta");
          }

          const iconClassName = `lt-icon ${
            isItemActive ? "lt-icon-active" : "lt-icon-default"
          }`;

          const caretClassNames = ["caret-icon"];
          if (isItemActive) {
            caretClassNames.push("caret-icon-active");
          }
          if (openSections[section.id]) {
            caretClassNames.push("caret-icon-open");
          }

          return (
            <div key={section.id}>
              <div
                onClick={() => handleMainItemClick(section)}
                className={itemClassNames.join(" ")}
              >
                <section.icon size={20} className={iconClassName} />
                <span className="lt-nav-label">{section.label}</span>

                {section.subitems.length > 0 && (
                  <img
                    src={openSections[section.id] ? CaretUpIcon : CaretDownIcon}
                    alt="caret"
                    className={caretClassNames.join(" ")}
                  />
                )}
              </div>

              {section.subitems.length > 0 && (
                <div
                  className={`sidebar-subitems ${
                    openSections[section.id] ? "open" : ""
                  }`}
                >
                  {section.subitems.map((subItem) => {
                    const isSubItemSelected = activeSection.sub === subItem.id;
                    const subItemClassNames = ["lt-sub-item-button"];

                    if (isSubItemSelected) {
                      subItemClassNames.push("lt-subitem-active");
                    }
                    if (section.id === "micuenta") {
                      subItemClassNames.push("lt-sub-item-button--micuenta");
                    }
                    return (
                      <div
                        key={subItem.id}
                        onClick={() => handleSubItemClick(section.id, subItem)}
                        className={subItemClassNames.join(" ")}
                      >
                        <span>{subItem.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default LTAccountSidebar;
