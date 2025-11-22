// src/components/molecules/ProductDetail.jsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Button from "../atoms/Button";
import "../../styles/components/molecules/ProductDetail.css"; // opcional, si luego quieres estilos

export default function ProductDetail({ producto, onVolver }) {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { addToCart } = useCart();

  if (!producto) return null;

  const {
    id,
    nombre,
    precio,
    imagenUrl,
    descripcion,
    descripcionProducto,
  } = producto;

  const textoDescripcion =
    descripcion ?? descripcionProducto ?? "Sin descripción disponible.";

  const handleAgregarCarrito = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      navigate("/ingresar");
      return;
    }

    addToCart(producto, 1);
    alert("Producto agregado al carrito.");
  };

  const handleVolverClick = () => {
    if (onVolver) {
      onVolver();
    } else {
      navigate("/productos");
    }
  };

  return (
    <div className="producto-detalle-layout">
      {/* Imagen izquierda */}
      <div className="producto-detalle-imagen">
        {imagenUrl && <img src={imagenUrl} alt={nombre} />}
      </div>

      {/* Info derecha */}
      <div className="producto-detalle-info">
        <h1 className="producto-detalle-titulo">{nombre}</h1>

        <p className="producto-detalle-precio">
          ${Number(precio ?? 0).toLocaleString("es-CL")}
        </p>

        <p className="producto-detalle-descripcion">{textoDescripcion}</p>

        <div className="producto-detalle-acciones">
          <Button
            className="producto-btn producto-btn-carrito"
            onClick={handleAgregarCarrito}
          >
            Agregar al carrito
          </Button>

          <Button
            className="producto-btn producto-btn-volver"
            onClick={handleVolverClick}
          >
            Volver a productos
          </Button>
        </div>
      </div>
    </div>
  );
}
