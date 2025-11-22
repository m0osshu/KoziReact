// src/services/DireccionService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/direcciones";

// Crea una dirección por defecto para un usuario recién creado
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
      // No lanzamos error para no romper el registro si esto falla
    }
  },
};

export default DireccionService;
