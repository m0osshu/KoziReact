// src/components/organisms/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/components/organisms/Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const { totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [isGestionOpen, setIsGestionOpen] = useState(false);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };

  const toggleGestion = () => {
    setIsGestionOpen((prev) => !prev);
  };

  const closeGestion = () => setIsGestionOpen(false);

  return (
    <header className="header">
      <NavLink to="/" className="logo" onClick={closeGestion}>
        kÖzi
      </NavLink>

      <nav className="navbar">
        <NavLink to="/productos" onClick={closeGestion}>
          Productos
        </NavLink>
        <NavLink to="/blog" onClick={closeGestion}>
          Blogs
        </NavLink>
        <NavLink to="/contacto" onClick={closeGestion}>
          Nosotros
        </NavLink>

        {/* Dropdown Gestión solo para admin */}
        {usuario?.rol?.id === 2 && (
          <div
            className={`navbar-dropdown ${isGestionOpen ? "open" : ""}`}
          >
            <button
              type="button"
              className="navbar-dropdown-toggle"
              onClick={toggleGestion}
            >
              Gestión ▾
            </button>

            <ul className="navbar-dropdown-menu">
              <li>
                <NavLink to="/admin/usuarios" onClick={closeGestion}>
                  Usuarios
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/productos" onClick={closeGestion}>
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/categorias" onClick={closeGestion}>
                  Categorías
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/pedidos" onClick={closeGestion}>
                  Pedidos
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Ícono de carrito con contador (solo si hay items) */}
        <NavLink to="/carrito" className="navbar-cart" onClick={closeGestion}>
          Carrito
          {totalItems > 0 && (
            <span className="navbar-cart-count">{totalItems}</span>
          )}
        </NavLink>

        {/* Ingresar / Desconectar según sesión */}
        {usuario ? (
          <button
            type="button"
            className="navbar-logout-button"
            onClick={() => {
              closeGestion();
              handleLogout();
            }}
          >
            Desconectar
          </button>
        ) : (
          <NavLink to="/ingresar" onClick={closeGestion}>
            Ingresar
          </NavLink>
        )}
      </nav>
    </header>
  );
}
