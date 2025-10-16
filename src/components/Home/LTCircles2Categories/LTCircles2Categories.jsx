// Componente de categorías. Cuando el backend esté, podés mapear los íconos y nombres desde la base de datos.
import React from "react";
import "./LTCircles2Categories.css";
import "../LTCircles1Offers/LTCirclesCommon.css";
import LTSectionTitle from "../../../components/common/LTSectionTitle";

// Iconos SVG usados en la sección. Si el backend quiere cambiar los íconos, reemplazá estos componentes.
const MobileSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 18H12.01M9.2 21H14.8C15.9201 21 16.4802 21 16.908 20.782C17.2843 20.5903 17.5903 20.2843 17.782 19.908C18 19.4802 18 18.9201 18 17.8V6.2C18 5.0799 18 4.51984 17.782 4.09202C17.5903 3.71569 17.2843 3.40973 16.908 3.21799C16.4802 3 15.9201 3 14.8 3H9.2C8.0799 3 7.51984 3 7.09202 3.21799C6.71569 3.40973 6.40973 3.71569 6.21799 4.09202C6 4.51984 6 5.07989 6 6.2V17.8C6 18.9201 6 19.4802 6.21799 19.908C6.40973 20.2843 6.71569 20.5903 7.09202 20.782C7.51984 21 8.07989 21 9.2 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const LaptopSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M10 18H14M7.20003 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V11.8C20 12.9201 20 13.4802 19.782 13.908C19.5903 14.2843 19.2843 14.5903 18.908 14.782C18.4802 15 17.9201 15 16.8 15H7.20003C6.07992 15 5.51987 15 5.09205 14.782C4.71572 14.5903 4.40976 14.2843 4.21801 13.908C4.00003 13.4802 4.00003 12.9201 4.00003 11.8V6.2C4.00003 5.0799 4.00003 4.51984 4.21801 4.09202C4.40976 3.71569 4.71572 3.40973 5.09205 3.21799C5.51987 3 6.07992 3 7.20003 3ZM4.58888 21H19.4112C20.2684 21 20.697 21 20.9551 20.8195C21.1805 20.6618 21.3311 20.4183 21.3713 20.1462C21.4173 19.8345 21.2256 19.4512 20.8423 18.6845L20.3267 17.6534C19.8451 16.6902 19.6043 16.2086 19.2451 15.8567C18.9274 15.5456 18.5445 15.309 18.1241 15.164C17.6488 15 17.1103 15 16.0335 15H7.96659C6.88972 15 6.35128 15 5.87592 15.164C5.45554 15.309 5.07266 15.5456 4.75497 15.8567C4.39573 16.2086 4.15493 16.6902 3.67334 17.6534L3.1578 18.6845C2.77444 19.4512 2.58276 19.8345 2.6288 20.1462C2.669 20.4183 2.81952 20.6618 3.04492 20.8195C3.30306 21 3.73166 21 4.58888 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const TvSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M15 7V21M18 11H18.01M18 14H18.01M18 17H18.01M17 3L12 7L7 3M7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V11.8C21 10.1198 21 9.27976 20.673 8.63803C20.3854 8.07354 19.9265 7.6146 19.362 7.32698C18.7202 7 17.8802 7 16.2 7H7.8C6.11984 7 5.27976 7 4.63803 7.32698C4.07354 7.6146 3.6146 8.07354 3.32698 8.63803C3 9.27976 3 10.1198 3 11.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const GamingSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 15H10M8 13V17M18 16H18.01M15 14H15.01M16 3V6H12V9M8 21C4.68629 21 2 18.3137 2 15C2 11.6863 4.68629 9 8 9H16C19.3137 9 22 11.6863 22 15C22 18.3137 19.3137 21 16 21C14.4783 21 13.0577 20.4058 12 19.4722C10.9385 20.4223 9.53671 21 8 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const HeadphonesSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3.45699 14.8382C3.75333 14.3724 4.18164 13.9828 4.7191 13.7322C5.72014 13.2654 6.91004 13.6985 7.37683 14.6995L9.06738 18.3249C9.53417 19.326 9.10108 20.5159 8.10005 20.9827C6.5985 21.6829 4.81365 21.0332 4.11347 19.5317L3.26811 17.7188C2.81855 16.7547 2.92544 15.6738 3.45699 14.8382ZM3.45699 14.8382C3.16072 13.946 3.00031 12.9917 3.00031 12C3.00031 7.02944 7.02975 3 12.0003 3C16.9709 3 21.0003 7.02944 21.0003 12C21.0003 13.026 20.8286 14.012 20.5124 14.9307M20.5124 14.9307C20.2152 14.424 19.7664 13.9992 19.1938 13.7322C18.1928 13.2654 17.0029 13.6985 16.5361 14.6995L14.8455 18.3249C14.3787 19.326 14.8118 20.5159 15.8129 20.9827C17.3144 21.6829 19.0993 21.0332 19.7994 19.5317L20.6448 17.7188C21.078 16.7899 20.9945 15.7525 20.5124 14.9307ZM17.5629 4.92407L16.0011 6.99937C14.9714 6.38709 13.2767 5.99994 12.0021 5.99994C10.7018 5.99994 9.04536 6.36461 8.00207 6.99994L6.43604 4.92593"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const HouseSvg = (
  <svg
    className="LTCirclesIcon"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const LTCircles2Categories = () => {
  // Gradientes disponibles (mismo sistema que LTSectionTitle)
  const gradients = {
    gaming: "linear-gradient(135deg, #f8d56b 0%, #ff8f5a 50%, #ff64d2 100%)",
    innova:
      "linear-gradient(120deg, #7d7cc0ff 0%, #b3b8e6 45%, #d89bfcff 100%)",
    gaming2: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    sunset: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    ocean: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    forest: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  };

  const gradientsHover = {
    gaming: "linear-gradient(135deg, #f5c84f 0%, #ff7a3d 50%, #ff47c7 100%)",
    innova:
      "linear-gradient(120deg, #6a69aaff 0%, #9fa4d9 45%, #c87ef0ff 100%)",
    gaming2: "linear-gradient(135deg, #5568d3 0%, #653a8f 100%)",
    sunset: "linear-gradient(135deg, #e87ff0 0%, #e4445b 100%)",
    ocean: "linear-gradient(135deg, #3a99f0 0%, #00d9e8 100%)",
    forest: "linear-gradient(135deg, #38d46f 0%, #2de5c8 100%)",
  };

  // Si el backend provee las categorías, reemplazá este array por un estado y traelas con useEffect
  const categories = [
    { id: 1, name: "Celulares", icon: MobileSvg, gradientType: "innova" },
    { id: 2, name: "Notebooks", icon: LaptopSvg, gradientType: "innova" },
    { id: 3, name: "Televisores", icon: TvSvg, gradientType: "innova" },
    { id: 4, name: "Gaming", icon: GamingSvg, gradientType: "innova" },
    { id: 5, name: "Audio", icon: HeadphonesSvg, gradientType: "innova" },
    {
      id: 6,
      name: "Electrodomésticos",
      icon: HouseSvg,
      gradientType: "innova",
    },
  ];

  return (
    <section className="LTCirclesWrapper lt-section-spacing">
      <div className="lt-section-title-spacing">
        <LTSectionTitle
          title="Categorías más vistas"
          subtitle={
            <a href="#" className="lt-menu-hover LTNavmenuLink">
              Mostrar todas las categorias
            </a>
          }
        />
      </div>
      <div className="LTCirclesContainer">
        <div className="LTCirclesGrid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="LTCirclesItem"
              onClick={() => console.log(`Clicked on ${category.name}`)}
            >
              <div
                className="LTCirclesCircle"
                style={{
                  "--circle-gradient": gradients[category.gradientType],
                  "--circle-gradient-hover":
                    gradientsHover[category.gradientType],
                }}
              >
                <div className="LTCirclesIconContainer">{category.icon}</div>
              </div>
              <div className="LTCirclesLabel">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LTCircles2Categories;

