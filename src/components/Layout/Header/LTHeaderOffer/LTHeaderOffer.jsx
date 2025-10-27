import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./LTHeaderOffer.css";

const offers = [
  "3 cuotas sin interés con bancos afiliados · Aplican Legales",
  "Envío gratis en CABA y GBA · Solo hoy",
  "2x1 en productos seleccionados · Ver más",
  "Descuentos exclusivos en la app · Descargala ahora",
  "Retiro en sucursal sin cargo · ¡Aprovechá!",
];

const LTHeaderOffer = ({
  isAdmin = false,
  adminItems,
  isPinned = false,
  className = "",
  style,
}) => {
  const navigate = useNavigate();
  const [offerIndex, setOfferIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isAdmin) return undefined;

    const interval = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) return undefined;
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [offerIndex, isAdmin]);

  const resolvedAdminItems = useMemo(() => {
    if (!isAdmin) return [];
    if (adminItems && adminItems.length) {
      // Si el item 'Panel de admin' no tiene onClick, lo agrego
      return adminItems.map((item) =>
        item.label === "Panel de admin"
          ? {
              ...item,
              onClick: item.onClick || (() => navigate("/adminpanel")),
            }
          : item
      );
    }
    return [
      {
        label: "Panel de admin",
        onClick: () => navigate("/adminpanel"),
      },
      { label: "Informes" },
      { label: "Subir producto" },
      { label: "Cerrar sesión" },
    ];
  }, [isAdmin, adminItems, navigate]);

  const baseClassName = [
    "LTHeaderOfferBar",
    isAdmin ? "LTHeaderOfferBar--admin" : "",
    isPinned ? "LTHeaderOfferBar--pinned" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (isAdmin) {
    return (
      <div className={baseClassName} style={style}>
        <nav
          className="LTHeaderOfferAdminMenu"
          aria-label="Accesos de administración"
        >
          {resolvedAdminItems.map(({ label, onClick, variant }) => (
            <button
              key={label}
              type="button"
              className={`LTHeaderOfferAdminButton${
                variant === "danger" ? " LTHeaderOfferAdminButton--danger" : ""
              }`}
              onClick={onClick}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    );
  }

  return (
    <div className={baseClassName} style={style}>
      <span
        key={offerIndex}
        className={`LTHeaderOfferText${
          animating ? " LTHeaderOfferSlideRight" : ""
        }`}
      >
        {offers[offerIndex]}
      </span>
    </div>
  );
};

export default LTHeaderOffer;
