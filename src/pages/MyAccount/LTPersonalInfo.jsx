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
  X,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import { getCurrentUser } from "../../utils/authStorage";
import { getInitials } from "../../mocks/users";
import "./LTPersonalInfo.css";

const LTPersonalInfo = () => {
  const navigate = useNavigate();

  // --- HOOKS (siempre al tope y en el mismo orden) ---
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileImage, setProfileImage] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);

  const [editingField, setEditingField] = useState(null);
  const [editForm, setEditForm] = useState({
    email: "",
    phone: "",
    username: "",
    fullName: "",
    aboutMe: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const [userAddresses, setUserAddresses] = useState([]);
  const [userPaymentMethods, setUserPaymentMethods] = useState([]);

  // Cargar usuario al montar
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user || null);
    setLoading(false);
  }, []);

  // Redirigir si terminó de cargar y no hay user
  useEffect(() => {
    if (!loading && (!currentUser || !currentUser.id)) {
      navigate("/login", { replace: true });
    }
  }, [loading, currentUser, navigate]);

  // Cargar data dependiente del user (direcciones, pagos, imagen)
  useEffect(() => {
    if (!currentUser?.id) return;

    const savedAddresses = JSON.parse(
      localStorage.getItem(`addresses_${currentUser.id}`) || "[]"
    );
    const savedPayments = JSON.parse(
      localStorage.getItem(`payments_${currentUser.id}`) || "[]"
    );
    setUserAddresses(savedAddresses);
    setUserPaymentMethods(savedPayments);

    const savedImage =
      localStorage.getItem(`profile_image_${currentUser.id}`) ||
      currentUser.profileImage ||
      null;
    setProfileImage(savedImage);
  }, [currentUser?.id]); // solo depende del id

  // --- Early returns (después de declarar hooks) ---
  if (loading) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Cargando…</p>
      </div>
    );
  }
  if (!currentUser || !currentUser.id) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  const userInitials = getInitials(currentUser.fullName || "Usuario");

  const userInfo = {
    fullName: currentUser.fullName || "Usuario",
    email: currentUser.email || "usuario@ejemplo.com",
    phone: currentUser.phone || "+54 9 11 1234-5678",
    username: currentUser.username || "usuario123",
    aboutMe: currentUser.aboutMe || "",
    taxStatus: "Consumidor Final",
    addressCount: userAddresses.length,
    paymentMethodsCount: userPaymentMethods.length,
    lastPasswordChange: "3 meses",
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImageLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setProfileImage(result);
      setIsImageLoading(false);
      localStorage.setItem(`profile_image_${currentUser.id}`, result);
    };
    reader.readAsDataURL(file);
  };

  const handleUrlUpload = () => {
    if (!imageUrl) return;
    setIsImageLoading(true);
    const img = new Image();
    img.onload = () => {
      setProfileImage(imageUrl);
      setIsImageLoading(false);
      localStorage.setItem(`profile_image_${currentUser.id}`, imageUrl);
      setImageUrl("");
      setShowUrlInput(false);
    };
    img.onerror = () => {
      setIsImageLoading(false);
      alert("No se pudo cargar la imagen. Verifica la URL.");
    };
    img.src = imageUrl;
  };

  const handleEditClick = (field) => {
    setEditingField(field);
    setEditForm((prev) => ({
      ...prev,
      [field]: userInfo[field],
    }));
    setCurrentPassword("");
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setCurrentPassword("");
    setShowPassword(false);
  };

  const handleSaveEdit = () => {
    if (!currentPassword) {
      alert(
        "Por favor, ingresa tu contraseña actual para confirmar los cambios."
      );
      return;
    }
    if (currentPassword !== currentUser?.password) {
      alert("Contraseña incorrecta.");
      return;
    }

    const updatedUser = {
      ...currentUser,
      [editingField]: editForm[editingField],
    };

    // Persistir y reflejar en estado (sin recargar la página)
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setCurrentUser(updatedUser);

    alert("Cambios guardados exitosamente");
    handleCancelEdit();
  };

  return (
    <div className="LTPersonalInfoContainer">
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
        <h1 className="LTPersonalInfoTitle">Información de tu perfil</h1>
        <p className="LTPersonalInfoSubtitle">
          Podés agregar, modificar o corregir tu información personal y los
          datos de la cuenta.
        </p>
      </header>

      {/* Foto de perfil */}
      <div className="lt-account-card">
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
            <div className="LTPersonalInfoPhotoOverlay">
              <Camera size={20} />
            </div>
            {isImageLoading && (
              <div className="LTPersonalInfoPhotoLoader">
                <div className="spinner"></div>
              </div>
            )}
          </div>

          <div className="LTPersonalInfoPhotoContent">
            <h3 className="LTPersonalInfoPhotoTitle">Cambiar foto de perfil</h3>
            <p className="LTPersonalInfoPhotoText">
              Usa una imagen clara para identificarte.
            </p>
            <div className="LTPersonalInfoPhotoActions">
              <button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="lt-button-light"
                disabled={isImageLoading}
              >
                <Upload size={16} />
                <span>Subir Archivo</span>
              </button>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                className="LTPersonalInfoFileInput"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => setShowUrlInput((v) => !v)}
                className="lt-button-light"
                disabled={isImageLoading}
              >
                <LinkIcon size={16} />
                <span>Usar URL</span>
              </button>
            </div>

            {showUrlInput && (
              <div className="LTPersonalInfoUrlInput slide-down">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Pega la URL de la imagen aquí"
                  className="LTPersonalInfoInput"
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
        </div>
      </div>

      {/* Datos de la cuenta (sin card anidada) */}
      <div className="lt-account-card">
        <h3 className="lt-account-cardTitle">Datos de la cuenta</h3>

        {/* Email */}
        <div className="LTPersonalInfoItem">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <Mail size={20} className="LTPersonalInfoItemIcon" />
              E-mail
            </div>
            {editingField === "email" ? (
              <div className="LTPersonalInfoEditForm slide-down">
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="LTPersonalInfoFormInput"
                  placeholder="Nuevo e-mail"
                />
                <div className="LTPersonalInfoPasswordConfirm">
                  <div className="LTPersonalInfoPasswordField">
                    <Lock size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="LTPersonalInfoFormInput"
                      placeholder="Contraseña actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="LTPersonalInfoPasswordToggle"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="LTPersonalInfoFormActions">
                  <button
                    onClick={handleCancelEdit}
                    className="lt-button-light"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="lt-button-variant2"
                  >
                    <Save size={16} /> Guardar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="LTPersonalInfoItemValue">{userInfo.email}</div>
                <div className="LTPersonalInfoItemHelper">
                  E-mail donde recibís comunicaciones.
                </div>
              </>
            )}
          </div>
          {editingField !== "email" && (
            <div className="LTPersonalInfoItemActions">
              <CheckCircle size={20} className="LTPersonalInfoItemCheck" />
              <button
                onClick={() => handleEditClick("email")}
                className="LTPersonalInfoEditButton"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Teléfono */}
        <div className="LTPersonalInfoItem">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <Phone size={20} className="LTPersonalInfoItemIcon" />
              Teléfono
            </div>
            {editingField === "phone" ? (
              <div className="LTPersonalInfoEditForm slide-down">
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                  className="LTPersonalInfoFormInput"
                  placeholder="Nuevo teléfono"
                />
                <div className="LTPersonalInfoPasswordConfirm">
                  <div className="LTPersonalInfoPasswordField">
                    <Lock size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="LTPersonalInfoFormInput"
                      placeholder="Contraseña actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="LTPersonalInfoPasswordToggle"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="LTPersonalInfoFormActions">
                  <button
                    onClick={handleCancelEdit}
                    className="lt-button-light"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="lt-button-variant2"
                  >
                    <Save size={16} /> Guardar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="LTPersonalInfoItemValue">{userInfo.phone}</div>
                <div className="LTPersonalInfoItemHelper">
                  Número donde recibís códigos de verificación.
                </div>
              </>
            )}
          </div>
          {editingField !== "phone" && (
            <div className="LTPersonalInfoItemActions">
              <CheckCircle size={20} className="LTPersonalInfoItemCheck" />
              <button
                onClick={() => handleEditClick("phone")}
                className="LTPersonalInfoEditButton"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Nombre de usuario */}
        <div className="LTPersonalInfoItem">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <UserCheck size={20} className="LTPersonalInfoItemIcon" />
              Nombre de usuario
            </div>
            {editingField === "username" ? (
              <div className="LTPersonalInfoEditForm slide-down">
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="LTPersonalInfoFormInput"
                  placeholder="Nuevo nombre de usuario"
                />
                <div className="LTPersonalInfoPasswordConfirm">
                  <div className="LTPersonalInfoPasswordField">
                    <Lock size={16} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="LTPersonalInfoFormInput"
                      placeholder="Contraseña actual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="LTPersonalInfoPasswordToggle"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="LTPersonalInfoFormActions">
                  <button
                    onClick={handleCancelEdit}
                    className="lt-button-light"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="lt-button-variant2"
                  >
                    <Save size={16} /> Guardar
                  </button>
                </div>
              </div>
            ) : (
              <div className="LTPersonalInfoItemValue">{userInfo.username}</div>
            )}
          </div>
          {editingField !== "username" && (
            <div className="LTPersonalInfoItemActions">
              <button
                onClick={() => handleEditClick("username")}
                className="LTPersonalInfoEditButton"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Información personal */}
      <div className="lt-account-card">
        <h3 className="lt-account-cardTitle">Información personal</h3>

        <div className="LTPersonalInfoItem">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <User size={20} className="LTPersonalInfoItemIcon" />
              Nombre y apellido
            </div>
            <div className="LTPersonalInfoItemValue">{userInfo.fullName}</div>
          </div>
          <div className="LTPersonalInfoItemActions">
            <CheckCircle size={20} className="LTPersonalInfoItemCheck" />
            <button
              onClick={() => handleEditClick("fullName")}
              className="LTPersonalInfoEditButton"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="LTPersonalInfoItem LTPersonalInfoItem--aboutMe">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <UserCheck size={20} className="LTPersonalInfoItemIcon" />
              Sobre mí
            </div>
            {editingField === "aboutMe" ? (
              <div className="LTPersonalInfoEditForm slide-down">
                <textarea
                  value={editForm.aboutMe}
                  onChange={(e) =>
                    setEditForm({ ...editForm, aboutMe: e.target.value })
                  }
                  className="LTPersonalInfoFormInput LTPersonalInfoTextarea"
                  placeholder="Contanos un poco sobre vos..."
                  rows="4"
                />
                <div className="LTPersonalInfoFormActions">
                  <button
                    onClick={handleCancelEdit}
                    className="lt-button-light"
                  >
                    <X size={16} /> Cancelar
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="lt-button-variant2"
                  >
                    <Save size={16} /> Guardar
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="LTPersonalInfoItemValue">
                  {userInfo.aboutMe || "Aún no agregaste una descripción"}
                </div>
                <div className="LTPersonalInfoItemHelper">
                  Agregá una breve descripción sobre vos.
                </div>
              </>
            )}
          </div>
          {editingField !== "aboutMe" && (
            <div className="LTPersonalInfoItemActions">
              <button
                onClick={() => handleEditClick("aboutMe")}
                className="LTPersonalInfoEditButton"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Seguridad */}
      <div className="lt-account-card">
        <h3 className="lt-account-cardTitle">Seguridad</h3>
        <div className="LTPersonalInfoItem">
          <div className="LTPersonalInfoItemContent">
            <div className="LTPersonalInfoItemLabel">
              <Lock size={20} className="LTPersonalInfoItemIcon" />
              Contraseña
            </div>
            <div className="LTPersonalInfoItemValue">
              Último cambio hace {userInfo.lastPasswordChange}
            </div>
            <div className="LTPersonalInfoItemHelper">
              Mantené tu cuenta segura actualizando tu contraseña regularmente.
            </div>
          </div>
          <div className="LTPersonalInfoItemActions">
            <button className="LTPersonalInfoEditButton">
              <ChevronRight size={20} />
            </button>
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
        <h3 className="lt-account-cardTitle">Medios de pago</h3>
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
            <div className="LTPersonalInfoItemValue">{userInfo.taxStatus}</div>
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
          Tu información personal está siempre protegida. Si tenés dudas, podés
          consultar{" "}
          <a href="#" className="LTPersonalInfoSecurityLink">
            cómo cuidamos tus datos
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LTPersonalInfo;
