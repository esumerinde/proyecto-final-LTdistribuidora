import "./LTFeatureBanner.css";
import { useEffect } from "react";
import LTSectionTitle from "../../../common/LTSectionTitle";

// Importa los íconos SVG usados en las cards de features
// Si se agregan más features, agregar el ícono correspondiente acá
import TruckIcon from "../../../assets/icons/svg/truck-svgrepo-com.svg";
import CreditCardIcon from "../../../assets/icons/svg/credit-card-svgrepo-com.svg";
import ShieldCheckIcon from "../../../assets/icons/svg/shield-check-svgrepo-com.svg";
import DollarSignIcon from "../../../assets/icons/svg/dollar-sign-svgrepo-com.svg";
import MessageChatIcon from "../../../assets/icons/svg/message-circle-chat-svgrepo-com.svg";
import BadgeDollarIcon from "../../../assets/icons/svg/badge-dollar-svgrepo-com.svg";
import AddressBookIcon from "../../../assets/icons/svg/address-book-svgrepo-com.svg";
import GridCircleIcon from "../../../assets/icons/svg/grid-circle-svgrepo-com.svg";
import MapPinIcon from "../../../assets/icons/svg/map-pin-svgrepo-com.svg";

// Contexto para sincronizar el carrusel entre componentes
import {
  useCarouselSync,
  CarouselSyncProvider,
} from "../../../common/CarouselSyncContext.jsx";

// Cantidad de cards que se muestran por slide en desktop
const CARDS_PER_SLIDE = 3;

// Array de features a mostrar en el banner
// Cuando se pase a backend, este array debe venir de la API
// Cada feature tiene: ícono, título y subtítulo
const features = [
  {
    icon: (
      <img src={TruckIcon} alt="Envío Gratis" className="LTFeatureBannerIcon" />
    ),
    title: "Envío Gratis",
    subtitle: "En Capital. Entre las cuatro avenidas",
  },
  {
    icon: (
      <img
        src={CreditCardIcon}
        alt="Medios de pago"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Formas de pago",
    subtitle: "En efectivo, transferencia o financiaciones",
  },
  {
    icon: (
      <img
        src={ShieldCheckIcon}
        alt="Garantía"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Garantía Oficial",
    subtitle: "En todos nuestros productos, desde 6 meses",
  },
  {
    icon: (
      <img
        src={DollarSignIcon}
        alt="Mejores Precios"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Mejores Precios",
    subtitle: "Consultá nuestros precios y ofertas exclusivas",
  },
  {
    icon: (
      <img
        src={MessageChatIcon}
        alt="Soporte Técnico"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Soporte Técnico",
    subtitle: "Operadores para atención al cliente vía whatsapp",
  },
  {
    icon: (
      <img
        src={BadgeDollarIcon}
        alt="Vouchers"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Vouchers",
    subtitle: "Canjeá tus cupones y descuentos exclusivos",
  },
  {
    icon: (
      <img
        src={AddressBookIcon}
        alt="Conocenos"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Conocenos",
    subtitle: "Descubrí quiénes somos y nuestra historia",
  },
  {
    icon: (
      <img
        src={GridCircleIcon}
        alt="Categorías"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Categorías",
    subtitle: "Explorá todos los rubros y productos disponibles",
  },
  {
    icon: (
      <img
        src={MapPinIcon}
        alt="Puntos de Retiro"
        className="LTFeatureBannerIcon"
      />
    ),
    title: "Puntos de Retiro",
    subtitle: "Retirá tu compra en sucursales habilitadas",
  },
];

const LTFeatureBanner = () => {
  // Obtiene el índice actual, función para cambiarlo y cantidad total de slides desde el contexto
  const { currentIndex, setCurrentIndex, totalSlides } = useCarouselSync();

  // Detecta si es mobile (ancho <= 600px)
  // En mobile solo se muestra una card por slide, en desktop se muestran 3
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const visibleFeatures = isMobile
    ? [features[currentIndex]]
    : features.slice(
        currentIndex * CARDS_PER_SLIDE,
        currentIndex * CARDS_PER_SLIDE + CARDS_PER_SLIDE
      );

  // Navegación del carrusel: anterior, siguiente y salto a slide específico
  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };
  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Autoplay: avanza cada 3 segundos solo en mobile
  useEffect(() => {
    if (!isMobile) return; // Solo en mobile

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, totalSlides, setCurrentIndex]);

  // Renderiza el banner de features con carrusel y navegación
  // Cuando se pase a backend, el array de features debe venir de la API
  return (
    <section className="LTFeatureBannerWrapper lt-section-spacing">
      <div className="lt-section-title-spacing">
        <LTSectionTitle title="Nuestras ofertas exclusivas" />
      </div>
      <div className="LTFeatureBannerCarousel">
        <div className="LTFeatureBannerContainer">
          {/* Renderiza las cards visibles según el slide y si es mobile/desktop */}
          {visibleFeatures.map((feature, index) => (
            <div key={index} className={`LTFeatureBannerItem fade-card`}>
              <div className="LTFeatureBannerIconContainer">{feature.icon}</div>
              <div className="LTFeatureBannerContent">
                <h3 className="LTFeatureBannerTitle">{feature.title}</h3>
                <p className="LTFeatureBannerSubtitle">{feature.subtitle}</p>
              </div>
              {/* Flecha decorativa en cada card */}
              <div className="LTFeatureBannerArrow">
                <svg viewBox="0 0 24 24">
                  <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
        {/* Botones de navegación del carrusel */}
        <div className="LTFeatureBannerNavRow">
          <button
            className="LTFeatureBannerArrowNav"
            onClick={goToPrev}
            aria-label="Anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41,7.41L10.83,12L15.41,16.59L14,18L8,12L14,6L15.41,7.41Z" />
            </svg>
          </button>
          <button
            className="LTFeatureBannerArrowNav"
            onClick={goToNext}
            aria-label="Siguiente"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M8.59,16.59L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.59Z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Indicadores de slide (puntos abajo del carrusel) */}
      <div className="LTFeatureBannerIndicators">
        {[...Array(totalSlides)].map((_, idx) => (
          <button
            key={idx}
            className={`LTFeatureBannerIndicator${
              idx === currentIndex ? " active" : ""
            }`}
            onClick={() => goToSlide(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default LTFeatureBanner;
