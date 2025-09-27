import React, { useState } from "react";
import "./LTProductsCarousel2.css";
import FavoriteButton from "../../../common/FavoriteButton";
// Importar SVGs desde assets
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";

const LTProductsCarousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const itemsPerView = 4;
  // Productos de electrónica y tecnología
  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra 256GB",
      brand: "SAMSUNG",
      originalPrice: 1299.99,
      discountPrice: 999.99,
      discount: 23,
      size: "256GB, Titanium Gray",
      category: "Smartphones",
      isLaunch: true,
    },
    {
      id: 2,
      name: 'Apple MacBook Air M3 13" 512GB',
      brand: "APPLE",
      originalPrice: 1699.99,
      discountPrice: 1399.99,
      discount: 18,
      size: "512GB SSD, Space Gray",
      category: "Laptops",
      isLaunch: false,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Auriculares",
      brand: "SONY",
      originalPrice: 399.99,
      discountPrice: 299.99,
      discount: 25,
      size: "Noise Cancelling, Negro",
      category: "Audio",
      isLaunch: true,
    },
    {
      id: 4,
      name: 'iPad Pro 12.9" M4 256GB Wi-Fi',
      brand: "APPLE",
      originalPrice: 1299.99,
      discountPrice: 1099.99,
      discount: 15,
      size: "256GB, Space Black",
      category: "Tablets",
      isLaunch: false,
    },
    {
      id: 5,
      name: "Dell XPS 13 Plus Intel i7 512GB",
      brand: "DELL",
      originalPrice: 1599.99,
      discountPrice: 1299.99,
      discount: 19,
      size: "Intel i7, 16GB RAM",
      category: "Laptops",
      isLaunch: true,
    },
    {
      id: 6,
      name: "Nintendo Switch OLED Console",
      brand: "NINTENDO",
      originalPrice: 349.99,
      discountPrice: 299.99,
      discount: 14,
      size: "64GB, White",
      category: "Gaming",
      isLaunch: false,
    },
    {
      id: 7,
      name: "Google Pixel 8 Pro 128GB",
      brand: "GOOGLE",
      originalPrice: 999.99,
      discountPrice: 799.99,
      discount: 20,
      size: "128GB, Bay Blue",
      category: "Smartphones",
      isLaunch: true,
    },
    {
      id: 8,
      name: "Surface Pro 9 i5 256GB + Type Cover",
      brand: "MICROSOFT",
      originalPrice: 1399.99,
      discountPrice: 1199.99,
      discount: 14,
      size: "Intel i5, 8GB RAM",
      category: "Tablets",
      isLaunch: false,
    },
    {
      id: 9,
      name: "HP Envy Inspire 7920e All-in-One",
      brand: "HP",
      originalPrice: 249.99,
      discountPrice: 199.99,
      discount: 20,
      size: "Impresora Wi-Fi, Color",
      category: "Impresoras",
      isLaunch: false,
    },
    {
      id: 10,
      name: "JBL Charge 5 Altavoz Bluetooth",
      brand: "JBL",
      originalPrice: 179.99,
      discountPrice: 149.99,
      discount: 17,
      size: "Portátil, Negro",
      category: "Audio",
      isLaunch: true,
    },
    {
      id: 11,
      name: "Garmin Venu 2 Smartwatch",
      brand: "GARMIN",
      originalPrice: 399.99,
      discountPrice: 329.99,
      discount: 18,
      size: "GPS, 45mm, Black",
      category: "Wearables",
      isLaunch: false,
    },
    {
      id: 12,
      name: "TP-Link Deco X50 Wi-Fi 6 Mesh",
      brand: "TP-LINK",
      originalPrice: 299.99,
      discountPrice: 249.99,
      discount: 17,
      size: "3-pack, AX3000",
      category: "Redes",
      isLaunch: true,
    },
  ];

  const totalSlides = Math.ceil(products.length / itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex < totalSlides - 1 ? currentIndex + 1 : totalSlides - 1
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section className="LTProductsCarousel2Wrapper">
      <div className="LTProductsCarousel2Container">
        <h2 className="LTProductsCarousel2Title">
          Electrónica - Dispositivos y Tecnología
        </h2>

        <div className="LTProductsCarousel2Content">
          {/* Banner promocional estilo Farmacity variante electrónica */}
          <div className="LTProductsCarousel2Banner">
            <div className="LTProductsCarousel2BannerContent">
              <div className="LTProductsCarousel2BannerTop">
                <span className="LTProductsCarousel2BannerBadge">
                  Electrónica
                </span>
                <div className="LTProductsCarousel2BannerDate">
                  Válido hasta el 31 de diciembre
                </div>
                <div className="LTProductsCarousel2BannerOffer">
                  <div className="LTProductsCarousel2BannerTitle">HASTA</div>
                  <div className="LTProductsCarousel2BannerPercent">
                    40
                    <span className="LTProductsCarousel2BannerPercentSymbol">
                      %
                    </span>
                  </div>
                  <div className="LTProductsCarousel2BannerOff">OFF</div>
                </div>
              </div>

              <div className="LTProductsCarousel2BannerMiddle">
                <div className="LTProductsCarousel2BannerBrand">
                  <div className="LTProductsCarousel2BannerBrandName">
                    Electrónica
                  </div>
                  <div className="LTProductsCarousel2BannerDescription">
                    Los mejores dispositivos y componentes
                  </div>
                </div>
              </div>

              <button className="LTProductsCarousel2BannerButton lt-button-dark">
                Ver Electrónica
              </button>
            </div>
          </div>

          {/* Sección de productos */}
          <div className="LTProductsCarousel2ProductsContainer">
            {/* Flecha izquierda */}
            <button
              className={`LTProductsCarousel2Arrow LTProductsCarousel2ArrowLeft ${
                currentIndex === 0 ? "disabled" : ""
              }`}
              onClick={goToPrevious}
              disabled={currentIndex === 0}
            >
              <svg viewBox="0 0 24 24">
                <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
              </svg>
            </button>

            <div
              className="LTProductsCarousel2CardsAndIndicators"
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="LTProductsCarousel2Products"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / totalSlides)
                  }%)`,
                  transition: "transform 0.5s cubic-bezier(0.7, 0.2, 0.3, 1)",
                  width: `${totalSlides * 100}%`,
                  display: "grid",
                  gridTemplateColumns: `repeat(${products.length}, 1fr)`,
                  gap: "1.5rem",
                  paddingLeft: "8px",
                  paddingRight: "8px",
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="LTProductsCarousel2Card">
                    {/* Badge de descuento */}
                    <div className="LTProductsCarousel2CardBadge">
                      -{product.discount}%
                    </div>

                    {/* Imagen del producto */}
                    <div className="LTProductsCarousel2CardImage">
                      <div className="LTProductsCarousel2CardImagePlaceholder">
                        <svg viewBox="0 0 24 24">
                          <path d="M21,9V7L15,1H5A2,2 0 0,0 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M14,2L20,8H14V2Z" />
                        </svg>
                      </div>
                    </div>

                    {/* Información del producto */}
                    <div className="LTProductsCarousel2CardInfo">
                      <div className="LTProductsCarousel2CardTopContent">
                        <div className="LTProductsCarousel2CardCategory">
                          {product.brand}
                        </div>
                        <h3 className="LTProductsCarousel2CardTitle">
                          {product.name}
                        </h3>

                        {product.isLaunch && (
                          <div className="LTProductsCarousel2CardLaunchBadge">
                            Lanzamiento
                          </div>
                        )}
                      </div>

                      <div className="LTProductsCarousel2CardBottomContent">
                        <div className="LTProductsCarousel2CardPricing">
                          <div className="LTProductsCarousel2CardOriginalPrice">
                            $ {product.originalPrice.toFixed(2)}
                          </div>
                          <div className="LTProductsCarousel2CardFinalPrice">
                            $ {Math.floor(product.discountPrice)}
                            <span className="LTProductsCarousel2CardPriceDecimals">
                              .
                              {String(
                                Math.round((product.discountPrice % 1) * 100)
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="LTProductsCarousel2CardActions">
                          <button className="LTProductsCarousel2CardAddToCart">
                            <img
                              src={ShoppingBagIcon}
                              alt="Agregar"
                              className="LTProductsCarousel2ActionIcon"
                            />
                            Agregar
                          </button>
                          <FavoriteButton
                            isFavorite={favorites.includes(product.id)}
                            onClick={() => toggleFavorite(product.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha derecha */}
            <button
              className={`LTProductsCarousel2Arrow LTProductsCarousel2ArrowRight ${
                currentIndex === totalSlides - 1 ? "disabled" : ""
              }`}
              onClick={goToNext}
              disabled={currentIndex === totalSlides - 1}
            >
              <svg viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LTProductsCarousel2;
