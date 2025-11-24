import axios from "axios";

const API_URL = "https://koziapi.onrender.com/api/membresias";

const MembresiaService = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.error("Error al obtener membresías:", error);
      throw error;
    }
  },
};

export default MembresiaService;
