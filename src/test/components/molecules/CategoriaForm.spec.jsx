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
    expect(screen.getByPlaceholderText('Tu nombre')).toBeTruthy();
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeTruthy();
    expect(screen.getByPlaceholderText('Escribe tu mensaje aquí...')).toBeTruthy();
    expect(screen.getByText('Enviar mensaje')).toBeTruthy();
  });

  it('actualiza todos los campos', () => {
    render(<ContactForm />);
    
    const nombreInput = screen.getByPlaceholderText('Tu nombre');
    const emailInput = screen.getByPlaceholderText('ejemplo@correo.com');
    const mensajeInput = screen.getByPlaceholderText('Escribe tu mensaje aquí...');
    
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