import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductoService from "../../services/ProductoService";
import CategoriaService from "../../services/CategoriaService";
import CategoriassService from "../../services/CategoriassService";

import AdminTable from "../../components/organisms/AdminTable";
import AdminModal from "../../components/organisms/AdminModal";
import ProductoForm from "../../components/molecules/ProductoForm";

export default function AdminProductos() {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [relacionesCategorias, setRelacionesCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // producto que se edita o null

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

  const actualizarRelacionCategoria = async (productoId, nuevaCategoriaId) => {
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

  // 🔹 Handlers modal
  const openCreate = () => {
    setEditing(null); // creación
    setShowModal(true);
  };

  const openEdit = (p) => {
    const categoriaId = getCategoriaIdDeProducto(p.id);
    setEditing({
      ...p,
      categoriaId: categoriaId === "" ? "" : categoriaId,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditing(null);
  };

  // 🔹 Recibe los valores desde <ProductoForm />
  const handleSubmit = async (values) => {
    const {
      nombre,
      precio,
      imagenUrl,
      descripcion,
      stock,
      categoriaId,
    } = values;

    const body = {
      nombre,
      precio: Number(precio),
      imagenUrl,
      descripcion,
      stock:
        stock === "" || stock === null || stock === undefined
          ? null
          : Number(stock),
    };

    try {
      if (editing) {
        await ProductoService.update(editing.id, body);
        await actualizarRelacionCategoria(editing.id, categoriaId);
        alert("Producto actualizado.");
      } else {
        const nuevo = await ProductoService.create(body);
        if (categoriaId) {
          await CategoriassService.create({
            productoId: nuevo.id,
            categoriaId: Number(categoriaId),
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
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

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

  // 🧱 Config de columnas para AdminTable
  const columns = [
    { key: "id", header: "ID" },
    { key: "nombre", header: "Nombre" },
    {
      key: "precio",
      header: "Precio",
      render: (row) => `$${Number(row.precio).toLocaleString("es-CL")}`,
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
            style={{ width: 40, height: 40, objectFit: "cover" }}
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
              <button onClick={() => openEdit(row)}>Editar</button>
              <button onClick={() => handleDelete(row.id)}>Eliminar</button>
            </>
          )}
        />
      )}

      {showModal && (
        <AdminModal
          title={editing ? "Editar producto" : "Crear producto"}
          onClose={closeModal}
        >
          <ProductoForm
            initialData={editing}
            categorias={categorias}
            onSubmit={handleSubmit}
            onCancel={closeModal}
          />
        </AdminModal>
      )}
    </div>
  );
}
