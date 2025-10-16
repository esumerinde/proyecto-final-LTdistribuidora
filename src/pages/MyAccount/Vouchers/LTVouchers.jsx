import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Ticket,
  Clock,
  CheckCircle,
  Archive,
  Copy,
  ChevronRight,
  Tag,
  Calendar,
  DollarSign,
  AlertCircle,
  Gift,
} from "lucide-react";
import "./LTVouchers.css";

// --- DATOS DE EJEMPLO ---
const MOCK_VOUCHERS = [
  {
    id: "TECH2025",
    code: "TECH2025",
    status: "ACTIVO",
    discount: 15,
    discountType: "PERCENTAGE",
    minPurchase: 50000,
    maxDiscount: 10000,
    expiryDate: "2025-12-31",
    description: "15% de descuento en tecnología",
    category: "Electrónica",
    used: false,
  },
  {
    id: "WELCOME500",
    code: "WELCOME500",
    status: "ACTIVO",
    discount: 500,
    discountType: "FIXED",
    minPurchase: 10000,
    maxDiscount: null,
    expiryDate: "2025-11-30",
    description: "$500 de descuento en tu primera compra",
    category: "General",
    used: false,
  },
  {
    id: "NOTEBOOK30",
    code: "NOTEBOOK30",
    status: "USADO",
    discount: 30,
    discountType: "PERCENTAGE",
    minPurchase: 80000,
    maxDiscount: 25000,
    expiryDate: "2025-10-15",
    description: "30% OFF en notebooks",
    category: "Notebooks",
    used: true,
    usedDate: "2025-10-10",
  },
  {
    id: "SUMMER20",
    code: "SUMMER20",
    status: "VENCIDO",
    discount: 20,
    discountType: "PERCENTAGE",
    minPurchase: 30000,
    maxDiscount: 15000,
    expiryDate: "2025-09-30",
    description: "Descuento de verano",
    category: "General",
    used: false,
  },
  {
    id: "GAMING1000",
    code: "GAMING1000",
    status: "ACTIVO",
    discount: 1000,
    discountType: "FIXED",
    minPurchase: 20000,
    maxDiscount: null,
    expiryDate: "2025-12-15",
    description: "$1000 OFF en productos gaming",
    category: "Gaming",
    used: false,
  },
];

// --- COMPONENTE TARJETA DE VOUCHER ---
const VoucherCard = ({ voucher }) => {
  const statusConfig = {
    ACTIVO: {
      icon: CheckCircle,
      text: "Disponible",
      className: "lt-voucher-active",
    },
    USADO: {
      icon: Archive,
      text: "Usado",
      className: "lt-voucher-used",
    },
    VENCIDO: {
      icon: Clock,
      text: "Vencido",
      className: "lt-voucher-expired",
    },
  };

  const config = statusConfig[voucher.status];
  const StatusIcon = config.icon;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucher.code);
    alert(`Código ${voucher.code} copiado al portapapeles`);
  };

  const handleUseVoucher = () => {
    alert(
      `Aplicando voucher ${voucher.code}... Redirigiendo a la tienda (simulación)`
    );
  };

  const formatDiscount = () => {
    if (voucher.discountType === "PERCENTAGE") {
      return `${voucher.discount}% OFF`;
    } else {
      return `$${voucher.discount.toLocaleString("es-AR")} OFF`;
    }
  };

  return (
    <div className={`lt-voucher-card ${config.className} fadeIn`}>
      {/* Badge de Estado */}
      <div className="lt-voucher-status-badge">
        <StatusIcon size={14} />
        <span>{config.text}</span>
      </div>

      {/* Contenido Principal */}
      <div className="lt-voucher-main">
        {/* Descuento */}
        <div className="lt-voucher-discount">
          <Gift size={32} className="lt-voucher-icon" />
          <span className="lt-voucher-discount-text">{formatDiscount()}</span>
        </div>

        {/* Código */}
        <div className="lt-voucher-code-section">
          <label className="lt-voucher-label">Código del Voucher</label>
          <div className="lt-voucher-code-wrapper">
            <span className="lt-voucher-code">{voucher.code}</span>
            <button
              onClick={handleCopyCode}
              className="lt-copy-btn"
              title="Copiar código"
              disabled={voucher.status !== "ACTIVO"}
            >
              <Copy size={18} />
            </button>
          </div>
        </div>

        {/* Descripción */}
        <p className="lt-voucher-description">{voucher.description}</p>

        {/* Info */}
        <div className="lt-voucher-info">
          <div className="lt-voucher-info-item">
            <Tag size={16} />
            <span>Categoría: {voucher.category}</span>
          </div>
          <div className="lt-voucher-info-item">
            <DollarSign size={16} />
            <span>
              Compra mínima: ${voucher.minPurchase.toLocaleString("es-AR")}
            </span>
          </div>
          {voucher.maxDiscount && (
            <div className="lt-voucher-info-item">
              <AlertCircle size={16} />
              <span>
                Descuento máximo: ${voucher.maxDiscount.toLocaleString("es-AR")}
              </span>
            </div>
          )}
          <div className="lt-voucher-info-item">
            <Calendar size={16} />
            <span>Vence: {voucher.expiryDate}</span>
          </div>
          {voucher.used && voucher.usedDate && (
            <div className="lt-voucher-info-item lt-used-date">
              <Archive size={16} />
              <span>Usado el: {voucher.usedDate}</span>
            </div>
          )}
        </div>

        {/* Botón de Acción */}
        {voucher.status === "ACTIVO" && (
          <button
            onClick={handleUseVoucher}
            className="lt-button-dark lt-use-voucher-btn"
          >
            Usar en Tienda
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// --- FILTROS CONSTANTES ---
const VOUCHER_FILTERS = [
  {
    id: "ACTIVO",
    label: "Vouchers Disponibles",
    icon: CheckCircle,
    statuses: ["ACTIVO"],
  },
  {
    id: "USADO",
    label: "Vouchers Usados",
    icon: Archive,
    statuses: ["USADO"],
  },
  {
    id: "VENCIDO",
    label: "Vouchers Vencidos",
    icon: Clock,
    statuses: ["VENCIDO"],
  },
];

// --- COMPONENTE PRINCIPAL ---
const LTVouchers = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("ACTIVO");

  const filteredVouchers = useMemo(() => {
    const currentFilter = VOUCHER_FILTERS.find((f) => f.id === activeFilter);
    if (!currentFilter) return [];
    return MOCK_VOUCHERS.filter((voucher) =>
      currentFilter.statuses.includes(voucher.status)
    );
  }, [activeFilter]);

  return (
    <div className="lt-account-container fadeIn">
      {/* Breadcrumb */}
      <nav className="lt-account-breadcrumb">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi Cuenta
        </span>
        <ChevronRight size={16} className="lt-breadcrumb-separator" />
        <span className="lt-breadcrumb-current">Vouchers Activos</span>
      </nav>

      {/* Header */}
      <header className="lt-account-header">
        <h1 className="lt-account-title">
          <Ticket className="lt-account-title-icon" />
          Mis Vouchers de Descuento
        </h1>
        <p className="lt-account-subtitle">
          Gestioná y usá tus cupones de descuento
        </p>
      </header>

      {/* Pestañas de Filtro */}
      <div className="lt-vouchers-tabs">
        {VOUCHER_FILTERS.map((filter) => {
          const FilterIcon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`lt-tab ${
                activeFilter === filter.id ? "lt-tab-active" : ""
              }`}
            >
              <FilterIcon size={20} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid de Vouchers */}
      <div className="lt-vouchers-grid">
        {filteredVouchers.length > 0 ? (
          filteredVouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))
        ) : (
          <div className="lt-account-empty fadeIn">
            <div className="lt-empty-icon">
              <Ticket size={80} />
            </div>
            <h2 className="lt-empty-title">
              No hay vouchers en esta categoría
            </h2>
            <p className="lt-empty-description">
              No tenés vouchers con el estado "
              {VOUCHER_FILTERS.find((f) => f.id === activeFilter)?.label}".
            </p>
            <button onClick={() => navigate("/")} className="lt-button-dark">
              Ir a la Tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LTVouchers;
