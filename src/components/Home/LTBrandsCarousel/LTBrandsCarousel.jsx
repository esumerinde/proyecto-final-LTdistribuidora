import React from "react";
import "./LTBrandsCarousel.css";
import LTSectionTitle from "../../../common/LTSectionTitle";

// Acá importamos los logos de las marcas. Si el backend provee rutas dinámicas, reemplazar estos imports por un fetch y mapear los logos que vengan del backend.
import SamsungLogo from "../../../assets/brands/samsung-8.svg";
import AppleLogo from "../../../assets/brands/apple-11.svg";
import LGLogo from "../../../assets/brands/lg.svg";
import SonyLogo from "../../../assets/brands/sony-logo-1.svg";
import XiaomiLogo from "../../../assets/brands/xiaomi-1.svg";
import MotorolaLogo from "../../../assets/brands/motorola-new-logo.svg";
import HPLogo from "../../../assets/brands/hp-5.svg";
import DellLogo from "../../../assets/brands/dell-2.svg";
import LenovoLogo from "../../../assets/brands/lenovo-2.svg";
import AsusLogo from "../../../assets/brands/asus-4.svg";
import AcerLogo from "../../../assets/brands/acer-2.svg";
import MicrosoftLogo from "../../../assets/brands/microsoft-6.svg";
import NintendoLogo from "../../../assets/brands/nintendo-4.svg";
import CanonLogo from "../../../assets/brands/canon-logo.svg";
import NikonLogo from "../../../assets/brands/nikon-2.svg";

const LTBrandsCarousel = () => {
  // Si el backend provee las marcas, reemplazar este array por un fetch y mapear la respuesta.
  // Por ahora es hardcodeado, pero está listo para migrar a datos dinámicos.
  const brands = [
    { id: 1, name: "Samsung", logo: SamsungLogo },
    { id: 2, name: "Apple", logo: AppleLogo },
    { id: 3, name: "LG", logo: LGLogo },
    { id: 4, name: "Sony", logo: SonyLogo },
    { id: 5, name: "Xiaomi", logo: XiaomiLogo },
    { id: 6, name: "Motorola", logo: MotorolaLogo },
    { id: 7, name: "HP", logo: HPLogo },
    { id: 8, name: "Dell", logo: DellLogo },
    { id: 9, name: "Lenovo", logo: LenovoLogo },
    { id: 10, name: "Asus", logo: AsusLogo },
    { id: 11, name: "Acer", logo: AcerLogo },
    { id: 12, name: "Microsoft", logo: MicrosoftLogo },
    { id: 13, name: "Nintendo", logo: NintendoLogo },
    { id: 14, name: "Canon", logo: CanonLogo },
    { id: 15, name: "Nikon", logo: NikonLogo },
    // Este objeto es solo para meter un espacio visual entre los logos, no lo borres porque rompe el diseño.
    { id: 16, name: "", logo: null },
  ];

  // El componente muestra las marcas en un carrusel horizontal. Si el backend trae las marcas, reemplazar el array y mapear la respuesta.
  // El loop infinito se logra duplicando los slides, así el usuario nunca ve el final. No borres la segunda iteración.
  return (
    <section className="LTBrandsCarouselWrapper lt-section-spacing">
      <div className="LTBrandsCarouselContainer">
        {/* Título con animación de pinceleada */}
        <div className="lt-section-title-spacing">
          <LTSectionTitle title="Las mejores marcas" />
        </div>

        <div className="LTBrandsCarouselTrack">
          {/* Primer slide con todas las marcas */}
          <div className="LTBrandsCarouselSlide">
            {brands.map((brand) => (
              <React.Fragment key={brand.id}>
                <div
                  className={
                    brand.logo
                      ? "LTBrandsCarouselItem"
                      : "LTBrandsCarouselSpacer"
                  }
                >
                  {/* Si el logo existe, lo mostramos. Si no, es solo un espacio visual. */}
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="LTBrandsCarouselLogo"
                    />
                  )}
                </div>
                {/* Entre Nikon y Samsung metemos un espacio extra para que no se peguen, no lo borres. */}
                {brand.name === "Nikon" && (
                  <div className="LTBrandsCarouselSpacer LTBrandsCarouselSpacer--nikon-samsung" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Segundo slide duplicado para el efecto de loop infinito. Si el backend trae las marcas, duplicar el array igual. */}
          <div className="LTBrandsCarouselSlide" aria-hidden="true">
            {brands.map((brand) => (
              <React.Fragment key={`duplicate-${brand.id}`}>
                <div
                  className={
                    brand.logo
                      ? "LTBrandsCarouselItem"
                      : "LTBrandsCarouselSpacer"
                  }
                >
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt=""
                      className="LTBrandsCarouselLogo"
                    />
                  )}
                </div>
                {brand.name === "Nikon" && (
                  <div className="LTBrandsCarouselSpacer LTBrandsCarouselSpacer--nikon-samsung" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Si migrás esto al backend, solo cambiá el array y asegurate de mantener el loop duplicado para el efecto infinito.
export default LTBrandsCarousel;
