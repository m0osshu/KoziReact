import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';
import '../styles/pages/Carrito.css';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    mostrarCarrito();
  }, []);

  const mostrarCarrito = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoStorage);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  const comprar = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  const total = carrito.reduce((sum, producto) => 
    sum + (producto.precio * (producto.cantidad || 1)), 0
  );

  return (
    <main>
      <h2>Tu Carrito</h2>
      <div id="carrito">
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito</p>
        ) : (
          carrito.map((producto, index) => {
            const subtotal = producto.precio * (producto.cantidad || 1);
            return (
              <div key={index} className="producto-carrito">
                <img src={producto.url} alt={producto.nombre} width="50" />
                <div>
                  <h2>{producto.nombre}</h2>
                  <p>Precio: ${producto.precio} | Cantidad: {producto.cantidad || 1}</p>
                  <p>Subtotal: ${subtotal}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(index)}>❌</button>
              </div>
            );
          })
        )}
      </div>
      <p id="total">Total: ${total}</p>
      <Button onClick={comprar}>Finalizar compra</Button>
      <Link to="/catalogo">Seguir Comprando</Link>
    </main>
  );
};

export default Carrito;