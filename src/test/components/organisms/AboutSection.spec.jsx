// src/test/components/organisms/AboutSection.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutSection from '../../../components/organisms/AboutSection';

describe('AboutSection Component', () => {
  it('se renderiza sin errores', () => {
    // Simplemente verificar que el componente se renderiza
    const { container } = render(<AboutSection />);
    expect(container).toBeTruthy();
  });

  it('contiene una sección con clase about-section', () => {
    const { container } = render(<AboutSection />);
    const section = container.querySelector('.about-section');
    expect(section).toBeTruthy();
  });

  it('contiene un elemento de título', () => {
    render(<AboutSection />);
    // Buscar cualquier elemento h2 (el título podría ser dinámico)
    const title = document.querySelector('.about-section h2');
    expect(title).toBeTruthy();
  });

  it('contiene un párrafo de descripción', () => {
    const { container } = render(<AboutSection />);
    const textElement = container.querySelector('.about-section__text');
    expect(textElement).toBeTruthy();
    expect(textElement.tagName).toBe('P');
  });

  it('tiene estructura HTML válida', () => {
    const { container } = render(<AboutSection />);
    
    const section = container.querySelector('.about-section');
    expect(section).toBeTruthy();
    
    const content = container.querySelector('.about-section__content');
    expect(content).toBeTruthy();
  });
});