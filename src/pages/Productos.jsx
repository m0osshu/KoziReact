import { useEffect, useState } from "react";
import "../styles/global.css";
import "../styles/pages/Productos.css";

import ProductoService from "../services/ProductoService";
import CategoriaService from "../services/CategoriaService";
import ProductCard from "../components/molecules/ProductCard";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);

  useEffect(() => {
    const cargarCategorias = async () => {
      const data = await CategoriaService.getAll();
      setCategorias(data || []);
      setCargandoCategorias(false);
    };

    cargarCategorias();
  }, []);

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

  return (
    <div className="productos-page">
      <h1 className="productos-title">Productos</h1>

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
            </div>
          ))}
      </div>
    </div>
  );
}
