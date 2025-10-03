import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Shield,
  Mail,
  Calendar,
  ShoppingBag,
  Ticket,
  Tag,
  Settings,
  ChevronRight,
  XCircle,
  Truck,
  Heart,
  Star,
  History,
} from "lucide-react";
import "./LTMyAccount.css";
import CaretUpIcon from "../../assets/icons/svg/caret-up-md-svgrepo-com.svg";
import CaretDownIcon from "../../assets/icons/svg/caret-down-md-svgrepo-com.svg";
import {
  getCurrentUser,
  clearCurrentUser,
  isLoggedIn,
} from "../../common/authStorage";
import { getInitials } from "../../mocks/users";

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

// --- Datos y Estructura de la Navegación ---

const accountNavigation = [
  // 1. Mi Cuenta
  {
    id: "micuenta",
    label: "Mi Cuenta",
    icon: User,
    subitems: [
      { id: "perfil", label: "Información personal" },
      { id: "seguridad", label: "Seguridad" },
      { id: "privacidad", label: "Privacidad" },
      { id: "comunicaciones", label: "Comunicaciones" },
    ],
  },
  // 2. Reservas
  {
    id: "reservas",
    label: "Reservas",
    icon: Calendar,
    subitems: [
      { id: "reservas-activas", label: "Reservas Activas" },
      { id: "historial-reservas", label: "Historial de Reservas" },
      { id: "preguntas", label: "Preguntas" },
      { id: "opiniones", label: "Opiniones" },
    ],
  },
  // 3. Productos
  {
    id: "productos",
    label: "Productos",
    icon: ShoppingBag,
    subitems: [
      { id: "mis-productos-favoritos", label: "Mis Productos Favoritos" },
      { id: "todos-productos", label: "Todos los Productos" },
      { id: "nuevos-ingresos", label: "Nuevos Ingresos" },
      { id: "mas-vendidos", label: "Más Vendidos" },
      { id: "ofertas", label: "Ofertas" },
    ],
  },
  // 4. Marcas
  {
    id: "marcas",
    label: "Marcas",
    icon: Tag,
    subitems: [
      { id: "mis-marcas-favoritas", label: "Mis Marcas Favoritas" },
      { id: "todas-marcas", label: "Todas las Marcas" },
    ],
  },
  // 5. Vouchers
  {
    id: "vouchers",
    label: "Vouchers",
    icon: Ticket,
    subitems: [
      { id: "vouchers-activos", label: "Vouchers Activos" },
      { id: "todos-vouchers", label: "Todos los Vouchers" },
      { id: "historial-vouchers", label: "Historial de Vouchers" },
    ],
  },
  // 6. Envíos
  {
    id: "envios",
    label: "Envíos",
    icon: Truck,
    subitems: [
      { id: "estado-envio", label: "Estado del Envío" },
      { id: "contactar-vendedor", label: "Contactarse con el vendedor" },
    ],
  },
  // 7. Configuración
  {
    id: "configuracion",
    label: "Configuración",
    icon: Settings,
    subitems: [],
  },
];

// --- 2. Componente de Navegación Lateral (Sidebar) ---

const Sidebar = ({ activeSection, setActiveSection, className = "", user }) => {
  // Estado que SOLO controla qué secciones están abiertas (el acordeón).
  const [openSections, setOpenSections] = useState({ micuenta: true });

  // EFECTO para abrir el acordeón si la selección de contenido lo requiere (e.g., clic en tarjeta del Dashboard)
  useEffect(() => {
    // Si hay un main activo y la sub-sección no es el dashboard, abre el acordeón
    if (activeSection.main && activeSection.sub !== "dashboard") {
      const section = accountNavigation.find(
        (item) => item.id === activeSection.main
      );
      if (!section || section.subitems.length === 0) {
        return;
      }
      const sectionId = section.id;
      // Solo abre si ya no está abierto
      if (!openSections[sectionId]) {
        setOpenSections((prev) => ({ ...prev, [sectionId]: true }));
      }
    }
  }, [activeSection.main, activeSection.sub, openSections]);

  /**
   * Maneja el clic en un sub-item.
   */
  const handleSubItemClick = (mainId, subId) => {
    // 1. Establece la selección (Cambia el contenido y resalta el sub-item)
    setActiveSection({ main: mainId, sub: subId });
    // 2. Asegura que el acordeón esté abierto
    setOpenSections((prev) => ({ ...prev, [mainId]: true }));
  };

  /**
   * Maneja el clic en un item principal.
   */
  const handleMainItemClick = (section) => {
    const sectionId = section.id;
    const isCurrentlyOpen = openSections[sectionId];

    if (isCurrentlyOpen) {
      // 1. CERRAR ACORDEÓN
      setOpenSections((prev) => {
        const next = { ...prev };
        delete next[sectionId];
        return next;
      });

      // 2. REINICIAR SELECCIÓN: Vuelve a Mi Cuenta (dashboard)
      setActiveSection({ main: "micuenta", sub: "dashboard" });
    } else {
      if (section.subitems.length > 0) {
        // 1. ABRIR SÓLO ESTE ACORDEÓN
        setOpenSections({ [sectionId]: true });
      } else {
        setOpenSections({});
      }

      // 2. Lógica de Navegación del Contenido:
      if (section.subitems.length === 0) {
        // Opción A: Sin sub-ítems (e.g., Configuración): Navega directamente al contenido.
        const nextSub = sectionId === "micuenta" ? "dashboard" : sectionId;
        setActiveSection({ main: sectionId, sub: nextSub });
      } else {
        // Opción B: Con sub-ítems. Mantiene el focus visual en el item principal
        setActiveSection((prev) => ({
          ...prev,
          main: sectionId,
          sub: "dashboard",
        }));
      }
    }
  };

  const handleProfileClick = () => {
    setActiveSection({ main: "micuenta", sub: "dashboard" });
    setOpenSections({ micuenta: true });
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
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={`Foto de ${user.fullName}`}
                className="sidebar-avatar-image"
              />
            ) : (
              <div className="sidebar-avatar" aria-hidden>
                {user?.initials || FALLBACK_PROFILE.initials}
              </div>
            )}
            <div className="sidebar-profile-data">
              <p className="sidebar-profile-name">
                {user?.fullName || FALLBACK_PROFILE.fullName}
              </p>
              {user?.email ? (
                <p className="sidebar-profile-email">{user.email}</p>
              ) : null}
            </div>
          </div>
          <ChevronRight size={16} className="sidebar-profile-chevron" />
        </button>
      </div>

      {/* Navegación por Secciones */}
      <nav className="sidebar-nav">
        {accountNavigation.map((section) => {
          const isMiCuenta = section.id === "micuenta";
          const isActiveMain = activeSection.main === section.id;

          // Mi Cuenta debe estar pintado siempre, excepto cuando hay un subitem activo de OTRA sección
          const isMiCuentaActive =
            isMiCuenta &&
            (activeSection.main === "micuenta" ||
              activeSection.sub === "dashboard");

          // Class construction based on item type and active status
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
              {/* Título de la Sección Principal */}
              <div
                onClick={() => handleMainItemClick(section)}
                className={itemClassNames.join(" ")}
              >
                <section.icon size={20} className={iconClassName} />
                <span className="lt-nav-label">{section.label}</span>

                {/* Solo mostrar flecha si hay subítems */}
                {section.subitems.length > 0 && (
                  <img
                    src={openSections[section.id] ? CaretUpIcon : CaretDownIcon}
                    alt="caret"
                    className={caretClassNames.join(" ")}
                  />
                )}
              </div>

              {/* Sub-ítems (con animación) */}
              {section.subitems.length > 0 && (
                <div
                  className={`sidebar-subitems ${
                    openSections[section.id] ? "open" : ""
                  }`}
                >
                  {section.subitems.map((subItem) => {
                    // isSubItemSelected es TRUE solo si se hizo clic en este sub-item
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
                        onClick={() =>
                          handleSubItemClick(section.id, subItem.id)
                        }
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

// --- 3. Componentes de Contenido (Paneles) ---

/**
 * Tarjeta de navegación rápida con ícono y descripción.
 */
const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant,
}) => {
  const handleKeyDown = (event) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : -1}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`dashboard-card${
        variant ? ` dashboard-card--${variant}` : ""
      }`}
    >
      <div className="dashboard-card-icon">
        {Icon ? <Icon size={20} /> : null}
      </div>

      <div className="dashboard-card-content">
        <h3 className="dashboard-card-title">{title}</h3>
        <p className="dashboard-card-description">{description}</p>
      </div>

      <ChevronRight size={18} className="dashboard-card-chevron" />
    </div>
  );
};

/**
 * Contenido principal para la sección "Mi Cuenta" (Dashboard).
 */
const MiCuentaDashboard = ({ setActiveSection, onLogout, user, isLogged }) => {
  const cards = [
    // Fila 1: Ajustes personales
    {
      id: "perfil",
      title: "Información personal",
      description: "Datos personales, credenciales y contacto.",
      icon: User,
      main: "micuenta",
    },
    {
      id: "seguridad",
      title: "Seguridad",
      description: "Cambio de contraseña y verificación en 2 pasos.",
      icon: Lock,
      main: "micuenta",
    },
    {
      id: "privacidad",
      title: "Privacidad",
      description: "Preferencias de datos y gestión de cookies.",
      icon: Shield,
      main: "micuenta",
    },
    // Fila 2: Reservas, vouchers y envíos
    {
      id: "reservas-activas",
      title: "Reservas Activas",
      description: "Revisá el estado de tus viajes y pedidos.",
      icon: Calendar,
      main: "reservas",
    },
    {
      id: "vouchers-activos",
      title: "Vouchers Activos",
      description: "Chequeá los vouchers disponibles para usar.",
      icon: Ticket,
      main: "vouchers",
    },
    {
      id: "estado-envio",
      title: "Estado del Envío",
      description: "Seguí el trayecto de tus últimas compras.",
      icon: Truck,
      main: "envios",
    },
    // Fila 3: Favoritos e historial
    {
      id: "mis-productos-favoritos",
      title: "Productos favoritos",
      description: "Accedé rápido a tus productos preferidos.",
      icon: Heart,
      main: "productos",
    },
    {
      id: "mis-marcas-favoritas",
      title: "Marcas favoritas",
      description: "Gestioná las marcas que más te gustan.",
      icon: Star,
      main: "marcas",
    },
    {
      id: "historial-reservas",
      title: "Historial",
      description: "Revisá tus reservas anteriores en segundos.",
      icon: History,
      main: "reservas",
    },
    // Fila 4: Comunicaciones y acciones
    {
      id: "comunicaciones",
      title: "Comunicaciones",
      description: "Gestioná notificaciones por email y móvil.",
      icon: Mail,
      main: "micuenta",
    },
    {
      id: "configuracion",
      title: "Configuración",
      description: "Personalizá tu experiencia en LT.",
      icon: Settings,
      main: "configuracion",
      sub: "configuracion",
    },
    {
      id: "logout",
      title: "Cerrar sesión",
      description: "Finalizá tu sesión de forma segura.",
      icon: XCircle,
      main: "micuenta",
      variant: "danger",
    },
  ];

  const handleCardNavigation = (card) => {
    if (card.id === "logout") {
      if (onLogout) {
        onLogout();
      }
      return;
    }

    const subTarget = card.sub || card.id;
    setActiveSection({ main: card.main, sub: subTarget });
  };

  const greetingName =
    user?.firstName || user?.fullName || FALLBACK_PROFILE.firstName;
  const visibleCards = isLogged
    ? cards
    : cards.filter((card) => card.id !== "logout");

  return (
    <div>
      {/* Banner de Bienvenida: Fondo blanco, borde naranja destacado y sombra */}
      <div className="dashboard-welcome-card">
        <h1 className="dashboard-welcome-title">
          {`Hola de nuevo, ${greetingName}.`}
        </h1>
        <p className="dashboard-welcome-text">
          Gestioná tu cuenta, revisá tus reservas y configurá tus preferencias.
        </p>
      </div>

      {/* Grid de tarjetas sin título "Configuración rápida" */}
      <div className="dashboard-grid">
        {visibleCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            variant={card.variant}
            // Navega a la sección correspondiente al hacer clic en el card
            onClick={() => handleCardNavigation(card)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Contenido dinámico para las sub-secciones.
 */
const SubItemContent = () => null;

// --- 4. Componente Principal de la Aplicación ---

const LTMyAccount = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState({
    main: "micuenta",
    sub: "dashboard",
  });
  const [loggedIn, setLoggedIn] = useState(() => isLoggedIn());
  const [userProfile, setUserProfile] = useState(() =>
    buildUserProfile(getCurrentUser())
  );
  const isAdmin = userProfile?.role === "admin";

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncAuthState = () => {
      setLoggedIn(isLoggedIn());
      setUserProfile(buildUserProfile(getCurrentUser()));
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const rawTarget = window.sessionStorage.getItem("lt-account-target");
    if (!rawTarget) return undefined;

    try {
      const parsedTarget = JSON.parse(rawTarget);
      if (!parsedTarget?.main) {
        window.sessionStorage.removeItem("lt-account-target");
        return undefined;
      }

      const section = accountNavigation.find(
        (item) => item.id === parsedTarget.main
      );
      if (!section) {
        window.sessionStorage.removeItem("lt-account-target");
        return undefined;
      }

      const subTarget = parsedTarget.sub
        ? parsedTarget.sub
        : section.subitems.length > 0
        ? section.subitems[0]?.id || "dashboard"
        : section.id;

      setActiveSection({ main: section.id, sub: subTarget });
    } catch (error) {
      console.warn("Invalid lt-account-target payload", error);
    } finally {
      window.sessionStorage.removeItem("lt-account-target");
    }

    return undefined;
  }, []);

  const handleLogout = useCallback(() => {
    clearCurrentUser();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("username");
      window.sessionStorage.removeItem("lt-account-target");
    }

    setLoggedIn(false);
    setUserProfile(buildUserProfile(null));
    navigate("/", { replace: true });

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  }, [navigate]);

  const renderContent = () => {
    if (activeSection.sub === "dashboard") {
      return (
        <MiCuentaDashboard
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
          user={userProfile}
          isLogged={loggedIn}
        />
      );
    }

    return <SubItemContent activeSection={activeSection} />;
  };

  return (
    <div className={`account-layout${isAdmin ? " account-layout--admin" : ""}`}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={userProfile}
      />
      <div className="main-content sidebar-visible">{renderContent()}</div>
    </div>
  );
};

export default LTMyAccount;
