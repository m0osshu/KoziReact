// src/services/PedidoService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/pedidos";

// TODO: reemplazar estos IDs según los catálogos que tengas en la BD
const ESTADO_CREADO_ID = 1;   // Por ejemplo, estado "creado"
const ENVIO_DEFAULT_ID = 1;   // Por ejemplo, "Chilexpress" o lo que uses
const PAGO_DEFAULT_ID = 1;    // Por ejemplo, "Tarjeta", "Transferencia"

const PedidoService = {
  crearPedido: async ({ total, usuarioId }) => {
    const body = {
      fechaCreacion: null, // el backend puede manejarlo si quieres
      total,
      usuario: { id: usuarioId },
      estado: { id: ESTADO_CREADO_ID },
      envio: { id: ENVIO_DEFAULT_ID },
      pago: { id: PAGO_DEFAULT_ID },
    };

    const res = await axios.post(API_URL, body);
    return res.data;
  },
};

export default PedidoService;
export { ESTADO_CREADO_ID, ENVIO_DEFAULT_ID, PAGO_DEFAULT_ID };
