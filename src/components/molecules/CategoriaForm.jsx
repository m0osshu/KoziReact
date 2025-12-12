import { useEffect, useState } from "react";
import AdminFormField from "./AdminFormField";
import "../../styles/components/molecules/Forms.css";
import React from 'react';

export default function CategoriaForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || "");
    } else {
      setNombre("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre });
  };

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <AdminFormField label="Nombre">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </AdminFormField>

      <div className="admin-form-actions">
        <button type="submit">
          {isEditing ? "Actualizar" : "Crear"}
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
