import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  User,
  Lock,
  CheckCircle,
  ChevronLeft,
  XCircle,
  Pencil,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuthModal } from "../../context/AuthModalContext";
import "./LTRegister.css";

// Hook para simular la demora del servidor (ej. verificar disponibilidad)
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Overlay de Confirmación con Spinner que se transforma en Check.
 */
const ConfirmationOverlay = ({ stepTitle, stepType, onAnimationComplete }) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [isCheckVisible, setIsCheckVisible] = useState(false);
  const [message, setMessage] = useState("Guardando y validando...");
  const [subMessage, setSubMessage] = useState("");

  const stepTypeToText = useMemo(() => {
    switch (stepType) {
      case "email":
        return "e-mail";
      case "username":
        return "nombre";
      case "password":
        return "contraseña";
      default:
        return "datos";
    }
  }, [stepType]);

  useEffect(() => {
    setSubMessage(
      `Estamos trabajando en validar tu ${stepTypeToText}, un momento por favor.`
    );

    const spinnerTimer = setTimeout(() => {
      setIsSpinning(false);
      setIsCheckVisible(true);
      setMessage(`${stepTitle} agregado/a`);
      setSubMessage("¡Validación exitosa!");

      const checkTimer = setTimeout(() => {
        onAnimationComplete();
      }, 1500);

      return () => clearTimeout(checkTimer);
    }, 2000);

    return () => clearTimeout(spinnerTimer);
  }, [onAnimationComplete, stepTitle, stepTypeToText]);

  return (
    <div className="confirmation-overlay text-center">
      {isSpinning ? (
        <div className="spinner-large"></div>
      ) : (
        <CheckCircle
          size={60}
          style={{
            color: "var(--lt-accent-color-variant2-dark)",
            marginBottom: "var(--lt-spacing-md)",
            opacity: isCheckVisible ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        />
      )}
      <h3
        style={{
          color: "var(--lt-black-text-color)",
          fontSize: "1.2rem",
          fontWeight: "var(--lt-font-weight-medium)",
          marginTop: "var(--lt-spacing-lg)",
        }}
      >
        {message}
      </h3>
      <p
        style={{
          color: "var(--lt-muted-text-color)",
          fontSize: "0.9rem",
          fontWeight: "var(--lt-font-weight-normal)",
          marginTop: "var(--lt-spacing-xs)",
        }}
      >
        {subMessage}
      </p>
    </div>
  );
};

/**
 * Vista de formulario para el Paso 1: Email.
 */
const EmailForm = ({
  initialEmail,
  onCompletionUpdate,
  onBack,
  onValidationRequired,
}) => {
  const [email, setEmail] = useState(initialEmail || "");
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormatValid = emailRegex.test(email);
  const isValid = isFormatValid && isAccepted;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormatValid) {
      setError(
        "Por favor, ingresá un formato de e-mail válido (ej. nombre@dominio.com)."
      );
      return;
    }
    if (!isAccepted) {
      setError("Debes aceptar los Términos y Condiciones para continuar.");
      return;
    }

    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email.toLowerCase() === "test@inuse.com") {
      setError("Este e-mail ya está registrado. Intenta iniciar sesión.");
      setLoading(false);
      return;
    }

    setLoading(false);
    onCompletionUpdate({ email });
    onValidationRequired();
  };

  return (
    <div
      className="fade-in-content"
      style={{ paddingTop: "var(--lt-spacing-lg)" }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          color: "var(--lt-black-text-color)",
          cursor: "pointer",
          padding: 0,
          marginBottom: "var(--lt-spacing-lg)",
        }}
        title="Volver a la lista de registro"
      >
        <ChevronLeft
          size={24}
          style={{ color: "var(--lt-muted-text-color)" }}
        />
      </button>

      <h2 className="form-title-ml">Ingresá tu e-mail</h2>
      <p className="form-subtitle-ml">Asegurate de tener acceso a él.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error && error.includes("formato")) setError("");
          }}
          className={`input-ml ${error ? "input-ml-error" : ""}`}
          placeholder=""
          required
          autoFocus
          autoComplete="email"
        />

        {error && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--lt-error-color)",
              marginBottom: "var(--lt-spacing-md)",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <XCircle size={14} />
            {error}
          </p>
        )}

        <div className="checkbox-container-ml">
          <input
            type="checkbox"
            id="terms"
            checked={isAccepted}
            onChange={(e) => setIsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms">
            Acepto los{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Términos y condiciones
            </a>{" "}
            y autorizo el uso de mis datos de acuerdo a la{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Declaración de privacidad
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="btn-ml-continue"
          disabled={!isValid || loading}
        >
          {loading ? <div className="spinner" /> : "Continuar"}
        </button>
      </form>
    </div>
  );
};

// Componente de Utilidad para los 6 inputs de código
const SixDigitCodeInput = ({ code, setCode, isError, disabled }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/[^0-9]/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode.join(""));

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!disabled) {
      inputsRef.current[0]?.focus();
    }
  }, [disabled]);

  return (
    <div className="code-input-container">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="tel"
            maxLength="1"
            value={code[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`code-input-ml ${isError ? "code-input-ml-error" : ""}`}
            autoComplete="off"
            inputMode="numeric"
            disabled={disabled}
            style={{
              borderBottom: code[index]
                ? `2px solid var(--lt-accent-color-dark)`
                : undefined,
            }}
          />
        ))}
    </div>
  );
};

/**
 * Vista de Validación de Email.
 */
const EmailValidationForm = ({
  email,
  onValidationSuccess,
  onBackToEmailForm,
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const MOCK_CODE = "123456";
  const isCodeValid = code.length === 6;

  useEffect(() => {
    if (isCodeSent && resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer, isCodeSent]);

  const handleSendCode = async () => {
    setLoading(true);
    setError("");
    setCode("");
    console.log(
      `Simulación: Enviando código a ${email}. Código de mock: ${MOCK_CODE}`
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsCodeSent(true);
    setResendTimer(90);
    setLoading(false);
  };

  const handleResend = () => {
    if (resendTimer === 0) {
      handleSendCode();
    }
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault();
    if (!isCodeValid || loading || !isCodeSent) return;

    setLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (code === MOCK_CODE) {
      setLoading(false);
      onValidationSuccess();
    } else {
      setLoading(false);
      setError(
        "Código inválido. Por favor, revisá tu bandeja de entrada o tocá Volver Atrás para cambiar el e-mail."
      );
    }
  };

  const renderSubtitle = () => {
    let text;
    if (isCodeSent) {
      text = (
        <>
          Ingresá el código de 6 dígitos que enviamos a&nbsp;
          <span
            style={{
              fontWeight: "var(--lt-font-weight-semibold)",
              color: "var(--lt-black-text-color)",
            }}
          >
            {email}
          </span>
        </>
      );
    } else {
      text =
        "Debés enviar un código de verificación a tu e-mail para poder continuar.";
    }

    return (
      <p
        className="form-subtitle-ml"
        style={{
          color: "var(--lt-muted-text-color)",
          marginBottom: "var(--lt-spacing-lg)",
        }}
      >
        {text}
      </p>
    );
  };

  return (
    <div
      className="fade-in-content"
      style={{ paddingTop: "var(--lt-spacing-lg)" }}
    >
      <button
        onClick={onBackToEmailForm}
        style={{
          background: "none",
          color: "var(--lt-black-text-color)",
          cursor: "pointer",
          padding: 0,
          marginBottom: "var(--lt-spacing-lg)",
        }}
        title="Volver a editar el email"
      >
        <ChevronLeft
          size={24}
          style={{ color: "var(--lt-muted-text-color)" }}
        />
      </button>

      <h2
        className="form-title-ml accent-color"
        style={{ fontWeight: "var(--lt-font-weight-bold)", fontSize: "1.8rem" }}
      >
        Validá tu e-mail
      </h2>

      {renderSubtitle()}

      <SixDigitCodeInput
        code={code}
        setCode={setCode}
        isError={!!error}
        disabled={!isCodeSent || loading}
      />

      <form onSubmit={handleConfirmCode}>
        <div className={`error-slide-down-wrapper ${error ? "show" : ""}`}>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--lt-error-color)",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "var(--lt-spacing-xs) 0",
            }}
          >
            <XCircle size={14} />
            {error}
          </p>
        </div>

        {/* Sección de enviar/reenviar código - entre los inputs y los botones */}
        <div
          style={{
            minHeight: isCodeSent ? "60px" : "90px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "var(--lt-spacing-lg)",
            marginBottom: "var(--lt-spacing-lg)",
          }}
        >
          {!isCodeSent ? (
            <button
              type="button"
              onClick={handleSendCode}
              className="btn-ml-send-code"
              disabled={loading}
              style={{
                backgroundColor: "var(--lt-accent-color-dark)",
                color: "var(--lt-white-text-color)",
                padding: "0.75rem 2rem",
                fontSize: "0.95rem",
                fontWeight: "var(--lt-font-weight-medium)",
              }}
            >
              {loading ? <div className="spinner" /> : "Enviar Código"}
            </button>
          ) : (
            <div style={{ textAlign: "center", width: "100%" }}>
              {resendTimer > 0 ? (
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--lt-muted-text-color)",
                    fontWeight: "var(--lt-font-weight-normal)",
                    margin: 0,
                  }}
                >
                  Reenviar código en {resendTimer}s
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className="btn-ml-send-code"
                  style={{
                    backgroundColor: "var(--lt-accent-color-dark)",
                    color: "var(--lt-white-text-color)",
                    padding: "0.75rem 2rem",
                    fontSize: "0.95rem",
                    fontWeight: "var(--lt-font-weight-medium)",
                  }}
                >
                  Reenviar Código
                </button>
              )}
            </div>
          )}
        </div>

        {/* Botones de acción */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--lt-spacing-md)",
          }}
        >
          <button
            type="submit"
            className="btn-ml-continue"
            disabled={!isCodeSent || !isCodeValid || loading}
            style={{
              backgroundColor:
                isCodeValid && isCodeSent && !loading
                  ? "var(--lt-accent-color-dark)"
                  : "var(--lt-gray-light)",
              color:
                isCodeValid && isCodeSent && !loading
                  ? "var(--lt-white-text-color)"
                  : "var(--lt-muted-text-color)",
              fontWeight: "var(--lt-font-weight-semibold)",
            }}
          >
            Confirmar Código
          </button>
          <button
            type="button"
            onClick={onBackToEmailForm}
            className="btn-ml-continue"
            disabled={loading}
            style={{
              backgroundColor: "transparent",
              color: "var(--lt-muted-text-color)",
              border: "1px solid var(--lt-accent-color)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Volver Atrás
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Vista de formulario para el Paso 2: Nombre de Usuario, Nombre y Apellido.
 */
const UsernameForm = ({
  initialName,
  initialLastname,
  initialUsername,
  onCompletionUpdate,
  onBack,
  onShowConfirmation,
}) => {
  const [name, setName] = useState(initialName || "");
  const [lastname, setLastname] = useState(initialLastname || "");
  const [username, setUsername] = useState(initialUsername || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const debouncedUsername = useDebounce(username, 500);

  const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

  const isNameValid = name.trim().length > 0;
  const isLastnameValid = lastname.trim().length > 0;

  const isUsernameFormatValid =
    username.length >= 4 && USERNAME_REGEX.test(username);
  const hasInvalidChars = username.length > 0 && !USERNAME_REGEX.test(username);

  const checkAvailability = useCallback(
    async (user) => {
      if (!user || user.length < 4 || hasInvalidChars) {
        setStatus("idle");
        return;
      }

      setStatus("checking");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (user.toLowerCase() === "admin") {
        setStatus("unavailable");
      } else {
        setStatus("available");
      }
    },
    [hasInvalidChars]
  );

  useEffect(() => {
    checkAvailability(debouncedUsername);
  }, [debouncedUsername, checkAvailability]);

  const isStepValid =
    isNameValid &&
    isLastnameValid &&
    isUsernameFormatValid &&
    status === "available";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStepValid) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onCompletionUpdate({ name, lastname, username });
        onShowConfirmation("Nombre", "username");
      }, 500);
    }
  };

  const getUsernameStatusMessage = () => {
    const baseStyle = {
      fontSize: "0.85rem",
      gap: "var(--lt-spacing-xs)",
      color: "var(--lt-muted-text-color)",
      height: "1.2rem",
    };

    if (status === "checking") {
      return (
        <div className="inline-flex-row" style={baseStyle}>
          <div className="spinner-inline" />
          Verificando disponibilidad...
        </div>
      );
    }

    if (hasInvalidChars) {
      return (
        <div
          className="inline-flex-row"
          style={{ ...baseStyle, color: "var(--lt-error-color)" }}
        >
          <XCircle size={14} />
          Solo se permiten letras, números, guiones (-) y guiones bajos (_). No
          puede ser un e-mail.
        </div>
      );
    }

    if (username.length > 0 && username.length < 4) {
      return (
        <div
          className="inline-flex-row"
          style={{ ...baseStyle, color: "var(--lt-error-color)" }}
        >
          <XCircle size={14} />
          Nombre de usuario: Mínimo 4 caracteres.
        </div>
      );
    }

    if (isUsernameFormatValid && status === "unavailable") {
      return (
        <div
          className="inline-flex-row"
          style={{ ...baseStyle, color: "var(--lt-error-color)" }}
        >
          <XCircle size={14} />
          ¡Ese nombre de usuario no está disponible!
        </div>
      );
    }
    if (isUsernameFormatValid && status === "available") {
      return (
        <div
          className="inline-flex-row"
          style={{
            ...baseStyle,
            color: "var(--lt-accent-color-variant2-dark)",
            fontWeight: "var(--lt-font-weight-medium)",
          }}
        >
          <CheckCircle size={14} />
          ¡Nombre de usuario disponible!
        </div>
      );
    }

    return (
      <div style={baseStyle}>
        Elegí un nombre único para tu perfil (mínimo 4 caracteres).
      </div>
    );
  };

  return (
    <div
      className="fade-in-content"
      style={{ paddingTop: "var(--lt-spacing-lg)" }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          color: "var(--lt-black-text-color)",
          cursor: "pointer",
          padding: 0,
          marginBottom: "var(--lt-spacing-lg)",
        }}
        title="Volver a la lista de registro"
      >
        <ChevronLeft
          size={24}
          style={{ color: "var(--lt-muted-text-color)" }}
        />
      </button>

      <h2 className="form-title-ml">Elegí tu nombre</h2>
      <p className="form-subtitle-ml">
        Se mostrará a las personas que interactúen con vos.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="input-grid-2-group">
          <div className="input-grid-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`input-ml ${
                !isNameValid && name.length > 0 ? "input-ml-error" : ""
              }`}
              placeholder="Nombre"
              required
              autoFocus
              autoComplete="given-name"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className={`input-ml ${
                !isLastnameValid && lastname.length > 0 ? "input-ml-error" : ""
              }`}
              placeholder="Apellido"
              required
              autoComplete="family-name"
            />
          </div>
          {(!isNameValid && name.length > 0) ||
          (!isLastnameValid && lastname.length > 0) ? (
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--lt-error-color)",
                marginTop: "5px",
              }}
            >
              Nombre y apellido son obligatorios.
            </p>
          ) : null}
        </div>

        <div style={{ marginBottom: "var(--lt-spacing-xs)" }}>
          <label
            style={{
              fontSize: "0.9rem",
              color: "var(--lt-muted-text-color)",
              display: "block",
            }}
          >
            Nombre de Usuario (único)
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`input-ml ${
              hasInvalidChars ||
              status === "unavailable" ||
              (username.length > 0 && !isUsernameFormatValid)
                ? "input-ml-error"
                : ""
            }`}
            placeholder=""
            required
            autoComplete="username"
            style={{ marginBottom: "var(--lt-spacing-sm)" }}
          />
        </div>

        <div style={{ marginBottom: "var(--lt-spacing-xl)" }}>
          {getUsernameStatusMessage()}
        </div>

        <button
          type="submit"
          className="btn-ml-continue"
          disabled={!isStepValid || loading}
        >
          {loading ? <div className="spinner" /> : "Continuar"}
        </button>
      </form>
    </div>
  );
};

/**
 * Vista de formulario para el Paso 3: Contraseña.
 */
const PasswordForm = ({ onCompletionUpdate, onBack, onShowConfirmation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = password === confirmPassword && password.length > 0;

  const validations = useMemo(
    () => ({
      minChars: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^a-zA-Z0-9\s]/.test(password),
    }),
    [password]
  );

  const isStepValid =
    validations.minChars &&
    validations.hasUpper &&
    validations.hasNumber &&
    validations.hasSpecialChar &&
    passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    onCompletionUpdate({ password });
    onShowConfirmation("Contraseña", "password");
  };

  const ValidationItem = ({ label, isValid }) => (
    <div
      className="inline-flex-row"
      style={{
        gap: "var(--lt-spacing-xs)",
        fontSize: "0.85rem",
        color: isValid
          ? "var(--lt-accent-color-variant2-dark)"
          : "var(--lt-muted-text-color)",
      }}
    >
      {isValid ? (
        <CheckCircle size={16} color="var(--lt-accent-color-variant2-dark)" />
      ) : (
        <XCircle size={16} />
      )}
      <span
        style={{
          fontWeight: isValid
            ? "var(--lt-font-weight-medium)"
            : "var(--lt-font-weight-normal)",
        }}
      >
        {label}
      </span>
    </div>
  );

  return (
    <div
      className="fade-in-content"
      style={{ paddingTop: "var(--lt-spacing-lg)" }}
    >
      <button
        onClick={onBack}
        style={{
          background: "none",
          color: "var(--lt-black-text-color)",
          cursor: "pointer",
          padding: 0,
          marginBottom: "var(--lt-spacing-lg)",
        }}
        title="Volver a la lista de registro"
      >
        <ChevronLeft
          size={24}
          style={{ color: "var(--lt-muted-text-color)" }}
        />
      </button>
      <h2 className="form-title-ml">Creá tu contraseña</h2>
      <p className="form-subtitle-ml">Mantené tu cuenta protegida.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "var(--lt-spacing-sm)" }}>
          <label
            style={{
              fontSize: "0.9rem",
              color: "var(--lt-muted-text-color)",
              display: "block",
            }}
          >
            Contraseña
          </label>
          <div className="input-wrapper-ml">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input-ml ${
                password.length > 0 && !validations.minChars
                  ? "input-ml-error"
                  : ""
              }`}
              placeholder="Escribí tu contraseña"
              required
              autoFocus
              autoComplete="new-password"
              style={{ marginBottom: "0" }}
            />
            <button
              type="button"
              className="toggle-password-ml"
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onTouchStart={() => setShowPassword(true)}
              onTouchEnd={() => setShowPassword(false)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "var(--lt-spacing-sm)" }}>
          <label
            style={{
              fontSize: "0.9rem",
              color: "var(--lt-muted-text-color)",
              display: "block",
            }}
          >
            Confirmar Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`input-ml ${
              confirmPassword.length > 0 && !passwordsMatch
                ? "input-ml-error"
                : ""
            }`}
            placeholder="Repetí la contraseña"
            required
            autoComplete="new-password"
            style={{ marginBottom: "0" }}
          />
        </div>

        <div
          style={{
            minHeight: "20px",
            marginBottom: "var(--lt-spacing-lg)",
            marginTop:
              confirmPassword.length > 0 && !passwordsMatch ? "5px" : "0",
          }}
        >
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--lt-error-color)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <XCircle size={14} />
              Las contraseñas no coinciden.
            </p>
          )}
        </div>

        <div
          style={{
            marginBottom: "var(--lt-spacing-2xl)",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--lt-spacing-sm)",
          }}
        >
          <ValidationItem
            label="Mínimo 8 caracteres"
            isValid={validations.minChars}
          />
          <ValidationItem
            label="Una mayúscula"
            isValid={validations.hasUpper}
          />
          <ValidationItem label="Un número" isValid={validations.hasNumber} />
          <ValidationItem
            label="Un caracter especial (!, #, $, etc.)"
            isValid={validations.hasSpecialChar}
          />
        </div>

        <button
          type="submit"
          className="btn-ml-continue"
          disabled={!isStepValid || loading}
        >
          {loading ? <div className="spinner" /> : "Guardar y continuar"}
        </button>
      </form>
    </div>
  );
};

/**
 * Componente para la vista de éxito.
 */
const SuccessView = ({ formData, onGoToLogin, onGoToHome }) => {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setIsContentReady(true);
    }, 1000);

    return () => clearTimeout(contentTimer);
  }, []);

  const welcomeMessage = `Bienvenido/a, ${formData.name}. Tu cuenta ha sido creada y tus credenciales han sido validadas.`;

  const delayedContentStyle = {
    opacity: isContentReady ? 1 : 0,
    transition: "opacity 0.7s ease-out",
    pointerEvents: isContentReady ? "auto" : "none",
  };

  return (
    <div
      className="reg-card text-center fade-in-content"
      style={{
        padding: "var(--lt-spacing-lg) var(--lt-spacing-md)",
      }}
    >
      <CheckCircle
        size={48}
        style={{
          color: "var(--lt-accent-color-variant2-dark)",
          margin: "0 auto",
          marginBottom: "var(--lt-spacing-sm)",
          opacity: isContentReady ? 1 : 0,
          transition: "opacity 0.7s ease-out",
        }}
      />

      <div style={delayedContentStyle}>
        <h2
          className="reg-title"
          style={{ fontSize: "1.3rem", marginBottom: "var(--lt-spacing-sm)" }}
        >
          Registro Completado
        </h2>

        <p
          className="reg-subtitle-ml"
          style={{
            fontSize: "0.9rem",
            color: "var(--lt-black-text-color)",
            lineHeight: 1.5,
            padding: "0 var(--lt-spacing-sm)",
            marginBottom: "var(--lt-spacing-md)",
            transition: "opacity 0.5s ease-out 0.3s",
          }}
        >
          {welcomeMessage}
        </p>

        <div
          className="success-detail-box"
          style={{
            transition: "opacity 0.5s ease-out 0.5s",
            padding: "var(--lt-spacing-md)",
            marginBottom: "var(--lt-spacing-md)",
          }}
        >
          <h3
            className="detail-title"
            style={{
              fontSize: "0.95rem",
              marginBottom: "var(--lt-spacing-sm)",
            }}
          >
            <User size={18} color="var(--lt-black-text-color)" />
            Tus datos de usuario
          </h3>

          <div
            className="detail-item"
            style={{ padding: "var(--lt-spacing-xs) 0" }}
          >
            <span className="detail-label" style={{ fontSize: "0.85rem" }}>
              Nombre completo
            </span>
            <span className="detail-value" style={{ fontSize: "0.85rem" }}>
              {formData.name} {formData.lastname}
            </span>
          </div>

          <div
            className="detail-item"
            style={{ padding: "var(--lt-spacing-xs) 0" }}
          >
            <span className="detail-label" style={{ fontSize: "0.85rem" }}>
              E-mail
            </span>
            <span className="detail-value" style={{ fontSize: "0.85rem" }}>
              {formData.email}
            </span>
          </div>

          <div
            className="detail-item"
            style={{ padding: "var(--lt-spacing-xs) 0" }}
          >
            <span className="detail-label" style={{ fontSize: "0.85rem" }}>
              Usuario para iniciar sesión
            </span>
            <span className="detail-value" style={{ fontSize: "0.85rem" }}>
              {formData.username}
            </span>
          </div>

          <div
            className="detail-item"
            style={{ padding: "var(--lt-spacing-xs) 0" }}
          >
            <span className="detail-label" style={{ fontSize: "0.85rem" }}>
              Contraseña
            </span>
            <div
              className="detail-value"
              style={{ gap: "10px", alignItems: "center", fontSize: "0.85rem" }}
            >
              <span className="password-mask">••••••••</span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--lt-spacing-md)",
            display: "flex",
            flexDirection: "column",
            gap: "var(--lt-spacing-sm)",
          }}
        >
          <button
            className="btn-ml-continue"
            style={{
              backgroundColor: "var(--lt-accent-color-variant2-dark)",
              color: "var(--lt-black-text-color)",
              fontWeight: "var(--lt-font-weight-bold)",
              cursor: "pointer",
              padding: "0.7rem 1.5rem",
            }}
            onClick={onGoToLogin}
          >
            Ir a Iniciar Sesión
          </button>
          <button
            className="btn-ml-continue"
            style={{
              backgroundColor: "var(--lt-gray-light)",
              color: "var(--lt-muted-text-color)",
              fontWeight: "var(--lt-font-weight-medium)",
              cursor: "pointer",
              padding: "0.7rem 1.5rem",
            }}
            onClick={onGoToHome}
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Componente Principal de la Página de Registro (LTRegistrationPage) ---

const LTRegistrationPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    lastname: "",
    username: "",
    password: "",
    isEmailValidated: false,
  });

  const [currentView, setCurrentView] = useState("list");
  const [activeStepId, setActiveStepId] = useState(1);
  const [confirmationStepState, setConfirmationStepState] = useState({
    title: "",
    type: "",
  });
  const [isSubmittingFinal, setIsSubmittingFinal] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prev) => prev + 1);
  }, [currentView]);

  const stepsConfig = useMemo(
    () => [
      {
        id: 1,
        title: "Agregá tu e-mail",
        titleCompleted: "E-mail validado",
        icon: Mail,
        dataField: "email",
        description: "Recibirás información de tu cuenta.",
        descriptionCompleted: (email) =>
          `**${email}** ha sido validado con éxito.`,
        Component: EmailForm,
      },
      {
        id: 2,
        title: "Elegí un nombre",
        titleCompleted: "Nombre elegido",
        icon: User,
        dataField: "username",
        description: "Se mostrará a las personas que interactúen con vos.",
        descriptionCompleted: (data) =>
          `**${data.name} ${data.lastname}** tu nombre ha sido registrado con éxito.`,
        Component: UsernameForm,
      },
      {
        id: 3,
        title: "Creá tu contraseña",
        titleCompleted: "Contraseña elegida",
        icon: Lock,
        dataField: "password",
        description: "Mantendrás tu cuenta protegida.",
        descriptionCompleted: () => `Tu contraseña ha sido validada con éxito.`,
        Component: PasswordForm,
      },
    ],
    []
  );

  const getStepStatus = useCallback(
    (stepId) => {
      const step = stepsConfig.find((s) => s.id === stepId);
      if (!step) return "pending";

      const isStep1Completed = !!formData.email && formData.isEmailValidated;
      const isStep2Completed =
        !!formData.name && !!formData.lastname && !!formData.username;
      const isStep3Completed = !!formData.password;

      if (stepId === 1) return isStep1Completed ? "completed" : "pending";
      if (stepId === 2) {
        if (!isStep1Completed) return "locked";
        return isStep2Completed ? "completed" : "pending";
      }
      if (stepId === 3) {
        if (!isStep2Completed) return "locked";
        return isStep3Completed ? "completed" : "pending";
      }

      return "pending";
    },
    [formData, stepsConfig]
  );

  const handleStepClick = (stepId) => {
    const status = getStepStatus(stepId);
    if (status !== "locked") {
      setActiveStepId(stepId);
      setCurrentView("form");
    }
  };

  const handleEmailValidationRequired = () => {
    setCurrentView("validate_email");
  };

  const handleEmailValidationSuccess = () => {
    setConfirmationStepState({ title: "E-mail", type: "email" });
    setCurrentView("confirmation");
  };

  const handleShowConfirmation = (title, type) => {
    setConfirmationStepState({ title, type });
    setCurrentView("confirmation");
  };

  const handleCompletionUpdate = (data) => {
    setFormData((prev) => {
      const newState = { ...prev, ...data };

      if (data.isEmailValidated !== undefined) {
        newState.isEmailValidated = data.isEmailValidated;
      }

      return newState;
    });
  };

  const handleBackToList = () => {
    if (confirmationStepState.type === "email") {
      handleCompletionUpdate({ isEmailValidated: true });
    }
    setCurrentView("list");
  };

  const handleFinalizeRegistration = async () => {
    setIsSubmittingFinal(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmittingFinal(false);
    setCurrentView("success");
  };

  const StepCard = ({ step, nextPendingStepId }) => {
    const status = getStepStatus(step.id);
    const completed = status === "completed";
    const locked = status === "locked";

    const shouldShowButton = completed || step.id === nextPendingStepId;

    const handleClick = () => {
      if (!locked) {
        if (step.id === 1 && !!formData.email && !formData.isEmailValidated) {
          handleEmailValidationRequired();
        } else {
          handleStepClick(step.id);
        }
      }
    };

    const iconColor = completed
      ? "var(--lt-white-text-color)"
      : locked
      ? "var(--lt-muted-text-color)"
      : "var(--lt-accent-color-dark)";
    const IconComponent = step.icon;

    let displayDescription = step.description;
    let displayTitle = step.title;

    if (completed) {
      displayTitle = step.titleCompleted;
      if (step.id === 1) {
        displayDescription = step.descriptionCompleted(formData.email);
      } else if (step.id === 2) {
        displayDescription = step.descriptionCompleted(formData);
      } else if (step.id === 3) {
        displayDescription = step.descriptionCompleted();
      }
    } else if (
      step.id === 1 &&
      !!formData.email &&
      !formData.isEmailValidated
    ) {
      displayTitle = "Validación Pendiente";
      displayDescription = `El código fue enviado a **${formData.email}**.`;
    }

    const renderDescription = (text) => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={index}
              style={{
                fontWeight: "var(--lt-font-weight-semibold)",
                color: "var(--lt-black-text-color)",
              }}
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      });
    };

    return (
      <div className="step-item">
        <div className={`step-icon-container ${completed ? "completed" : ""}`}>
          {completed ? (
            <CheckCircle size={18} color="var(--lt-white-text-color)" />
          ) : (
            <IconComponent size={18} color={iconColor} />
          )}
        </div>

        <div className="step-content-ml">
          <h3>{displayTitle}</h3>
          <p
            style={{ color: locked ? "var(--lt-muted-text-color)" : undefined }}
          >
            {renderDescription(displayDescription)}
          </p>
        </div>

        {shouldShowButton && (
          <button
            className={`btn-ml-action ${completed ? "completed-icon" : ""}`}
            onClick={handleClick}
            disabled={locked}
            style={{
              opacity: locked ? 0.5 : 1,
              cursor: locked ? "not-allowed" : "pointer",
            }}
          >
            {completed ? (
              <Pencil size={18} />
            ) : step.id === 1 &&
              !!formData.email &&
              !formData.isEmailValidated ? (
              "Validar"
            ) : (
              "Agregar"
            )}
          </button>
        )}
      </div>
    );
  };

  const navigate = useNavigate();
  const { openLogin } = useAuthModal();

  const handleGoToLogin = () => {
    openLogin();
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  const renderContent = () => {
    if (currentView === "success") {
      return (
        <SuccessView
          key={key}
          formData={formData}
          onGoToLogin={handleGoToLogin}
          onGoToHome={handleGoToHome}
        />
      );
    }

    if (currentView === "confirmation") {
      return (
        <div
          key={key}
          className="reg-card reg-card-form"
          style={{ minHeight: "500px" }}
        >
          <ConfirmationOverlay
            stepTitle={confirmationStepState.title}
            stepType={confirmationStepState.type}
            onAnimationComplete={handleBackToList}
          />
        </div>
      );
    }

    if (currentView === "validate_email") {
      return (
        <div
          key={key}
          className="reg-card reg-card-form"
          style={{ minHeight: "500px" }}
        >
          <EmailValidationForm
            email={formData.email}
            onValidationSuccess={handleEmailValidationSuccess}
            onBackToEmailForm={handleStepClick.bind(null, 1)}
          />
        </div>
      );
    }

    if (currentView === "form") {
      const step = stepsConfig.find((s) => s.id === activeStepId);
      if (!step) return null;

      let initialProps = {};
      if (step.id === 1)
        initialProps = {
          initialEmail: formData.email,
          onValidationRequired: handleEmailValidationRequired,
        };
      if (step.id === 2)
        initialProps = {
          initialName: formData.name,
          initialLastname: formData.lastname,
          initialUsername: formData.username,
          onShowConfirmation: handleShowConfirmation,
        };
      if (step.id === 3)
        initialProps = { onShowConfirmation: handleShowConfirmation };

      const StepComponent = step.Component;

      return (
        <div key={key} className="reg-card reg-card-form">
          <StepComponent
            onCompletionUpdate={handleCompletionUpdate}
            onBack={handleBackToList}
            {...initialProps}
          />
        </div>
      );
    }

    const allStepsCompleted = stepsConfig.every(
      (step) => getStepStatus(step.id) === "completed"
    );
    const nextPendingStepId = stepsConfig.find(
      (step) => getStepStatus(step.id) !== "completed"
    )?.id;

    const finalMessage = allStepsCompleted
      ? "Ya completaste todos los pasos necesarios para abrir tu cuenta"
      : "Una vez completes todos los pasos, tu cuenta estará lista.";

    return (
      <div key={key} className="reg-card fade-in-content">
        <h1 className="reg-title">Completá los datos para crear tu cuenta</h1>

        <div style={{ marginBottom: "var(--lt-spacing-lg)" }}>
          {stepsConfig.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              nextPendingStepId={nextPendingStepId}
            />
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "var(--lt-spacing-md)",
            textAlign: "center",
          }}
        >
          <p
            className="reg-subtitle-ml"
            style={{
              marginTop: 0,
              fontWeight: allStepsCompleted
                ? "var(--lt-font-weight-medium)"
                : "var(--lt-font-weight-normal)",
              color: allStepsCompleted
                ? "var(--lt-black-text-color)"
                : "var(--lt-muted-text-color)",
            }}
          >
            {finalMessage}
          </p>
          {allStepsCompleted && (
            <button
              onClick={handleFinalizeRegistration}
              className="btn-ml-continue"
              disabled={isSubmittingFinal}
              style={{
                marginTop: "var(--lt-spacing-md)",
                backgroundColor: "var(--lt-accent-color-variant2-dark)",
                color: "var(--lt-black-text-color)",
                fontWeight: "var(--lt-font-weight-bold)",
                cursor: isSubmittingFinal ? "not-allowed" : "pointer",
              }}
            >
              {isSubmittingFinal ? (
                <div className="spinner" />
              ) : (
                <CheckCircle size={20} color="var(--lt-black-text-color)" />
              )}
              {isSubmittingFinal ? "Finalizando..." : "Finalizar Registro"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return <div className="reg-container">{renderContent()}</div>;
};

export default LTRegistrationPage;
