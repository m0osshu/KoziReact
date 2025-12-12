import { FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import "../../styles/components/organisms/Footer.css";
import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>Sobre Nosotros</h3>
          <p>Tu tienda de accesorios góticos y Visual Kei favorita.</p>
        </div>

        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/ingresar">Ingresar</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://www.youtube.com/shorts/16uJ-jxcKHo" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@pana.dank/video/7555356145217506572?q=cangri&t=1763428295997" aria-label="Facebook"><FaFacebookF /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 KoZi. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
