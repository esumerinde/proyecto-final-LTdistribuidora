import React from "react";
import Home from "./pages/Home/Home";
import LTScrollToTop from "./components/Layout/LTScrollToTop/LTScrollToTop";
import LTScrollToTopMobile from "./components/Layout/LTScrollToTop/LTScrollToTopMobile";
import LTChatWidget from "./components/Layout/LTChatWidget/LTChatWidget";
import LTChatWidgetMobile from "./components/Layout/LTChatWidget/LTChatWidgetMobile";
import "./styles/App.css";
import LTHeader from "./components/Layout/Header/LTHeader";
import LTHeaderMobile from "./components/Layout/Header/LTHeaderMobile";
import LTHeaderOffer from "./components/Layout/Header/LTHeaderOffer/LTHeaderOffer";
import LTNavbar from "./components/Layout/Navbar/LTNavbar";
import LTFooter from "./components/Layout/Footer/LTFooter";
import LTFooterMobile from "./components/Layout/Footer/LTFooterMobile";
import { useIsMobile } from "./common/isMobile";

function App() {
  // Usar hook centralizado para detectar mobile
  const isMobile = useIsMobile();
  return (
    <div className="lt-app">
      {isMobile ? <LTHeaderMobile /> : <LTHeader />}
      <LTNavbar />
      <Home />
      {isMobile ? <LTFooterMobile /> : <LTFooter />}
      {isMobile ? <LTScrollToTopMobile /> : <LTScrollToTop />}
      {isMobile ? <LTChatWidgetMobile /> : <LTChatWidget />}
    </div>
  );
}

export default App;
