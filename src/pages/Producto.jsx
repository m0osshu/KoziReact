import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/global.css";
import "../styles/pages/Producto.css";

import ProductoService from "../services/ProductoService";
import ProductDetail from "../components/molecules/ProductDetail";
import Button from "../components/atoms/Button";

export default function Producto() {
  const { id } = useParams();
  const navigate = useNavigate();

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
        <Button onClick={() => navigate("/productos")}>
          Volver a productos
        </Button>
      </div>
    );
  }

  return (
    <div className="producto-page">
      <ProductDetail
        producto={producto}
        onVolver={() => navigate("/productos")}
      />
    </div>
  );
}
