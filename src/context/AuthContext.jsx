// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService";
import DireccionService from "../services/DireccionService";

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
    // El vaciado de carrito lo haremos desde la Navbar usando CartContext,
    // para no acoplar contextos entre sí.
  };

  const register = async (data) => {
    // data debe ser { nombreUsuario, email, password, fotoPerfil }
    const user = await UsuarioService.register(data);

    // Crear dirección por defecto para este usuario
    if (user && user.id) {
      await DireccionService.crearDireccionPorDefecto(user.id);
    }

    // Loguear automáticamente al usuario recién creado
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
