// src/components/molecules/UsuarioForm.jsx
import AdminFormField from "./AdminFormField";

export default function UsuarioForm({
  nombreUsuario,
  email,
  rolId,
  membresiaId,
  activo,
  roles = [],
  membresias = [],
  onChangeNombre,
  onChangeEmail,
  onChangeRolId,
  onChangeMembresiaId,
  onChangeActivo,
  onSubmit,
  onCancel,
}) {
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <AdminFormField label="Nombre de usuario">
        <input
          type="text"
          value={nombreUsuario}
          onChange={(e) => onChangeNombre(e.target.value)}
          required
        />
      </AdminFormField>

      <AdminFormField label="Email">
        <input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          required
        />
      </AdminFormField>

      <AdminFormField label="Rol">
        <select
          value={rolId}
          onChange={(e) => onChangeRolId(e.target.value)}
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
          value={membresiaId}
          onChange={(e) => onChangeMembresiaId(e.target.value)}
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
          value={activo ? "true" : "false"}
          onChange={(e) => onChangeActivo(e.target.value === "true")}
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
