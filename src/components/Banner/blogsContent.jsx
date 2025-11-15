import React from 'react';
import '../../styles/global.css';
import '../../styles/Banner/blogsContent.css';
import blogData from '../../data/blogData.js'; // Ajusta la ruta según tu estructura

const BlogsContent = () => {
  return (
    <main className="blog">
      <h1 className="titulo-blog">{blogData.titulo}</h1>
      <section className="posts">
        {blogData.posts.map(post => (
          <article key={post.id} className="post">
            <img src={post.imagen} alt={post.alt} />
            <div className="contenido">
              <h2>{post.titulo}</h2>
              <p>{post.contenido}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default BlogsContent;
