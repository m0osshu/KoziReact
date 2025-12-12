import { useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Text from "../atoms/Text";
import "../../styles/components/molecules/ResetPasswordForm.css";

export default function ResetPasswordForm() {
  const [correo, setCorreo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Solicitud de restablecer contraseña para:", correo);
  };

  return (
    <form className="reset-form" onSubmit={handleSubmit}>
      <h1 className="reset-form-title">Restablecer contraseña</h1>

      <p className="reset-form-instruction">
        Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <div className="reset-form-field">
        <Text>Correo electrónico</Text>
        <Input
          type="email"
          name="correo"
          placeholder="ejemplo@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>

      <div className="reset-form-actions">
        <Button type="submit">
          Enviar enlace
        </Button>
      </div>

      <div className="reset-form-link">
        <p>
          <Link to="/ingresar">← Volver al inicio de sesión</Link>
        </p>
      </div>
    </form>
  );
}
