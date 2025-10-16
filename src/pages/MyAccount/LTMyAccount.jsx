import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Mail,
  Calendar,
  ShoppingBag,
  Ticket,
  Truck,
  Heart,
  Star,
  History,
  CreditCard,
  Settings,
  ChevronRight,
  XCircle,
  MapPin,
} from "lucide-react";
import "./LTMyAccount.css";
import {
  getCurrentUser,
  clearCurrentUser,
  isLoggedIn,
} from "../../utils/authStorage";
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
  if (!rawUser) return { ...FALLBACK_PROFILE };

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
      className={`lt-account-card${
        variant ? ` lt-account-card--${variant}` : ""
      }`}
    >
      <div className="lt-account-card-header">
        <div className="lt-account-card-icon">
          {Icon ? <Icon size={20} /> : null}
        </div>
        <div className="lt-account-card-content">
          <h3 className="lt-account-card-title">{title}</h3>
          <p className="lt-account-card-description">{description}</p>
        </div>
        <ChevronRight size={18} className="lt-account-card-chevron" />
      </div>
    </div>
  );
};

const MiCuentaDashboard = ({ onLogout, user, isLogged, navigate }) => {
  const cards = [
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
      id: "medios-de-pago",
      title: "Medios de pago",
      description: "Gestioná tus tarjetas y métodos de pago.",
      icon: CreditCard,
      main: "micuenta",
    },
    {
      id: "direcciones",
      title: "Mis direcciones",
      description: "Gestioná tus direcciones de envío.",
      icon: MapPin,
      main: "micuenta",
    },
    {
      id: "reservas-activas",
      title: "Reservas Activas",
      description: "Revisá el estado de tus pedidos reservados.",
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
      description: "Seguí tus pedidos en tiempo real.",
      icon: Truck,
      main: "envios",
    },
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
    {
      id: "notificaciones",
      title: "Notificaciones",
      description: "Gestioná notificaciones por email y móvil.",
      icon: Mail,
      main: "micuenta",
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
    if (card.id === "logout") return onLogout?.();

    if (card.id === "mis-productos-favoritos")
      return navigate("/my-account/favorites");
    if (card.id === "notificaciones")
      return navigate("/my-account/notifications");
    if (card.id === "perfil") return navigate("/my-account/personal-info");
    if (card.id === "direcciones") return navigate("/my-account/addresses");
    if (card.id === "medios-de-pago")
      return navigate("/my-account/payment-methods");
    if (card.id === "seguridad") return navigate("/my-account/security");
    if (card.id === "reservas-activas")
      return navigate("/my-account/pre-orders");
    if (card.id === "vouchers-activos") return navigate("/my-account/vouchers");
    if (card.id === "estado-envio")
      return navigate("/my-account/shipping-status");
    if (card.id === "mis-marcas-favoritas")
      return navigate("/my-account/favorite-brands");
    if (card.id === "historial-reservas")
      return navigate("/my-account/history");
  };

  const greetingName =
    user?.firstName || user?.fullName || FALLBACK_PROFILE.firstName;
  const visibleCards = isLogged
    ? cards
    : cards.filter((card) => card.id !== "logout");

  return (
    <div className="LTMyAccountContainer">
      <div className="dashboard-welcome-card">
        <h1 className="dashboard-welcome-title">{`Hola de nuevo, ${greetingName}.`}</h1>
        <p className="dashboard-welcome-text">
          Gestioná tu cuenta, revisá tus reservas y configurá tus preferencias.
        </p>
      </div>

      <div className="dashboard-grid">
        {visibleCards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            variant={card.variant}
            onClick={() => handleCardNavigation(card)}
          />
        ))}
      </div>
    </div>
  );
};

const LTMyAccount = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncAuthState = () => {
      const user = getCurrentUser();
      setLoggedIn(isLoggedIn() || !!user);
      setUserProfile(buildUserProfile(user));
      setLoading(false);
    };

    syncAuthState();
    window.addEventListener("storage", syncAuthState);
    return () => window.removeEventListener("storage", syncAuthState);
  }, []);

  // Redirección fuera del render para evitar flickers
  const shouldRedirect =
    !loading && !loggedIn && (!userProfile || userProfile.role === "guest");

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login", { replace: true });
    }
  }, [shouldRedirect, navigate]);

  const handleLogout = useCallback(() => {
    clearCurrentUser();
    window.localStorage.removeItem("username");
    window.sessionStorage.removeItem("lt-account-target");
    setLoggedIn(false);
    setUserProfile(buildUserProfile(null));
    navigate("/", { replace: true });
    // No recargamos la página; dejamos que React re-renderice.
  }, [navigate]);

  // Mientras carga o mientras redirige, no renderizamos nada (evita el “parpadeo”)
  if (loading || shouldRedirect) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Cargando…</p>
      </div>
    );
  }

  return (
    <MiCuentaDashboard
      onLogout={handleLogout}
      user={userProfile}
      isLogged={loggedIn}
      navigate={navigate}
    />
  );
};

export default LTMyAccount;
