import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Trash2, ShoppingCart, ChevronRight } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import { getCurrentUser } from "../../utils/authStorage";
import "./LTFavorites.css";

// Wrapper: valida usuario y luego monta el contenido
const LTFavorites = () => {
  const [user] = useState(() => getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user || !user.id) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Redirigiendo al inicio de sesión…</p>
      </div>
    );
  }

  return <LTFavoritesContent />;
};

const LTFavoritesContent = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState([]);

  useEffect(() => {
    setLocalFavorites(Array.isArray(favorites) ? favorites : []);
  }, [favorites]);

  const handleRemove = (productId) => removeFromFavorites(productId);
  const handleAddToCart = (product) => {
    console.log("Agregar al carrito:", product);
  };

  const formatPrice = (price) => {
    const n = Number(price);
    if (Number.isNaN(n)) return "0.00";
    return n.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Si tu provider aún no cargó nada, mostramos un mini placeholder (opcional)
  const isLoading = favorites == null;
  if (isLoading) {
    return (
      <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>
        <p>Cargando…</p>
      </div>
    );
  }

  if (localFavorites.length === 0) {
    return (
      <div className="LTFavoritesContainer">
        <div className="LTFavoritesBreadcrumb fade-in">
          <span
            className="LTFavoritesBreadcrumbLink"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} />
          <span className="LTFavoritesBreadcrumbCurrent">
            Productos favoritos
          </span>
        </div>

        <header className="LTFavoritesHeaderSection fade-in">
          <h1 className="LTFavoritesTitle">
            <Heart className="LTFavoritesTitleIcon" />
            Productos Favoritos
          </h1>
          <p className="LTFavoritesSubtitle">
            Guarda tus productos preferidos para comprarlos más tarde
          </p>
        </header>

        <div className="LTFavoritesEmpty fade-in">
          <Heart className="LTFavoritesEmptyIcon" />
          <p className="LTFavoritesEmptyTitle">
            Aún no tenés productos favoritos
          </p>
          <p className="LTFavoritesEmptyText">
            Agregalos haciendo clic en el corazón de la página de producto
          </p>
          <button onClick={() => navigate("/")} className="lt-button-variant2">
            Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="LTFavoritesContainer">
      <div className="LTFavoritesBreadcrumb fade-in">
        <span
          className="LTFavoritesBreadcrumbLink"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="LTFavoritesBreadcrumbCurrent">
          Productos favoritos
        </span>
      </div>

      <header className="LTFavoritesHeaderSection fade-in">
        <div>
          <h1 className="LTFavoritesTitle">
            <Heart className="LTFavoritesTitleIcon" />
            Productos Favoritos
          </h1>
          <p className="LTFavoritesSubtitle">
            {localFavorites.length}{" "}
            {localFavorites.length === 1
              ? "producto guardado"
              : "productos guardados"}
          </p>
        </div>
      </header>

      <div className="LTFavoritesList">
        {localFavorites.map((product, index) => {
          const basePrice =
            product.originalPrice ??
            product.price ??
            product.discountPrice ??
            0;
          const finalPrice = product.discountPrice ?? basePrice;

          return (
            <div
              key={product.id}
              className="lt-account-card fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="LTFavoriteCard">
                <div className="LTFavoriteCardImageWrapper">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="LTFavoriteCardImg"
                  />
                  {Number(product.discount) > 0 && (
                    <span className="LTFavoriteCardBadge">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                <div className="LTFavoriteCardInfo">
                  <p className="LTFavoriteCardBrand">{product.brand}</p>
                  <h3 className="LTFavoriteCardTitle">{product.name}</h3>

                  <div className="LTFavoriteCardPricing">
                    {Number(product.discount) > 0 && (
                      <span className="LTFavoriteCardOriginalPrice">
                        $ {formatPrice(basePrice)}
                      </span>
                    )}
                    <span className="LTFavoriteCardFinalPrice">
                      $ {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>

                <div className="LTFavoriteCardActions">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="LTFavoriteCardButton lt-button-card-variant2"
                    title="Agregar al carrito"
                  >
                    <ShoppingCart size={18} />
                    <span>Agregar</span>
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="LTFavoriteCardRemove"
                    title="Eliminar de favoritos"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LTFavorites;
