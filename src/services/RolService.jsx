// src/services/RolService.jsx
import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/roles";

const RolService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener roles:", error);
      throw error;
    }
  },
};

export default RolService;
