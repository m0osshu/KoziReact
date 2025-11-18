// src/components/organisms/Navbar.jsx
import { NavLink } from "react-router-dom";
import "../../styles/components/organisms/Navbar.css";

export default function Navbar() {
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        kÖzi
      </NavLink>
      <nav className="navbar">
        <NavLink to="/ingresar">Ingresar</NavLink>
        <NavLink to="/blog">Blogs</NavLink>
        <NavLink to="/contacto">Nosotros</NavLink>
      </nav>
    </header>
  );
}
