// src/test/components/organisms/Footer.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(<Footer />);
    expect(container).toBeTruthy();
  });

  it('contiene la clase footer', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('.footer')).toBeTruthy();
  });

  it('tiene contenido de copyright', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toContain('KoZi');
  });

  it('tiene secciones de contenido', () => {
    const { container } = render(<Footer />);
    const sections = container.querySelectorAll('.footer-section');
    expect(sections.length).toBeGreaterThan(0);
  });
});