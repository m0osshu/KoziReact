import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/categoriass";

const CategoriassService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener relaciones de categorias:", error);
      return [];
    }
  },

  create: async ({ productoId, categoriaId }) => {
    try {
      const body = {
        producto: { id: productoId },
        categoria: { id: categoriaId },
      };

      const res = await axios.post(`${API_URL}/${productoId}`, body);
      return res.data;
    } catch (error) {
      console.error("Error al crear relación producto-categoría:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar relación producto-categoría:", error);
      throw error;
    }
  },
};

export default CategoriassService;
