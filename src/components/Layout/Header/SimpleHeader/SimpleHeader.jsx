import React from "react";
import useHeaderReaccommodation from "../../../../hooks/useHeaderReaccommodation";
import "./SimpleHeader.css";
import logoBlanco from "../../../../assets/images/logos/logo-blanco.png";

/**
 * SimpleHeader - Header simplificado que solo muestra el logo
 * Se usa en páginas de autenticación (registro, etc.)
 */
const SimpleHeader = () => {
  const { isSticky, headerTop, animation } = useHeaderReaccommodation({
    offerHeight: 0,
    headerHeight: 75,
  });

  return (
    <header
      className={`SimpleHeaderWrapper${isSticky ? " SimpleHeaderSticky" : ""}`}
      style={{ top: headerTop, transition: `top ${animation}` }}
    >
      <div className="SimpleHeaderContainer">
        <div className="SimpleHeaderLogoSection">
          <img
            src={logoBlanco}
            alt="Logo LT Distribuidora"
            className="SimpleHeaderLogoImg"
            style={{ width: "200px", height: "auto", cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          />
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
