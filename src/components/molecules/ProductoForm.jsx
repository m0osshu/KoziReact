// src/components/molecules/ProductoForm.jsx
import AdminFormField from "./AdminFormField";

export default function ProductoForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing = false,
  categorias = [],
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <AdminFormField label="Nombre">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Precio">
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={onChange}
          required
          min="0"
        />
      </AdminFormField>

      <AdminFormField label="Stock">
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={onChange}
          min="0"
        />
      </AdminFormField>

      <AdminFormField label="Imagen (URL)">
        <input
          type="text"
          name="imagenUrl"
          value={formData.imagenUrl}
          onChange={onChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Descripción">
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={onChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Categoría">
        <select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={onChange}
        >
          <option value="">(sin categoría)</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
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
