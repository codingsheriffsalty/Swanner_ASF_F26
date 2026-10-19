import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SiteNavbar from "./components/SiteNavbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationsPage from "./pages/ReservationsPage";
import CartPage from "./pages/CartPage";

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: Math.min(5, entry.quantity + quantity) }
            : entry
        );
      }
      return [...current, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: Math.min(5, quantity),
      }];
    });
  };

  const updateQuantity = (id, quantity) => {
    const safeQuantity = Number(quantity);
    if (!Number.isFinite(safeQuantity) || safeQuantity < 1) {
      setCart((current) => current.filter((item) => item.id !== id));
      return;
    }
    setCart((current) => current.map((item) =>
      item.id === id ? { ...item, quantity: Math.min(5, Math.max(1, safeQuantity)) } : item
    ));
  };

  const removeFromCart = (id) => setCart((current) => current.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  return (
    <>
      <SiteNavbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/cart" element={
          <CartPage cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="site-footer">
        <p className="mb-1">The Freepaw Underground</p>
        <small>Good chocolate. Free people. No masters.</small>
      </footer>
    </>
  );
}
