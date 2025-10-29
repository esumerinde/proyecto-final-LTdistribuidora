import React from "react";
import { useNavigate } from "react-router-dom";
import logoBlanco from "../../../assets/images/logos/logo-blanco.png";
import "./LTSimpleHeader.css";

const LTSimpleHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="LTHeaderWrapper">
      <div
        className="LTHeaderRowContainer"
        style={{ justifyContent: "flex-start" }}
      >
        <div
          className="LTHeaderDivLogo"
          style={{ justifyContent: "flex-start" }}
        >
          <img
            src={logoBlanco}
            alt="Logo LT Distribuidora"
            className="LTHeaderLogoImg"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </header>
  );
};

export default LTSimpleHeader;
