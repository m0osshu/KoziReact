import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';
import { productos } from '../data/productos';
import '../styles/pages/Catalogo.css';  // Así debe estar

const Catalogo = () => {
  const [categoria, setCategoria] = useState("Todas");

  // Función para obtener la URL correcta de la imagen desde la carpeta 'src'
  const getImageUrl = (path) => {
    // La ruta en new URL() debe ser relativa desde este archivo hasta la carpeta 'src'
    return new URL(`../${path}`, import.meta.url).href;
  };

  const productosConUrlCorregida = productos.map(p => ({
    ...p,
    url: getImageUrl(p.url.replace('/assets/', 'assets/')) // Corregimos la ruta para la función
  }));

  const productosFiltrados = productosConUrlCorregida.filter(producto => 
    categoria === "Todas" || producto.categoria === categoria
  );

  return (
    <div>
      <section className="filtro-catalogo">
        <Link to="/carrito" className='bx bx-cart'></Link>        
        <label htmlFor="categoria">Filtrar por categoría:</label>
        <select 
          id="categoria" 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Todas">Todas las categorías</option>
          <option value="Collar">Collares</option>
          <option value="Anillo">Anillos</option>
          <option value="Pulsera">Pulseras</option>
        </select>
      </section>
      
      <main id="catalogo">
        {productosFiltrados.map(producto => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </main>
    </div>
  );
};

export default Catalogo;