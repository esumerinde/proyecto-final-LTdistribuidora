import React from "react";
import "./LTProductsCategories.css";

// Importar iconos SVG
import mobileSvg from "../../../assets/icons/svg/mobile-svgrepo-com.svg";
import laptopSvg from "../../../assets/icons/svg/laptop-alt-1-svgrepo-com.svg";
import tvSvg from "../../../assets/icons/svg/tv-svgrepo-com.svg";
import gamingSvg from "../../../assets/icons/svg/gaming-pad-svgrepo-com.svg";
import headphonesSvg from "../../../assets/icons/svg/headphones-svgrepo-com.svg";
import houseSvg from "../../../assets/icons/svg/house-chimney-floor-svgrepo-com.svg";

const LTProductsCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Celulares",
      icon: (
        <img
          src={mobileSvg}
          alt="Celulares"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
    {
      id: 2,
      name: "Notebooks",
      icon: (
        <img
          src={laptopSvg}
          alt="Notebooks"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
    {
      id: 3,
      name: "Televisores",
      icon: (
        <img
          src={tvSvg}
          alt="Televisores"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
    {
      id: 4,
      name: "Gaming",
      icon: (
        <img
          src={gamingSvg}
          alt="Gaming"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
    {
      id: 5,
      name: "Audio",
      icon: (
        <img
          src={headphonesSvg}
          alt="Audio"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
    {
      id: 6,
      name: "Electrodomésticos",
      icon: (
        <img
          src={houseSvg}
          alt="Electrodomésticos"
          className="LTProductsCategoriesIcon"
        />
      ),
    },
  ];

  return (
    <section className="LTProductsCategoriesWrapper">
      <div className="LTProductsCategoriesContainer">
        <div className="LTProductsCategoriesHeader">
          <h2 className="LTProductsCategoriesTitle lt-big-title">
            Categorías más vistas
          </h2>
          <span className="LTProductsCategoriesViewAll lt-menu-hover">
            Mostrar todas las categorías
          </span>
        </div>

        <div className="LTProductsCategoriesGrid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="LTProductsCategoriesItem"
              onClick={() => console.log(`Clicked on ${category.name}`)}
            >
              <div className="LTProductsCategoriesCircle">
                <div className="LTProductsCategoriesIconContainer">
                  {category.icon}
                </div>
              </div>
              <div className="LTProductsCategoriesLabel">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LTProductsCategories;
