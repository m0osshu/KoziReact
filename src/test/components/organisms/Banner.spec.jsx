// src/test/components/organisms/Banner.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Banner from '../../../components/organisms/Banner';

describe('Banner Component', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(<Banner />);
    expect(container).toBeTruthy();
  });

  it('contiene la clase banner', () => {
    const { container } = render(<Banner />);
    expect(container.querySelector('.banner')).toBeTruthy();
  });

  it('tiene botones de navegación', () => {
    const { container } = render(<Banner />);
    const buttons = container.querySelectorAll('.banner-btn');
    expect(buttons.length).toBe(2); // Prev y Next
  });

  it('tiene indicadores de slides', () => {
    const { container } = render(<Banner />);
    const indicators = container.querySelector('.banner-indicators');
    expect(indicators).toBeTruthy();
  });
});