import React from "react";
import "./LTPromoBanners.css";

const LTPromoBanners = () => {
  const promoBanners = [
    {
      id: 1,
      category: "Nuevo",
      badge: "Audio",
      kicker: "Escuchá",
      title: "Calidad de sonido",
      titleHighlight: "sin límites",
      brandName: "Sony WH-1000XM5",
      description:
        "Sumergite en tu música con cancelación de ruido inteligente y 30 horas de batería real. Usalos donde quieras, como quieras",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://headphones.com/cdn/shop/articles/WH-1000XM5_50_9e2d423a-c589-4465-89fd-6a43380243ea.jpg?v=1707861939&width=1100')",
    },
    {
      id: 2,
      category: "Nuevo",
      badge: "Televisores",
      kicker: "Descubrí",
      title: "Entretenimiento en",
      titleHighlight: "4K inmersivo",
      brandName: 'Samsung QN95B 65"',
      description:
        "Contraste perfecto, negros profundos y brillo HDR para disfrutar cada detalle de tus series favoritas.",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://img.us.news.samsung.com/us/wp-content/uploads/2022/03/16165405/Samsung-Neo-QLED-4K-QN95B-Front-Sand-Black-950x696.jpg')",
    },
    {
      id: 3,
      category: "Nuevo",
      badge: "Notebooks",
      kicker: "Potenciá",
      title: "Productividad y",
      titleHighlight: "creatividad",
      brandName: 'MacBook Pro 14"',
      description:
        "Renderizá, editá y diseñá con la nueva arquitectura M3 y hasta 22 horas de autonomía real.",
      buttonText: "Ver más",
      backgroundImage:
        "url('https://www.apple.com/newsroom/images/2023/10/apple-unveils-new-macbook-pro-featuring-m3-chips/tile/Apple-MacBook-Pro-2up-231030.jpg.landing-big_2x.jpg')",
    },
  ];

  return (
    <section className="LTPromoBannersWrapper">
      <div className="LTPromoBannersContainer">
        <h2 className="LTPromoBannersTitle">
          Descubrí las mejores opciones en tecnología
        </h2>
        <div className="LTPromoBannersGrid">
          {promoBanners.map((banner) => (
            <article
              key={banner.id}
              className="LTPromoBanner"
              style={{ "--ltpb-banner-bg": banner.backgroundImage }}
            >
              <div className="LTPromoBannerContent">
                <header className="LTPromoBannerHeader">
                  <div className="LTPromoBannerTopRow">
                    <span className="LTPromoBannerBadge">{banner.badge}</span>
                    <span className="LTPromoBannerCategory">
                      {banner.category}
                    </span>
                  </div>

                  <div className="LTPromoBannerHeadline">
                    <span className="LTPromoBannerKicker">{banner.kicker}</span>
                    <h3 className="LTPromoBannerTitle">
                      {banner.title} <span>{banner.titleHighlight}</span>
                    </h3>
                  </div>
                </header>

                <div className="LTPromoBannerBody">
                  <div className="LTPromoBannerBrandName">
                    {banner.brandName}
                  </div>
                  <p className="LTPromoBannerDescription">
                    {banner.description}
                  </p>
                </div>

                <footer className="LTPromoBannerFooter">
                  <button className="LTPromoBannerButton lt-button-light">
                    {banner.buttonText}
                  </button>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LTPromoBanners;
