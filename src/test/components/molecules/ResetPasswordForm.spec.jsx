import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResetPasswordForm from '../../../components/molecules/ResetPasswordForm';
import { BrowserRouter } from 'react-router-dom';

const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

describe('ResetPasswordForm Component', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.and.callThrough();
  });

  it('renderiza todos los elementos', () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    
    expect(screen.getByText('Restablecer contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('ejemplo@correo.com')).toBeTruthy();
    expect(screen.getByText('Enviar enlace')).toBeTruthy();
    expect(screen.getByText('← Volver al inicio de sesión')).toBeTruthy();
  });

  it('maneja el cambio de email', () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    
    const input = screen.getByPlaceholderText('ejemplo@correo.com');
    fireEvent.change(input, { target: { value: 'test@test.com' } });
    expect(input.value).toBe('test@test.com');
  });

  it('envía el formulario', () => {
    render(<ResetPasswordForm />, { wrapper: Wrapper });
    
    const form = document.querySelector('form');
    fireEvent.submit(form);
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Solicitud de restablecer contraseña para:',
      ''
    );
  });
});