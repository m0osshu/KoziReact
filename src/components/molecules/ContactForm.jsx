import { useState } from "react";
import "../../styles/components/molecules/ContactForm.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje de contacto:", formData);
  };

  return (
    <div className="contact-form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Contáctanos</h1>

        <div className="contact-form__field">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            placeholder="Tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="contact-form__input"
            required
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            name="correo"
            placeholder="ejemplo@correo.com"
            value={formData.correo}
            onChange={handleChange}
            className="contact-form__input"
            required
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            className="contact-form__textarea"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.mensaje}
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        <button type="submit" className="contact-form__button">Enviar mensaje</button>
      </form>
    </div>
  );
}
