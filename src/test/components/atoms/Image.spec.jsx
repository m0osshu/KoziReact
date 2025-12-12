// src/test/components/atoms/Image.spec.jsx - VERSIÓN CORREGIDA COMPLETA
import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  it('renderiza la imagen con src y alt correctos', () => {
    render(<Image src="test.jpg" alt="Imagen de prueba" />);
    
    // Busca por selector en lugar de role
    const image = document.querySelector('img[src="test.jpg"]');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src')).toBe('test.jpg');
    expect(image.getAttribute('alt')).toBe('Imagen de prueba');
  });

  it('aplica la clase CSS correctamente', () => {
    render(<Image src="test.jpg" alt="test" className="rounded shadow" />);
    const image = document.querySelector('img[src="test.jpg"]');
    expect(image.className).toBe('rounded shadow');
  });

  it('usa alt vacío por defecto si no se proporciona', () => {
    render(<Image src="test-sin-alt.jpg" />);
    const image = document.querySelector('img[src="test-sin-alt.jpg"]');
    expect(image).toBeTruthy();
    expect(image.getAttribute('alt')).toBe('');
  });
});