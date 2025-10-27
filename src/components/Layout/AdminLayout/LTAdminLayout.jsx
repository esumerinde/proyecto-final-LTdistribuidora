import React from "react";
import { useIsMobile } from "../../../hooks/useIsMobile";
import LTSimpleHeader from "../Header/LTSimpleHeader";
import "./LTAdminLayout.css";

const LTAdminLayout = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <div className="LTAdminLayoutRoot">
      <LTSimpleHeader />
      <main className="LTAdminLayoutMain">{children}</main>
    </div>
  );
};

export default LTAdminLayout;
