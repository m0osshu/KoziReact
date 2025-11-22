// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/pages/Productos.css";

import ProductoService from "../services/ProductoService";
import CategoriaService from "../services/CategoriaService";
import ProductCard from "../components/molecules/ProductCard";
import Button from "../components/atoms/Button";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  const navigate = useNavigate();

  // Cargar categorías al entrar
  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data || []);
      setCargandoCategorias(false);
    };

    cargarCategorias();
  }, []);

  // Cargar productos (todos o por categoría)
  useEffect(() => {
    const cargarProductos = async () => {
      setCargandoProductos(true);

      let data = [];
      if (categoriaSeleccionada === "todas") {
        data = await ProductoService.getAll();
      } else {
        data = await ProductoService.getByCategoria(categoriaSeleccionada);
      }

      setProductos(data || []);
      setCargandoProductos(false);
    };

    cargarProductos();
  }, [categoriaSeleccionada]);

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  const handleVerDetalle = (id) => {
    navigate(`/producto/${id}`);
  };

  const handleAgregarCarrito = (producto) => {
    // Más adelante aquí conectaremos la lógica real del carrito.
    // Por ahora solo dejamos un placeholder para que tu profe vea la intención.
    console.log("Agregar al carrito (pendiente de login):", producto);
    alert("Esta función se activará cuando integremos el login y el carrito.");
  };

  return (
    <div className="productos-page">
      <h1 className="productos-title">Productos</h1>

      {/* Filtro por categoría */}
      <div className="productos-filtro">
        <label htmlFor="categoria-select">Filtrar por categoría:</label>
        <select
          id="categoria-select"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="todas">Todas las categorías</option>
          {!cargandoCategorias &&
            categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre ?? cat.categoria ?? `Categoría ${cat.id}`}
              </option>
            ))}
        </select>
      </div>

      {/* Grid de productos */}
      <div className="productos-grid">
        {cargandoProductos && <p>Cargando productos...</p>}

        {!cargandoProductos && productos.length === 0 && (
          <p>No se encontraron productos para esta categoría.</p>
        )}

        {!cargandoProductos &&
          productos.length > 0 &&
          productos.map((producto) => (
            <div key={producto.id} className="productos-item">
              <ProductCard producto={producto} />

              <div className="productos-actions">
                <Button
                  className="productos-btn productos-btn-detalle"
                  onClick={() => handleVerDetalle(producto.id)}
                >
                  Ver detalle
                </Button>

                <Button
                  className="productos-btn productos-btn-carrito"
                  onClick={() => handleAgregarCarrito(producto)}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
