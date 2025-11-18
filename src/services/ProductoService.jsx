// src/services/ProductoService.jsx
import axios from "axios";

// URL base de tu API de Kozi en Render
const API_URL = "https://koziapi.onrender.com/api/productos";

const ProductoService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  },

  // OJO: esta ruta es un supuesto típico. Si en tu API usaste otro path, después lo ajustamos.
  getByCategoria: async (categoria) => {
    try {
      const res = await axios.get(`${API_URL}/categoria/${categoria}`);
      return res.data;
    } catch (error) {
      console.error("Error al obtener productos por categoría:", error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error al obtener producto por id:", error);
      return null;
    }
  },
};

export default ProductoService;
