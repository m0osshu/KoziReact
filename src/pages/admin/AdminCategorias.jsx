import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CategoriaService from "../../services/CategoriaService";

import AdminTable from "../../components/organisms/AdminTable";
import AdminModal from "../../components/organisms/AdminModal";
import AdminFormField from "../../components/molecules/AdminFormField";

export default function AdminCategorias() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [nombre, setNombre] = useState("");

  // 🔒 Solo admin
  useEffect(() => {
    if (!usuario || !usuario.rol || usuario.rol.id !== 2) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await CategoriaService.getAll();
      setCategorias(data || []);
    } catch (error) {
      alert("Error al cargar categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setNombre("");
    setShowModal(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setNombre(cat.nombre || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
    setNombre("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = nombre.trim();
    if (!trimmed) {
      alert("El nombre es obligatorio.");
      return;
    }

    const body = { nombre: trimmed };

    try {
      if (editing) {
        await CategoriaService.update(editing.id, body);
        alert("Categoría actualizada.");
      } else {
        await CategoriaService.create(body);
        alert("Categoría creada.");
      }

      await loadCategorias();
      closeModal();
    } catch (error) {
      alert("Error al guardar categoría.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta categoría?")) return;

    try {
      await CategoriaService.delete(id);
      alert("Categoría eliminada.");
      await loadCategorias();
    } catch (error) {
      alert("Error al eliminar categoría. Revisa si hay productos que la usen.");
    }
  };

  // 🧱 definimos las columnas para AdminTable
  const columns = [
    { key: "id", header: "ID" },
    { key: "nombre", header: "Nombre" },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestión de categorías</h1>
        <button onClick={openCreate}>Crear categoría</button>
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={categorias}
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
          title={editing ? "Editar categoría" : "Crear categoría"}
          onClose={closeModal}
        >
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
                {editing ? "Actualizar" : "Crear"}
              </button>
              <button type="button" onClick={closeModal}>
                Cancelar
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
