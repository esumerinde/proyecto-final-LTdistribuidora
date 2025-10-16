import { useState, useMemo, useEffect } from "react";
import { getCurrentUser } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Archive,
  Printer,
  User,
  Box,
  DollarSign,
  ChevronRight,
  Package,
} from "lucide-react";
import "./LTPreOrders.css";

// --- DATOS DE EJEMPLO ---
const MOCK_PREORDERS = [
  {
    id: "PO100456",
    status: "PAGADA",
    date: "2025-10-10",
    total: 125000.0,
    seller: {
      name: "LT Electrónica - Tucumán",
      contact: "ventas@ltelectronica.com",
    },
    products: [
      {
        name: "Notebook Lenovo IdeaPad 3 15.6",
        quantity: 1,
        price: 85000.0,
        thumbnail: "https://placehold.co/80x80/747bbf/FFFFFF?text=Lenovo",
      },
      {
        name: "Mouse Logitech MX Master 3",
        quantity: 2,
        price: 20000.0,
        thumbnail: "https://placehold.co/80x80/f7b15d/FFFFFF?text=Mouse",
      },
    ],
  },
  {
    id: "PO100457",
    status: "PENDIENTE",
    date: "2025-10-15",
    total: 45000.0,
    seller: {
      name: "LT Electrónica - Buenos Aires",
      contact: "ventas@ltelectronica.com",
    },
    products: [
      {
        name: "Teclado Mecánico Redragon K552",
        quantity: 1,
        price: 45000.0,
        thumbnail: "https://placehold.co/80x80/747bbf/FFFFFF?text=Teclado",
      },
    ],
  },
  {
    id: "PO100301",
    status: "ANTERIOR",
    date: "2025-09-01",
    total: 15500.0,
    seller: {
      name: "LT Electrónica - Córdoba",
      contact: "ventas@ltelectronica.com",
    },
    products: [
      {
        name: "Auriculares HyperX Cloud II",
        quantity: 1,
        price: 15500.0,
        thumbnail: "https://placehold.co/80x80/f7b15d/FFFFFF?text=Audio",
      },
    ],
  },
  {
    id: "PO100458",
    status: "PAGADA",
    date: "2025-10-25",
    total: 298000.0,
    seller: {
      name: "LT Electrónica - Mendoza",
      contact: "ventas@ltelectronica.com",
    },
    products: [
      {
        name: "Monitor Samsung 27 4K UHD",
        quantity: 2,
        price: 149000.0,
        thumbnail: "https://placehold.co/80x80/747bbf/FFFFFF?text=Monitor",
      },
    ],
  },
];

// --- COMPONENTE TARJETA DE PRE-ORDEN ---
const PreOrderCard = ({ order }) => {
  const statusConfig = {
    PENDIENTE: {
      icon: Clock,
      text: "Pendiente de Pago",
      bgClass: "lt-status-warning",
    },
    PAGADA: {
      icon: CheckCircle,
      text: "Pedido Pagado",
      bgClass: "lt-status-success",
    },
    ANTERIOR: {
      icon: Archive,
      text: "Pedido Anterior",
      bgClass: "lt-status-neutral",
    },
  };

  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  const handlePrintTicket = () =>
    alert(`Simulación: Imprimiendo comprobante del pedido ${order.id}`);
  const handleViewSeller = () =>
    alert(
      `Simulación: Contactar a ${order.seller.name}. Email: ${order.seller.contact}`
    );
  const handleViewDetail = () =>
    alert(`Simulación: Ver detalle completo del pedido ${order.id}`);

  return (
    <div className="lt-account-card lt-preorder-card fade-in">
      {/* Encabezado con Estado */}
      <div className={`lt-preorder-header ${config.bgClass}`}>
        <div className="lt-preorder-status">
          <StatusIcon size={20} />
          <span>{config.text}</span>
        </div>
        <div className="lt-preorder-date">
          <span className="lt-preorder-date-label">Fecha</span>
          <span className="lt-preorder-date-value">{order.date}</span>
        </div>
      </div>

      {/* Info del Pedido */}
      <div className="lt-preorder-info">
        <h3 className="lt-preorder-id">
          Pedido N° <span className="lt-highlight">{order.id}</span>
        </h3>
      </div>

      {/* Contenido */}
      <div className="lt-preorder-content">
        {/* Productos */}
        <div className="lt-preorder-products">
          <h4 className="lt-preorder-section-title">
            <Box size={18} />
            <span>Productos del Pedido</span>
          </h4>
          <div className="lt-products-list">
            {order.products.map((item, index) => (
              <div key={index} className="lt-product-item">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="lt-product-thumbnail"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/80x80/747bbf/FFFFFF?text=Prod";
                  }}
                />
                <div className="lt-product-details">
                  <p className="lt-product-name">{item.name}</p>
                  <p className="lt-product-info">
                    Cantidad: {item.quantity} | $
                    {Number(item.price).toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen y Vendedor */}
        <div className="lt-preorder-summary">
          <div className="lt-summary-section">
            <h4 className="lt-preorder-section-title">
              <DollarSign size={18} />
              <span>Total del Pedido</span>
            </h4>
            <p className="lt-preorder-total">
              ${Number(order.total).toLocaleString("es-AR")}
            </p>
          </div>

          <div className="lt-summary-section">
            <h4 className="lt-preorder-section-title">
              <User size={18} />
              <span>Sucursal</span>
            </h4>
            <p className="lt-seller-name">{order.seller.name}</p>
            <p className="lt-seller-contact">{order.seller.contact}</p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="lt-preorder-actions">
        <button onClick={handleViewDetail} className="lt-preorder-detail-btn">
          Ver detalle completo <ChevronRight size={16} />
        </button>
        <div className="lt-preorder-buttons">
          <button onClick={handleViewSeller} className="lt-button-variant2">
            Contactar Sucursal
          </button>
          <button onClick={handlePrintTicket} className="lt-button-dark">
            <Printer size={16} />
            <span>Imprimir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- FILTROS CONSTANTES ---
const PREORDER_FILTERS = [
  {
    id: "ACTIVA",
    label: "Pedidos Activos",
    icon: Clock,
    statuses: ["PENDIENTE"],
  },
  {
    id: "PAGADA",
    label: "Pedidos Pagados",
    icon: CheckCircle,
    statuses: ["PAGADA"],
  },
  {
    id: "ANTERIOR",
    label: "Pedidos Anteriores",
    icon: Archive,
    statuses: ["ANTERIOR"],
  },
];

// --- COMPONENTE PRINCIPAL ---
const LTPreOrders = () => {
  const navigate = useNavigate();
  const [user] = useState(() => getCurrentUser());
  const isLoggedIn = !!user?.id;

  // Redirigir si no hay usuario (en efecto)
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);

  const [activeFilter, setActiveFilter] = useState("ACTIVA");

  const filteredOrders = useMemo(() => {
    const currentFilter = PREORDER_FILTERS.find((f) => f.id === activeFilter);
    if (!currentFilter) return [];
    return MOCK_PREORDERS.filter((order) =>
      currentFilter.statuses.includes(order.status)
    );
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
    <div className="lt-account-container fade-in">
      {/* Breadcrumb */}
      <nav className="lt-account-breadcrumb">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi Cuenta
        </span>
        <ChevronRight size={16} className="lt-breadcrumb-separator" />
        <span className="lt-breadcrumb-current">Reservas Activas</span>
      </nav>

      {/* Header */}
      <header className="lt-account-header">
        <h1 className="lt-account-title">
          <ShoppingBag className="lt-account-title-icon" />
          Mis Reservas de Productos
        </h1>
        <p className="lt-account-subtitle">
          Administrá el estado de tus pedidos y reservas
        </p>
      </header>

      {/* Pestañas de Filtro */}
      <div className="lt-preorders-tabs">
        {PREORDER_FILTERS.map((filter) => {
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

      {/* Lista de Pedidos */}
      <div className="lt-preorders-list">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <PreOrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="lt-account-empty fade-in">
            <div className="lt-empty-icon">
              <Package size={80} />
            </div>
            <h2 className="lt-empty-title">No hay pedidos en esta categoría</h2>
            <p className="lt-empty-description">
              No tenés pedidos con el estado "
              {PREORDER_FILTERS.find((f) => f.id === activeFilter)?.label}".
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

export default LTPreOrders;
