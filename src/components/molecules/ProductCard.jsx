// src/components/molecules/ProductCard.jsx
// NOTA: clases "product-card", "product-card-image", "product-card-info" creadas por ia

import "../../styles/components/molecules/ProductCard.css";

export default function ProductCard({ producto }) {
  const { nombre, precio, imagenUrl } = producto;

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
      </div>
    </article>
  );
}
