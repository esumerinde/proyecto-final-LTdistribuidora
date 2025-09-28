// Importación de React y dependencias

import React, { useState } from "react";
import useHeaderReaccommodation from "../../../common/useHeaderReaccommodation";
import LTSearchBar from "./LTSearchBar/LTSearchBar";
import LTHeaderMobile from "./LTHeaderMobile";
import LTHeaderOffer from "./LTHeaderOffer/LTHeaderOffer";
import "./LTHeader.css";
import logoBlanco from "../../../assets/images/logos/logo-blanco.png";

const LTHeader = () => {
  const [cartCount] = useState(0);
  const { isSticky, headerTop, animation } = useHeaderReaccommodation({
    offerHeight: 32,
    headerHeight: 75,
  });

  // Renderiza siempre el header desktop
  return (
    <>
      {/* Barra de ofertas animada, se oculta si el header está sticky */}
      <LTHeaderOffer
        className={
          isSticky ? "LTHeaderOffer LTHeaderOffer--hidden" : "LTHeaderOffer"
        }
        style={{ transition: `top ${animation}, opacity ${animation}` }}
      />
      {/* Header principal desktop */}
      <header
        className={`LTHeaderWrapper${isSticky ? " LTHeaderSticky" : ""}`}
        style={{ top: headerTop, transition: `top ${animation}` }}
      >
        <div className="LTHeaderRowContainer">
          {/* Sección del logo */}
          <div className="LTHeaderDivLogo">
            <img
              src={logoBlanco}
              alt="Logo LT Distribuidora"
              className="LTHeaderLogoImg"
              style={{ width: "200px", height: "auto" }}
            />
          </div>
          {/* Sección de barra de búsqueda */}
          <div className="LTHeaderDivSearchBar">
            <LTSearchBar />
          </div>
          {/* Sección de menú de acciones */}
          <div className="LTHeaderDivMenu">
            <div className="LTHeaderMenu">
              {/* Botón Mi Cuenta */}
              <button className="LTHeaderMenuButton LTHeaderMenuButtonPedidos">
                <span
                  className="lt-menu-hover"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg
                    className="LTHeaderMenuIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Mi Cuenta
                </span>
              </button>
              {/* Botón Favoritos */}
              <button className="LTHeaderMenuButton LTHeaderMenuButtonFavoritos">
                <span className="lt-menu-hover">
                  <svg
                    className="LTHeaderMenuIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              {/* Botón Notificaciones */}
              <button className="LTHeaderMenuButton LTHeaderMenuButtonNotificaciones">
                <span className="lt-menu-hover">
                  <svg
                    className="LTHeaderMenuIcon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              {/* Botón Carrito */}
              <button className="LTHeaderMenuButton LTHeaderMenuButtonCarrito">
                <div className="LTHeaderCartContainer">
                  <span
                    className="lt-menu-hover"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      position: "relative",
                    }}
                  >
                    <svg
                      className="LTHeaderMenuIcon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 11V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10.9673M10.4 21H13.6C15.8402 21 16.9603 21 17.816 20.564C18.5686 20.1805 19.1805 19.5686 19.564 18.816C20 17.9603 20 16.8402 20 14.6V12.2C20 11.0799 20 10.5198 19.782 10.092C19.5903 9.71569 19.2843 9.40973 18.908 9.21799C18.4802 9 17.9201 9 16.8 9H7.2C6.0799 9 5.51984 9 5.09202 9.21799C4.71569 9.40973 4.40973 9.71569 4.21799 10.092C4 10.5198 4 11.0799 4 12.2V14.6C4 16.8402 4 17.9603 4.43597 18.816C4.81947 19.5686 5.43139 20.1805 6.18404 20.564C7.03968 21 8.15979 21 10.4 21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="LTHeaderCartCount">{cartCount}</span>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LTHeader;
