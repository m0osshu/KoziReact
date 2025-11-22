// src/services/PedidoService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/pedidos";

// IDs reales:
// estado: 1 = Pagado
// envio: 1 = Chilexpress
// pago:  2 = Débito
const ESTADO_PAGADO_ID = 1;
const ENVIO_DEFAULT_ID = 1;
const PAGO_DEBITO_ID = 2;

const PedidoService = {
  crearPedido: async ({ total, usuarioId }) => {
    const body = {
      // LocalDateTime esperado por el backend
      fechaCreacion: new Date().toISOString(),
      total,
      usuario: { id: usuarioId },
      estado: { id: ESTADO_PAGADO_ID },
      envio: { id: ENVIO_DEFAULT_ID },
      pago: { id: PAGO_DEBITO_ID },
    };

    const res = await axios.post(API_URL, body);
    return res.data;
  },
};

export default PedidoService;
