import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UsuarioForm from '../../../components/molecules/UsuarioForm';

describe('UsuarioForm Component', () => {
  const mockRoles = [
    { id: 1, nombreRol: 'Admin' },
    { id: 2, nombreRol: 'Usuario' }
  ];

  const mockMembresias = [
    { id: 1, tipoMembresia: 'Premium' },
    { id: 2, tipoMembresia: 'Básica' }
  ];

  const mockOnSubmit = jasmine.createSpy('onSubmit');
  const mockOnCancel = jasmine.createSpy('onCancel');

  const initialData = {
    nombreUsuario: 'testuser',
    email: 'test@test.com',
    rol: { id: 1 },
    membresia: { id: 1 },
    activo: true
  };

  it('renderiza formulario vacío', () => {
    render(
      <UsuarioForm
        roles={mockRoles}
        membresias={mockMembresias}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Rol')).toBeTruthy();
    expect(screen.getByText('Membresía')).toBeTruthy();
    expect(screen.getByText('Estado')).toBeTruthy();
    expect(screen.getByText('Guardar cambios')).toBeTruthy();
  });

  it('renderiza formulario con datos iniciales', () => {
    render(
      <UsuarioForm
        initialData={initialData}
        roles={mockRoles}
        membresias={mockMembresias}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Verifica que hay inputs con esos valores
    const inputs = document.querySelectorAll('input');
    expect(inputs[0].value).toBe('testuser');
    expect(inputs[1].value).toBe('test@test.com');
  });

  it('envía el formulario', () => {
    render(
      <UsuarioForm
        roles={mockRoles}
        membresias={mockMembresias}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const form = document.querySelector('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});