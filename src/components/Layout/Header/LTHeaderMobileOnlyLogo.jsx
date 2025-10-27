import React from "react";
import logoBlancoChico from "../../../assets/images/logos/logo-blanco-chico.png";
import "./LTHeaderMobile.onlylogo.css";

const LTHeaderMobileOnlyLogo = () => (
  <header className="LTHeaderMobile LTHeaderMobileOnlyLogo">
    <div
      className="LTHeaderMobile__logo"
      onClick={() => (window.location.href = "/")}
    >
      <img src={logoBlancoChico} alt="Logo LT Distribuidora" />
    </div>
  </header>
);

export default LTHeaderMobileOnlyLogo;
