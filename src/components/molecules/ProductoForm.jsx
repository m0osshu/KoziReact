// src/components/molecules/ProductoForm.jsx
import { useEffect, useState } from "react";
import AdminFormField from "./AdminFormField";

export default function ProductoForm({
  initialData,
  categorias = [],
  onSubmit,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    imagenUrl: "",
    descripcion: "",
    stock: "",
    categoriaId: "",
  });

  // Cargamos datos iniciales al abrir el modal
  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || "",
        precio: initialData.precio ?? "",
        imagenUrl: initialData.imagenUrl || "",
        descripcion: initialData.descripcion || "",
        stock: initialData.stock ?? "",
        categoriaId: initialData.categoriaId ?? "",
      });
    } else {
      setFormData({
        nombre: "",
        precio: "",
        imagenUrl: "",
        descripcion: "",
        stock: "",
        categoriaId: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditing = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <AdminFormField label="Nombre">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Precio">
        <input
          type="number"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
          required
          min="0"
        />
      </AdminFormField>

      <AdminFormField label="Stock">
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          min="0"
        />
      </AdminFormField>

      <AdminFormField label="Imagen (URL)">
        <input
          type="text"
          name="imagenUrl"
          value={formData.imagenUrl}
          onChange={handleChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Descripción">
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
      </AdminFormField>

      <AdminFormField label="Categoría">
        <select
          name="categoriaId"
          value={formData.categoriaId}
          onChange={handleChange}
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
