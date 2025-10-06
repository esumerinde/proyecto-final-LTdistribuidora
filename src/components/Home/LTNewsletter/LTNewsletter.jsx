// Componente Newsletter. Cuando el backend esté, conectá el submit para guardar el email y el teléfono en la base de datos y agregar al canal de WhatsApp.
import React, { useState } from "react";
import "./LTNewsletter.css";

const LTNewsletter = () => {
  // Estado para email y teléfono. El backend debería validar y guardar estos datos.
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Cuando el usuario envía el formulario, conectá esta función al backend para agregarlo al canal y guardar el contacto.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Acá va la integración con backend: guardar email y teléfono, y agregar al canal de WhatsApp.
    console.log("Email:", email, "Phone:", phone);
    alert(
      "¡Te agregamos a nuestro canal de WhatsApp para recibir ofertas exclusivas!"
    );
    setEmail("");
    setPhone("");
  };

  return (
    <section className="LTNewsletterWrapper lt-section-spacing">
      <div className="LTNewsletterContainer">
        <div className="LTNewsletterContent">
          {/* Icono visual, no hace falta modificar salvo que el diseño lo requiera */}
          <div className="LTNewsletterIcon">
            <svg viewBox="0 0 24 24" className="LTNewsletterIconSvg">
              <path d="M20.5 3.5L19 5l1.5 1.5L22 5l-1.5-1.5zM18 1l-1.5 1.5L18 4l1.5-1.5L18 1zM20 8.5V7h-2v1.5h2zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
            </svg>
          </div>

          {/* Texto de invitación. Si el backend quiere personalizar el mensaje, hacerlo acá. */}
          <div className="LTNewsletterText">
            <h3 className="LTNewsletterTitle">
              ¡Recibí nuestras ofertas antes que nadie!
            </h3>
            <p className="LTNewsletterDescription">
              Suscribite y te agregaremos a nuestro canal de difusión de
              WhatsApp para recibir ofertas exclusivas, promociones y las
              últimas novedades en tecnología.
            </p>
          </div>

          {/* Formulario de suscripción. Cuando el backend esté, conectá el submit y validá los datos. */}
          <form onSubmit={handleSubmit} className="LTNewsletterForm">
            <div className="LTNewsletterInputs">
              {/* Email obligatorio. Validar en backend también. */}
              <input
                type="email"
                placeholder="Ingresá tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="LTNewsletterInput"
              />
              {/* Teléfono opcional. Si el backend lo requiere, hacerlo obligatorio. */}
              <input
                type="tel"
                placeholder="Número de WhatsApp (opcional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="LTNewsletterInput"
              />
            </div>
            {/* Botón de suscripción. El backend debe procesar el submit. */}
            <button type="submit" className="lt-button-dark">
              Suscribirme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Cuando el backend esté, conectá el submit y validá los datos antes de guardar.
export default LTNewsletter;
