import React, { useState, useEffect } from 'react';
import '../../styles/Banner/banner.css';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array de imágenes para el carrusel
  const slides = [
    {
      image: "/src/assets/mialinda2.png",
      title: "kozi",
      subtitle: "la mejor tienda en el mundo!"
    },
    {
      image: "/src/assets/xd.jpg", // Cambia por tu segunda imagen
      title: "Nuevos Productos",
      subtitle: "Descubre nuestras novedades"
    },
    {
      image: "/src/assets/carrusel3.jpg", // Cambia por tu tercera imagen
      title: "Ofertas Especiales",
      subtitle: "Hasta 50% de descuento"
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