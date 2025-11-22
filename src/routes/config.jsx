// src/routes/config.jsx
import { lazy } from "react";

// Páginas públicas
const Home = lazy(() => import("../pages/Home.jsx"));
const Ingresar = lazy(() => import("../pages/Ingresar.jsx"));
const Blogs = lazy(() => import("../pages/Blogs.jsx"));
const Contacto = lazy(() => import("../pages/Contacto.jsx"));
const Carrito = lazy(() => import("../pages/Carrito.jsx"));
const Producto = lazy(() => import("../pages/Producto.jsx"));
const Registrar = lazy(() => import("../pages/Registrar.jsx"));
const Restablecer = lazy(() => import("../pages/RestablecerContraseña.jsx"));
const Productos = lazy(() => import("../pages/Productos.jsx"));

// Rutas públicas de Kozi
export const appRoutes = [
  { path: "/", element: <Home />, showNavbar: true },
  { path: "/productos", element: <Productos />, showNavbar: true },
  { path: "/ingresar", element: <Ingresar />, showNavbar: true },
  { path: "/blog", element: <Blogs />, showNavbar: true },
  { path: "/contacto", element: <Contacto />, showNavbar: true },
  { path: "/carrito", element: <Carrito />, showNavbar: true },

  { path: "/producto/:id", element: <Producto />, showNavbar: true },

  { path: "/registrar", element: <Registrar />, showNavbar: true },
  { path: "/restablecer", element: <Restablecer />, showNavbar: true },

  {
    path: "*",
    element: <div>404 - Página no encontrada</div>,
    showNavbar: false,
  },
];
