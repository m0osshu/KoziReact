import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';  // ← ESTA RUTA

describe('Input Component', () => {
  it('renderiza un input de tipo texto por defecto', () => {
    render(<Input name="username" placeholder="Ingresa tu usuario" />);
    const input = screen.getByPlaceholderText('Ingresa tu usuario');
    expect(input).toBeTruthy();
    expect(input.getAttribute('type')).toBe('text');
  });

  it('renderiza un textarea cuando type es "textarea"', () => {
    render(<Input type="textarea" name="comment" placeholder="Comentario" />);
    const textarea = screen.getByPlaceholderText('Comentario');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('maneja el evento onChange correctamente', () => {
    const handleChange = jasmine.createSpy('onChange');
    render(<Input name="test" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'nuevo valor' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('aplica la clase CSS correctamente', () => {
    render(<Input className="form-control-lg" />);
    const input = screen.getByRole('textbox');
    expect(input.className).toBe('form-control-lg');
  });
});