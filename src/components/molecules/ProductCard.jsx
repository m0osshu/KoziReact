// src/components/molecules/ProductCard.jsx
// NOTA: clases "product-card", "product-card-image", "product-card-info"
// y "product-card-actions", "btn-detalle", "btn-carrito" ya definidas en el CSS

import { useNavigate } from "react-router-dom";
import "../../styles/components/molecules/ProductCard.css";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

export default function ProductCard({ producto }) {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { addToCart } = useCart();

  if (!producto) return null;

  const { id, nombre, precio, imagenUrl } = producto;

  const handleVerDetalle = () => {
    navigate(`/producto/${id}`);
  };

  const handleAgregarCarrito = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/ingresar");
      return;
    }

    addToCart(producto, 1);
    alert("Producto agregado al carrito.");
  };

  return (
    <article className="product-card">
      {imagenUrl && (
        <img
          className="product-card-image"
          src={imagenUrl}
          alt={nombre}
        />
      )}

      <div className="product-card-info">
        <h3>{nombre}</h3>
        <p>${Number(precio ?? 0).toLocaleString("es-CL")}</p>

        <div className="product-card-actions">
          <button
            type="button"
            className="btn-detalle"
            onClick={handleVerDetalle}
          >
            Ver detalle
          </button>
          <button
            type="button"
            className="btn-carrito"
            onClick={handleAgregarCarrito}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}
