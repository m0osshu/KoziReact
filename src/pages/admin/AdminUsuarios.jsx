import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../services/UsuarioService";

export default function AdminUsuarios() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    email: "",
    rolId: 1,
    membresiaId: 1,
    activo: true,
  });

  // Protección de ruta
  useEffect(() => {
    if (!usuario || !usuario.rol || usuario.rol.id !== 2) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const loadUsuarios = async () => {
    try {
      setLoading(true);
      const data = await UsuarioService.getAll();
      setUsuarios(data || []);
    } catch (error) {
      alert("Error al cargar usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsuarios();
  }, []);

  const openEdit = (u) => {
    setEditing(u);
    setFormData({
      nombreUsuario: u.nombreUsuario,
      email: u.email,
      rolId: u.rol?.id ?? 1,
      membresiaId: u.membresia?.id ?? 1,
      activo: u.activo ?? true,
    });
  };

  const closeModal = () => {
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "activo") {
      setFormData((prev) => ({ ...prev, activo: value === "true" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editing) return;

    try {
      await UsuarioService.updatePartial(editing.id, {
        nombreUsuario: formData.nombreUsuario,
        email: formData.email,
        rol: { id: Number(formData.rolId) },
        membresia: { id: Number(formData.membresiaId) },
        activo: formData.activo,
      });

      alert("Usuario actualizado correctamente.");
      closeModal();
      loadUsuarios();
    } catch (error) {
      alert("Error al actualizar usuario.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await UsuarioService.delete(id);
      alert("Usuario eliminado.");
      loadUsuarios();
    } catch (error) {
      alert("Error al eliminar usuario.");
    }
  };

  return (
    <div className="admin-page">
      <h1>Gestión de usuarios</h1>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Membresía</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombreUsuario}</td>
                <td>{u.email}</td>
                <td>{u.rol?.nombreRol}</td>
                <td>{u.membresia?.tipoMembresia}</td>
                <td>{u.activo ? "Activo" : "Inactivo"}</td>
                <td>
                  <button onClick={() => openEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de edición */}
      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Editar usuario</h2>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Nombre de usuario
                <input
                  type="text"
                  name="nombreUsuario"
                  value={formData.nombreUsuario}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Rol
                <select
                  name="rolId"
                  value={formData.rolId}
                  onChange={handleChange}
                >
                  <option value={1}>Usuario</option>
                  <option value={2}>Admin</option>
                </select>
              </label>

              <label>
                Membresía
                <select
                  name="membresiaId"
                  value={formData.membresiaId}
                  onChange={handleChange}
                >
                  <option value={1}>VIP</option>
                  <option value={2}>STANDARD</option>
                </select>
              </label>

              <label>
                Estado
                <select
                  name="activo"
                  value={formData.activo ? "true" : "false"}
                  onChange={handleChange}
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </label>

              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={closeModal}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
