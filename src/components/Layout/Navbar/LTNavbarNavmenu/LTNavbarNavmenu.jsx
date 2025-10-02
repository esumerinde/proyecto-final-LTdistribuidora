import React from "react";
import { useNavigate } from "react-router-dom";
import "./LTNavbarNavmenu.css";

const LTNavbarNavmenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Más vendidos", path: "#" },
    { label: "Ofertas", path: "#" },
    { label: "Vouchers", path: "#" },
    { label: "Contacto", path: "#" },
    { label: "Ayuda", path: "#" },
  ];

  const handleClick = (e, path) => {
    if (path === "/") {
      e.preventDefault();
      navigate("/");
    }
  };

  return (
    <div className="LTNavmenuWrapper">
      <div className="LTNavmenuRowContainer">
        <ul className="LTNavmenuList">
          {menuItems.map((item, index) => (
            <li key={index} className="LTNavmenuItem">
              <a
                href={item.path}
                className="LTNavmenuLink lt-menu-hover-navbar"
                onClick={(e) => handleClick(e, item.path)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LTNavbarNavmenu;
