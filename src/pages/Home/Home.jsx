import LTProductsCarousel1Mobile from "../../components/Home/LTProductsCarousel/LTProductsCarousel1Mobile";
import { useIsMobile } from "../../common/isMobile";
import React from "react";
import LTHeroCarousel from "../../components/Home/LTHeroCarousel/LTHeroCarousel";
import LTOffersSection from "../../components/Home/LTOffersSection/LTOffersSection";
import LTOffersSectionMobile from "../../components/Home/LTOffersSection/LTOffersSectionMobile";
import LTFeatureBanner from "../../components/Home/LTFeatureBanner/LTFeatureBanner";
import LTProductsCarousel from "../../components/Home/LTProductsCarousel/LTProductsCarousel";
import LTProductsCategories from "../../components/Home/LTProductsCategories/LTProductsCategories";
import LTProductsCategoriesMobile from "../../components/Home/LTProductsCategories/LTProductsCategoriesMobile";
import LTProductsCarousel2 from "../../components/Home/LTProductsCarousel2/LTProductsCarousel2";
import LTProductsCarousel3 from "../../components/Home/LTProductsCarousel3/LTProductsCarousel3";
import LTProductsCarousel3Mobile from "../../components/Home/LTProductsCarousel3/LTProductsCarousel3Mobile";
import LTPromoBanners from "../../components/Home/LTPromoBanners/LTPromoBanners";
import LTPromoBannersMobile from "../../components/Home/LTPromoBanners/LTPromoBannersMobile";
import LTBrandsCarousel from "../../components/Home/LTBrandsCarousel/LTBrandsCarousel";
import LTProductsCarousel2Mobile from "../../components/Home/LTProductsCarousel2/LTProductsCarousel2Mobile";

import LTNewsletter from "../../components/Home/LTNewsletter/LTNewsletter";
import { CarouselSyncProvider } from "../../common/CarouselSyncContext.jsx";
import "./Home.css";

const Home = () => {
  const isMobile = useIsMobile();
  return (
    <div className="lt-home-wrapper">
      <main className="lt-home-main">
        {/* 1. Hero y FeatureBanner */}
        <LTHeroCarousel />
        <CarouselSyncProvider totalSlides={3}>
          <LTFeatureBanner />
        </CarouselSyncProvider>
        {/* 2. Carrusel principal de productos */}
        {isMobile ? <LTProductsCarousel1Mobile /> : <LTProductsCarousel />}
        {/* 3. Sección de ofertas */}
        {isMobile ? <LTOffersSectionMobile /> : <LTOffersSection />}
        {/* 4. Segundo carrusel de productos */}
        {isMobile ? <LTProductsCarousel2Mobile /> : <LTProductsCarousel2 />}
        {/* 5. Categorías más vistas */}
        {isMobile ? <LTProductsCategoriesMobile /> : <LTProductsCategories />}
        {/* 6. Tercer carrusel de productos */}
        {isMobile ? <LTProductsCarousel3Mobile /> : <LTProductsCarousel3 />}
        {/* 7. Banners promocionales */}
        {isMobile ? <LTPromoBannersMobile /> : <LTPromoBanners />}
      </main>
      {/* 8. Carrusel de marcas */}
      <LTBrandsCarousel />
      {/* 9. Sección de newsletter */}
      <LTNewsletter />
    </div>
  );
};

export default Home;
