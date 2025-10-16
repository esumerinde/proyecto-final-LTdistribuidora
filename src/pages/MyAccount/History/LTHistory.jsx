import { useState, useMemo, useEffect } from "react";
import { getCurrentUser } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import {
  History,
  MapPin,
  Repeat,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  ChevronRight,
  ShoppingBag,
  Smartphone,
  Laptop,
  Package,
} from "lucide-react";
import "./LTHistory.css";

// --- MOCK DATA PARA DEMOSTRACIÓN (PRODUCTOS ELECTRÓNICOS Y VOUCHERS DE ORDEN DE COMPRA) ---
const MOCK_HISTORY = [
  {
    type: "RESERVA",
    id: "R900123",
    status: "COMPLETADA",
    date: "2024-08-15",
    title: "Notebook Gamer Lenovo Legion 5",
    location: "Retirado en Sucursal CABA (ID: 45A)",
    price: 950000.0,
    canRepeat: true,
  },
  {
    type: "VOUCHER",
    id: "VCH774411",
    status: "UTILIZADO",
    date: "2024-07-20",
    title: "Orden de Compra por $200.000 ARS",
    details:
      "Canjeado como parte de pago por un Smartwatch Samsung. Código de uso: 9945L",
    price: 200000.0,
    canRepeat: false,
  },
  {
    type: "RESERVA",
    id: "R887766",
    status: "CANCELADA",
    date: "2024-05-01",
    title: "Smartphone Samsung Galaxy S24 Ultra",
    location: "Envío Cancelado (Motivo: Stock agotado)",
    price: 680000.0,
    canRepeat: true,
  },
  {
    type: "VOUCHER",
    id: "VCH900900",
    status: "EXPIRADO",
    date: "2024-03-10",
    title: "Voucher 30% OFF en Accesorios",
    details: "Expiró el 2024-04-01. Válido solo para mouses y teclados.",
    canRepeat: false,
    price: null,
  },
  {
    type: "RESERVA",
    id: "R770044",
    status: "COMPLETADA",
    date: "2023-12-24",
    title: "Tablet Samsung Galaxy Tab S9",
    location: "Entregado en domicilio (Seguimiento: OCA123...)",
    price: 350000.0,
    canRepeat: true,
  },
  {
    type: "RESERVA",
    id: "R665533",
    status: "COMPLETADA",
    date: "2023-11-10",
    title: "Monitor LG UltraWide 34' 144Hz",
    location: "Retirado en Sucursal Rosario",
    price: 420000.0,
    canRepeat: true,
  },
  {
    type: "VOUCHER",
    id: "VCH558899",
    status: "UTILIZADO",
    date: "2023-10-05",
    title: "Voucher 15% OFF en Notebooks",
    details: "Canjeado en compra de Notebook Lenovo. Código: TECH15",
    price: 120000.0,
    canRepeat: false,
  },
];

// --- COMPONENTE ETIQUETA DE ESTADO ---
const StatusTag = ({ status, type }) => {
  const config = {
    COMPLETADA: {
      text: "Completada",
      color: "lt-status-success",
      icon: CheckCircle,
    },
    UTILIZADO: {
      text: "Canjeado",
      color: "lt-status-success",
      icon: CheckCircle,
    },
    CANCELADA: { text: "Cancelada", color: "lt-status-error", icon: XCircle },
    EXPIRADO: { text: "Expirado", color: "lt-status-warning", icon: Clock },
    RESERVA: {
      text: "Reserva (Producto)",
      color: "lt-type-reserva",
      icon: Package,
    },
    VOUCHER: {
      text: "Voucher / Orden de Compra",
      color: "lt-type-voucher",
      icon: ShoppingBag,
    },
  };

  const StatusIcon = config[status]?.icon || History;
  const TypeIcon = config[type]?.icon || History;
  const isStatusTag = !!config[status];

  const currentConfig = isStatusTag ? config[status] : config[type];
  const TagIcon = isStatusTag ? StatusIcon : TypeIcon;

  return (
    <span className={`lt-history-tag ${currentConfig.color}`}>
      <TagIcon className="lt-history-tag-icon" />
      {currentConfig.text}
    </span>
  );
};

// --- COMPONENTE TARJETA DE ITEM DEL HISTORIAL ---
const HistoryItemCard = ({ item }) => {
  const handleRepeat = (id) => {
    alert(
      `Simulación: Repitiendo la reserva para el producto con ID ${id}. Navegando a la página de compra...`
    );
  };

  const handleViewDetails = (id, type) => {
    alert(`Simulación: Viendo detalles completos del ${type} con ID ${id}.`);
  };

  const ProductIcon =
    item.title.includes("Notebook") ||
    item.title.includes("Tablet") ||
    item.title.includes("Monitor")
      ? Laptop
      : Smartphone;

  return (
    <div className="lt-history-card">
      {/* Icono de Producto/Voucher */}
      <div
        className={`lt-history-icon-wrapper ${
          item.type === "RESERVA"
            ? "lt-history-icon-reserva"
            : "lt-history-icon-voucher"
        }`}
      >
        {item.type === "RESERVA" ? (
          <ProductIcon className="lt-history-icon" />
        ) : (
          <ShoppingBag className="lt-history-icon" />
        )}
      </div>

      {/* Información Principal */}
      <div className="lt-history-content">
        <div className="lt-history-tags">
          <StatusTag status={item.type} />
          <StatusTag status={item.status} />
        </div>

        <h3 className="lt-history-title">{item.title}</h3>

        <p className="lt-history-date">
          <Clock className="lt-history-meta-icon" />
          Fecha: {item.date} | ID: {item.id}
        </p>

        {item.location && item.type === "RESERVA" && (
          <p className="lt-history-location">
            <MapPin className="lt-history-meta-icon" />
            Ubicación: {item.location}
          </p>
        )}

        {item.price !== null && item.price !== undefined && (
          <p className="lt-history-price">
            <DollarSign className="lt-history-price-icon" />
            {item.type === "RESERVA" ? "Monto Total" : "Valor del Voucher"}: ${" "}
            {Number(item.price).toLocaleString("es-AR")}
          </p>
        )}

        {item.details && <p className="lt-history-details">{item.details}</p>}
      </div>

      {/* Acciones */}
      <div className="lt-history-actions">
        <button
          onClick={() => handleViewDetails(item.id, item.type)}
          className="lt-button-variant2"
        >
          Ver Detalles
          <ChevronRight size={16} />
        </button>
        {item.canRepeat && item.type === "RESERVA" && (
          <button
            onClick={() => handleRepeat(item.id)}
            className="lt-button-dark"
          >
            <Repeat size={16} />
            Repetir Compra
          </button>
        )}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const LTHistory = () => {
  const navigate = useNavigate();
  const [user] = useState(() => getCurrentUser());
  const isLoggedIn = !!user?.id;

  // Redirigir si no hay usuario (en efecto)
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);

  const [activeFilter, setActiveFilter] = useState("TODO");

  const filters = [
    {
      id: "TODO",
      label: "Todo el Historial",
      icon: History,
      types: ["RESERVA", "VOUCHER"],
    },
    {
      id: "RESERVA",
      label: "Reservas de Productos",
      icon: Laptop,
      types: ["RESERVA"],
    },
    {
      id: "VOUCHER",
      label: "Vouchers / Órdenes",
      icon: ShoppingBag,
      types: ["VOUCHER"],
    },
  ];

  const filteredHistory = useMemo(() => {
    if (activeFilter === "TODO") return MOCK_HISTORY;
    return MOCK_HISTORY.filter((item) => item.type === activeFilter);
  }, [activeFilter]);

  // Fallback visible mientras redirige si no hay sesión
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  return (
    <div className="LTHistoryContainer">
      {/* Breadcrumb */}
      <div className="lt-breadcrumb fade-in">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="lt-breadcrumb-current">Historial de Actividad</span>
      </div>

      {/* Header */}
      <header className="lt-header-section fade-in">
        <h1 className="lt-header-title">
          <History className="lt-header-icon" />
          Historial de Actividad
        </h1>
        <p className="lt-header-subtitle">
          Revisá tus reservas completadas y vouchers canjeados o expirados
        </p>
      </header>

      {/* Navegación (Pestañas) */}
      <div className="lt-history-tabs slide-up">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`lt-history-tab ${
              activeFilter === filter.id ? "lt-history-tab-active" : ""
            }`}
          >
            <filter.icon className="lt-history-tab-icon" />
            {filter.label}
          </button>
        ))}
      </div>

      {/* Contenido del Historial */}
      <div className="lt-history-list">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <HistoryItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className="lt-empty-state fade-in">
            <div className="lt-empty-icon-wrapper">
              <History className="lt-empty-icon" />
            </div>
            <h3 className="lt-empty-title">Aún no hay actividad aquí</h3>
            <p className="lt-empty-description">
              Tu historial está vacío. ¡Empezá a reservar para que podamos
              mostrarte tus logros!
            </p>
            <button
              onClick={() => navigate("/")}
              className="lt-button-dark"
              style={{ marginTop: "1.5rem" }}
            >
              Ir a la Tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LTHistory;
