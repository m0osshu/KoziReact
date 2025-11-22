// src/components/molecules/CategoriaForm.jsx
import AdminFormField from "./AdminFormField";

export default function CategoriaForm({
  nombre,
  onChangeNombre,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <AdminFormField label="Nombre">
        <input
          type="text"
          value={nombre}
          onChange={(e) => onChangeNombre(e.target.value)}
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
