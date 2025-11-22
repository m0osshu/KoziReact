// src/services/UsuarioService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/usuarios";

// IDs por defecto para registro normal desde el front
const DEFAULT_ROL_ID = 1;        // Rol "Usuario" normal (no admin)
const DEFAULT_MEMBRESIA_ID = 2;  // STANDARD (según tu BD)

const UsuarioService = {
  // 🔹 Login
  login: async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return res.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  },

  // 🔹 Registro
  register: async ({ nombreUsuario, email, password, fotoPerfil }) => {
    try {
      const body = {
        nombreUsuario,
        email,
        password,
        fotoPerfil: fotoPerfil || null,
        activo: true,
        rol: { id: DEFAULT_ROL_ID },
        membresia: { id: DEFAULT_MEMBRESIA_ID },
      };

      const res = await axios.post(API_URL, body);
      return res.data;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  },

  // 🔹 Admin: obtener todos los usuarios
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  },

  // 🔹 Admin: obtener uno por id (por si lo necesitas después)
  getById: async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.error(`Error al obtener usuario ${id}:`, error);
      throw error;
    }
  },

  // 🔹 Admin: actualización parcial (usa PATCH)
  updatePartial: async (id, data) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, data);
      return res.data;
    } catch (error) {
      console.error(`Error al actualizar usuario ${id}:`, error);
      throw error;
    }
  },

  // 🔹 Admin: eliminar usuario
  delete: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar usuario ${id}:`, error);
      throw error;
    }
  },
};

export default UsuarioService;
export { DEFAULT_ROL_ID, DEFAULT_MEMBRESIA_ID };
