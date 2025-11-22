// src/services/CategoriaService.jsx
import axios from "axios";

// URL base de tu API de Kozi en Render
const API_URL = "https://koziapi.onrender.com/api/categorias";

const CategoriaService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      return [];
    }
  },

  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error al obtener categoría por id:", error);
      return null;
    }
  },
};

export default CategoriaService;
