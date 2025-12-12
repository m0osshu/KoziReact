// src/test/components/organisms/HomeCatalog.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeCatalog from '../../../components/organisms/HomeCatalog';

describe('HomeCatalog Component', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(<HomeCatalog />);
    expect(container).toBeTruthy();
  });

  it('contiene una sección con clase home-catalog', () => {
    const { container } = render(<HomeCatalog />);
    const section = container.querySelector('.home-catalog');
    expect(section).toBeTruthy();
  });

  it('tiene un título', () => {
    render(<HomeCatalog />);
    const title = document.querySelector('.home-catalog-title');
    expect(title).toBeTruthy();
    expect(title.tagName).toBe('H2');
  });

  it('tiene un contenedor grid', () => {
    const { container } = render(<HomeCatalog />);
    const grid = container.querySelector('.home-catalog-grid');
    expect(grid).toBeTruthy();
  });
});