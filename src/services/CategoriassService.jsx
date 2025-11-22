// src/services/CategoriassService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/categoriass";

const CategoriassService = {
  // Obtener todas las relaciones producto-categoría
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener relaciones de categorias:", error);
      return [];
    }
  },

  // Crear relación producto-categoría
  // IMPORTANTE: el @PostMapping está como "/{id}", pero el {id} NO se usa en el controller.
  // Podemos mandarle cualquier número en la URL (por ejemplo el id del producto).
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

  // Eliminar una relación por su id
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
