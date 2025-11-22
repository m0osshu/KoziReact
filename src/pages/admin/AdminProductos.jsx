import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductoService from "../../services/ProductoService";
import CategoriaService from "../../services/CategoriaService";
import CategoriassService from "../../services/CategoriassService";

import AdminTable from "../../components/organisms/AdminTable";
import AdminModal from "../../components/organisms/AdminModal";
import AdminFormField from "../../components/molecules/AdminFormField";

export default function AdminProductos() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [relacionesCategorias, setRelacionesCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    imagenUrl: "",
    descripcion: "",
    stock: "",
    categoriaId: "",
  });

  // 🔒 Solo admin
  useEffect(() => {
    if (!usuario || !usuario.rol || usuario.rol.id !== 2) {
      navigate("/");
    }
  }, [usuario, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prod, cats, rels] = await Promise.all([
        ProductoService.getAll(),
        CategoriaService.getAll(),
        CategoriassService.getAll(),
      ]);
      setProductos(prod || []);
      setCategorias(cats || []);
      setRelacionesCategorias(rels || []);
    } catch (error) {
      alert("Error al cargar productos / categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // helpers relación producto - categoría
  const getRelacionPorProductoId = (productoId) =>
    relacionesCategorias.find(
      (r) => r.producto && r.producto.id === productoId
    ) || null;

  const getCategoriaNombre = (producto) => {
    const rel = getRelacionPorProductoId(producto.id);
    return rel?.categoria?.nombre || "Sin asignar";
  };

  const getCategoriaIdDeProducto = (productoId) => {
    const rel = getRelacionPorProductoId(productoId);
    return rel?.categoria?.id ?? "";
  };

  const actualizarRelacionCategoria = async (
    productoId,
    nuevaCategoriaId
  ) => {
    const relActual = getRelacionPorProductoId(productoId);

    if (!nuevaCategoriaId) {
      if (relActual) {
        await CategoriassService.delete(relActual.id);
      }
      return;
    }

    const catIdNum = Number(nuevaCategoriaId);

    if (relActual) {
      if (relActual.categoria?.id !== catIdNum) {
        await CategoriassService.delete(relActual.id);
        await CategoriassService.create({
          productoId,
          categoriaId: catIdNum,
        });
      }
    } else {
      await CategoriassService.create({
        productoId,
        categoriaId: catIdNum,
      });
    }
  };

  // modal handlers
  const openCreate = () => {
    setEditing(null);
    setFormData({
      nombre: "",
      precio: "",
      imagenUrl: "",
      descripcion: "",
      stock: "",
      categoriaId: "",
    });
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setFormData({
      nombre: p.nombre,
      precio: p.precio,
      imagenUrl: p.imagenUrl,
      descripcion: p.descripcion,
      stock: p.stock ?? "",
      categoriaId: getCategoriaIdDeProducto(p.id),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      nombre: formData.nombre,
      precio: Number(formData.precio),
      imagenUrl: formData.imagenUrl,
      descripcion: formData.descripcion,
      stock: formData.stock === "" ? null : Number(formData.stock),
    };

    try {
      if (editing) {
        await ProductoService.update(editing.id, body);
        await actualizarRelacionCategoria(
          editing.id,
          formData.categoriaId
        );
        alert("Producto actualizado.");
      } else {
        const nuevo = await ProductoService.create(body);
        if (formData.categoriaId) {
          await CategoriassService.create({
            productoId: nuevo.id,
            categoriaId: Number(formData.categoriaId),
          });
        }
        alert("Producto creado.");
      }

      closeModal();
      await loadData();
    } catch (error) {
      alert("Error al guardar producto.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?"))
      return;

    try {
      await ProductoService.delete(id);
      const rel = getRelacionPorProductoId(id);
      if (rel) {
        await CategoriassService.delete(rel.id);
      }
      alert("Producto eliminado.");
      loadData();
    } catch (error) {
      alert("Error al eliminar producto.");
    }
  };

  // 🧱 Config de columnas para AdminTable (Atomic)
  const columns = [
    {
      key: "id",
      header: "ID",
    },
    {
      key: "nombre",
      header: "Nombre",
    },
    {
      key: "precio",
      header: "Precio",
      render: (row) =>
        `$${Number(row.precio).toLocaleString("es-CL")}`,
    },
    {
      key: "stock",
      header: "Stock",
      render: (row) => row.stock ?? "-",
    },
    {
      key: "categoria",
      header: "Categoría",
      render: (row) => getCategoriaNombre(row),
    },
    {
      key: "imagenUrl",
      header: "Imagen",
      render: (row) =>
        row.imagenUrl ? (
          <img
            src={row.imagenUrl}
            alt={row.nombre}
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
            }}
          />
        ) : (
          "-"
        ),
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Gestión de productos</h1>
        <button onClick={openCreate}>Crear producto</button>
      </div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <AdminTable
          columns={columns}
          data={productos}
          renderActions={(row) => (
            <>
              <button onClick={() => openEdit(row)}>
                Editar
              </button>
              <button onClick={() => handleDelete(row.id)}>
                Eliminar
              </button>
            </>
          )}
        />
      )}

      {showModal && (
        <AdminModal
          title={
            editing ? "Editar producto" : "Crear producto"
          }
          onClose={closeModal}
        >
          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >
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
                <option value="">
                  (sin categoría)
                </option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            </AdminFormField>

            <div className="admin-form-actions">
              <button type="submit">
                {editing ? "Actualizar" : "Crear"}
              </button>
              <button
                type="button"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
