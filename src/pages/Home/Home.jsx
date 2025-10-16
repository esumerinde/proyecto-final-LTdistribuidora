import LTProductsCarouselOffersMobile from "../../components/Home/LTProductsCarousel/LTProductsCarouselOffersMobile.jsx";
import { useIsMobile } from "../../hooks/useIsMobile";
import React from "react";
import LTHeroCarousel from "../../components/Home/LTHeroCarousel/LTHeroCarousel";
import LTHeroCarouselMobile from "../../components/Home/LTHeroCarousel/LTHeroCarouselMobile";
import LTCircles1Offers from "../../components/Home/LTCircles1Offers/LTCircles1Offers.jsx";
import LTCircles1OffersMobile from "../../components/Home/LTCircles1Offers/LTCircles1OffersMobile.jsx";
import LTFeatureBanner from "../../components/Home/LTFeatureBanner/LTFeatureBanner";
import LTProductsCarouselOffers from "../../components/Home/LTProductsCarousel/LTProductsCarouselOffers.jsx";
import LTCircles2Categories from "../../components/Home/LTCircles2Categories/LTCircles2Categories.jsx";
import LTCircles2CategoriesMobile from "../../components/Home/LTCircles2Categories/LTCircles2CategoriesMobile.jsx";
import LTProductsCarousel2 from "../../components/Home/LTProductsCarousel2/LTProductsCarousel2";
import LTProductsCarousel3 from "../../components/Home/LTProductsCarousel3/LTProductsCarousel3";
import LTProductsCarousel3Mobile from "../../components/Home/LTProductsCarousel3/LTProductsCarousel3Mobile";
import LTProductsCarousel4 from "../../components/Home/LTProductsCarousel4/LTProductsCarousel4";
import LTProductsCarousel4Mobile from "../../components/Home/LTProductsCarousel4/LTProductsCarousel4Mobile";
import LTPromoBanners from "../../components/Home/LTPromoBanners/LTPromoBanners";
import LTPromoBannersMobile from "../../components/Home/LTPromoBanners/LTPromoBannersMobile";
import LTBrandsCarousel from "../../components/Home/LTBrandsCarousel/LTBrandsCarousel";
import LTProductsCarousel2Mobile from "../../components/Home/LTProductsCarousel2/LTProductsCarousel2Mobile";

import LTNewsletter from "../../components/Home/LTNewsletter/LTNewsletter";
import { CarouselSyncProvider } from "../../context/CarouselSyncContext.jsx";
import "./Home.css";

const Home = () => {
  const isMobile = useIsMobile();
  return (
    <div className="lt-home-wrapper">
      <main className="lt-home-main">
        {/* 1. Hero con Ofertas superpuestas */}
        <div className="lt-hero-with-offers">
          {isMobile ? <LTHeroCarouselMobile /> : <LTHeroCarousel />}
          {isMobile ? (
            <LTProductsCarouselOffersMobile />
          ) : (
            <LTProductsCarouselOffers />
          )}
        </div>
        {/* 2. FeatureBanner como sección independiente */}
        <CarouselSyncProvider totalSlides={3}>
          <LTFeatureBanner />
        </CarouselSyncProvider>
        {/* 3. Sección de ofertas */}
        {isMobile ? <LTCircles1OffersMobile /> : <LTCircles1Offers />}
        {/* 4. Segundo carrusel de productos */}
        {isMobile ? <LTProductsCarousel2Mobile /> : <LTProductsCarousel2 />}
        {/* 5. Categorías más vistas */}
        {isMobile ? <LTCircles2CategoriesMobile /> : <LTCircles2Categories />}
        {/* 6. Tercer carrusel de productos */}
        {isMobile ? <LTProductsCarousel3Mobile /> : <LTProductsCarousel3 />}
        {/* 7. Banners promocionales */}
        {isMobile ? <LTPromoBannersMobile /> : <LTPromoBanners />}
        {/* 8. Cuarto carrusel de productos */}
        {isMobile ? <LTProductsCarousel4Mobile /> : <LTProductsCarousel4 />}
      </main>
      {/* 9. Carrusel de marcas */}
      <LTBrandsCarousel />
      {/* 10. Sección de newsletter */}
      <LTNewsletter />
    </div>
  );
};

export default Home;
