import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/layout/navbar.css';

const Navbar = () => {
  return (
    <div className="header">
      <Link to="/" className="logo">kÖzi</Link>
      <nav className="navbar">
        <Link to="/ingresar">Ingresar</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/nosotros">Nosotros</Link>
      </nav>
    </div>
  )
}

export default Navbar;