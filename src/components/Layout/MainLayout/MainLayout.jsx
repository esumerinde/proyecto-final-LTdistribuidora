import React from "react";
import { Outlet } from "react-router-dom";
import LTHeader from "../Header/LTHeader";
import LTHeaderMobile from "../Header/LTHeaderMobile";
import LTNavbar from "../Navbar/LTNavbar";
import LTFooter from "../Footer/LTFooter";
import LTFooterMobile from "../Footer/LTFooterMobile";
import LTScrollToTop from "../LTScrollToTop/LTScrollToTop";
import LTScrollToTopMobile from "../LTScrollToTop/LTScrollToTopMobile";
import LTChatWidget from "../LTChatWidget/LTChatWidget";
import LTChatWidgetMobile from "../LTChatWidget/LTChatWidgetMobile";
import { useIsMobile } from "../../../common/isMobile";

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
