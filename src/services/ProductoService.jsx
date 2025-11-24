import axios from "axios";

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

  getUltimos6: async () => {
    try {
      const res = await axios.get(`${API_URL}/ultimos6`);
      return res.data;
    } catch (error) {
      console.error("Error al obtener últimos 6 productos:", error);
      return [];
    }
  },

  getByCategoria: async (categoriaId) => {
    try {
      const res = await axios.get(`${API_URL}/categoria/${categoriaId}`);
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

  // ---------- ADMIN ----------

  create: async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      return res.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(`Error al actualizar producto ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar producto ${id}:`, error);
      throw error;
    }
  },
};

export default ProductoService;
