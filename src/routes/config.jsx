// src/routes/config.jsx
import { lazy } from "react";

// -------------------------------
// PÁGINAS PÚBLICAS
// -------------------------------
const Home = lazy(() => import("../pages/Home.jsx"));
const Ingresar = lazy(() => import("../pages/Ingresar.jsx"));
const Blogs = lazy(() => import("../pages/Blogs.jsx"));
const Contacto = lazy(() => import("../pages/Contacto.jsx"));
const Carrito = lazy(() => import("../pages/Carrito.jsx"));
const Producto = lazy(() => import("../pages/Producto.jsx"));
const Registrar = lazy(() => import("../pages/Registrar.jsx"));
const Restablecer = lazy(() =>
  import("../pages/RestablecerContraseña.jsx")
);
const Productos = lazy(() => import("../pages/Productos.jsx"));

// -------------------------------
// PÁGINAS ADMIN
// -------------------------------
const AdminUsuarios = lazy(() =>
  import("../pages/admin/AdminUsuarios.jsx")
);
const AdminProductos = lazy(() =>
  import("../pages/admin/AdminProductos.jsx")
);
const AdminCategorias = lazy(() =>
  import("../pages/admin/AdminCategorias.jsx")
);
const AdminPedidos = lazy(() =>
  import("../pages/admin/AdminPedidos.jsx")
);

// -------------------------------
// DEFINICIÓN DE RUTAS
// -------------------------------
export const appRoutes = [
  // ---- RUTAS PÚBLICAS ----
  { path: "/", element: <Home />, showNavbar: true },
  { path: "/productos", element: <Productos />, showNavbar: true },
  { path: "/ingresar", element: <Ingresar />, showNavbar: true },
  { path: "/blog", element: <Blogs />, showNavbar: true },
  { path: "/contacto", element: <Contacto />, showNavbar: true },
  { path: "/carrito", element: <Carrito />, showNavbar: true },

  { path: "/producto/:id", element: <Producto />, showNavbar: true },
  { path: "/registrar", element: <Registrar />, showNavbar: true },
  {
    path: "/restablecer",
    element: <Restablecer />,
    showNavbar: true,
  },

  // ---- RUTAS ADMIN ----
  // (La protección de admin se hace dentro de cada página)
  {
    path: "/admin/usuarios",
    element: <AdminUsuarios />,
    showNavbar: true,
  },
  {
    path: "/admin/productos",
    element: <AdminProductos />,
    showNavbar: true,
  },
  {
    path: "/admin/categorias",
    element: <AdminCategorias />,
    showNavbar: true,
  },
  {
    path: "/admin/pedidos",
    element: <AdminPedidos />,
    showNavbar: true,
  },

  // ---- RUTA 404 ----
  {
    path: "*",
    element: <div>404 - Página no encontrada</div>,
    showNavbar: false,
  },
];
