import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Plus,
  Trash2,
  Edit2,
  ChevronRight,
  Check,
} from "lucide-react";
import { getCurrentUser } from "../../../utils/authStorage";
import "./LTPaymentMethods.css";

const LTPaymentMethods = () => {
  const [user] = useState(() => getCurrentUser());
  const navigate = useNavigate();

  const isLoggedIn = !!user?.id;
  const userId = user?.id || "guest";

  // Redirigir si no hay usuario (siempre en efecto; no antes de los hooks)
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);

  // Estados
  const [cards, setCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardType: "credit",
  });
  const [focused, setFocused] = useState("");

  // Cargar tarjetas del localStorage
  useEffect(() => {
    if (!isLoggedIn) return;
    const saved = localStorage.getItem(`paymentMethods_${userId}`);
    setCards(saved ? JSON.parse(saved) : []);
  }, [isLoggedIn, userId]);

  // Guardar / limpiar tarjetas en localStorage
  useEffect(() => {
    if (!isLoggedIn) return;
    if (cards.length > 0) {
      localStorage.setItem(`paymentMethods_${userId}`, JSON.stringify(cards));
    } else {
      localStorage.removeItem(`paymentMethods_${userId}`);
    }
  }, [cards, userId, isLoggedIn]);

  // Detectar tipo de tarjeta
  const detectCardBrand = (number) => {
    const cleaned = String(number || "").replace(/\s/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned)) return "mastercard";
    if (/^3[47]/.test(cleaned)) return "amex";
    return "unknown";
  };

  // Formatear número 1234 5678 9012 3456
  const formatCardNumber = (value) => {
    const cleaned = String(value || "").replace(/\s/g, "");
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(" ") : cleaned;
  };

  // Manejar cambios del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
      if (cleaned.length <= 16) {
        setFormData((prev) => ({
          ...prev,
          cardNumber: formatCardNumber(cleaned),
        }));
      }
      return;
    }

    if (name === "expiryMonth") {
      const num = value.replace(/\D/g, "");
      const n = parseInt(num || "0", 10);
      if (num === "" || (num.length <= 2 && n >= 1 && n <= 12)) {
        setFormData((prev) => ({ ...prev, expiryMonth: num }));
      }
      return;
    }

    if (name === "expiryYear") {
      const num = value.replace(/\D/g, "");
      if (num.length <= 2)
        setFormData((prev) => ({ ...prev, expiryYear: num }));
      return;
    }

    if (name === "cvv") {
      const num = value.replace(/\D/g, "");
      if (num.length <= 3) setFormData((prev) => ({ ...prev, cvv: num }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validación
  const validateForm = () => {
    const { cardNumber, cardHolder, expiryMonth, expiryYear, cvv } = formData;
    const cleaned = String(cardNumber || "").replace(/\s/g, "");
    if (cleaned.length !== 16) return false;
    if (!String(cardHolder || "").trim()) return false;
    if (!expiryMonth || !expiryYear) return false;
    if (String(cvv).length !== 3) return false;

    const month = parseInt(expiryMonth, 10);
    const year = parseInt(`20${expiryYear}`, 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (isNaN(month) || isNaN(year)) return false;
    if (year < currentYear || (year === currentYear && month < currentMonth))
      return false;

    return true;
  };

  // Submit (agregar/editar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Por favor completá todos los campos correctamente");
      return;
    }

    const brand = detectCardBrand(formData.cardNumber);
    const lastFour = formData.cardNumber.replace(/\s/g, "").slice(-4);

    if (editingCard) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === editingCard.id
            ? { ...card, ...formData, brand, lastFour }
            : card
        )
      );
      setEditingCard(null);
    } else {
      const newCard = {
        id: Date.now().toString(),
        ...formData,
        brand,
        lastFour,
        isDefault: cards.length === 0,
      };
      setCards((prev) => [...prev, newCard]);
    }

    // Reset
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardType: "credit",
    });
    setShowForm(false);
  };

  // Eliminar
  const handleDelete = (cardId) => {
    const cardToDelete = cards.find((c) => c.id === cardId);
    if (
      window.confirm(
        `¿Estás seguro que querés eliminar la tarjeta terminada en ${
          cardToDelete?.lastFour || "XXXX"
        }?`
      )
    ) {
      const updated = cards.filter((c) => c.id !== cardId);
      if (cardToDelete?.isDefault && updated.length > 0) {
        updated[0] = { ...updated[0], isDefault: true };
      }
      setCards(updated);
    }
  };

  // Editar
  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardNumber: card.cardNumber,
      cardHolder: card.cardHolder,
      expiryMonth: card.expiryMonth,
      expiryYear: card.expiryYear,
      cvv: card.cvv,
      cardType: card.cardType,
    });
    setShowForm(true);
  };

  // Predeterminada
  const handleSetDefault = (cardId) => {
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === cardId })));
  };

  // Cancelar formulario
  const handleCancel = () => {
    setShowForm(false);
    setEditingCard(null);
    setFormData({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardType: "credit",
    });
  };

  // Logos
  const getCardLogo = (brand) => {
    switch (brand) {
      case "visa":
        return (
          <div className="card-brand-logo visa">
            <span>VISA</span>
          </div>
        );
      case "mastercard":
        return (
          <div className="card-brand-logo mastercard">
            <div className="mc-circle mc-red"></div>
            <div className="mc-circle mc-yellow"></div>
          </div>
        );
      case "amex":
        return (
          <div className="card-brand-logo amex">
            <span>AMEX</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Fallback visible mientras redirige si no hay sesión
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  return (
    <div className="lt-payment-methods-container fadeIn">
      {/* Breadcrumb */}
      <nav className="lt-breadcrumb">
        <a href="/my-account" className="lt-breadcrumb-link">
          Mi Cuenta
        </a>
        <ChevronRight size={16} className="lt-breadcrumb-separator" />
        <span className="lt-breadcrumb-current">Medios de Pago</span>
      </nav>

      {/* Header */}
      <div className="lt-payment-header">
        <div>
          <h1 className="lt-payment-title">Medios de Pago</h1>
          <p className="lt-payment-subtitle">
            Gestioná tus tarjetas y métodos de pago
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="lt-button-dark lt-add-card-btn"
          >
            <Plus size={20} />
            <span>Agregar Tarjeta</span>
          </button>
        )}
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="lt-card-form-section fadeIn">
          <div className="lt-card-form-header">
            <h2 className="lt-form-title">
              {editingCard ? "Editar Tarjeta" : "Nueva Tarjeta"}
            </h2>
          </div>

          <div className="lt-card-form-content">
            {/* Vista previa */}
            <div className="lt-card-preview">
              <div
                className={`lt-credit-card ${
                  focused === "cvv" ? "flipped" : ""
                }`}
              >
                {/* Frente */}
                <div className="lt-card-front">
                  <div className="lt-card-gradient"></div>
                  <div className="lt-card-brand">
                    {getCardLogo(detectCardBrand(formData.cardNumber))}
                  </div>
                  <div className="lt-card-chip"></div>
                  <div className="lt-card-number">
                    {formData.cardNumber || "•••• •••• •••• ••••"}
                  </div>
                  <div className="lt-card-info">
                    <div>
                      <div className="lt-card-label">Titular</div>
                      <div className="lt-card-holder">
                        {formData.cardHolder || "NOMBRE DEL TITULAR"}
                      </div>
                    </div>
                    <div>
                      <div className="lt-card-label">Vencimiento</div>
                      <div className="lt-card-expiry">
                        {formData.expiryMonth && formData.expiryYear
                          ? `${formData.expiryMonth}/${formData.expiryYear}`
                          : "MM/AA"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dorso */}
                <div className="lt-card-back">
                  <div className="lt-card-magnetic"></div>
                  <div className="lt-card-cvv-section">
                    <div className="lt-card-cvv-label">CVV</div>
                    <div className="lt-card-cvv-value">
                      {formData.cvv || "•••"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lt-payment-form">
              <div className="lt-form-group">
                <label htmlFor="cardNumber" className="lt-form-label">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("cardNumber")}
                  onBlur={() => setFocused("")}
                  placeholder="1234 5678 9012 3456"
                  className="lt-search-bar"
                  required
                />
              </div>

              <div className="lt-form-group">
                <label htmlFor="cardHolder" className="lt-form-label">
                  Nombre del Titular
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  onFocus={() => setFocused("cardHolder")}
                  onBlur={() => setFocused("")}
                  placeholder="Juan Pérez"
                  className="lt-search-bar"
                  required
                />
              </div>

              <div className="lt-form-row">
                <div className="lt-form-group">
                  <label htmlFor="expiryMonth" className="lt-form-label">
                    Mes de Venc.
                  </label>
                  <input
                    type="text"
                    id="expiryMonth"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleInputChange}
                    onFocus={() => setFocused("expiry")}
                    onBlur={() => setFocused("")}
                    placeholder="MM"
                    maxLength={2}
                    className="lt-search-bar"
                    required
                  />
                </div>

                <div className="lt-form-group">
                  <label htmlFor="expiryYear" className="lt-form-label">
                    Año de Venc.
                  </label>
                  <input
                    type="text"
                    id="expiryYear"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleInputChange}
                    onFocus={() => setFocused("expiry")}
                    onBlur={() => setFocused("")}
                    placeholder="AA"
                    maxLength={2}
                    className="lt-search-bar"
                    required
                  />
                </div>

                <div className="lt-form-group">
                  <label htmlFor="cvv" className="lt-form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    onFocus={() => setFocused("cvv")}
                    onBlur={() => setFocused("")}
                    placeholder="123"
                    maxLength={3}
                    className="lt-search-bar"
                    required
                  />
                </div>
              </div>

              <div className="lt-form-group">
                <label htmlFor="cardType" className="lt-form-label">
                  Tipo de Tarjeta
                </label>
                <select
                  id="cardType"
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                >
                  <option value="credit">Crédito</option>
                  <option value="debit">Débito</option>
                </select>
              </div>

              <div className="lt-form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="lt-button-variant2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="lt-button-dark"
                  disabled={!validateForm()}
                >
                  {editingCard ? "Guardar Cambios" : "Agregar Tarjeta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de tarjetas */}
      {!showForm && cards.length > 0 && (
        <div className="lt-cards-section fadeIn">
          <h2 className="lt-section-title">Tus Tarjetas</h2>
          <div className="lt-cards-grid">
            {cards.map((card) => (
              <div key={card.id} className="lt-account-card lt-saved-card">
                <div className="lt-saved-card-header">
                  <div className="lt-saved-card-brand">
                    {getCardLogo(card.brand)}
                  </div>
                  {card.isDefault && (
                    <span className="lt-default-badge">Predeterminada</span>
                  )}
                </div>

                <div className="lt-saved-card-number">
                  •••• •••• •••• {card.lastFour}
                </div>

                <div className="lt-saved-card-info">
                  <div>
                    <div className="lt-saved-card-label">Titular</div>
                    <div className="lt-saved-card-value">{card.cardHolder}</div>
                  </div>
                  <div>
                    <div className="lt-saved-card-label">Vencimiento</div>
                    <div className="lt-saved-card-value">
                      {card.expiryMonth}/{card.expiryYear}
                    </div>
                  </div>
                  <div>
                    <div className="lt-saved-card-label">Tipo</div>
                    <div className="lt-saved-card-value">
                      {card.cardType === "credit" ? "Crédito" : "Débito"}
                    </div>
                  </div>
                </div>

                <div className="lt-saved-card-actions">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="lt-card-action-btn lt-set-default-btn"
                      title="Establecer como predeterminada"
                    >
                      <Check size={16} />
                      <span>Predeterminada</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(card)}
                    className="lt-card-action-btn lt-edit-btn"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="lt-card-action-btn lt-delete-btn"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {!showForm && cards.length === 0 && (
        <div className="lt-empty-state fadeIn">
          <div className="lt-empty-icon">
            <CreditCard size={80} />
          </div>
          <h2 className="lt-empty-title">No tenés tarjetas guardadas</h2>
          <p className="lt-empty-description">
            Agregá una tarjeta para realizar compras de forma más rápida y
            segura
          </p>
          <button onClick={() => setShowForm(true)} className="lt-button-dark">
            <Plus size={20} />
            <span>Agregar Primera Tarjeta</span>
          </button>
        </div>
      )}

      {/* Otros métodos de pago */}
      <div className="lt-other-methods fadeIn">
        <h2 className="lt-section-title">Otros Métodos de Pago</h2>
        <div className="lt-other-methods-grid">
          <div className="lt-account-card lt-other-method">
            <div className="lt-other-method-icon">💳</div>
            <h3 className="lt-other-method-title">Mercado Pago</h3>
            <p className="lt-other-method-description">
              Pagá con tu cuenta de Mercado Pago
            </p>
          </div>

          <div className="lt-account-card lt-other-method">
            <div className="lt-other-method-icon">💵</div>
            <h3 className="lt-other-method-title">Efectivo</h3>
            <p className="lt-other-method-description">
              Pagá en efectivo al recibir tu pedido
            </p>
          </div>

          <div className="lt-account-card lt-other-method">
            <div className="lt-other-method-icon">🏦</div>
            <h3 className="lt-other-method-title">Transferencia</h3>
            <p className="lt-other-method-description">
              Transferencia bancaria directa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LTPaymentMethods;
