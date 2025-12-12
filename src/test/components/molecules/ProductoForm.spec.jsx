import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductoForm from '../../../components/molecules/ProductoForm';

describe('ProductoForm Component', () => {
  const mockCategorias = [
    { id: 1, nombre: 'Electrónica' },
    { id: 2, nombre: 'Ropa' }
  ];

  const mockOnSubmit = jasmine.createSpy('onSubmit');
  const mockOnCancel = jasmine.createSpy('onCancel');

  it('envía formulario con datos', () => {
    render(
      <ProductoForm
        categorias={mockCategorias}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // Encuentra los inputs por su name attribute
    const nombreInput = document.querySelector('input[name="nombre"]');
    const precioInput = document.querySelector('input[name="precio"]');
    const stockInput = document.querySelector('input[name="stock"]');
    const imagenInput = document.querySelector('input[name="imagenUrl"]');
    const descripcionInput = document.querySelector('textarea[name="descripcion"]');

    // Llena los campos
    fireEvent.change(nombreInput, { target: { value: 'Test' } });
    fireEvent.change(precioInput, { target: { value: '5000' } });
    fireEvent.change(stockInput, { target: { value: '10' } });
    fireEvent.change(imagenInput, { target: { value: 'img.jpg' } });
    fireEvent.change(descripcionInput, { target: { value: 'Descripción test' } });

    // Envía el formulario
    const form = document.querySelector('form');
    fireEvent.submit(form);

    // Verifica que se llamó a onSubmit
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});