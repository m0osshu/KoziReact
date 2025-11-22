// src/components/organisms/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/components/organisms/Navbar.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const { totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Desconectar usuario
    logout();
    // Vaciar carrito al cerrar sesión
    clearCart();
    // Enviar al home
    navigate("/");
  };

  return (
    <header className="header">
      <NavLink to="/" className="logo">
        kÖzi
      </NavLink>

      <nav className="navbar">
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/blog">Blogs</NavLink>
        <NavLink to="/contacto">Nosotros</NavLink>

        {/* Ícono de carrito con contador (solo si hay items) */}
        <NavLink to="/carrito" className="navbar-cart">
          🛒
          {totalItems > 0 && (
            <span className="navbar-cart-count">{totalItems}</span>
          )}
        </NavLink>

        {/* Ingresar / Desconectar según sesión */}
        {usuario ? (
          <button
            type="button"
            className="navbar-logout-button"
            onClick={handleLogout}
          >
            Desconectar
          </button>
        ) : (
          <NavLink to="/ingresar">Ingresar</NavLink>
        )}
      </nav>
    </header>
  );
}
