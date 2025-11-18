// src/pages/Producto.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/global.css";
import "../styles/pages/Producto.css"; // NOTA: clase "producto-page" creada por ia
import ProductoService from "../services/ProductoService";
import ProductCard from "../components/molecules/ProductCard";

export default function Producto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProducto = async () => {
      const data = await ProductoService.getById(id);
      setProducto(data);
      setCargando(false);
    };

    cargarProducto();
  }, [id]);

  if (cargando) {
    return (
      <div className="producto-page">
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="producto-page">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="producto-page">
      {/* Por ahora reutilizamos ProductCard, más adelante podemos hacer un layout de detalle más completo */}
      <ProductCard producto={producto} />
    </div>
  );
}
