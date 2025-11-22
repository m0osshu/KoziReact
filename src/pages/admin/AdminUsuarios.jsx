// src/pages/admin/AdminUsuarios.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import UsuarioService from "../../services/UsuarioService";
import RolService from "../../services/RolService";
import MembresiaService from "../../services/MembresiaService";

import AdminTable from "../../components/organisms/AdminTable";
import AdminModal from "../../components/organisms/AdminModal";
import UsuarioForm from "../../components/molecules/UsuarioForm";

export default function AdminUsuarios() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  // 🔒 Solo admin
  useEffect(() => {
    if (!usuario || !usuario.rol || usuario.rol.id !== 2) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [usuariosRes, rolesRes, membRes] = await Promise.all([
        UsuarioService.getAll(),
        RolService.getAll(),
        MembresiaService.getAll(),
      ]);

      setUsuarios(usuariosRes || []);
      setRoles(rolesRes || []);
      setMembresias(membRes || []);
    } catch (error) {
      alert("Error al cargar usuarios/roles/membresías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openEdit = (u) => {
    setEditing(u);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  // values viene desde <UsuarioForm />
  const handleSubmit = async (values) => {
    if (!editing) return;

    const {
      nombreUsuario,
      email,
      rolId,
      membresiaId,
      activo,
    } = values;

    const trimmedNombre = (nombreUsuario || "").trim();
    const trimmedEmail = (email || "").trim();

    if (!trimmedNombre || !trimmedEmail) {
      alert("Nombre y email son obligatorios.");
      return;
    }
    if (!rolId || !membresiaId) {
      alert("Debes seleccionar rol y membresía.");
      return;
    }

    const body = {
      nombreUsuario: trimmedNombre,
      email: trimmedEmail,
      activo: !!activo,
      rol: { id: Number(rolId) },
      membresia: { id: Number(membresiaId) },
      // NO enviamos password ni fotoPerfil aquí
    };

    try {
      await UsuarioService.updatePartial(editing.id, body);
      alert("Usuario actualizado.");
      await loadData();
      closeModal();
    } catch (error) {
      alert("Error al actualizar usuario.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      await UsuarioService.delete(id);
      alert("Usuario eliminado.");
      await loadData();
    } catch (error) {
      alert("Error al eliminar usuario. Revisa si hay relaciones.");
    }
  };

  const columns = [
    { key: "id", header: "ID" },
    { key: "nombreUsuario", header: "Usuario" },
    { key: "email", header: "Email" },
    { key: "rolNombre", header: "Rol" },
    { key: "membresiaNombre", header: "Membresía" },
    { key: "activoTexto", header: "Activo" },
  ];

  // Para que AdminTable tenga datos "planos"
  const tableData = usuarios.map((u) => ({
    ...u,
    rolNombre: u.rol?.nombreRol || "",
    membresiaNombre: u.membresia?.tipoMembresia || "",
    activoTexto: u.activo ? "Activo" : "Inactivo",
  }));

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestión de usuarios</h1>
        {/* No hay botón de crear, solo ver/editar/eliminar */}
      </div>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={tableData}
          renderActions={(row) => (
            <>
              <button onClick={() => openEdit(row)}>Editar</button>
              <button onClick={() => handleDelete(row.id)}>Eliminar</button>
            </>
          )}
        />
      )}

      {showModal && (
        <AdminModal
          title={`Editar usuario #${editing?.id}`}
          onClose={closeModal}
        >
          <UsuarioForm
            initialData={editing}
            roles={roles}
            membresias={membresias}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </AdminModal>
      )}
    </div>
  );
}
