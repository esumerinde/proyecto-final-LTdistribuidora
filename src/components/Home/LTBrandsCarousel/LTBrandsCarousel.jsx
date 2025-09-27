import React from "react";
import "./LTBrandsCarousel.css";

// Importar logos SVG
import SamsungLogo from "../../../assets/brands/samsung-8.svg";
import AppleLogo from "../../../assets/brands/apple-11.svg";
import LGLogo from "../../../assets/brands/lg.svg"; // Cambiado al nuevo logo
import SonyLogo from "../../../assets/brands/sony-logo-1.svg"; // Cambiado al nuevo logo
import XiaomiLogo from "../../../assets/brands/xiaomi-1.svg";
import MotorolaLogo from "../../../assets/brands/motorola-new-logo.svg"; // Cambiado al nuevo logo
import HPLogo from "../../../assets/brands/hp-5.svg";
import DellLogo from "../../../assets/brands/dell-2.svg";
import LenovoLogo from "../../../assets/brands/lenovo-2.svg";
import AsusLogo from "../../../assets/brands/asus-4.svg";
import AcerLogo from "../../../assets/brands/acer-2.svg";
import MicrosoftLogo from "../../../assets/brands/microsoft-6.svg";
import NintendoLogo from "../../../assets/brands/nintendo-4.svg"; // Cambiado al nuevo logo
import CanonLogo from "../../../assets/brands/canon-logo.svg";
import NikonLogo from "../../../assets/brands/nikon-2.svg";

const LTBrandsCarousel = () => {
  const brands = [
    {
      id: 1,
      name: "Samsung",
      logo: SamsungLogo,
    },
    {
      id: 2,
      name: "Apple",
      logo: AppleLogo,
    },
    {
      id: 3,
      name: "LG",
      logo: LGLogo,
    },
    {
      id: 4,
      name: "Sony",
      logo: SonyLogo,
    },
    {
      id: 5,
      name: "Xiaomi",
      logo: XiaomiLogo,
    },
    {
      id: 6,
      name: "Motorola",
      logo: MotorolaLogo,
    },
    {
      id: 7,
      name: "HP",
      logo: HPLogo,
    },
    {
      id: 8,
      name: "Dell",
      logo: DellLogo,
    },
    {
      id: 9,
      name: "Lenovo",
      logo: LenovoLogo,
    },
    {
      id: 10,
      name: "Asus",
      logo: AsusLogo,
    },
    {
      id: 11,
      name: "Acer",
      logo: AcerLogo,
    },
    {
      id: 12,
      name: "Microsoft",
      logo: MicrosoftLogo,
    },
    {
      id: 13,
      name: "Nintendo",
      logo: NintendoLogo,
    },
    {
      id: 14,
      name: "Canon",
      logo: CanonLogo,
    },
    {
      id: 15,
      name: "Nikon",
      logo: NikonLogo,
    },
    // Espaciador invisible para simular el gap normal entre logos
    {
      id: 16,
      name: "",
      logo: null,
    },
  ];

  return (
    <section className="LTBrandsCarouselWrapper">
      <div className="LTBrandsCarouselContainer">
        <div className="LTBrandsCarouselHeader">
          <h2 className="LTBrandsCarouselTitle lt-big-title">
            Las mejores marcas
          </h2>
        </div>

        <div className="LTBrandsCarouselTrack">
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
                  {brand.logo && (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="LTBrandsCarouselLogo"
                    />
                  )}
                </div>
                {/* Espaciador especial entre Nikon y Samsung */}
                {brand.name === "Nikon" && (
                  <div className="LTBrandsCarouselSpacer LTBrandsCarouselSpacer--nikon-samsung" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Duplicamos los elementos para crear el efecto de loop infinito */}
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
                {/* Espaciador especial entre Nikon y Samsung */}
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

export default LTBrandsCarousel;
