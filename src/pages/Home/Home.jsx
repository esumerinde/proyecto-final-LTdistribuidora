import React from "react";
import LTHeader from "../../components/Layout/Header/LTHeader";
import LTHeaderOffer from "../../components/Layout/Header/LTHeaderOffer/LTHeaderOffer";
import LTNavbar from "../../components/Layout/Navbar/LTNavbar";
import LTFooter from "../../components/Layout/Footer/LTFooter";
import LTHeroCarousel from "../../components/Home/LTHeroCarousel/LTHeroCarousel";
import LTOffersSection from "../../components/Home/LTOffersSection/LTOffersSection";
import LTFeatureBanner from "../../components/Home/LTFeatureBanner/LTFeatureBanner";
import LTProductsCarousel from "../../components/Home/LTProductsCarousel/LTProductsCarousel";
import LTProductsCategories from "../../components/Home/LTProductsCategories/LTProductsCategories";
import LTProductsCarousel2 from "../../components/Home/LTProductsCarousel2/LTProductsCarousel2";
import LTProductsCarousel3 from "../../components/Home/LTProductsCarousel3/LTProductsCarousel3";
import LTPromoBanners from "../../components/Home/LTPromoBanners/LTPromoBanners";
import LTBrandsCarousel from "../../components/Home/LTBrandsCarousel/LTBrandsCarousel";
import LTNewsletter from "../../components/Home/LTNewsletter/LTNewsletter";
import LTChatWidget from "../../components/Layout/LTChatWidget/LTChatWidget";
import { CarouselSyncProvider } from "../../common/CarouselSyncContext.jsx";
import "./Home.css";

const TOTAL_SLIDES = 9; // 9 para cards y hero

const Home = () => {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 600);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className="lt-home-wrapper">
      <LTHeader />
      <LTNavbar />
      <main className="lt-home-main">
        {/* Proveedor solo para FeatureBanner, Hero usa su propio índice pero comparte timing */}
        <LTHeroCarousel />
        <CarouselSyncProvider totalSlides={3}>
          <LTFeatureBanner />
        </CarouselSyncProvider>
        <LTOffersSection />
        <LTProductsCarousel />
        <LTProductsCarousel2 />
        <LTProductsCategories />
        <LTPromoBanners />
        <LTProductsCarousel3 />
      </main>

      {/* Brands Carousel */}
      <LTBrandsCarousel />

      {/* Newsletter Section */}
      <LTNewsletter />

      {/* Footer */}
      <LTFooter />

      {/* Chat Widget flotante */}
      <LTChatWidget />
    </div>
  );
};

export default Home;
