import { useEffect, useState } from "react";
import AdminFormField from "./AdminFormField";
import "../../styles/components/molecules/Forms.css";
import React from 'react';

export default function UsuarioForm({
  initialData,
  roles = [],
  membresias = [],
  onSubmit,
  onCancel,
}) {
  const [formValues, setFormValues] = useState({
    nombreUsuario: "",
    email: "",
    rolId: "",
    membresiaId: "",
    activo: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormValues({
        nombreUsuario: initialData.nombreUsuario || "",
        email: initialData.email || "",
        rolId: initialData.rol?.id?.toString() || "",
        membresiaId: initialData.membresia?.id?.toString() || "",
        activo: initialData.activo ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (field) => (value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <AdminFormField label="Nombre de usuario">
        <input
          type="text"
          value={formValues.nombreUsuario}
          onChange={(e) => handleChange("nombreUsuario")(e.target.value)}
          required
        />
      </AdminFormField>

      <AdminFormField label="Email">
        <input
          type="email"
          value={formValues.email}
          onChange={(e) => handleChange("email")(e.target.value)}
          required
        />
      </AdminFormField>

      <AdminFormField label="Rol">
        <select
          value={formValues.rolId}
          onChange={(e) => handleChange("rolId")(e.target.value)}
          required
        >
          <option value="">Seleccione rol</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombreRol}
            </option>
          ))}
        </select>
      </AdminFormField>

      <AdminFormField label="Membresía">
        <select
          value={formValues.membresiaId}
          onChange={(e) => handleChange("membresiaId")(e.target.value)}
          required
        >
          <option value="">Seleccione membresía</option>
          {membresias.map((m) => (
            <option key={m.id} value={m.id}>
              {m.tipoMembresia}
            </option>
          ))}
        </select>
      </AdminFormField>

      <AdminFormField label="Estado">
        <select
          value={formValues.activo ? "true" : "false"}
          onChange={(e) =>
            handleChange("activo")(e.target.value === "true")
          }
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </AdminFormField>

      <div className="admin-form-actions">
        <button type="submit">Guardar cambios</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
