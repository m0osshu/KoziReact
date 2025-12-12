import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';  // ← ESTA RUTA

describe('Button Component', () => {
  it('renderiza el botón con children', () => {
    render(<Button>Haz click</Button>);
    const button = screen.getByText('Haz click');
    expect(button).toBeTruthy();
  });

  it('renderiza el botón con prop text', () => {
    render(<Button text="Enviar" />);
    const button = screen.getByText('Enviar');
    expect(button).toBeTruthy();
  });

  it('prioriza children sobre text', () => {
    render(<Button text="Texto"><span>Children</span></Button>);
    const button = screen.getByText('Children');
    expect(button).toBeTruthy();
  });

  it('aplica la clase CSS correctamente', () => {
    render(<Button className="btn-primary">Botón</Button>);
    const button = screen.getByText('Botón');
    expect(button.className).toBe('btn-primary');
  });

  it('pasa props adicionales correctamente', () => {
    const handleClick = jasmine.createSpy('onClick');
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});