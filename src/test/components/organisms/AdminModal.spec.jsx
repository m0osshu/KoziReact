// src/test/components/organisms/AdminModal.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import AdminModal from '../../../components/organisms/AdminModal';

describe('AdminModal Component', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(
      <AdminModal title="Test" onClose={() => {}}>
        <p>Contenido</p>
      </AdminModal>
    );
    expect(container).toBeTruthy();
  });

  it('contiene clases CSS apropiadas', () => {
    const { container } = render(
      <AdminModal title="Test" onClose={() => {}}>
        <p>Contenido</p>
      </AdminModal>
    );
    
    expect(container.querySelector('.admin-modal-backdrop')).toBeTruthy();
    expect(container.querySelector('.admin-modal')).toBeTruthy();
  });
});