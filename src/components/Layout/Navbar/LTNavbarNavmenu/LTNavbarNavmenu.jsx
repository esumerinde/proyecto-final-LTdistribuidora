import React from "react";
import "./LTNavbarNavmenu.css";

const LTNavbarNavmenu = () => {
  const menuItems = [
    "Inicio",
    "Más vendidos",
    "Ofertas",
    "Vouchers",
    "Contacto",
    "Ayuda",
  ];

  return (
    <div className="LTNavmenuWrapper">
      <div className="LTNavmenuRowContainer">
        <ul className="LTNavmenuList">
          {menuItems.map((item, index) => (
            <li key={index} className="LTNavmenuItem">
              <a href="#" className="LTNavmenuLink lt-menu-hover-navbar">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LTNavbarNavmenu;
