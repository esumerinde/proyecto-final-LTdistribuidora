import { useState, useEffect } from "react";
import { getCurrentUser } from "../../../utils/authStorage";
import { useNavigate } from "react-router-dom";
import { Star, Trash2, ChevronRight, TrendingUp, Package } from "lucide-react";
import "./LTFavoriteBrands.css";

// Mock data de marcas favoritas
const MOCK_FAVORITE_BRANDS = [
  {
    id: 1,
    name: "Samsung",
    logo: "/src/assets/brands/samsung-8.svg",
    category: "Electrónica",
    productsCount: 234,
    newProductsCount: 12,
    description: "Líder en tecnología e innovación",
  },
  {
    id: 2,
    name: "Apple",
    logo: "/src/assets/brands/apple-11.svg",
    category: "Tecnología Premium",
    productsCount: 89,
    newProductsCount: 5,
    description: "Diseño y rendimiento excepcional",
  },
  {
    id: 3,
    name: "Lenovo",
    logo: "/src/assets/brands/lenovo-2.svg",
    category: "Computación",
    productsCount: 156,
    newProductsCount: 8,
    description: "Innovación para todos",
  },
  {
    id: 4,
    name: "LG",
    logo: "/src/assets/brands/lg-electronics.svg",
    category: "Electrodomésticos",
    productsCount: 198,
    newProductsCount: 15,
    description: "Life's Good",
  },
  {
    id: 5,
    name: "Sony",
    logo: "/src/assets/brands/sony-2.svg",
    category: "Audio y Video",
    productsCount: 142,
    newProductsCount: 7,
    description: "Innovación que emociona",
  },
  {
    id: 6,
    name: "HP",
    logo: "/src/assets/brands/hp-5.svg",
    category: "Computación",
    productsCount: 178,
    newProductsCount: 10,
    description: "Tecnología confiable",
  },
];

const LTFavoriteBrands = () => {
  const navigate = useNavigate();
  const [user] = useState(() => getCurrentUser());

  // Redirigir si no hay usuario
  useEffect(() => {
    if (!user || !user.id) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  const [favoriteBrands, setFavoriteBrands] = useState(MOCK_FAVORITE_BRANDS);

  const handleRemove = (brandId) => {
    setFavoriteBrands(favoriteBrands.filter((brand) => brand.id !== brandId));
  };

  const handleViewProducts = (brandName) => {
    console.log("Ver productos de:", brandName);
    // Aquí navegaría a la página de productos filtrados por marca
    navigate(`/products?brand=${brandName.toLowerCase()}`);
  };

  if (favoriteBrands.length === 0) {
    return (
      <div className="lt-account-container">
        {/* Breadcrumb */}
        <div className="lt-account-breadcrumb fade-in">
          <span
            className="lt-breadcrumb-link"
            onClick={() => navigate("/my-account")}
          >
            Mi cuenta
          </span>
          <ChevronRight size={14} />
          <span className="lt-breadcrumb-current">Marcas favoritas</span>
        </div>

        {/* Header */}
        <header className="lt-account-header fade-in">
          <h1 className="lt-account-title">
            <Star className="lt-account-title-icon" />
            Marcas Favoritas
          </h1>
          <p className="lt-account-subtitle">
            Seguí tus marcas preferidas y descubrí nuevos productos
          </p>
        </header>

        {/* Empty State */}
        <div className="lt-account-empty fade-in">
          <div className="lt-empty-icon-wrapper">
            <Star className="lt-empty-icon" />
          </div>
          <h3 className="lt-empty-title">Aún no tenés marcas favoritas</h3>
          <p className="lt-empty-description">
            Empezá a seguir marcas para recibir notificaciones sobre nuevos
            productos y ofertas exclusivas
          </p>
          <button
            onClick={() => navigate("/")}
            className="lt-button-dark"
            style={{ marginTop: "1.5rem" }}
          >
            Explorar Marcas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lt-account-container">
      {/* Breadcrumb */}
      <div className="lt-account-breadcrumb fade-in">
        <span
          className="lt-breadcrumb-link"
          onClick={() => navigate("/my-account")}
        >
          Mi cuenta
        </span>
        <ChevronRight size={14} />
        <span className="lt-breadcrumb-current">Marcas favoritas</span>
      </div>

      {/* Header */}
      <header className="lt-account-header fade-in">
        <h1 className="lt-account-title">
          <Star className="lt-account-title-icon" />
          Marcas Favoritas
        </h1>
        <h1 className="lt-header-title">Marcas Favoritas</h1>
        <p className="lt-account-subtitle">
          {favoriteBrands.length}{" "}
          {favoriteBrands.length === 1 ? "marca favorita" : "marcas favoritas"}
        </p>
      </header>

      {/* Brands Grid */}
      <div className="lt-brands-grid slide-up">
        {favoriteBrands.map((brand) => (
          <div key={brand.id} className="lt-brand-card">
            {/* Remove Button */}
            <button
              onClick={() => handleRemove(brand.id)}
              className="lt-brand-remove"
              title="Eliminar de favoritos"
            >
              <Trash2 size={16} />
            </button>

            {/* Brand Logo */}
            <div className="lt-brand-logo-wrapper">
              <img
                src={brand.logo}
                alt={brand.name}
                className="lt-brand-logo"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="lt-brand-logo-fallback">
                <Star size={32} />
              </div>
            </div>

            {/* Brand Info */}
            <div className="lt-brand-info">
              <h3 className="lt-brand-name">{brand.name}</h3>
              <p className="lt-brand-category">{brand.category}</p>
              <p className="lt-brand-description">{brand.description}</p>

              {/* Stats */}
              <div className="lt-brand-stats">
                <div className="lt-brand-stat">
                  <Package size={14} />
                  <span>{brand.productsCount} productos</span>
                </div>
                {brand.newProductsCount > 0 && (
                  <div className="lt-brand-stat lt-brand-stat-new">
                    <TrendingUp size={14} />
                    <span>{brand.newProductsCount} nuevos</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleViewProducts(brand.name)}
              className="lt-brand-button"
            >
              Ver Productos
              <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LTFavoriteBrands;
