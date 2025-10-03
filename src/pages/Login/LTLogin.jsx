import React, { useState, useEffect } from "react";
import { useAuthModal } from "../../context/AuthModalContext";
import { authenticateUser } from "../../mocks/users";
import { setCurrentUser } from "../../common/authStorage";
import "./LTLogin.css";

// Importar iconos SVG locales
import eyeIcon from "../../assets/icons/svg/eye-svgrepo-com.svg";
import checkIcon from "../../assets/icons/svg/circle-check-svgrepo-com.svg";
import xmarkIcon from "../../assets/icons/svg/xmark-svgrepo-com.svg";
import closeIcon from "../../assets/icons/svg/xmark-svgrepo-com.svg";

// SVG Components para redes sociales
const GoogleIcon = () => (
  <svg
    className="LTLoginSocialButton__icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="currentColor"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="currentColor"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="currentColor"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="currentColor"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    className="LTLoginSocialButton__icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Botón para inicio de sesión social (Google/Facebook)
 */
const LTLoginSocialButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="lt-button-light LTLoginSocialButton"
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

/**
 * Componente principal del formulario de Login como Modal
 */
const LTLogin = () => {
  const { isOpen, closeModal, switchToRegister } = useAuthModal();
  const [identifier, setIdentifier] = useState(""); // Email o Username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeModal]);

  const isValidInput = identifier.length > 0 && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidInput || loading || loginSuccess) return;

    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const user = authenticateUser(identifier.trim(), password);

    if (user) {
      setLoginSuccess(true);
      const { password: _password, ...safeUser } = user;
      setCurrentUser(safeUser);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLoading(false);
      closeModal();
      window.location.reload();
    } else {
      setError(
        "Credenciales inválidas. Por favor, verificá tu e-mail/usuario y contraseña."
      );
      setLoading(false);
    }
  };

  // Función para los botones de toggle de contraseña
  const handleTogglePassword = (e, shouldShow) => {
    e.preventDefault();
    setShowPassword(shouldShow);
  };

  if (!isOpen) return null;

  if (loginSuccess) {
    // Vista de Éxito de Login
    return (
      <div className="LTLoginModal" onClick={closeModal}>
        <div
          className="LTLoginModalContent"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="LTLoginCard">
            <div className="LTLoginSuccess">
              <img
                src={checkIcon}
                alt="Éxito"
                className="LTLoginSuccess__icon"
              />
              <h3 className="LTLoginSuccess__title">
                ¡Inicio de Sesión Exitoso!
              </h3>
              <p className="LTLoginSuccess__text">
                Redirigiendo a tu panel de control...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vista principal del formulario
  return (
    <div className="LTLoginModal" onClick={closeModal}>
      <div className="LTLoginModalContent" onClick={(e) => e.stopPropagation()}>
        <button
          className="LTLoginModalClose"
          onClick={closeModal}
          aria-label="Cerrar modal"
        >
          <img src={closeIcon} alt="Cerrar" />
        </button>
        <div className="LTLoginCard">
          <h1 className="LTLoginCard__title">Bienvenido/a</h1>
          <p className="LTLoginCard__subtitle">Iniciá sesión para continuar</p>

          {/* Botones de Inicio de Sesión Social */}
          <div className="LTLoginSocial">
            <LTLoginSocialButton
              icon={<GoogleIcon />}
              label="Continuar con Google"
              onClick={() =>
                console.log("Simulación: Iniciar sesión con Google")
              }
            />
            <LTLoginSocialButton
              icon={<FacebookIcon />}
              label="Continuar con Facebook"
              onClick={() =>
                console.log("Simulación: Iniciar sesión con Facebook")
              }
            />
          </div>

          <div className="LTLoginDivider">
            <span className="LTLoginDivider__text">o ingresá manualmente</span>
          </div>

          <form onSubmit={handleSubmit} className="LTLoginForm">
            {/* Input E-mail o Usuario */}
            <div className="LTLoginFormGroup">
              <label className="LTLoginFormGroup__label">
                E-mail o Usuario
              </label>
              <div className="LTLoginFormGroup__inputWrapper">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    setError("");
                  }}
                  className={`LTLoginFormGroup__input ${
                    error ? "LTLoginFormGroup__input--error" : ""
                  }`}
                  placeholder="Ingresá tu e-mail o nombre de usuario"
                  required
                  autoFocus
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div className="LTLoginFormGroup">
              <label className="LTLoginFormGroup__label">Contraseña</label>
              <div className="LTLoginFormGroup__inputWrapper LTLoginFormGroup__inputWrapper--password">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className={`LTLoginFormGroup__input ${
                    error ? "LTLoginFormGroup__input--error" : ""
                  }`}
                  placeholder="Ingresá tu contraseña"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="LTLoginFormGroup__togglePassword"
                  onMouseDown={(e) => handleTogglePassword(e, true)}
                  onMouseUp={(e) => handleTogglePassword(e, false)}
                  onMouseLeave={(e) => handleTogglePassword(e, false)}
                  onTouchStart={(e) => handleTogglePassword(e, true)}
                  onTouchEnd={(e) => handleTogglePassword(e, false)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  <img
                    src={eyeIcon}
                    alt={showPassword ? "Ocultar" : "Mostrar"}
                    className="LTLoginFormGroup__toggleIcon"
                  />
                </button>
              </div>
            </div>

            {/* Mensaje de Error */}
            <div className="LTLoginFormError">
              {error && (
                <p className="LTLoginFormError__text">
                  <img
                    src={xmarkIcon}
                    alt="Error"
                    className="LTLoginFormError__icon"
                  />
                  {error}
                </p>
              )}
            </div>

            {/* Botón de Inicio de Sesión */}
            <button
              type="submit"
              className="lt-button-variant2 LTLoginFormSubmit"
              disabled={!isValidInput || loading}
            >
              {loading ? (
                <div className="LTLoginFormSubmit__spinner" />
              ) : (
                "Iniciar Sesión"
              )}
            </button>

            {/* Enlaces Adicionales */}
            <div className="LTLoginFormLinks">
              <a
                href="#forgot-password"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(
                    "Simulación: Redirigiendo a Olvidaste Contraseña"
                  );
                }}
                className="LTLoginFormLinks__link LTLoginFormLinks__link--primary"
              >
                ¿Olvidaste tu contraseña?
              </a>
              <p className="LTLoginFormLinks__text">
                ¿No tenés cuenta?
                <a
                  href="#signup"
                  onClick={(e) => {
                    e.preventDefault();
                    switchToRegister();
                  }}
                  className="LTLoginFormLinks__link LTLoginFormLinks__link--accent"
                >
                  Crear Cuenta
                </a>
              </p>
              <a
                href="#help"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Simulación: Redirigiendo a Necesito Ayuda");
                }}
                className="LTLoginFormLinks__link LTLoginFormLinks__link--muted"
              >
                Necesito Ayuda
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LTLogin;
