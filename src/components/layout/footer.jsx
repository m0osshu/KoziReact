import React from 'react';
import '../../styles/layout/footer.css';
import { FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <p>Tu fuente confiable de noticias y artículos sobre la escena Visual Kei y música japonesa alternativa.</p>
        </div>
        
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/galeria">Galería</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Síguenos</h3>
            <div className="social-links">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Blog Visual Kei. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;