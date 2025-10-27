import React from "react";
import {
  Users,
  Package,
  Wallet,
  FileText,
  BarChart3,
  Settings,
  Ticket,
  MapPin,
  ChevronRight,
  LayoutDashboard,
  TrendingUp,
  Megaphone,
  Zap,
} from "lucide-react";
import "./LTAdminPanel.css";

/**
 * Componente reutilizable DashboardCard.
 */
const DashboardCard = ({
  title,
  description,
  icon: Icon,
  onClick,
  variant,
  style,
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
      style={style}
      className={`lt-account-card${
        variant ? ` lt-account-card--${variant}` : ""
      } fade-in`}
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

const adminCards = [
  {
    id: "sales_metrics",
    title: "Métricas de Ventas",
    description: "Analítica diaria, mensual y trimestral de ingresos. (KPIs)",
    icon: TrendingUp,
    path: "/admin/metrics",
  },
  {
    id: "orders",
    title: "Pedidos y Transacciones",
    description:
      "Revisar el estado, detalle y facturación de todas las ventas.",
    icon: Wallet,
    path: "/admin/orders",
  },
  {
    id: "users",
    title: "Gestión de Usuarios",
    description:
      "Administrar cuentas, roles y permisos de acceso (CRM interno).",
    icon: Users,
    path: "/admin/users",
  },
  {
    id: "products",
    title: "Catálogo e Inventario",
    description:
      "Crear, editar y gestionar todos los productos y stock disponible.",
    icon: Package,
    path: "/admin/products",
  },
  {
    id: "content",
    title: "Gestor de Contenido (CMS)",
    description:
      "Subir y modificar ofertas, banners, categorías de productos y páginas estáticas.",
    icon: FileText,
    path: "/admin/content",
  },
  {
    id: "reports",
    title: "Informes y Tendencias",
    description:
      "Reportes de productos más vendidos, tendencias y analíticas de mercado.",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    id: "marketing",
    title: "Vouchers y Promociones",
    description:
      "Administrar cupones, descuentos y campañas de marketing sencillas.",
    icon: Megaphone,
    path: "/admin/marketing",
  },
  {
    id: "settings",
    title: "Configuración del Sistema",
    description:
      "Ajustes de seguridad, integraciones, pagos y notificaciones globales.",
    icon: Zap,
    path: "/admin/settings",
  },
  {
    id: "locations",
    title: "Puntos de Venta y Envíos",
    description: "Gestionar ubicaciones, zonas y tarifas de envío y logística.",
    icon: MapPin,
    path: "/admin/locations",
  },
];

const LTAdminPanel = () => {
  const handleNavigation = (path) => {
    console.log(`Navegando a: ${path}`);
  };

  const adminName = "Líder";

  return (
    <div className="LTAdminPanelWrapper">
      <div className="LTAdminMenuWrapper">
        <div className="LTAdminWelcome">
          <h1 className="LTAdminTitle">
            <LayoutDashboard size={36} className="LTAdminTitleIcon" />
            Panel Administrativo - ¡Hola, {adminName}!
          </h1>
          <p className="LTAdminSubtitle">
            Vista centralizada para el control total de la plataforma. Navega
            entre las secciones para gestionar el contenido, las ventas y la
            configuración del sistema.
          </p>
        </div>

        <div className="LTAdminGrid">
          {adminCards.slice(0, 3).map((card, index) => (
            <DashboardCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              variant={card.variant}
              onClick={() => handleNavigation(card.path)}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            />
          ))}

          <div className="LTAdminSectionDivider">
            Gestión de Contenido y Productos
          </div>

          {adminCards.slice(3, 6).map((card, index) => (
            <DashboardCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              variant={card.variant}
              onClick={() => handleNavigation(card.path)}
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            />
          ))}

          <div className="LTAdminSectionDivider">Marketing y Configuración</div>

          {adminCards.slice(6, 9).map((card, index) => (
            <DashboardCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
              variant={card.variant}
              onClick={() => handleNavigation(card.path)}
              style={{ animationDelay: `${1.0 + index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LTAdminPanel;
