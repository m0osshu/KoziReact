import { Link } from 'react-router-dom';
import "../../styles/organisms/Footer.css";  // RUTA CORRECTA

const Footer = () => {
  const tieneSesion = localStorage.getItem("usuarioActivoNombre") !== null;

  return (
    <footer className="footer">
      <div className="footer-content wrap">
        <div className="footer-section">
          <h3 className="footer-logo">kÖzi</h3>
          <p>Expresión en la oscuridad. Encuentra tu estilo único con nuestras pieces exclusivas.</p>
        </div>
        
        <div className="footer-section">
          <h3>Enlaces rápidos</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li>
              {tieneSesion ? (
                <a href="#" onClick={() => {/* lógica cerrar sesión */}}>Desconectar</a>
              ) : (
                <Link to="/ingresar">Ingresar</Link>
              )}
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>email: info@kozi.com</p>
          <p>teléfono: +56912345678</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 kÖzi - Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;