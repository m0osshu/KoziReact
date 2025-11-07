import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import "../../styles/organisms/Header.css";  // RUTA CORRECTA

const Header = () => {
  const [tieneSesion, setTieneSesion] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sesionActiva = localStorage.getItem("usuarioActivoNombre") !== null;
    setTieneSesion(sesionActiva);
  }, [location]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuarioActivoNombre");
    localStorage.removeItem("usuarioActivoEmail"); 
    localStorage.removeItem("usuarioActivoTipo");
    alert("Sesión cerrada correctamente");
    window.location.href = "/";
  };

  return (
    <header className="header">
      <Link to="/" className="logo">
        kÖzi
      </Link>
      
      <nav className="navbar">
        {tieneSesion ? (
          <a href="#" onClick={cerrarSesion}>Desconectar</a>
        ) : (
          <Link to="/ingresar">Ingresar</Link>
        )}
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/contacto">Nosotros</Link>
      </nav>
    </header>
  );
};

export default Header;