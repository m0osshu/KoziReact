import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/direcciones";

// Crea una dirección por defecto
// nombreCalle: "Jose C Paz"
// numeroCalle: 1665
// comuna.id: 5
const DireccionService = {
  crearDireccionPorDefecto: async (usuarioId) => {
    try {
      const body = {
        nombreCalle: "Jose C Paz",
        numeroCalle: 1665,
        comuna: { id: 5 },
        usuario: { id: usuarioId },
      };

      const res = await axios.post(API_URL, body);
      return res.data;
    } catch (error) {
      console.error("Error al crear dirección por defecto:", error);
    }
  },
};

export default DireccionService;
