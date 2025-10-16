import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Lock,
  Trash2,
  Bell,
  Smartphone,
  UserCheck,
  ChevronRight,
  XCircle,
  CheckCircle,
  Mail,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import "./LTSecurity.css";

// --- DATOS DE EJEMPLO ---
const MOCK_DEVICES = [
  {
    id: "dev1",
    name: "MacBook Pro",
    location: "Tucumán, Argentina",
    lastLogin: "Hace 5 minutos",
    current: true,
  },
  {
    id: "dev2",
    name: "Samsung Galaxy S22",
    location: "Buenos Aires, Argentina",
    lastLogin: "Ayer, 18:30",
    current: false,
  },
];

const MOCK_ALERTS = [
  {
    id: "a1",
    type: "password",
    message: "Contraseña cambiada exitosamente.",
    date: "2025-10-10",
    status: "success",
  },
  {
    id: "a2",
    type: "login",
    message: "Inicio de sesión desde nuevo dispositivo (iOS).",
    date: "2025-10-09",
    status: "warning",
  },
];

// --- COMPONENTES ---

// Modal para cambiar contraseña
const ChangePasswordModal = ({ onClose, onConfirm }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (formData.newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    onConfirm(formData);
  };

  return (
    <div className="lt-security-modal-overlay fade-in">
      <div className="lt-security-modal">
        <div className="lt-security-modal-header">
          <h3 className="lt-security-modal-title">
            <Lock size={24} />
            <span>Cambiar Contraseña</span>
          </h3>
          <button onClick={onClose} className="lt-security-modal-close">
            <XCircle size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="lt-security-modal-body">
          <div className="lt-form-group">
            <label className="lt-form-label">Contraseña Actual</label>
            <div className="lt-password-input-wrapper">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="lt-search-bar"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((v) => !v)}
                className="lt-password-toggle"
              >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="lt-form-group">
            <label className="lt-form-label">Nueva Contraseña</label>
            <div className="lt-password-input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="lt-search-bar"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                className="lt-password-toggle"
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="lt-form-hint">Mínimo 8 caracteres</p>
          </div>

          <div className="lt-form-group">
            <label className="lt-form-label">Confirmar Nueva Contraseña</label>
            <div className="lt-password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="lt-search-bar"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="lt-password-toggle"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="lt-security-modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="lt-button-variant2"
            >
              Cancelar
            </button>
            <button type="submit" className="lt-button-dark">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal para eliminar cuenta
const DeleteAccountModal = ({ onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState("");
  const requiredText = "BORRAR MI CUENTA";

  const handleDelete = () => {
    if (confirmText === requiredText) {
      onConfirm();
    } else {
      alert(`Por favor, escribí exactamente "${requiredText}" para confirmar.`);
    }
  };

  return (
    <div className="lt-security-modal-overlay fade-in">
      <div className="lt-security-modal lt-security-modal-danger">
        <div className="lt-security-modal-header">
          <h3 className="lt-security-modal-title lt-text-danger">
            <AlertTriangle size={24} />
            <span>Eliminar Cuenta Permanentemente</span>
          </h3>
          <button onClick={onClose} className="lt-security-modal-close">
            <XCircle size={24} />
          </button>
        </div>

        <div className="lt-security-modal-body">
          <div className="lt-security-warning">
            <AlertTriangle size={48} />
            <p>
              <strong>Esta acción es irreversible.</strong>
            </p>
            <p>
              Al eliminar tu cuenta, perderás permanentemente todos tus datos,
              historial de compras, favoritos y preferencias.
            </p>
          </div>

          <div className="lt-form-group">
            <label className="lt-form-label">
              Para confirmar, escribí exactamente{" "}
              <strong>{requiredText}</strong>:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder={requiredText}
              className="lt-search-bar"
              style={{ textTransform: "uppercase" }}
            />
          </div>

          <div className="lt-security-modal-actions">
            <button onClick={onClose} className="lt-button-variant2">
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              disabled={confirmText !== requiredText}
              className="lt-button-danger"
            >
              <Trash2 size={20} />
              <span>Sí, Eliminar Mi Cuenta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
const LTSecurity = () => {
  const navigate = useNavigate();
  const [user] = useState(() => getCurrentUser());
  const isLoggedIn = !!user?.id;

  // Redirigir si no hay usuario (en efecto; no antes de los hooks)
  useEffect(() => {
    if (!isLoggedIn) navigate("/login", { replace: true });
  }, [isLoggedIn, navigate]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [locationAllowed, setLocationAllowed] = useState(true);

  const handleChangePassword = (data) => {
    console.log("Cambiar contraseña:", data);
    alert("Contraseña actualizada exitosamente");
    setShowPasswordModal(false);
  };

  const handleDeleteAccount = () => {
    console.log("Cuenta eliminada");
    alert("Cuenta eliminada (simulación)");
    setShowDeleteModal(false);
    navigate("/");
  };

  const handleLogoutDevice = (id, name) => {
    if (window.confirm(`¿Estás seguro que querés cerrar sesión en ${name}?`)) {
      alert(`Sesión cerrada en ${name} (simulación)`);
    }
  };

  const handleToggle2FA = () => {
    setIs2FAEnabled((v) => !v);
    alert(
      `Verificación en dos pasos ${!is2FAEnabled ? "activada" : "desactivada"}`
    );
  };

  const handleToggleLocation = () => {
    setLocationAllowed((v) => !v);
    alert(`Permiso de ubicación ${!locationAllowed ? "otorgado" : "revocado"}`);
  };

  const handleResendEmail = () => {
    alert("Correo de verificación enviado (simulación)");
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
    <div className="lt-security-container fade-in">
      {/* Breadcrumb */}
      <nav className="lt-breadcrumb">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi Cuenta
        </span>
        <ChevronRight size={16} className="lt-breadcrumb-separator" />
        <span className="lt-breadcrumb-current">Seguridad</span>
      </nav>

      {/* Header */}
      <div className="lt-security-header">
        <div className="lt-security-header-icon">
          <Shield size={40} />
        </div>
        <div>
          <h1 className="lt-security-title">Seguridad y Privacidad</h1>
          <p className="lt-security-subtitle">
            Gestioná la seguridad de tu cuenta y protegé tus datos
          </p>
        </div>
      </div>

      {/* Sección 1: Seguridad de la Cuenta */}
      <section className="lt-security-section fade-in">
        <div className="lt-section-header">
          <Lock size={24} />
          <h2 className="lt-section-title">Seguridad de la Cuenta</h2>
        </div>

        <div className="lt-account-card lt-security-card">
          <div className="lt-security-item">
            <div className="lt-security-item-info">
              <div className="lt-security-item-icon">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="lt-security-item-title">Cambiar Contraseña</h3>
                <p className="lt-security-item-description">
                  Actualizá tu contraseña periódicamente para mayor seguridad
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="lt-button-variant2 lt-security-action-btn"
            >
              Cambiar
            </button>
          </div>

          <div className="lt-security-item lt-security-item-danger">
            <div className="lt-security-item-info">
              <div className="lt-security-item-icon lt-icon-danger">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="lt-security-item-title">Eliminar Cuenta</h3>
                <p className="lt-security-item-description">
                  Eliminá permanentemente tu cuenta y todos tus datos
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="lt-button-danger lt-security-action-btn"
            >
              <Trash2 size={16} />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sección 2: Métodos de Verificación */}
      <section className="lt-security-section fade-in">
        <div className="lt-section-header">
          <UserCheck size={24} />
          <h2 className="lt-section-title">Métodos de Verificación</h2>
        </div>

        <div className="lt-account-card lt-security-card">
          <div className="lt-security-item">
            <div className="lt-security-item-info">
              <div className="lt-security-item-icon">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="lt-security-item-title">
                  Verificación en Dos Pasos (2FA)
                </h3>
                <p className="lt-security-item-description">
                  Añadí una capa extra de seguridad al iniciar sesión
                </p>
                <span
                  className={`lt-security-status ${
                    is2FAEnabled ? "lt-status-active" : "lt-status-inactive"
                  }`}
                >
                  {is2FAEnabled ? (
                    <>
                      <CheckCircle size={14} /> Activado
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Desactivado
                    </>
                  )}
                </span>
              </div>
            </div>
            <label className="lt-toggle-switch">
              <input
                type="checkbox"
                checked={is2FAEnabled}
                onChange={handleToggle2FA}
              />
              <span className="lt-toggle-slider"></span>
            </label>
          </div>

          <div className="lt-security-item">
            <div className="lt-security-item-info">
              <div className="lt-security-item-icon">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="lt-security-item-title">
                  Verificación por Email
                </h3>
                <p className="lt-security-item-description">
                  Asegurate de que tu correo esté verificado
                </p>
                <span className="lt-security-status lt-status-active">
                  <CheckCircle size={14} /> Verificado
                </span>
              </div>
            </div>
            <button
              onClick={handleResendEmail}
              className="lt-button-variant2 lt-security-action-btn"
            >
              Reenviar
            </button>
          </div>
        </div>
      </section>

      {/* Sección 3: Dispositivos Vinculados */}
      <section className="lt-security-section fade-in">
        <div className="lt-section-header">
          <Smartphone size={24} />
          <h2 className="lt-section-title">Dispositivos Vinculados</h2>
        </div>

        <div className="lt-devices-grid">
          {MOCK_DEVICES.map((device) => (
            <div key={device.id} className="lt-account-card lt-device-card">
              <div className="lt-device-header">
                <Smartphone size={24} className="lt-device-icon" />
                {device.current && (
                  <span className="lt-device-badge">Dispositivo Actual</span>
                )}
              </div>
              <h3 className="lt-device-name">{device.name}</h3>
              <div className="lt-device-info">
                <p className="lt-device-location">{device.location}</p>
                <p className="lt-device-login">{device.lastLogin}</p>
              </div>
              {!device.current && (
                <button
                  onClick={() => handleLogoutDevice(device.id, device.name)}
                  className="lt-button-danger lt-device-logout-btn"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sección 4: Alertas de Seguridad */}
      <section className="lt-security-section fade-in">
        <div className="lt-section-header">
          <Bell size={24} />
          <h2 className="lt-section-title">Alertas Recientes</h2>
        </div>

        <div className="lt-alerts-list">
          {MOCK_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className={`lt-alert-card ${
                alert.status === "success"
                  ? "lt-alert-success"
                  : "lt-alert-warning"
              }`}
            >
              <div className="lt-alert-icon">
                {alert.status === "success" ? (
                  <CheckCircle size={24} />
                ) : (
                  <AlertTriangle size={24} />
                )}
              </div>
              <div className="lt-alert-content">
                <p className="lt-alert-message">{alert.message}</p>
                <p className="lt-alert-date">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 5: Privacidad y Datos */}
      <section className="lt-security-section fade-in">
        <div className="lt-section-header">
          <Shield size={24} />
          <h2 className="lt-section-title">Privacidad y Datos</h2>
        </div>

        <div className="lt-account-card lt-security-card">
          <div className="lt-security-item">
            <div className="lt-security-item-info">
              <div className="lt-security-item-icon">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="lt-security-item-title">
                  Permisos de Ubicación
                </h3>
                <p className="lt-security-item-description">
                  Permitir el uso de tu ubicación para detectar logins
                  sospechosos
                </p>
                <span
                  className={`lt-security-status ${
                    locationAllowed ? "lt-status-active" : "lt-status-inactive"
                  }`}
                >
                  {locationAllowed ? (
                    <>
                      <CheckCircle size={14} /> Permitido
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Denegado
                    </>
                  )}
                </span>
              </div>
            </div>
            <label className="lt-toggle-switch">
              <input
                type="checkbox"
                checked={locationAllowed}
                onChange={handleToggleLocation}
              />
              <span className="lt-toggle-slider"></span>
            </label>
          </div>
        </div>
      </section>

      {/* Modales */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onConfirm={handleChangePassword}
        />
      )}
      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  );
};

export default LTSecurity;
