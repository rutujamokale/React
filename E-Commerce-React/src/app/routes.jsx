import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "../pages/HomePage";
import ProductCatalogPage from "../pages/product/ProductCatalogPage";
import CartPage from "../pages/cart/CartPage";
import CheckoutPage from "../pages/checkout/CheckoutPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductCatalogPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Register" element={<RegisterPage/>} />


    </Routes>
  );
};

export default AppRoutes;
