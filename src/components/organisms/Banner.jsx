// src/components/organisms/Banner.jsx
import { useState, useEffect } from "react";
import "../../styles/components/organisms/Banner.css"; // aquí tu compañero pondrá el CSS del banner

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array de imágenes para el carrusel
  const slides = [
    {
      image: "https://a-static.besthdwallpaper.com/aespa-s-karina-in-drama-album-the-giant-vers-shoot-wallpaper-2560x1440-123426_51.jpg",
      title: "kozi",
      subtitle: "la mejor tienda en el mundo!"
    },   
    {
      image: "https://a-static.besthdwallpaper.com/winter-from-aespa-for-whiplash-mini-album-unbeatable-beat-ver-wallpaper-3554x1999-125680_53.jpg", // Cambia por tu segunda imagen
      title: "Nuevos Productos",
      subtitle: "Descubre nuestras novedades"
    },    
    {
      image: "https://wallpapercave.com/wp/wp14629931.webp", // Cambia por tu tercera imagen
      title: "Ofertas Especiales",
      subtitle: "Hasta 50% de descuento"
    },
    {
      image: "https://4.bp.blogspot.com/-qrXshtpanXk/Ti40eGE_UmI/AAAAAAAAACc/mCtQemgTqTA/s1600/ruki.jpg", // Cambia por tu segunda imagen
      title: "Nuevos Productos",
      subtitle: "Descubre nuestras novedades"
    }    
  ];

  // Cambio automático de slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="banner">
      {/* Contenedor del carrusel */}
      <div 
        className="banner-slides"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="banner-slide"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${slide.image}")` }}
          >
            <div className='banner-container'>
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button className="banner-btn banner-btn-prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="banner-btn banner-btn-next" onClick={nextSlide}>
        ›
      </button>

      {/* Indicadores */}
      <div className="banner-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`banner-indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;