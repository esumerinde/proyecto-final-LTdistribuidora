import React from "react";
import { Outlet } from "react-router-dom";
import LTHeader from "../Header/LTHeader";
import LTHeaderMobile from "../Header/LTHeaderMobile";
import LTNavbar from "../Navbar/LTNavbar";
import LTFooter from "../Footer/LTFooter";
import LTFooterMobile from "../Footer/LTFooterMobile";
import LTScrollToTop from "../../widgets/LTScrollToTop/LTScrollToTop.jsx";
import LTScrollToTopMobile from "../../widgets/LTScrollToTop/LTScrollToTopMobile.jsx";
import LTChatWidget from "../../widgets/LTChatWidget/LTChatWidget.jsx";
import LTChatWidgetMobile from "../../widgets/LTChatWidget/LTChatWidgetMobile.jsx";
import { useIsMobile } from "../../../hooks/useIsMobile";

/**
 * Layout principal para páginas con Header + Navbar + Footer
 * Usado en: Home, Productos, Categorías, etc.
 */
const MainLayout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="lt-app">
      {isMobile ? <LTHeaderMobile /> : <LTHeader />}
      <LTNavbar />
      <Outlet />
      {isMobile ? <LTFooterMobile /> : <LTFooter />}
      {isMobile ? <LTScrollToTopMobile /> : <LTScrollToTop />}
      {isMobile ? <LTChatWidgetMobile /> : <LTChatWidget />}
    </div>
  );
};

export default MainLayout;
