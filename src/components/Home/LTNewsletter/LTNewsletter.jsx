// Componente Newsletter. Cuando el backend esté, conectá el submit para guardar el email y el teléfono en la base de datos y agregar al canal de WhatsApp.
import React, { useState } from "react";
import "./LTNewsletter.css";

const LTNewsletter = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Acá va la integración con backend: guardar el número y agregarlo al canal de WhatsApp
    console.log("WhatsApp:", phone);
    alert("¡Listo! Te vamos a agregar a nuestro canal de ofertas de WhatsApp.");
    setPhone("");
  };

  return (
    <section className="LTNewsletterWrapper lt-section-spacing">
      <div className="LTNewsletterContainer">
        <div className="LTNewsletterContent">
          <div className="LTNewsletterIcon">
            <svg viewBox="0 0 24 24" className="LTNewsletterIconSvg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>

          <div className="LTNewsletterText">
            <h3 className="LTNewsletterTitle">
              Unite a nuestro canal de WhatsApp
            </h3>
            <p className="LTNewsletterDescription">
              Dejanos tu número y te agregamos al canal de difusión. Vas a
              recibir las mejores ofertas y promociones directo en tu WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="LTNewsletterForm">
            <div className="LTNewsletterInputs">
              <input
                type="tel"
                placeholder="Ingresa tu número"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="LTNewsletterInput"
              />
            </div>
            <button type="submit" className="lt-button-dark">
              Unirme al canal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Cuando el backend esté, conectá el submit y validá los datos antes de guardar.
export default LTNewsletter;
