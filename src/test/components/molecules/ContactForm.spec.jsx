import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../../components/molecules/ContactForm';

describe('ContactForm Component', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.and.callThrough();
  });

  it('renderiza el formulario completo', () => {
    render(<ContactForm />);
    
    expect(screen.getByText('Contáctanos')).toBeTruthy();
    
    // Busca por label text en lugar de placeholder
    expect(screen.getByLabelText('Nombre')).toBeTruthy();
    expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
    expect(screen.getByLabelText('Mensaje')).toBeTruthy();
    expect(screen.getByText('Enviar mensaje')).toBeTruthy();
  });

  it('actualiza todos los campos', () => {
    render(<ContactForm />);
    
    // Usa getByLabelText en lugar de getByPlaceholderText
    const nombreInput = screen.getByLabelText('Nombre');
    const emailInput = screen.getByLabelText('Correo electrónico');
    const mensajeInput = screen.getByLabelText('Mensaje');
    
    fireEvent.change(nombreInput, { target: { value: 'Juan Pérez' } });
    fireEvent.change(emailInput, { target: { value: 'juan@test.com' } });
    fireEvent.change(mensajeInput, { target: { value: 'Mensaje de prueba' } });

    expect(nombreInput.value).toBe('Juan Pérez');
    expect(emailInput.value).toBe('juan@test.com');
    expect(mensajeInput.value).toBe('Mensaje de prueba');
  });

  it('envía el formulario', () => {
    render(<ContactForm />);
    
    // Encuentra el formulario por su clase
    const form = document.querySelector('form');
    fireEvent.submit(form);
    
    expect(consoleSpy).toHaveBeenCalledWith('Mensaje de contacto:', {
      nombre: '',
      correo: '',
      mensaje: ''
    });
  });
});