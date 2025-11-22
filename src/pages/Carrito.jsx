// src/pages/Carrito.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/pages/Carrito.css"; // si no existe, no pasa nada, solo no habrá estilos extra

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import PedidoService from "../services/PedidoService";
import ProductosPedidoService from "../services/ProductosPedidoService";
import Button from "../components/atoms/Button";

export default function Carrito() {
  const {
    items,
    totalPrecio,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [mostrandoConfirmacion, setMostrandoConfirmacion] = useState(false);
  const [procesandoCompra, setProcesandoCompra] = useState(false);

  const handleCambiarCantidad = (productoId, nuevaCantidad) => {
    const valor = parseInt(nuevaCantidad, 10);
    if (isNaN(valor) || valor <= 0) {
      return;
    }
    updateQuantity(productoId, valor);
  };

  const handleEliminar = (productoId) => {
    removeFromCart(productoId);
  };

  const handleVaciar = () => {
    if (items.length === 0) return;
    if (window.confirm("¿Seguro que deseas vaciar el carrito?")) {
      clearCart();
    }
  };

  const handleFinalizarCompraClick = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para finalizar la compra.");
      navigate("/ingresar");
      return;
    }

    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    setMostrandoConfirmacion(true);
  };

  const handleConfirmarCompra = async () => {
    if (!usuario || items.length === 0) {
      setMostrandoConfirmacion(false);
      return;
    }

    try {
      setProcesandoCompra(true);

      // 1. Crear pedido en la API
      const pedido = await PedidoService.crearPedido({
        total: totalPrecio,
        usuarioId: usuario.id,
      });

      // 2. Crear líneas de productos para este pedido
      for (const item of items) {
        await ProductosPedidoService.crearLinea({
          pedidoId: pedido.id,
          productoId: item.producto.id,
          cantidad: item.cantidad,
        });
      }

      // 3. Vaciar carrito y cerrar modal
      clearCart();
      setMostrandoConfirmacion(false);

      // 4. Mensaje de éxito
      alert("Compra realizada exitosamente.");
      // Si quieres, podrías redirigir al home:
      // navigate("/");
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Ocurrió un error al procesar la compra. Inténtalo más tarde.");
    } finally {
      setProcesandoCompra(false);
    }
  };

  const handleCancelarCompra = () => {
    setMostrandoConfirmacion(false);
  };

  return (
    <div className="carrito-page">
      <h1>Tu carrito</h1>

      {items.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          <div className="carrito-lista">
            {items.map((item) => (
              <div key={item.producto.id} className="carrito-item">
                <div className="carrito-item-info">
                  <h3>{item.producto.nombre || `Producto ${item.producto.id}`}</h3>
                  <p>Precio unitario: ${item.producto.precio ?? 0}</p>
                </div>

                <div className="carrito-item-controles">
                  <label>
                    Cantidad:
                    <input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) =>
                        handleCambiarCantidad(item.producto.id, e.target.value)
                      }
                    />
                  </label>

                  <Button
                    className="carrito-btn carrito-btn-eliminar"
                    onClick={() => handleEliminar(item.producto.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <p>Total: ${totalPrecio}</p>

            <div className="carrito-acciones">
              <Button
                className="carrito-btn carrito-btn-vaciar"
                onClick={handleVaciar}
              >
                Vaciar carrito
              </Button>

              <Button
                className="carrito-btn carrito-btn-comprar"
                onClick={handleFinalizarCompraClick}
              >
                Finalizar compra
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Modal de confirmación simple */}
      {mostrandoConfirmacion && (
        <div className="carrito-modal-backdrop">
          <div className="carrito-modal">
            <h2>Confirmar compra</h2>
            <p>¿Confirmas la compra por un total de ${totalPrecio}?</p>

            <div className="carrito-modal-acciones">
              <Button
                className="carrito-btn carrito-btn-cancelar"
                onClick={handleCancelarCompra}
                disabled={procesandoCompra}
              >
                Cancelar
              </Button>

              <Button
                className="carrito-btn carrito-btn-confirmar"
                onClick={handleConfirmarCompra}
                disabled={procesandoCompra}
              >
                {procesandoCompra ? "Procesando..." : "Confirmar compra"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
