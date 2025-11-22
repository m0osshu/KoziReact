// src/services/UsuarioService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/usuarios";

// TODO: reemplazar estos IDs con los que existan en tu BD
const DEFAULT_ROL_ID = 1;        // Rol "Usuario" normal (no admin)
const DEFAULT_MEMBRESIA_ID = 1;  // Membresía "Standart" o similar

const UsuarioService = {
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
};

export default UsuarioService;
