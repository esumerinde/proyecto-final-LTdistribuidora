import React from "react";
import "./LTFooter.css";
import qrLTDistribuidora from "../../../assets/images/qr-LTDistribuidora.png";
import logoBlanco from "../../../assets/images/logos/logo-blanco.png";

const LTFooter = () => {
  return (
    <footer className="LTFooterWrapper">
      <div className="LTFooterContainer">
        {/* Logo y redes sociales */}
        <div className="LTFooterSection">
          <img
            src={logoBlanco}
            alt="Logo LT Distribuidora"
            className="LTFooterLogoImg"
          />
          <div className="LTFooterSocialMedia">
            <a
              href="#"
              className="LTFooterSocialLink lt-button-footer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="LTFooterSocialIcon">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="#"
              className="LTFooterSocialLink lt-button-footer"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" className="LTFooterSocialIcon">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#"
              className="LTFooterSocialLink lt-button-footer"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="LTFooterSocialIcon">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488" />
              </svg>
            </a>
          </div>

          {/* QR Code placeholder */}
          <div className="LTFooterQRSection">
            <div className="LTFooterQRCode">
              <img
                src={qrLTDistribuidora}
                alt="QR LT Distribuidora"
                className="LTFooterQRImage"
              />
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="LTFooterSection">
          <h4 className="LTFooterSectionTitle">Categorías</h4>
          <ul className="LTFooterList">
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Ofertas
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Electrónicos
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Computación
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Celulares
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Gaming
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Audio y Video
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Hogar Inteligente
              </a>
            </li>
          </ul>
        </div>

        {/* LT Electrónica */}
        <div className="LTFooterSection">
          <h4 className="LTFooterSectionTitle">LTelectrónica</h4>
          <ul className="LTFooterList">
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Nuestra empresa
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Mis pedidos
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Puntos de retiro
              </a>
            </li>
          </ul>
        </div>

        {/* Atención al cliente */}
        <div className="LTFooterSection">
          <h4 className="LTFooterSectionTitle">Atención al cliente</h4>
          <ul className="LTFooterList">
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Contacto
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Medios de pago
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Como comprar
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Términos y condiciones
              </a>
            </li>
            <li>
              <a href="#" className="LTFooterLink lt-menu-hover">
                Políticas de Privacidad
              </a>
            </li>
          </ul>

          {/* Botón de Arrepentimiento integrado */}
          <div className="LTFooterRegretButtonIntegrated">
            <button className="LTFooterRegretBtn lt-button-dark lt-footer-regret">
              Botón de Arrepentimiento
            </button>
          </div>
        </div>

        {/* Professional Placeholder Section */}
        <div className="LTFooterSection">
          <div className="LTFooterProfessionalItem">
            <svg className="LTFooterProfessionalIcon" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <div>
              <h5 className="LTFooterProfessionalTitle">Vení a visitarnos</h5>
              <p className="LTFooterProfessionalText">
                Encuentra nuestros puntos de venta
              </p>
            </div>
          </div>
          <div className="LTFooterProfessionalItem">
            <svg className="LTFooterProfessionalIcon" viewBox="0 0 24 24">
              <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
            </svg>
            <div>
              <h5 className="LTFooterProfessionalTitle">
                Trabajá con nosotros
              </h5>
              <p className="LTFooterProfessionalText">
                Vende tus productos con nosotros
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright y footer bottom */}
      <div className="LTFooterBottom">
        <div className="LTFooterBottomContainer">
          <div className="LTFooterCopyright">
            <p>
              © Copyright 2025. Todos los derechos reservados | LT Electrónica
              S.A. ©
            </p>
            <p>
              En esta parte va el CUIT de Liliana y la dirección del local,
              Tucumán, Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LTFooter;
