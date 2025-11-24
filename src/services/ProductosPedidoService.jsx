import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/productosPedidos";

const ProductosPedidoService = {
  crearLinea: async ({ pedidoId, productoId, cantidad }) => {
    const body = {
      cantidad,
      pedido: { id: pedidoId },
      producto: { id: productoId },
    };

    const res = await axios.post(API_URL, body);
    return res.data;
  },
};

export default ProductosPedidoService;
