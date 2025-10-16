import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  ChevronRight,
  Plus,
  Home,
  Briefcase,
  Pencil,
  Trash2,
  Bookmark,
  Search,
  User,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";
import { getCurrentUser } from "../../utils/authStorage";
import "./LTAddresses.css";

const LTAddresses = () => {
  const navigate = useNavigate();

  // 1) TODOS los hooks van arriba, sin returns antes.
  const [currentUser] = useState(() => getCurrentUser()); // lazy init
  const isLoggedIn = !!currentUser?.id;

  // Estados principales
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showError, setShowError] = useState(false);

  // Estado del formulario
  const [formData, setFormData] = useState({
    alias: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    zipCode: "",
    country: "AR",
    contactName: "",
    phone: "",
    isDefault: false,
  });

  // 2) Redirigir si no hay usuario (hacerlo en efecto, sin return condicional antes de los hooks)
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  // 3) Cargar direcciones guardadas cuando haya usuario
  useEffect(() => {
    if (isLoggedIn) {
      const saved = JSON.parse(
        localStorage.getItem(`addresses_${currentUser.id}`) || "[]"
      );
      setAddresses(saved);
    }
  }, [isLoggedIn, currentUser?.id]);

  // Handlers del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setFormData({
      alias: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      zipCode: "",
      country: "AR",
      contactName: "",
      phone: "",
      isDefault: addresses.length === 0, // Primera dirección es default
    });
    setShowForm(true);
    setShowError(false);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData(address);
    setShowForm(true);
    setShowError(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setShowError(false);
    setFormData({
      alias: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      zipCode: "",
      country: "AR",
      contactName: "",
      phone: "",
      isDefault: false,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "alias",
      "street",
      "number",
      "city",
      "zipCode",
      "country",
      "contactName",
      "phone",
    ];
    return requiredFields.every((field) =>
      String(formData[field] || "").trim()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setShowError(true);
      return;
    }

    let updatedAddresses;

    if (editingAddress) {
      // Editar dirección existente
      updatedAddresses = addresses.map((addr) =>
        addr.id === editingAddress.id ? { ...formData, id: addr.id } : addr
      );
    } else {
      // Agregar nueva dirección
      const newAddress = {
        ...formData,
        id: Date.now(),
      };
      updatedAddresses = [...addresses, newAddress];
    }

    // Si la nueva/editada es default, quitar default de las demás
    if (formData.isDefault) {
      const defaultId =
        editingAddress?.id ?? updatedAddresses[updatedAddresses.length - 1].id;
      updatedAddresses = updatedAddresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === defaultId,
      }));
    }

    // Guardar en localStorage
    localStorage.setItem(
      `addresses_${currentUser.id}`,
      JSON.stringify(updatedAddresses)
    );
    setAddresses(updatedAddresses);
    handleCancel();
  };

  const handleDelete = (addressId) => {
    if (window.confirm("¿Estás seguro de eliminar esta dirección?")) {
      const updated = addresses.filter((addr) => addr.id !== addressId);

      // Si la eliminada era default y quedan otras, marcar la primera como default
      const deletedWasDefault = addresses.find(
        (addr) => addr.id === addressId
      )?.isDefault;
      if (deletedWasDefault && updated.length > 0) {
        updated[0] = { ...updated[0], isDefault: true };
      }

      localStorage.setItem(
        `addresses_${currentUser.id}`,
        JSON.stringify(updated)
      );
      setAddresses(updated);
    }
  };

  const handleSetDefault = (addressId) => {
    const updated = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    localStorage.setItem(
      `addresses_${currentUser.id}`,
      JSON.stringify(updated)
    );
    setAddresses(updated);
  };

  const getAddressIcon = (alias) => {
    const lower = (alias || "").toLowerCase();
    if (lower.includes("casa") || lower.includes("hogar")) {
      return <Home className="LTAddressCardIcon" />;
    }
    if (
      lower.includes("oficina") ||
      lower.includes("trabajo") ||
      lower.includes("work")
    ) {
      return <Briefcase className="LTAddressCardIcon" />;
    }
    return <MapPin className="LTAddressCardIcon" />;
  };

  // --- RENDER ---
  // Fallback visible mientras redirige si no hay sesión (después de declarar TODOS los hooks)
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  // Vista vacía (sin direcciones)
  if (!showForm && addresses.length === 0) {
    return (
      <div className="LTAddressesContainer">
        {/* Breadcrumb */}
        <div className="LTAddressesBreadcrumb fade-in">
          <span
            className="LTAddressesBreadcrumbLink"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} />
          <span className="LTAddressesBreadcrumbCurrent">Mis direcciones</span>
        </div>

        {/* Header */}
        <header className="LTAddressesHeaderSection fade-in">
          <div>
            <h1 className="LTAddressesTitle">
              <MapPin className="LTAddressesTitleIcon" />
              Mis Direcciones
            </h1>
            <p className="LTAddressesSubtitle">
              Gestiona las direcciones de envío para tus compras
            </p>
          </div>
          <button onClick={handleAddNew} className="lt-button-dark">
            <Plus size={18} />
            Agregar Dirección
          </button>
        </header>

        {/* Empty State */}
        <div className="LTAddressesEmpty fade-in">
          <MapPin className="LTAddressesEmptyIcon" />
          <p className="LTAddressesEmptyTitle">
            No tienes direcciones guardadas
          </p>
          <p className="LTAddressesEmptyText">
            ¡Agrega tu primera dirección para agilizar todas tus compras!
          </p>
          <button onClick={handleAddNew} className="lt-button-variant2">
            <Plus size={18} />
            Añadir Dirección
          </button>
        </div>
      </div>
    );
  }

  // Vista de formulario
  if (showForm) {
    return (
      <div className="LTAddressesContainer">
        {/* Breadcrumb */}
        <div className="LTAddressesBreadcrumb fade-in">
          <span
            className="LTAddressesBreadcrumbLink"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} />
          <span className="LTAddressesBreadcrumbLink" onClick={handleCancel}>
            Mis direcciones
          </span>
          <ChevronRight size={14} />
          <span className="LTAddressesBreadcrumbCurrent">
            {editingAddress ? "Editar dirección" : "Nueva dirección"}
          </span>
        </div>

        {/* Form */}
        <div className="LTAddressesFormContainer fade-in">
          <h2 className="LTAddressesFormTitle">
            {editingAddress ? "Editar Dirección" : "Agregar Nueva Dirección"}
          </h2>

          <form onSubmit={handleSubmit} className="LTAddressesForm">
            {/* Sección Ubicación */}
            <div className="LTAddressesFormSection">
              <h3 className="LTAddressesFormSectionTitle">
                <MapPin size={20} className="LTAddressesFormSectionIcon" />
                Ubicación
              </h3>
              <p className="LTAddressesFormSectionDesc">
                Completa los datos de la dirección de envío
              </p>
            </div>

            {/* Campo de búsqueda simulado */}
            <div className="LTAddressesSearchGroup">
              <label className="LTAddressesFormLabel">
                Buscar dirección <span className="LTAddressesRequired">*</span>
              </label>
              <div className="LTAddressesMapSearch">
                <Search size={20} className="LTAddressesSearchIcon" />
                <input
                  type="text"
                  placeholder="Ej: Av. de Mayo 600, Buenos Aires"
                  className="LTAddressesMapInput"
                />
                <button type="button" className="LTAddressesValidateBtn">
                  Validar
                </button>
              </div>
            </div>

            {/* Calle y Número */}
            <div className="LTAddressesFormGrid">
              <div className="LTAddressesFormGridCol2">
                <label className="LTAddressesFormLabel">
                  Calle o Avenida <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
              <div>
                <label className="LTAddressesFormLabel">
                  Número <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
            </div>

            {/* Ciudad, CP, País */}
            <div className="LTAddressesFormGrid">
              <div>
                <label className="LTAddressesFormLabel">
                  Ciudad <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
              <div>
                <label className="LTAddressesFormLabel">
                  Código Postal <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
              <div>
                <label className="LTAddressesFormLabel">
                  País <span className="LTAddressesRequired">*</span>
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                >
                  <option value="">Seleccionar país</option>
                  <option value="AR">Argentina</option>
                  <option value="CL">Chile</option>
                  <option value="CO">Colombia</option>
                  <option value="MX">México</option>
                  <option value="ES">España</option>
                </select>
              </div>
            </div>

            {/* Sección Referencia y Contacto */}
            <div className="LTAddressesFormSection">
              <h3 className="LTAddressesFormSectionTitle">
                <User size={20} className="LTAddressesFormSectionIcon" />
                Referencia y Contacto
              </h3>
            </div>

            {/* Alias y Complemento */}
            <div className="LTAddressesFormGrid">
              <div>
                <label className="LTAddressesFormLabel">
                  Nombre de la Dirección{" "}
                  <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="alias"
                  value={formData.alias}
                  onChange={handleInputChange}
                  placeholder="Ej: Casa, Oficina"
                  className="lt-search-bar"
                  required
                />
              </div>
              <div>
                <label className="LTAddressesFormLabel">
                  Piso, Dpto., Casa (Opcional)
                </label>
                <input
                  type="text"
                  name="complement"
                  value={formData.complement}
                  onChange={handleInputChange}
                  placeholder="Ej: Piso 3, Dpto C"
                  className="lt-search-bar"
                />
              </div>
            </div>

            {/* Contacto y Teléfono */}
            <div className="LTAddressesFormGrid">
              <div>
                <label className="LTAddressesFormLabel">
                  Nombre de Contacto{" "}
                  <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
              <div>
                <label className="LTAddressesFormLabel">
                  Teléfono de Contacto{" "}
                  <span className="LTAddressesRequired">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="lt-search-bar"
                  required
                />
              </div>
            </div>

            {/* Checkbox default */}
            <div className="LTAddressesDefaultCheckbox">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="LTAddressesCheckbox"
              />
              <label htmlFor="isDefault" className="LTAddressesCheckboxLabel">
                Establecer como dirección predeterminada
              </label>
            </div>

            {/* Mensaje de error */}
            {showError && (
              <div className="LTAddressesError fade-in">
                <AlertTriangle size={16} />
                Por favor, complete todos los campos marcados con (*).
              </div>
            )}

            {/* Botones de acción */}
            <div className="LTAddressesFormActions">
              <button
                type="button"
                onClick={handleCancel}
                className="LTAddressesCancelBtn"
              >
                <X size={18} />
                Cancelar
              </button>
              <button type="submit" className="lt-button-variant2">
                <Save size={18} />
                Guardar Dirección
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Vista de lista con direcciones
  return (
    <div className="LTAddressesContainer">
      {/* Breadcrumb */}
      <div className="LTAddressesBreadcrumb fade-in">
        <span
          className="LTAddressesBreadcrumbLink"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="LTAddressesBreadcrumbCurrent">Mis direcciones</span>
      </div>

      {/* Header */}
      <header className="LTAddressesHeaderSection fade-in">
        <div>
          <h1 className="LTAddressesTitle">
            <MapPin className="LTAddressesTitleIcon" />
            Mis Direcciones
          </h1>
          <p className="LTAddressesSubtitle">
            Gestiona las direcciones de envío para tus compras
          </p>
        </div>
        <button onClick={handleAddNew} className="lt-button-dark">
          <Plus size={18} />
          Agregar Dirección
        </button>
      </header>

      {/* Lista de direcciones */}
      <div className="LTAddressesList">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`lt-account-card LTAddressCard fade-in ${
              address.isDefault ? "LTAddressCardDefault" : ""
            }`}
          >
            {/* Badge predeterminada */}
            {address.isDefault && (
              <div className="LTAddressBadge">
                <Bookmark size={14} className="LTAddressBadgeIcon" />
                PREDETERMINADA
              </div>
            )}

            {/* Header de la card */}
            <div className="LTAddressCardHeader">
              <h2 className="LTAddressCardTitle">{address.alias}</h2>
              {getAddressIcon(address.alias)}
            </div>

            {/* Información de la dirección */}
            <div className="LTAddressCardInfo">
              <p>
                <span className="LTAddressCardLabel">Dirección:</span>{" "}
                {address.street} {address.number}
                {address.complement && `, ${address.complement}`}
              </p>
              <p>
                <span className="LTAddressCardLabel">Ciudad/CP:</span>{" "}
                {address.city}, {address.zipCode} ({address.country})
              </p>
              <p>
                <span className="LTAddressCardLabel">Contacto:</span>{" "}
                {address.contactName} | {address.phone}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="LTAddressCardActions">
              <button
                onClick={() => handleEdit(address)}
                className="lt-button-card"
              >
                <Pencil size={14} />
                Editar
              </button>
              <button
                onClick={() => handleDelete(address.id)}
                className="lt-button-card LTAddressDeleteBtn"
              >
                <Trash2 size={14} />
                Eliminar
              </button>
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="lt-button-card LTAddressDefaultBtn"
                >
                  Establecer como Predeterminada
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LTAddresses;
