import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PedidoEstadoForm from '../../../components/molecules/PedidoEstadoForm';

describe('PedidoEstadoForm Component', () => {
  const mockFormData = {
    estadoId: '1',
    envioId: '1',
    pagoId: '1'
  };

  const mockOnChange = jasmine.createSpy('onChange');
  const mockOnSubmit = jasmine.createSpy('onSubmit');
  const mockOnCancel = jasmine.createSpy('onCancel');

  it('renderiza los tres select', () => {
    render(
      <PedidoEstadoForm
        formData={mockFormData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Busca por texto en lugar de label
    expect(screen.getByText('Estado')).toBeTruthy();
    expect(screen.getByText('Envío')).toBeTruthy();
    expect(screen.getByText('Pago')).toBeTruthy();
  });

  it('tiene las opciones correctas en Estado', () => {
    render(
      <PedidoEstadoForm
        formData={mockFormData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByText('Pagado')).toBeTruthy();
    expect(screen.getByText('Cancelado')).toBeTruthy();
    expect(screen.getByText('Enviado')).toBeTruthy();
  });

  it('llama a onChange al modificar select', () => {
    render(
      <PedidoEstadoForm
        formData={mockFormData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Encuentra el select de Estado
    const selects = document.querySelectorAll('select');
    const estadoSelect = selects[0];
    fireEvent.change(estadoSelect, { target: { value: '2' } });
    
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('envía el formulario', () => {
    render(
      <PedidoEstadoForm
        formData={mockFormData}
        onChange={mockOnChange}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    const form = document.querySelector('form');
    fireEvent.submit(form);
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});