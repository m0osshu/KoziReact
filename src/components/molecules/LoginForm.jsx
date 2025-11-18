// src/components/molecules/LoginForm.jsx
// NOTA: clases "login-form", "login-form-title", "login-form-field", "login-form-remember-forgot", "login-form-checkbox", "login-form-actions", "login-form-link" creadas por ia

import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
    recordar: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí más adelante se puede conectar con la API de login
    console.log("Datos de login:", formData);
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>

        <div className="login-form__input-box">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            value={formData.correo}
            onChange={handleChange}
            required
            className="login-form__input"
          />
          <i className='bx bxs-user'></i>
        </div>

        <div className="login-form__input-box">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-form__input"
          />
          <i className='bx bxs-lock-alt'></i>
        </div>

        {/* NOTA: Los estilos para "recordar" y "olvidé contraseña" se pueden añadir a LoginForm.css si es necesario. */}
        {/* Por ahora, usamos la clase de términos como base. */}
        <div className="login-form__terms">
          <label>
            <input type="checkbox" name="recordar" checked={formData.recordar} onChange={handleChange} />
            Recuérdame
          </label>
          <Link to="/restablecer-contraseña">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit" className="login-form__button">Ingresar</button>

        <div className="login-form__register-link">
          <p>¿No tienes una cuenta? <Link to="/registrar">Regístrate ahora</Link></p>
        </div>
      </form>
    </div>
  );
}
