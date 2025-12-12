import React from 'react';
import { render, screen } from '@testing-library/react';
import AdminFormField from '../../../components/molecules/AdminFormField';

describe('AdminFormField Component', () => {
  it('renderiza el label correctamente', () => {
    render(<AdminFormField label="Test Label"><input /></AdminFormField>);
    expect(screen.getByText('Test Label')).toBeTruthy();
  });

  it('renderiza los children', () => {
    render(<AdminFormField label="Test"><button>Click</button></AdminFormField>);
    expect(screen.getByText('Click')).toBeTruthy();
  });
});