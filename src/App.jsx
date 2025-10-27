import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthModalProvider } from "./context/AuthModalContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import Home from "./pages/Home/Home";
import LTLogin from "./pages/Login/LTLogin";
import LTRegister from "./pages/Register/LTRegister";
import LTMyAccount from "./pages/MyAccount/LTMyAccount";
import LTFavorites from "./pages/MyAccount/LTFavorites";
import LTNotifications from "./pages/MyAccount/LTNotifications";
import LTPersonalInfo from "./pages/MyAccount/LTPersonalInfo";
import LTAddresses from "./pages/MyAccount/LTAddresses";
import LTPaymentMethods from "./pages/MyAccount/PaymentMethods/LTPaymentMethods";
import LTSecurity from "./pages/MyAccount/Security/LTSecurity";
import LTPreOrders from "./pages/MyAccount/PreOrders/LTPreOrders";
import LTVouchers from "./pages/MyAccount/Vouchers/LTVouchers";
import LTShippingStatus from "./pages/MyAccount/ShippingStatus/LTShippingStatus";
import LTHistory from "./pages/MyAccount/History/LTHistory";
import LTFavoriteBrands from "./pages/MyAccount/FavoriteBrands/LTFavoriteBrands";
import MainLayout from "./components/Layout/MainLayout/MainLayout";
import LoginLayout from "./components/Layout/LoginLayout/LoginLayout";
import AccountLayout from "./components/Layout/AccountLayout/AccountLayout";
import LTAdminLayout from "./components/Layout/AdminLayout/LTAdminLayout";
import "./styles/App.css";
import LTAdminPanel from "./pages/AdminPanel/LTAdminPanel";
import { getCurrentUser } from "./utils/authStorage";

// Small route guard for admin-only pages. It checks the stored user for an
// `isAdmin` boolean or `role === 'admin'`. If not present, redirects to login.
const AdminRoute = ({ children }) => {
  const user = getCurrentUser();
  const isAdmin = user && (user.isAdmin || user.role === "admin");
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthModalProvider>
          <FavoritesProvider>
            {/* Modal de Login - Se renderiza globalmente */}
            <LTLogin />

            <Routes>
              {/* Rutas con Layout Principal (Header + Navbar + Footer) */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                {/* Aquí podes agregar más rutas: productos, categorías, etc. */}
              </Route>

              {/* Ruta de Admin Panel con layout minimal propio */}
              <Route
                path="/adminpanel"
                element={
                  <AdminRoute>
                    <LTAdminLayout>
                      <LTAdminPanel />
                    </LTAdminLayout>
                  </AdminRoute>
                }
              />

              {/* Rutas con Layout de Autenticación (Header + Footer, sin Navbar ni HeaderOffer) */}
              <Route element={<LoginLayout />}>
                <Route path="/register" element={<LTRegister />} />
              </Route>

              {/* Rutas con Layout de Cuenta (Header sin Offer + Navbar + Footer) */}
              <Route element={<AccountLayout />}>
                <Route path="/my-account" element={<LTMyAccount />} />
                <Route path="/my-account/favorites" element={<LTFavorites />} />
                <Route
                  path="/my-account/notifications"
                  element={<LTNotifications />}
                />
                <Route
                  path="/my-account/personal-info"
                  element={<LTPersonalInfo />}
                />
                <Route path="/my-account/addresses" element={<LTAddresses />} />
                <Route
                  path="/my-account/payment-methods"
                  element={<LTPaymentMethods />}
                />
                <Route path="/my-account/security" element={<LTSecurity />} />
                <Route
                  path="/my-account/pre-orders"
                  element={<LTPreOrders />}
                />
                <Route path="/my-account/vouchers" element={<LTVouchers />} />
                <Route
                  path="/my-account/shipping-status"
                  element={<LTShippingStatus />}
                />
                <Route path="/my-account/history" element={<LTHistory />} />
                <Route
                  path="/my-account/favorite-brands"
                  element={<LTFavoriteBrands />}
                />
              </Route>

              {/* Ruta 404 - Redirige al home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FavoritesProvider>
        </AuthModalProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
