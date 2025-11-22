// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("kozi_usuario");
    if (stored) {
      setUsuario(JSON.parse(stored));
    }
  }, []);

  const login = async (email, password) => {
    const user = await UsuarioService.login(email, password);
    setUsuario(user);
    localStorage.setItem("kozi_usuario", JSON.stringify(user));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("kozi_usuario");
  };

  const register = async (data) => {
    const user = await UsuarioService.register(data);
    // Puedes decidir si loguearlo automático después de registrarse
    setUsuario(user);
    localStorage.setItem("kozi_usuario", JSON.stringify(user));
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
