// Componente Carrusel de Productos 2 - Estilo Farmacity
// Este componente muestra un carrusel con banner promocional y productos electrónicos.
// El backend puede modificar el array 'products' para cambiar los productos mostrados.
// Los estilos y layout se definen en LTProductsCarousel2.css.
// Instrucciones backend: para cambiar la cantidad de productos por slide, modificar 'itemsPerView'.
// Para integrar con API real, reemplazar el import de 'products' por un fetch a la base de datos.
import React, { useState } from "react";
import "./LTProductsCarousel2.css";
import FavoriteButton from "../../../common/FavoriteButton";
import ShoppingBagIcon from "../../../assets/icons/svg/bag-shopping-svgrepo-com.svg";
import { products } from "../../../mocks/products2";

const LTProductsCarousel2 = () => {
  // Estado del slide actual del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  // Estado de favoritos (IDs de productos marcados)
  const [favorites, setFavorites] = useState([]);
  // Cantidad de productos por slide. Modificá este valor para mostrar más/menos productos por vista.
  const itemsPerView = 4;

  // Calcula la cantidad total de slides según la cantidad de productos y el tamaño de la vista
  const totalSlides = Math.ceil(products.length / itemsPerView);

  // Función para ir al slide anterior
  const goToPrevious = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  // Función para ir al slide siguiente
  const goToNext = () => {
    setCurrentIndex(
      currentIndex < totalSlides - 1 ? currentIndex + 1 : totalSlides - 1
    );
  };

  // Alterna el estado de favorito para un producto
  // El backend puede usar este callback para actualizar favoritos en la base de datos
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render principal del carrusel y banner
  // El backend puede modificar el contenido del banner y los productos desde la API
  return (
    <section className="LTProductsCarousel2Wrapper">
      <div className="LTProductsCarousel2Container">
        <h2 className="LTProductsCarousel2Title">
          Electrónica - Dispositivos y Tecnología
        </h2>

        <div className="LTProductsCarousel2Content">
          {/* Banner promocional estilo Farmacity variante electrónica
              El backend puede modificar el texto, colores y ofertas desde props o API. */}
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

              <button className="LTProductsCarousel2BannerButton lt-button-variant2">
                Ver Electrónica
              </button>
            </div>
          </div>

          {/* Sección de productos
              El backend puede modificar la lógica para traer productos desde la base de datos. */}
          <div className="LTProductsCarousel2ProductsContainer">
            {/* Flecha izquierda - Navegación del carrusel */}
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
                      {product.image ? (
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <div className="LTProductsCarousel2CardImagePlaceholder">
                          <svg viewBox="0 0 24 24">
                            <path d="M21,9V7L15,1H5A2,2 0 0,0 3,3V21A2,2 0 0,0 5,23H19A2,2 0 0,0 21,21V9M14,2L20,8H14V2Z" />
                          </svg>
                        </div>
                      )}
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
