import React, { useState, useEffect } from "react";
import {
  User,
  Lock,
  Shield,
  CreditCard,
  MapPin,
  Mail,
  Calendar,
  ShoppingBag,
  Ticket,
  Tag,
  Settings,
  ChevronRight,
  XCircle,
  Truck,
} from "lucide-react";
import "./LTMyAccount.css";
import CaretUpIcon from "../../assets/icons/svg/caret-up-md-svgrepo-com.svg";
import CaretDownIcon from "../../assets/icons/svg/caret-down-md-svgrepo-com.svg";

// --- Datos y Estructura de la Navegación ---

const accountNavigation = [
  // 1. Mi Cuenta
  {
    id: "micuenta",
    label: "Mi Cuenta",
    icon: User,
    subitems: [
      { id: "perfil", label: "Información personal" },
      { id: "privacidad", label: "Privacidad" },
      { id: "seguridad", label: "Seguridad" },
      { id: "comunicaciones", label: "Comunicaciones" },
      { id: "tarjetas", label: "Tarjetas" },
      { id: "direcciones", label: "Direcciones" },
    ],
  },
  // 2. Reservas
  {
    id: "reservas",
    label: "Reservas",
    icon: Calendar,
    subitems: [
      { id: "reservas-activas", label: "Reservas Activas" },
      { id: "mis-reservas", label: "Mis Reservas" },
      { id: "reservas-anteriores", label: "Reservas Anteriores" },
      { id: "preguntas", label: "Preguntas" },
      { id: "opiniones", label: "Opiniones" },
      { id: "favoritos", label: "Favoritos" },
    ],
  },
  // 3. Productos
  {
    id: "productos",
    label: "Productos",
    icon: ShoppingBag,
    subitems: [
      { id: "todos-productos", label: "Todos los Productos" },
      { id: "ofertas-productos", label: "Ofertas" },
      { id: "mas-vendidos-productos", label: "Más Vendidos" },
      { id: "nuevos-ingresos", label: "Nuevos Ingresos" },
    ],
  },
  // 4. Marcas
  {
    id: "marcas",
    label: "Marcas",
    icon: Tag,
    subitems: [
      { id: "todas-marcas", label: "Todas las Marcas" },
      { id: "marcas-favoritas", label: "Marcas Favoritas" },
      { id: "mas-buscadas", label: "Marcas Más Buscadas" },
    ],
  },
  // 5. Vouchers
  {
    id: "vouchers",
    label: "Vouchers",
    icon: Ticket,
    subitems: [
      { id: "todos-vouchers", label: "Todos los Vouchers" },
      { id: "mis-vouchers", label: "Mis Vouchers" },
      { id: "pedir-voucher", label: "Pedir un Voucher" },
      { id: "historial-canje", label: "Historial de Canje" },
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

const Sidebar = ({ activeSection, setActiveSection, className = "" }) => {
  // Estado que SOLO controla qué secciones están abiertas (el acordeón).
  const [openSections, setOpenSections] = useState({});
  const popularBrands = ["Nike", "Adidas", "Samsung", "Apple"];

  // EFECTO para abrir el acordeón si la selección de contenido lo requiere (e.g., clic en tarjeta del Dashboard)
  useEffect(() => {
    // Si hay un main activo y la sub-sección no es el dashboard, abre el acordeón
    if (activeSection.main && activeSection.sub !== "dashboard") {
      const sectionId = activeSection.main;
      // Solo abre si ya no está abierto
      if (!openSections[sectionId]) {
        setOpenSections({ [sectionId]: true });
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
    setOpenSections({ [mainId]: true });
  };

  /**
   * Maneja el clic en un item principal.
   */
  const handleMainItemClick = (section) => {
    const sectionId = section.id;
    const isCurrentlyOpen = openSections[sectionId];

    if (isCurrentlyOpen) {
      // 1. CERRAR ACORDEÓN
      setOpenSections({});

      // 2. REINICIAR SELECCIÓN: Vuelve a Mi Cuenta (dashboard)
      setActiveSection({ main: "micuenta", sub: "dashboard" });
    } else {
      // 1. ABRIR SÓLO ESTE ACORDEÓN
      setOpenSections({ [sectionId]: true });

      // 2. Lógica de Navegación del Contenido:
      if (section.subitems.length === 0) {
        // Opción A: Sin sub-ítems (e.g., Configuración): Navega directamente al contenido.
        setActiveSection({ main: sectionId, sub: sectionId });
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <div className={`sidebar ${className}`}>
      {/* Título y Perfil Mock */}
      <div
        style={{
          padding: "0 var(--lt-spacing-md)",
          marginBottom: "var(--lt-spacing-lg)",
          paddingBottom: "var(--lt-spacing-lg)",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "var(--lt-font-weight-semibold)",
            marginTop: 0,
            marginBottom: "var(--lt-spacing-md)",
          }}
        >
          Mi Perfil
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "var(--lt-spacing-md)",
            gap: "var(--lt-spacing-md)",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "var(--lt-accent-color-variant2-dark)",
              color: "var(--lt-black-text-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "var(--lt-font-weight-bold)",
              flexShrink: 0,
            }}
          >
            ES
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: "var(--lt-font-weight-semibold)",
                color: "var(--lt-black-text-color)",
              }}
            >
              Emiliano Sumerinde
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.9rem",
                color: "var(--lt-muted-text-color)",
              }}
            >
              esumerinde@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Navegación por Secciones */}
      <nav style={{ padding: "0 var(--lt-spacing-sm)" }}>
        {accountNavigation.map((section) => {
          const isMiCuenta = section.id === "micuenta";
          const isActiveMain = activeSection.main === section.id;

          // Mi Cuenta debe estar pintado siempre, excepto cuando hay un subitem activo de OTRA sección
          const isMiCuentaActive =
            isMiCuenta &&
            (activeSection.main === "micuenta" ||
              activeSection.sub === "dashboard");

          // Class construction based on item type and active status
          let itemClassName = `lt-nav-item`;

          if (isMiCuenta) {
            // Mi Cuenta is always orange on hover
            itemClassName += ` lt-mi-cuenta-hover`;
            // Mi Cuenta is orange if dashboard or any Mi Cuenta subitem is active
            if (isMiCuentaActive) {
              itemClassName += ` lt-mi-cuenta-active`;
            }
          } else {
            // Other items are violet on hover
            itemClassName += ` lt-main-item-hover`;
            // Other items are violet if they are the active main section
            if (isActiveMain) {
              itemClassName += ` lt-main-item-active`;
            }
          }

          const isItemActive = isMiCuenta ? isMiCuentaActive : isActiveMain;

          return (
            <div key={section.id}>
              {/* Título de la Sección Principal */}
              <div
                onClick={() => handleMainItemClick(section)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "var(--lt-spacing-sm) var(--lt-spacing-md)",
                  marginBottom: "var(--lt-spacing-xs)",
                  borderRadius: "var(--lt-border-radius)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                className={itemClassName}
              >
                <section.icon
                  size={20}
                  className={`lt-icon ${isItemActive ? "" : "lt-icon-default"}`}
                  style={{
                    marginRight: "var(--lt-spacing-md)",
                    // Color por defecto si no está activo/hover
                    color: isItemActive
                      ? "var(--lt-white-text-color)"
                      : "var(--lt-small-text-color)",
                  }}
                />
                {section.label}

                {/* Solo mostrar flecha si hay subítems */}
                {section.subitems.length > 0 && (
                  <img
                    src={openSections[section.id] ? CaretUpIcon : CaretDownIcon}
                    alt="caret"
                    className="caret-icon"
                    style={{
                      marginLeft: "auto",
                      width: "16px",
                      height: "16px",
                      filter: isItemActive
                        ? "brightness(0) invert(1)"
                        : "brightness(0) saturate(100%) invert(56%) sepia(8%) saturate(440%) hue-rotate(169deg) brightness(92%) contrast(87%)",
                      transition: "all 0.3s ease",
                    }}
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
                    return (
                      <div
                        key={subItem.id}
                        onClick={() =>
                          handleSubItemClick(section.id, subItem.id)
                        }
                        style={{
                          padding: "12px 16px",
                          cursor: "pointer",
                          fontSize: "0.95rem",
                          borderRadius: "var(--lt-border-radius)",
                          marginBottom: "var(--lt-spacing-xs)",
                          position: "relative",
                        }}
                        // Sub-ítems siempre usan las clases de violeta
                        className={`lt-nav-item lt-sub-item-hover ${
                          isSubItemSelected ? "lt-sub-item-active" : ""
                        }`}
                      >
                        <span>{subItem.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Contenido Extra para Marcas (Más Buscadas) */}
              {section.id === "marcas" &&
                openSections[section.id] &&
                activeSection.sub === "mas-buscadas" && (
                  <div
                    style={{
                      padding:
                        "var(--lt-spacing-sm) var(--lt-spacing-md) var(--lt-spacing-md) calc(var(--lt-spacing-lg) + var(--lt-spacing-md))",
                      fontSize: "0.85rem",
                    }}
                  >
                    <p
                      style={{
                        margin: "var(--lt-spacing-sm) 0",
                        fontWeight: "var(--lt-font-weight-semibold)",
                        color: "var(--lt-muted-text-color)",
                      }}
                    >
                      Top 4 Marcas:
                    </p>
                    {popularBrands.map((brand) => (
                      <span
                        key={brand}
                        style={{
                          display: "inline-block",
                          backgroundColor: "var(--lt-accent-color-variant2)",
                          color: "var(--lt-black-text-color)",
                          padding: "4px 8px",
                          borderRadius: "999px",
                          marginRight: "var(--lt-spacing-sm)",
                          marginBottom: "var(--lt-spacing-sm)",
                          fontWeight: "var(--lt-font-weight-medium)",
                        }}
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                )}
            </div>
          );
        })}
      </nav>

      {/* Botón de Cerrar Sesión */}
      <div
        className="cierre-cuenta-wrapper"
        style={{
          width: "100%",
          padding: "0 var(--lt-spacing-md)",
          textAlign: "center",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--lt-error-color)",
            textDecoration: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
            fontWeight: "var(--lt-font-weight-normal)",
            padding: "var(--lt-spacing-xs) var(--lt-spacing-sm)",
            transition: "background-color 0.2s",
          }}
          className="lt-cancel-button"
        >
          <XCircle
            size={14}
            style={{
              display: "inline",
              verticalAlign: "middle",
              marginRight: "4px",
            }}
          />
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

// --- 3. Componentes de Contenido (Paneles) ---

/**
 * Tarjeta de navegación rápida con ícono y descripción.
 */
const DashboardCard = ({ title, description, icon: Icon, onClick }) => (
  <div onClick={onClick} className="dashboard-card">
    <div className="dashboard-card-icon">
      <Icon size={20} />
    </div>

    <div className="dashboard-card-content">
      <h3 className="dashboard-card-title">{title}</h3>
      <p className="dashboard-card-description">{description}</p>
    </div>

    <ChevronRight
      size={18}
      style={{ flexShrink: 0, color: "var(--lt-accent-color-dark)" }}
    />
  </div>
);

/**
 * Componente para el formulario de edición de la información del perfil.
 * Se llama "Información personal"
 */
const PerfilForm = () => {
  const [profile, setProfile] = useState({
    name: "Emiliano",
    lastName: "Sumerinde",
    email: "esumerinde@gmail.com",
    phone: "+54 9 11 5555-1234",
    idType: "DNI",
    idNumber: "30.123.456",
    birthDate: "1985-10-25",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { key: "name", label: "Nombre", type: "text", placeholder: "Tu nombre" },
    {
      key: "lastName",
      label: "Apellido",
      type: "text",
      placeholder: "Tu apellido",
    },
    {
      key: "email",
      label: "Correo Electrónico",
      type: "email",
      placeholder: "tu.correo@ejemplo.com",
      editable: false,
    },
    {
      key: "phone",
      label: "Teléfono",
      type: "tel",
      placeholder: "+54 9 11 xxxx-xxxx",
    },
    {
      key: "idType",
      label: "Tipo de Documento",
      type: "select",
      options: ["DNI", "Pasaporte", "CUIT/CUIL"],
    },
    {
      key: "idNumber",
      label: "Número de Documento",
      type: "text",
      placeholder: "Ej: 30.123.456",
    },
    { key: "birthDate", label: "Fecha de Nacimiento", type: "date" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Guardando perfil:", profile);
    setIsEditing(false);
  };

  const FormField = ({
    label,
    keyName,
    type,
    placeholder,
    value,
    editable = true,
    options,
  }) => (
    <div style={{ marginBottom: "var(--lt-spacing-md)" }}>
      <label
        htmlFor={keyName}
        style={{
          display: "block",
          fontSize: "0.9rem",
          fontWeight: "var(--lt-font-weight-medium)",
          color: "var(--lt-small-text-color)",
          marginBottom: "var(--lt-spacing-xs)",
        }}
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          id={keyName}
          name={keyName}
          value={value}
          onChange={handleChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "var(--lt-spacing-sm)",
            border: "1px solid var(--lt-border-color)",
            borderRadius: "var(--lt-border-radius)",
            fontSize: "1rem",
            backgroundColor: !isEditing
              ? "var(--lt-gray-light)"
              : "var(--lt-background-color)",
            cursor: !isEditing ? "default" : "pointer",
            transition: "border-color 0.2s",
            color: value
              ? "var(--lt-black-text-color)"
              : "var(--lt-muted-text-color)",
            fontWeight: "var(--lt-font-weight-normal)",
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={keyName}
          name={keyName}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={!isEditing || !editable}
          style={{
            width: "100%",
            padding: "var(--lt-spacing-sm)",
            border: "1px solid var(--lt-border-color)",
            borderRadius: "var(--lt-border-radius)",
            fontSize: "1rem",
            backgroundColor:
              !isEditing || !editable
                ? "var(--lt-gray-light)"
                : "var(--lt-background-color)",
            cursor: !isEditing || !editable ? "default" : "text",
            transition: "border-color 0.2s",
            fontWeight: "var(--lt-font-weight-normal)",
          }}
        />
      )}
    </div>
  );

  return (
    <div
      style={{
        padding: "var(--lt-spacing-xl)",
        backgroundColor: "var(--lt-background-color)",
        borderRadius: "var(--lt-border-radius-lg)",
        boxShadow: "var(--lt-shadow-md)",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "var(--lt-font-weight-semibold)",
          marginBottom: "var(--lt-spacing-lg)",
          borderBottom: "1px solid var(--lt-gray-light)",
          paddingBottom: "var(--lt-spacing-sm)",
        }}
      >
        Información personal
      </h2>

      <div
        style={{
          marginBottom: "var(--lt-spacing-xl)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--lt-spacing-xl)",
        }}
      >
        {fields.map((field) => (
          <FormField
            key={field.key}
            label={field.label}
            keyName={field.key}
            type={field.type}
            placeholder={field.placeholder}
            value={profile[field.key]}
            editable={field.editable}
            options={field.options}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "var(--lt-spacing-md)",
          paddingTop: "var(--lt-spacing-md)",
          borderTop: "1px solid var(--lt-gray-light)",
        }}
      >
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="lt-button-light"
              style={{
                backgroundColor: "transparent",
                color: "var(--lt-accent-color-dark)",
                borderColor: "var(--lt-accent-color-dark)",
                fontSize: "0.9rem",
                padding: "var(--lt-spacing-sm) var(--lt-spacing-lg)",
                border: "1px solid",
                borderRadius: "var(--lt-border-radius)",
                cursor: "pointer",
                fontWeight: "var(--lt-font-weight-medium)",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="lt-button-dark"
              style={{
                fontSize: "0.9rem",
                padding: "var(--lt-spacing-sm) var(--lt-spacing-lg)",
                backgroundColor: "var(--lt-accent-color-dark)",
                color: "var(--lt-white-text-color)",
                border: "none",
                borderRadius: "var(--lt-border-radius)",
                cursor: "pointer",
                fontWeight: "var(--lt-font-weight-medium)",
              }}
            >
              Guardar Cambios
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="lt-button-light"
            style={{
              backgroundColor: "var(--lt-accent-color-variant2-dark)",
              color: "var(--lt-black-text-color)",
              border: "1px solid var(--lt-black-text-color)",
              fontSize: "0.9rem",
              padding: "var(--lt-spacing-sm) var(--lt-spacing-lg)",
              borderRadius: "var(--lt-border-radius)",
              cursor: "pointer",
              fontWeight: "var(--lt-font-weight-medium)",
            }}
          >
            Editar Perfil
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Contenido principal para la sección "Mi Cuenta" (Dashboard).
 */
const MiCuentaDashboard = ({ setActiveSection }) => {
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
      id: "privacidad",
      title: "Privacidad",
      description: "Preferencias de datos y gestión de cookies.",
      icon: Shield,
      main: "micuenta",
    },
    {
      id: "reservas-activas",
      title: "Reservas Activas",
      description: "Revisá el estado de tus viajes y pedidos.",
      icon: Calendar,
      main: "reservas",
    },
    {
      id: "estado-envio",
      title: "Estado del Envío",
      description: "Seguí el trayecto de tus últimas compras.",
      icon: Truck,
      main: "envios",
    },
    {
      id: "todos-productos",
      title: "Productos",
      description: "Busca y compra tus productos favoritos.",
      icon: ShoppingBag,
      main: "productos",
    },
    {
      id: "todas-marcas",
      title: "Marcas",
      description: "Explora y guarda tus marcas favoritas.",
      icon: Tag,
      main: "marcas",
    }, // Tarjeta de Marcas
    {
      id: "tarjetas",
      title: "Tarjetas",
      description: "Medios de pago guardados en tu billetera.",
      icon: CreditCard,
      main: "micuenta",
    },
    {
      id: "direcciones",
      title: "Direcciones",
      description: "Direcciones de envío y facturación guardadas.",
      icon: MapPin,
      main: "micuenta",
    },
    {
      id: "comunicaciones",
      title: "Comunicaciones",
      description: "Gestioná notificaciones por email y móvil.",
      icon: Mail,
      main: "micuenta",
    },
  ];

  return (
    <div>
      {/* Banner de Bienvenida: Fondo blanco, borde naranja destacado y sombra */}
      <div
        style={{
          backgroundColor: "var(--lt-background-color)",
          padding: "var(--lt-spacing-md) var(--lt-spacing-lg)",
          borderRadius: "var(--lt-border-radius-lg)",
          marginBottom: "var(--lt-spacing-lg)",
          borderLeft: "8px solid var(--lt-accent-color-variant2-dark)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "1.4rem",
            fontWeight: "var(--lt-font-weight-bold)",
            margin: 0,
            color: "var(--lt-black-text-color)",
          }}
        >
          Hola de nuevo, Emiliano.
        </h1>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--lt-small-text-color)",
            margin: "var(--lt-spacing-xs) 0 0 0",
            fontWeight: "var(--lt-font-weight-medium)",
          }}
        >
          Gestioná tu cuenta, revisá tus reservas y configurá tus preferencias.
        </p>
      </div>

      {/* Grid de tarjetas sin título "Configuración rápida" */}
      <div className="dashboard-grid">
        {cards.map((card) => (
          <DashboardCard
            key={card.id}
            title={card.title}
            description={card.description}
            icon={card.icon}
            // Navega a la sección correspondiente al hacer clic en el card
            onClick={() => setActiveSection({ main: card.main, sub: card.id })}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Contenido dinámico para las sub-secciones.
 */
const SubItemContent = ({ activeSection }) => {
  // Buscar la información de la sección y subsección
  const currentMain = accountNavigation.find(
    (s) => s.id === activeSection.main
  );
  const currentSub = currentMain?.subitems?.find(
    (s) => s.id === activeSection.sub
  );

  const title = currentSub?.label || currentMain?.label || "Sección";

  switch (activeSection.sub) {
    case "perfil":
      return <PerfilForm />;
    case "privacidad":
    case "seguridad":
    case "comunicaciones":
    case "direcciones":
    case "tarjetas":
    case "configuracion":
    case "estado-envio":
    case "contactar-vendedor":
    case "todas-marcas": // Para el sub-item de Marcas
      const iconMap = {
        perfil: User,
        privacidad: Shield,
        seguridad: Lock,
        comunicaciones: Mail,
        direcciones: MapPin,
        tarjetas: CreditCard,
        configuracion: Settings,
        "estado-envio": Truck,
        "contactar-vendedor": Mail,
        "todas-marcas": Tag,
      };
      const CurrentIcon = iconMap[activeSection.sub] || Settings;

      return (
        <div
          style={{
            padding: "var(--lt-spacing-xl)",
            backgroundColor: "var(--lt-background-color)",
            borderRadius: "var(--lt-border-radius-lg)",
            boxShadow: "var(--lt-shadow-md)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "var(--lt-font-weight-semibold)",
              marginBottom: "var(--lt-spacing-lg)",
              borderBottom: "1px solid var(--lt-gray-light)",
              paddingBottom: "var(--lt-spacing-sm)",
            }}
          >
            {title}
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--lt-spacing-md)",
              padding: "var(--lt-spacing-xl)",
              backgroundColor: "#e6e9f9",
              border: "1px solid var(--lt-accent-color-variant)",
              borderRadius: "var(--lt-border-radius)",
              color: "var(--lt-black-text-color)",
            }}
          >
            <CurrentIcon
              size={32}
              style={{ color: "var(--lt-accent-color-dark)" }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: "var(--lt-font-weight-normal)",
              }}
            >
              <strong>SIMULACIÓN DE CONTENIDO:</strong> Esta vista de gestión de{" "}
              {title.toLowerCase()} se encuentra en desarrollo. Aquí podrás
              configurar todos los detalles.
            </p>
          </div>
        </div>
      );
    default:
      let contentMessage = `Estás en la sección **${
        currentMain?.label || "Principal"
      }** > **${title}**. Aquí verás la lista de ${title.toLowerCase()}.`;
      let icon = currentMain?.icon || Settings;
      return (
        <div
          style={{
            padding: "var(--lt-spacing-xl)",
            backgroundColor: "var(--lt-background-color)",
            borderRadius: "var(--lt-border-radius-lg)",
            boxShadow: "var(--lt-shadow-md)",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "var(--lt-font-weight-semibold)",
              marginBottom: "var(--lt-spacing-lg)",
              borderBottom: "1px solid var(--lt-gray-light)",
              paddingBottom: "var(--lt-spacing-sm)",
            }}
          >
            {title}
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--lt-spacing-md)",
              padding: "var(--lt-spacing-xl)",
              backgroundColor: "#e6e9f9",
              border: "1px solid var(--lt-accent-color-variant)",
              borderRadius: "var(--lt-border-radius)",
              color: "var(--lt-black-text-color)",
            }}
          >
            {React.createElement(icon, {
              size: 32,
              style: { color: "var(--lt-accent-color-dark)" },
            })}
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                fontWeight: "var(--lt-font-weight-normal)",
              }}
            >
              <strong>SIMULACIÓN DE CONTENIDO:</strong> {contentMessage}
            </p>
          </div>
        </div>
      );
  }
};

// --- 4. Componente Principal de la Aplicación ---

const LTMyAccount = () => {
  // Estado inicial: 'Mi Cuenta' activa (pintada) y el contenido es el 'dashboard'.
  const [activeSection, setActiveSection] = useState({
    main: "micuenta",
    sub: "dashboard",
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const renderContent = () => {
    // La única excepción para el contenido es 'dashboard'. Si no es 'dashboard', se renderiza el sub-item.
    if (activeSection.sub === "dashboard") {
      return <MiCuentaDashboard setActiveSection={setActiveSection} />;
    }

    // Para cualquier otro sub-item o 'Configuración'
    return <SubItemContent activeSection={activeSection} />;
  };

  return (
    <>
      <button
        className={`sidebar-toggle ${
          !isSidebarVisible ? "sidebar-hidden" : ""
        }`}
        onClick={toggleSidebar}
        aria-label={isSidebarVisible ? "Ocultar menú" : "Mostrar menú"}
      >
        {isSidebarVisible ? "←" : "→"}
      </button>
      <div className="account-layout">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          className={!isSidebarVisible ? "hidden" : ""}
        />
        <div
          className={`main-content ${
            isSidebarVisible ? "sidebar-visible" : ""
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default LTMyAccount;
