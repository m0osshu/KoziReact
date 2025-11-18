// src/components/molecules/RegisterForm.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    tipoUsuario: "",
    contrasenia: "",
    confirmarContrasenia: "",
    aceptaTerminos: false,
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

    if (formData.contrasenia !== formData.confirmarContrasenia) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!formData.aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    // Aquí iría el llamado a la API de registro cuando la tengas lista
    console.log("Datos de registro:", formData);
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Crear cuenta</h1>

        <div className="login-form__input-box">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="login-form__input"
          />
          <i className='bx bxs-user'></i>
        </div>

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
          <i className='bx bxs-envelope'></i>
        </div>

        <div className="login-form__select-container">
          <select
            name="tipoUsuario"
            className="login-form__select"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Tipo de usuario</option>
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="login-form__input-box">
          <input
            type="password"
            name="contrasenia"
            placeholder="Contraseña"
            value={formData.contrasenia}
            onChange={handleChange}
            required
            className="login-form__input"
          />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <div className="login-form__input-box">
          <input
            type="password"
            name="confirmarContrasenia"
            placeholder="Confirmar contraseña"
            value={formData.confirmarContrasenia}
            onChange={handleChange}
            required
            className="login-form__input"
          />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <div className="login-form__terms">
          <label>
            <input type="checkbox" name="aceptaTerminos" checked={formData.aceptaTerminos} onChange={handleChange} required />
            Acepto los términos y condiciones
          </label>
        </div>

        <button type="submit" className="login-form__button">Registrarse</button>

        <div className="login-form__register-link">
          <p>¿Ya tienes una cuenta? <Link to="/ingresar">Inicia sesión</Link></p>
        </div>
      </form>
    </div>
  );
}
