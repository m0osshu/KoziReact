import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';  // ← ESTA RUTA

describe('Text Component', () => {
  it('renderiza un párrafo por defecto', () => {
    render(<Text>Hola mundo</Text>);
    const element = screen.getByText('Hola mundo');
    expect(element.tagName).toBe('P');
  });

  it('renderiza un h1 cuando variant es "h1"', () => {
    render(<Text variant="h1">Título</Text>);
    const element = screen.getByText('Título');
    expect(element.tagName).toBe('H1');
  });

  it('aplica la clase CSS correctamente', () => {
    render(<Text className="text-center text-danger">Texto</Text>);
    const element = screen.getByText('Texto');
    expect(element.className).toBe('text-center text-danger');
  });
});