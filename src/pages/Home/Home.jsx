import React from "react";
import LTHeroCarousel from "../../components/Home/LTHeroCarousel/LTHeroCarousel";
import LTOffersSection from "../../components/Home/LTOffersSection/LTOffersSection";
import LTOffersSectionMobile from "../../components/Home/LTOffersSection/LTOffersSectionMobile";
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

const Home = () => {
  return (
    <div className="lt-home-wrapper">
      <main className="lt-home-main">
        {/* Proveedor solo para FeatureBanner, Hero usa su propio índice pero comparte timing */}
        <LTHeroCarousel />
        <CarouselSyncProvider totalSlides={3}>
          <LTFeatureBanner />
        </CarouselSyncProvider>
        {/* Solo productos y banners, sin sección de ofertas */}
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
    </div>
  );
};

export default Home;
