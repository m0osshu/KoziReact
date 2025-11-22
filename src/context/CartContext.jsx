// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("kozi_cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kozi_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.producto.id === producto.id);
      if (existing) {
        return prev.map((i) =>
          i.producto.id === producto.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        );
      }
      return [...prev, { producto, cantidad }];
    });
  };

  const removeFromCart = (productoId) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
  };

  const updateQuantity = (productoId, nuevaCantidad) => {
    if (nuevaCantidad <= 0) {
      setItems((prev) => prev.filter((i) => i.producto.id !== productoId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.producto.id === productoId ? { ...i, cantidad: nuevaCantidad } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  const totalPrecio = items.reduce(
    (acc, i) => acc + (i.producto.precio || 0) * i.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
