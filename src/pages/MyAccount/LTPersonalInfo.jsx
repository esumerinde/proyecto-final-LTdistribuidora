import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  ChevronRight,
  Camera,
  Upload,
  Link as LinkIcon,
  MapPin,
  Lock,
  CreditCard,
  ShieldCheck,
  FileText,
  UserCheck,
  Edit,
} from "lucide-react";
import { getCurrentUser } from "../../utils/authStorage";
import { getInitials } from "../../mocks/users";
import "./LTPersonalInfo.css";

const LTPersonalInfo = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileImage, setProfileImage] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Modal (datos) + Modal (foto)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); // 'personal' | 'account'
  const [modalPasswordConfirm, setModalPasswordConfirm] = useState("");
  const [photoModalOpen, setPhotoModalOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    // personal
    fullName: "",
    firstName: "",
    lastName: "",
    aboutMe: "",
    // account
    username: "",
    phone: "",
    email: "",
    newPassword: "",
  });

  // --- EFFECTS ---
  // Cargar usuario
  useEffect(() => {
    const u = getCurrentUser() || null;
    setCurrentUser(u);
    // foto guardada si existe
    const savedImage =
      (u?.id && localStorage.getItem(`profile_image_${u.id}`)) || null;
    if (savedImage) setProfileImage(savedImage);
    setLoading(false);
  }, []);

  // Redirigir si no hay user
  useEffect(() => {
    if (!loading && (!currentUser || !currentUser.id)) {
      navigate("/login");
    }
  }, [loading, currentUser, navigate]);

  // --- HELPERS / HANDLERS ---
  const openModal = (target) => {
    setModalTarget(target);
    if (currentUser) {
      setEditForm((prev) => ({
        ...prev,
        firstName: (currentUser.fullName || "").split(" ")[0] || "",
        lastName:
          (currentUser.fullName || "").split(" ").slice(1).join(" ") || "",
        aboutMe: currentUser.aboutMe || "",
        username: currentUser.username || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
        newPassword: "",
      }));
    }
    setModalPasswordConfirm("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalTarget(null);
  };

  const openPhotoModal = () => {
    setShowUrlInput(false);
    setImageUrl("");
    setPhotoModalOpen(true);
  };

  const closePhotoModal = () => setPhotoModalOpen(false);

  // Subida de imagen (archivo)
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setIsImageLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setProfileImage(data);
      if (currentUser?.id) {
        localStorage.setItem(`profile_image_${currentUser.id}`, data);
      }
      setIsImageLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Subida de imagen (URL)
  const handleUrlUpload = () => {
    if (!imageUrl) return;
    setIsImageLoading(true);
    const img = new Image();
    img.onload = () => {
      setProfileImage(imageUrl);
      if (currentUser?.id) {
        localStorage.setItem(`profile_image_${currentUser.id}`, imageUrl);
      }
      setIsImageLoading(false);
      setShowUrlInput(false);
      setImageUrl("");
    };
    img.onerror = () => {
      setIsImageLoading(false);
      alert("No se pudo cargar la imagen. Verificá la URL.");
    };
    img.src = imageUrl;
  };

  const validEmail = (v) => /\S+@\S+\.\S+/.test(v);

  const handleSubmitModal = (e) => {
    e.preventDefault();

    if (!currentUser) return;

    if (modalTarget === "account") {
      if (!validEmail(editForm.email)) {
        alert("Ingresá un e-mail válido.");
        return;
      }
      if (!modalPasswordConfirm) {
        alert("Ingresá tu contraseña actual para confirmar.");
        return;
      }
      if (
        currentUser.password &&
        modalPasswordConfirm !== currentUser.password
      ) {
        alert("Contraseña actual incorrecta.");
        return;
      }
    }

    const updated = { ...currentUser };

    if (modalTarget === "personal") {
      const first = (editForm.firstName || "").trim();
      const last = (editForm.lastName || "").trim();
      updated.fullName = `${first}${last ? " " + last : ""}`.trim();
      updated.aboutMe = (editForm.aboutMe || "").trim();
    }

    if (modalTarget === "account") {
      updated.username = (editForm.username || "").trim();
      updated.phone = (editForm.phone || "").trim();
      updated.email = (editForm.email || "").trim();
      if (editForm.newPassword?.length >= 6) {
        updated.password = editForm.newPassword; // (en backend: hash)
      }
    }

    localStorage.setItem("currentUser", JSON.stringify(updated));
    setCurrentUser(updated);
    closeModal();
    alert("Cambios guardados exitosamente.");
  };

  // --- DERIVADOS (después de tener state) ---
  const userInitials = getInitials(currentUser?.fullName || "US");

  const userInfo = {
    fullName: currentUser?.fullName || "",
    aboutMe: currentUser?.aboutMe || "",
    username: currentUser?.username || "",
    lastPasswordChange: "-", // si lo tenés en tu storage, reemplazalo aquí
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    addressCount: 0,
    paymentMethodsCount: 0,
    taxStatus: "-",
  };

  // --- EARLY UI ---
  if (loading) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Cargando…</p>
      </div>
    );
  }

  return (
    <div className="LTPersonalInfoContainer">
      <div className="LTPersonalInfoInner">
        {/* Breadcrumb */}
        <div className="LTPersonalInfoBreadcrumb">
          <span
            className="LTPersonalInfoBreadcrumbLink"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} />
          <span className="LTPersonalInfoBreadcrumbCurrent">
            Información personal
          </span>
        </div>

        {/* Header */}
        <header className="LTPersonalInfoHeaderSection">
          <h1 className="LTPersonalInfoTitle">Información personal</h1>
          <p className="LTPersonalInfoSubtitle">
            Podés agregar, modificar o corregir tu información personal y los
            datos de la cuenta.
          </p>
        </header>

        {/* Información personal */}
        <div className="lt-account-card">
          <div className="LTPersonalInfoCardHeader">
            <h3 className="lt-account-cardTitle">Información personal</h3>
            <button
              className="lt-edit-btn"
              onClick={() => openModal("personal")}
              aria-label="Editar información personal"
            >
              <Edit size={16} /> <span>Editar</span>
            </button>
          </div>

          <div className="LTPersonalInfoPhotoSection">
            <div className="LTPersonalInfoPhotoWrapper">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto de Perfil"
                  className="LTPersonalInfoPhoto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const placeholder = e.currentTarget.nextSibling;
                    if (placeholder) placeholder.style.display = "flex";
                  }}
                />
              ) : null}

              <div
                className="LTPersonalInfoPhotoPlaceholder"
                style={{ display: profileImage ? "none" : "flex" }}
              >
                {userInitials}
              </div>

              <div
                className="LTPersonalInfoPhotoOverlay"
                role="button"
                tabIndex={0}
                onClick={openPhotoModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openPhotoModal();
                }}
              >
                <Camera size={20} />
              </div>

              {isImageLoading && (
                <div className="LTPersonalInfoPhotoLoader">
                  <div className="spinner"></div>
                </div>
              )}
            </div>

            <div className="LTPersonalInfoPhotoContent">
              <h3 className="LTPersonalInfoPhotoTitle">
                Cambiar foto de perfil
              </h3>
              <p className="LTPersonalInfoPhotoText">
                Usa una imagen clara para identificarte.
              </p>
              <div className="LTPersonalInfoPhotoActions">
                <small>
                  Hacé click en el ícono de la cámara para cambiar tu foto de
                  perfil.
                </small>
              </div>
            </div>
          </div>

          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <User size={20} className="LTPersonalInfoItemIcon" />
                Nombre y apellido
              </div>
              <div className="LTPersonalInfoItemValue">{userInfo.fullName}</div>
            </div>
          </div>

          <div className="LTPersonalInfoItem LTPersonalInfoItem--aboutMe">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <UserCheck size={20} className="LTPersonalInfoItemIcon" />
                Sobre mí
              </div>
              <div className="LTPersonalInfoItemValue">
                {userInfo.aboutMe || "Aún no agregaste una descripción"}
              </div>
              <div className="LTPersonalInfoItemHelper">
                Agregá una breve descripción sobre vos.
              </div>
            </div>
          </div>
        </div>

        {/* Datos de cuenta */}
        <div className="lt-account-card">
          <div className="LTPersonalInfoCardHeader">
            <h3 className="lt-account-cardTitle">Datos de cuenta</h3>
            <button
              className="lt-edit-btn"
              onClick={() => openModal("account")}
              aria-label="Editar datos de cuenta"
            >
              <Edit size={16} /> <span>Editar</span>
            </button>
          </div>

          {/* Username */}
          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <UserCheck size={20} className="LTPersonalInfoItemIcon" />
                Nombre de usuario
              </div>
              <div className="LTPersonalInfoItemValue">{userInfo.username}</div>
            </div>
          </div>

          {/* Contraseña (solo info) */}
          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <Lock size={20} className="LTPersonalInfoItemIcon" />
                Contraseña
              </div>
              <div className="LTPersonalInfoItemValue">
                Último cambio: {userInfo.lastPasswordChange}
              </div>
              <div className="LTPersonalInfoItemHelper">
                Cambiá tu contraseña desde “Editar datos de cuenta”.
              </div>
            </div>
          </div>

          {/* E-mail */}
          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <Mail size={20} className="LTPersonalInfoItemIcon" />
                E-mail
              </div>
              <div className="LTPersonalInfoItemValue">{userInfo.email}</div>
              <div className="LTPersonalInfoItemHelper">
                E-mail donde recibís comunicaciones.
              </div>
            </div>
          </div>

          {/* Teléfono */}
          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <Phone size={20} className="LTPersonalInfoItemIcon" />
                Teléfono
              </div>
              <div className="LTPersonalInfoItemValue">{userInfo.phone}</div>
              <div className="LTPersonalInfoItemHelper">
                Número donde recibís códigos de verificación.
              </div>
            </div>
          </div>
        </div>

        {/* Direcciones */}
        <div className="lt-account-card">
          <h3 className="lt-account-cardTitle">Mis Direcciones</h3>
          {userInfo.addressCount > 0 ? (
            <div className="LTPersonalInfoItem">
              <div className="LTPersonalInfoItemContent">
                <div className="LTPersonalInfoItemLabel">
                  <MapPin size={20} className="LTPersonalInfoItemIcon" />
                  Direcciones guardadas
                </div>
                <div className="LTPersonalInfoItemValue">
                  {userInfo.addressCount}{" "}
                  {userInfo.addressCount === 1 ? "dirección" : "direcciones"}
                </div>
              </div>
              <div className="LTPersonalInfoItemActions">
                <button className="LTPersonalInfoEditButton">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="LTPersonalInfoEmpty">
              <MapPin size={32} className="LTPersonalInfoEmptyIcon" />
              <p className="LTPersonalInfoEmptyTitle">
                No tenés direcciones registradas
              </p>
              <p className="LTPersonalInfoEmptyText">
                Agregá una dirección para facilitar tus envíos
              </p>
              <button className="lt-button-variant2">
                <MapPin size={16} /> Agregar Dirección
              </button>
            </div>
          )}
        </div>

        {/* Medios de pago */}
        <div className="lt-account-card">
          <h3 className="lt-account-cardTitle">Mis Medios de pago</h3>
          {userInfo.paymentMethodsCount > 0 ? (
            <div className="LTPersonalInfoItem">
              <div className="LTPersonalInfoItemContent">
                <div className="LTPersonalInfoItemLabel">
                  <CreditCard size={20} className="LTPersonalInfoItemIcon" />
                  Tarjetas y cuentas
                </div>
                <div className="LTPersonalInfoItemValue">
                  {userInfo.paymentMethodsCount}{" "}
                  {userInfo.paymentMethodsCount === 1
                    ? "método de pago"
                    : "métodos de pago"}
                </div>
              </div>
              <div className="LTPersonalInfoItemActions">
                <button className="LTPersonalInfoEditButton">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="LTPersonalInfoEmpty">
              <CreditCard size={32} className="LTPersonalInfoEmptyIcon" />
              <p className="LTPersonalInfoEmptyTitle">
                No tenés medios de pago registrados
              </p>
              <p className="LTPersonalInfoEmptyText">
                Agregá una tarjeta o método de pago para realizar compras
              </p>
              <button className="lt-button-variant2">
                <CreditCard size={16} /> Agregar Método de Pago
              </button>
            </div>
          )}
        </div>

        {/* Datos fiscales */}
        <div className="lt-account-card">
          <h3 className="lt-account-cardTitle">Datos fiscales</h3>
          <div className="LTPersonalInfoItem">
            <div className="LTPersonalInfoItemContent">
              <div className="LTPersonalInfoItemLabel">
                <FileText size={20} className="LTPersonalInfoItemIcon" />
                Condición fiscal
              </div>
              <div className="LTPersonalInfoItemValue">
                {userInfo.taxStatus}
              </div>
            </div>
            <div className="LTPersonalInfoItemActions">
              <CheckCircle size={20} className="LTPersonalInfoItemCheck" />
              <button className="LTPersonalInfoEditButton">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Aviso de seguridad */}
        <div className="LTPersonalInfoSecurityNotice">
          <ShieldCheck size={18} className="LTPersonalInfoSecurityIcon" />
          <p>
            Tu información personal está siempre protegida. Si tenés dudas,
            podés consultar{" "}
            <a href="#" className="LTPersonalInfoSecurityLink">
              cómo cuidamos tus datos
            </a>
            .
          </p>
        </div>
      </div>

      {/* MODAL — forms modernos */}
      {modalOpen && (
        <div className="lt-modal-backdrop" onClick={closeModal}>
          <div
            className="lt-modal lt-modal--wide"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="lt-modal-title">
              {modalTarget === "personal"
                ? "Editar información personal"
                : "Editar datos de cuenta"}
            </h3>

            <form
              className="lt-modal-body lt-form-modern"
              onSubmit={handleSubmitModal}
            >
              {modalTarget === "personal" ? (
                <>
                  {/* Nombre */}
                  <div className="lt-field">
                    <input
                      className="lt-input"
                      type="text"
                      placeholder=" "
                      value={editForm.firstName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, firstName: e.target.value })
                      }
                      required
                    />
                    <label className="lt-label">Nombre</label>
                  </div>

                  {/* Apellido */}
                  <div className="lt-field">
                    <input
                      className="lt-input"
                      type="text"
                      placeholder=" "
                      value={editForm.lastName}
                      onChange={(e) =>
                        setEditForm({ ...editForm, lastName: e.target.value })
                      }
                    />
                    <label className="lt-label">Apellido</label>
                    <small className="lt-help">Usá tu apellido real.</small>
                  </div>

                  {/* Sobre mí */}
                  <div className="lt-field lt-field--full">
                    <textarea
                      className="lt-input lt-textarea"
                      rows={5}
                      placeholder=" "
                      maxLength={280}
                      value={editForm.aboutMe}
                      onChange={(e) =>
                        setEditForm({ ...editForm, aboutMe: e.target.value })
                      }
                    />
                    <label className="lt-label">Sobre mí</label>
                    <small className="lt-help">Máx. 280 caracteres.</small>
                  </div>
                </>
              ) : (
                <>
                  {/* 2 columnas en desktop, cómodas */}
                  <div className="lt-grid-2 lt-grid-comfy">
                    {/* Usuario */}
                    <div className="lt-field">
                      <input
                        className="lt-input"
                        type="text"
                        placeholder=" "
                        value={editForm.username}
                        onChange={(e) =>
                          setEditForm({ ...editForm, username: e.target.value })
                        }
                        required
                      />
                      <label className="lt-label">Nombre de usuario</label>
                      <small className="lt-help">Debe ser único.</small>
                    </div>

                    {/* Teléfono */}
                    <div className="lt-field">
                      <input
                        className="lt-input"
                        type="text"
                        placeholder=" "
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                      />
                      <label className="lt-label">Teléfono</label>
                      <small className="lt-help">Ej.: +54 9 …</small>
                    </div>

                    {/* Email */}
                    <div className="lt-field">
                      <input
                        className="lt-input"
                        type="email"
                        placeholder=" "
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        required
                      />
                      <label className="lt-label">E-mail</label>
                      <small className="lt-help">Donde recibís avisos.</small>
                    </div>

                    {/* Password nueva (opcional) */}
                    <div className="lt-field">
                      <input
                        className="lt-input"
                        type="password"
                        placeholder=" "
                        value={editForm.newPassword}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            newPassword: e.target.value,
                          })
                        }
                        minLength={6}
                      />
                      <label className="lt-label">
                        Contraseña nueva (opcional)
                      </label>
                      <small className="lt-help">Mínimo 6 caracteres.</small>
                    </div>

                    {/* Actual - ocupa todo el ancho */}
                    <div className="lt-field lt-field--full">
                      <input
                        className="lt-input"
                        type="password"
                        placeholder=" "
                        value={modalPasswordConfirm}
                        onChange={(e) =>
                          setModalPasswordConfirm(e.target.value)
                        }
                        required
                      />
                      <label className="lt-label">
                        Contraseña actual (requerida)
                      </label>
                      <small className="lt-help">
                        Solo se usa para confirmar cambios.
                      </small>
                    </div>
                  </div>
                </>
              )}

              <div className="lt-modal-actions">
                <button
                  type="button"
                  className="lt-button-light"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="lt-button-variant2">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHOTO-MODAL (solo para cambiar foto) */}
      {photoModalOpen && (
        <div className="lt-modal-backdrop" onClick={closePhotoModal}>
          <div
            className="lt-modal lt-modal--wide"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="lt-modal-title">Cambiar foto de perfil</h3>
            <div className="lt-modal-body lt-form-modern">
              <div className="lt-field">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Preview"
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#b3b8e6,#747bbf)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {userInitials}
                  </div>
                )}
              </div>

              <div className="lt-field">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("file-upload-photo-modal")?.click()
                  }
                  className="lt-button-light"
                >
                  <Upload size={16} /> Subir archivo
                </button>
                <input
                  type="file"
                  id="file-upload-photo-modal"
                  accept="image/*"
                  className="LTPersonalInfoFileInput"
                  onChange={handleFileUpload}
                />
                <button
                  type="button"
                  onClick={() => setShowUrlInput((v) => !v)}
                  className="lt-button-light"
                >
                  <LinkIcon size={16} /> Usar URL
                </button>
              </div>

              {showUrlInput && (
                <div className="lt-field">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Pega la URL de la imagen aquí"
                    className="lt-input"
                  />
                  <button
                    onClick={handleUrlUpload}
                    className="lt-button-variant2"
                    disabled={!imageUrl || isImageLoading}
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>
            <div className="lt-modal-actions">
              <button className="lt-button-light" onClick={closePhotoModal}>
                Cancelar
              </button>
              <button className="lt-button-variant2" onClick={closePhotoModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LTPersonalInfo;
