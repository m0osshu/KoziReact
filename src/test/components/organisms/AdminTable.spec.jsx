// src/test/components/organisms/AdminTable.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import AdminTable from '../../../components/organisms/AdminTable';

describe('AdminTable Component', () => {
  const testData = [
    { id: 1, name: 'Test 1' },
    { id: 2, name: 'Test 2' }
  ];

  const testColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' }
  ];

  it('se renderiza sin errores', () => {
    const { container } = render(
      <AdminTable columns={testColumns} data={testData} />
    );
    expect(container).toBeTruthy();
  });

  it('contiene la clase admin-table', () => {
    const { container } = render(
      <AdminTable columns={testColumns} data={testData} />
    );
    expect(container.querySelector('.admin-table')).toBeTruthy();
  });

  it('tiene encabezados de tabla', () => {
    const { container } = render(
      <AdminTable columns={testColumns} data={testData} />
    );
    const headers = container.querySelectorAll('th');
    expect(headers.length).toBeGreaterThan(0);
  });
});