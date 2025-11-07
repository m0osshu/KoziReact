import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { productos } from '../components/data/arrayProducto';
import Button from '../components/atoms/Button';
import '../styles/pages/Producto.css';

const Producto = () => {
  const [searchParams] = useSearchParams();
  const [producto, setProducto] = useState(null);
  const productoId = searchParams.get('id');

  useEffect(() => {
    const productoEncontrado = productos.find(prod => prod.id == productoId);
    setProducto(productoEncontrado);
  }, [productoId]);

  const agregarAlCarrito = () => {
    if (!producto) return;
    
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad = (productoExistente.cantidad || 1) + 1;
    } else {
      producto.cantidad = 1;
      carrito.push(producto);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
  };

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <main className="producto-mostrar">
      <section>
        <div>
          <img id="imgProducto" src={producto.url} alt={producto.nombre} />
        </div>
        <div className="nombreProductoText">
          <h2 id="nombreProducto">{producto.nombre}</h2>
          <h3 id="categoriaProducto">{producto.categoria}</h3>
          <p id="precioProducto">${producto.precio}</p>
          <Button onClick={agregarAlCarrito} className="btn-comprar">
            Comprar
          </Button>
          <Link to="/carrito" className='bx bx-cart'></Link>                   
        </div>
      </section>
    </main>
  );
};

export default Producto;