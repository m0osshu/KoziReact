import "../../styles/global.css";
import "../../styles/components/organisms/BlogsSection.css"; 
import blogData from "../../data/blogData";
import React from 'react';

export default function BlogsSection() {
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

