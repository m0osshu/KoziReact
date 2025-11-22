// src/components/molecules/ProductCard.jsx
// NOTA: clases "product-card", "product-card-image", "product-card-info" ya definidas en el CSS

import { useNavigate } from "react-router-dom";
import "../../styles/components/molecules/ProductCard.css";

export default function ProductCard({ producto }) {
  const navigate = useNavigate();
  const { id, nombre, precio, imagenUrl } = producto;

  const handleVerDetalle = () => {
    navigate(`/producto/${id}`);
  };

  const handleAgregarCarrito = () => {
    // Más adelante aquí validaremos sesión real y llamaremos a la API de carrito.
    alert("Debes iniciar sesión para agregar productos al carrito.");
  };

  return (
    <article className="product-card">
      <img
        className="product-card-image"
        src={imagenUrl}
        alt={nombre}
      />
      <div className="product-card-info">
        <h3>{nombre}</h3>
        <p>${Number(precio).toLocaleString("es-CL")}</p>

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
