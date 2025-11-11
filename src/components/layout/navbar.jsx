import React from 'react';
import '../../styles/layout/navbar.css';

const Navbar = () => {
  return (
    <div className="header">
      <a href="/index.html" className="logo">kÖzi</a>
      <nav className="navbar">
        <a href="/html/ingresar.html">Ingresar</a>
        <a href="">blogs</a>
        <a href="/html/contacto.html">Nosotros</a>
      </nav>
    </div>
  )
}

export default Navbar;