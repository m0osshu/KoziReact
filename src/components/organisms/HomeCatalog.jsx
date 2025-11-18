// src/components/organisms/HomeCatalog.jsx
// NOTA: clases "home-catalog", "home-catalog-title", "home-catalog-grid" creadas por ia

import { useEffect, useState } from "react";
import ProductoService from "../../services/ProductoService";
import ProductCard from "../molecules/ProductCard";
import "../../styles/components/organisms/HomeCatalog.css";

export default function HomeCatalog() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      const data = await ProductoService.getAll();
      setProductos(data || []);
      setCargando(false);
    };

    cargarProductos();
  }, []);

  return (
    <section className="home-catalog">
      <h2 className="home-catalog-title">Catálogo Destacado</h2>

      <div className="home-catalog-grid">
        {cargando && <p>Cargando productos...</p>}

        {!cargando && productos.length === 0 && (
          <p>No hay productos disponibles aún.</p>
        )}

        {!cargando &&
          productos.length > 0 &&
          productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
      </div>
    </section>
  );
}
