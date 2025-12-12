// src/test/components/organisms/BlogsSection.spec.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import BlogsSection from '../../../components/organisms/BlogsSection';

describe('BlogsSection Component', () => {
  it('se renderiza sin errores', () => {
    const { container } = render(<BlogsSection />);
    expect(container).toBeTruthy();
  });

  it('contiene un título principal', () => {
    render(<BlogsSection />);
    // Buscar h1 con clase titulo-blog
    const title = document.querySelector('.titulo-blog');
    expect(title).toBeTruthy();
    expect(title.tagName).toBe('H1');
  });

  it('contiene una sección de posts', () => {
    const { container } = render(<BlogsSection />);
    const postsSection = container.querySelector('.posts');
    expect(postsSection).toBeTruthy();
  });

  it('tiene elementos de artículo con clase post', () => {
    const { container } = render(<BlogsSection />);
    const posts = container.querySelectorAll('.post');
    // Al menos debería haber algún post
    expect(posts.length).toBeGreaterThan(0);
  });

  it('las imágenes tienen atributos alt', () => {
    render(<BlogsSection />);
    const images = document.querySelectorAll('.post img');
    
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBeTruthy();
    });
  });
});