import aboutData from "../../data/aboutData";
import "../../styles/components/organisms/AboutSection.css";
import React from 'react';


export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-section__content">
        <h2 className="about-section__title">{aboutData.titulo}</h2>
        {aboutData.imagen && (
          <img src={aboutData.imagen} alt={aboutData.alt} className="about-section__image" />
        )}
        <p className="about-section__text">{aboutData.descripcion}</p>
      </div>
    </section>
  );
}