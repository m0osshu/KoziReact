import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import React from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    password: "",
    recordar: false,
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.correo, formData.password);
      navigate("/");
    } catch (error) {
      alert("Error al iniciar sesión. Verifica tus credenciales.");
    }
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

        <div className="login-form__terms">
          <label>
            <input
              type="checkbox"
              name="recordar"
              checked={formData.recordar}
              onChange={handleChange}
            />
            Recuérdame
          </label>
          <Link to="/restablecer-contraseña">¿Olvidaste tu contraseña?</Link>
        </div>

        <button type="submit" className="login-form__button">
          Ingresar
        </button>

        <div className="login-form__register-link">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registrar">Regístrate ahora</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
