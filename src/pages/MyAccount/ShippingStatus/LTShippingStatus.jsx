import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import {
  Truck,
  Search,
  Package,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Home,
  Send,
  Calendar,
  Box,
  ChevronRight,
} from "lucide-react";
import "./LTShippingStatus.css";

// --- MOCK DATA SIMULANDO INTEGRACIÓN CON OCA ---
const MOCK_SHIPMENTS = {
  OCA123456789: {
    carrier: "OCA Argentina",
    status: "EN_CAMINO",
    expectedDelivery: "2025-10-28",
    origin: "Buenos Aires, CABA",
    destination: "San Carlos de Bariloche, RN",
    product: 'Notebook Lenovo IdeaPad 3 15.6"',
    events: [
      {
        date: "2025-10-25 14:30",
        location: "Centro de Distribución Bariloche",
        description: "En reparto a domicilio. Intento 1",
      },
      {
        date: "2025-10-25 08:00",
        location: "OCA Bariloche",
        description: "Llegada a la sucursal de destino",
      },
      {
        date: "2025-10-24 19:45",
        location: "OCA Neuquén",
        description: "En tránsito hacia destino final",
      },
      {
        date: "2025-10-24 10:10",
        location: "OCA CABA (Retiro)",
        description: "Recibido en centro de procesamiento",
      },
      {
        date: "2025-10-23 16:00",
        location: "Tienda Vendedor",
        description: "Paquete retirado por OCA",
      },
    ],
  },
  OCA987654321: {
    carrier: "OCA Argentina",
    status: "ENTREGADO",
    expectedDelivery: "2025-09-15",
    origin: "Córdoba",
    destination: "Mendoza",
    product: "Teclado Redragon K552 RGB Mecánico",
    events: [
      {
        date: "2025-09-15 11:15",
        location: "Domicilio Cliente",
        description: "Entregado a Juan Pérez. ¡Disfrútalo!",
      },
      {
        date: "2025-09-15 08:30",
        location: "OCA Mendoza",
        description: "En reparto",
      },
      {
        date: "2025-09-14 22:00",
        location: "OCA San Luis",
        description: "En tránsito",
      },
      {
        date: "2025-09-13 15:00",
        location: "OCA Córdoba (Vendedor)",
        description: "Paquete despachado",
      },
    ],
  },
  OCA112233445: {
    carrier: "OCA Argentina",
    status: "PROBLEMA",
    expectedDelivery: "2025-11-05",
    origin: "Rosario",
    destination: "Mar del Plata",
    product: 'Monitor Samsung 27" Full HD',
    events: [
      {
        date: "2025-11-02 10:00",
        location: "Domicilio Cliente",
        description:
          "Domicilio no encontrado/Cerrado. Se reprogramará la entrega.",
      },
      {
        date: "2025-11-02 08:00",
        location: "OCA Mar del Plata",
        description: "En reparto",
      },
      {
        date: "2025-11-01 17:00",
        location: "OCA Buenos Aires",
        description: "En tránsito",
      },
    ],
  },
};

// Función de simulación de la API (Retorna data del mock)
const fetchShipmentData = (trackingId) => {
  // Simula un pequeño retraso de red
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = MOCK_SHIPMENTS[trackingId];
      if (data) {
        resolve({ success: true, data });
      } else {
        resolve({
          success: false,
          message:
            "Código de seguimiento no encontrado. Por favor, verifica el número.",
        });
      }
    }, 500);
  });
};

// --- COMPONENTE DE LA LÍNEA DE TIEMPO (TIMELINE) ---
const ShipmentTimeline = ({ events, status }) => {
  const getIconAndStyle = (index) => {
    const isCurrent = index === 0;
    const isDelivered = status === "ENTREGADO" && index === 0;

    if (isDelivered) {
      return {
        icon: CheckCircle,
        style: "lt-status-success",
      };
    }
    if (isCurrent) {
      return {
        icon: Send,
        style: "lt-status-current",
      };
    }
    if (status === "PROBLEMA") {
      return {
        icon: XCircle,
        style: "lt-status-error",
      };
    }

    return {
      icon: Package,
      style: "lt-status-past",
    };
  };

  return (
    <div className="lt-timeline">
      <div className="lt-timeline-line"></div>

      <ul className="lt-timeline-list">
        {events.map((event, index) => {
          const { icon: EventIcon, style: iconStyle } = getIconAndStyle(index);
          const isLatest = index === 0;

          return (
            <li key={index} className="lt-timeline-item">
              <div className={`lt-timeline-icon ${iconStyle}`}>
                <EventIcon className="lt-icon" />
              </div>

              <div
                className={`lt-timeline-content ${
                  isLatest ? "lt-timeline-content-latest" : ""
                }`}
              >
                <div className="lt-timeline-header">
                  <p
                    className={`lt-timeline-description ${
                      isLatest ? "lt-text-highlight" : ""
                    }`}
                  >
                    {event.description}
                  </p>
                  <p className="lt-timeline-date">
                    <Calendar className="lt-timeline-calendar-icon" />
                    {event.date.split(" ")[0]}
                  </p>
                </div>
                <p className="lt-timeline-location">
                  <MapPin className="lt-timeline-location-icon" />
                  {event.location} - {event.date.split(" ")[1]} hs
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const LTShippingStatus = () => {
  const navigate = useNavigate();
  const [user] = useState(() => getCurrentUser());

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  const [trackingId, setTrackingId] = useState("");
  const [shipmentData, setShipmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!trackingId) {
      setError("Por favor, ingresa un código de seguimiento.");
      setShipmentData(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setShipmentData(null);

    const response = await fetchShipmentData(trackingId.toUpperCase().trim());

    if (response.success) {
      setShipmentData(response.data);
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "ENTREGADO":
        return {
          text: "ENTREGADO",
          color: "lt-status-success",
          icon: CheckCircle,
        };
      case "EN_CAMINO":
        return {
          text: "En Camino / En Reparto",
          color: "lt-status-warning",
          icon: Truck,
        };
      case "PROBLEMA":
        return {
          text: "Retraso o Incidencia",
          color: "lt-status-error",
          icon: XCircle,
        };
      default:
        return { text: "Desconocido", color: "lt-status-neutral", icon: Clock };
    }
  };

  const statusInfo = shipmentData ? getStatusStyle(shipmentData.status) : null;

  return (
    <div className="lt-account-container">
      {/* Breadcrumb */}
      <div className="lt-account-breadcrumb fade-in">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="lt-breadcrumb-current">Estado del Envío</span>
      </div>

      {/* Header */}
      <header className="lt-account-header fade-in">
        <h1 className="lt-account-title">
          <Truck className="lt-account-title-icon" />
          Rastreo de Envíos
        </h1>
        <p className="lt-account-subtitle">
          Seguí tu paquete en tiempo real con OCA Argentina
        </p>
      </header>

      {/* Formulario de Búsqueda */}
      <div className="lt-search-card slide-up">
        <h2 className="lt-search-title">Ingresá tu Código de Seguimiento</h2>
        <div className="lt-search-wrapper">
          <div className="lt-search-input-wrapper">
            <Search className="lt-search-input-icon" />
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ej: OCA123456789"
              className="lt-search-bar"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="lt-button-dark"
          >
            {isLoading ? (
              <>
                <div className="lt-spinner"></div>
                Buscando...
              </>
            ) : (
              <>
                <Search size={18} />
                Buscar Envío
              </>
            )}
          </button>
        </div>
        {error && (
          <p className="lt-error-message">
            <XCircle size={16} />
            {error}
          </p>
        )}
        <p className="lt-search-hint">
          💡 Códigos de prueba: <strong>OCA123456789</strong> (En Camino),{" "}
          <strong>OCA987654321</strong> (Entregado),{" "}
          <strong>OCA112233445</strong> (Problema)
        </p>
      </div>

      {/* Resultados del Rastreo */}
      {shipmentData && (
        <div className="lt-results-card fade-in">
          {/* 1. Resumen del Envío */}
          <div className="lt-summary-grid">
            <div className="lt-summary-item">
              <statusInfo.icon
                className={`lt-summary-icon ${statusInfo.color}`}
              />
              <div>
                <p className="lt-summary-label">Estado Actual</p>
                <p className={`lt-summary-value ${statusInfo.color}`}>
                  {statusInfo.text}
                </p>
              </div>
            </div>
            <div className="lt-summary-item">
              <Calendar className="lt-summary-icon lt-icon-violeta" />
              <div>
                <p className="lt-summary-label">Fecha Estimada</p>
                <p className="lt-summary-value">
                  {shipmentData.expectedDelivery}
                </p>
              </div>
            </div>
            <div className="lt-summary-item">
              <Box className="lt-summary-icon lt-icon-violeta" />
              <div>
                <p className="lt-summary-label">Producto</p>
                <p className="lt-summary-value lt-summary-product">
                  {shipmentData.product}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Detalles de Origen y Destino */}
          <div className="lt-route-details">
            <div className="lt-route-item">
              <Send className="lt-route-icon" />
              <div>
                <p className="lt-route-label">Origen</p>
                <p className="lt-route-value">{shipmentData.origin}</p>
              </div>
            </div>
            <div className="lt-route-divider"></div>
            <div className="lt-route-item lt-route-item-end">
              <div className="lt-route-text-end">
                <p className="lt-route-label">Destino</p>
                <p className="lt-route-value">{shipmentData.destination}</p>
              </div>
              <Home className="lt-route-icon" />
            </div>
          </div>

          {/* 3. Línea de Tiempo de Eventos */}
          <div className="lt-timeline-section">
            <h3 className="lt-timeline-title">
              <MapPin className="lt-timeline-title-icon" />
              Historial de Eventos ({shipmentData.carrier})
            </h3>
            <ShipmentTimeline
              events={shipmentData.events}
              status={shipmentData.status}
            />
          </div>
        </div>
      )}

      {/* Mensaje inicial */}
      {!shipmentData && !error && !isLoading && (
        <div className="lt-empty-state fade-in">
          <div className="lt-empty-icon-wrapper">
            <Truck className="lt-empty-icon" />
          </div>
          <h3 className="lt-empty-title">Comenzá tu Rastreo</h3>
          <p className="lt-empty-description">
            Ingresá el código de seguimiento provisto por el vendedor para ver
            la ubicación de tu paquete.
          </p>
        </div>
      )}
    </div>
  );
};

export default LTShippingStatus;
