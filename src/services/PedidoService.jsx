// src/services/PedidoService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/pedidos";

// IDs por defecto para crear pedido desde el carrito
const ESTADO_PAGADO_ID = 1; // Pagado
const ENVIO_DEFAULT_ID = 1; // Chilexpress
const PAGO_DEBITO_ID = 2;   // Débito

const PedidoService = {
  // ---------- FRONT USUARIO: CREAR PEDIDO ----------
  crearPedido: async ({ total, usuarioId }) => {
    const body = {
      fechaCreacion: new Date().toISOString(), // LocalDateTime
      total,
      usuario: { id: usuarioId },
      estado: { id: ESTADO_PAGADO_ID },
      envio: { id: ENVIO_DEFAULT_ID },
      pago: { id: PAGO_DEBITO_ID },
    };

    const res = await axios.post(API_URL, body);
    return res.data;
  },

  // ---------- ADMIN: CRUD PEDIDOS ----------

  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      throw error;
    }
  },

  // Para cambiar estado/envio/pago usamos PATCH
  updatePartial: async (id, data) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(`Error al actualizar pedido ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar pedido ${id}:`, error);
      throw error;
    }
  },
};

export default PedidoService;
export { ESTADO_PAGADO_ID, ENVIO_DEFAULT_ID, PAGO_DEBITO_ID };
