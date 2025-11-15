import React from 'react';
import '../../styles/global.css';
import '../../styles/Banner/blogsContent.css'


const blogsContent = () => {
  return (
    <main className="blog">
      <h1 className="titulo-blog">Nuestro Blog</h1>
      <section className="posts">
        <article className="post">
          <img src="https://res.cloudinary.com/dg2qk2fzs/image/upload/v1763178183/mialinda2_g04d3y.png" alt="Imagen mia" />
          <div className="contenido">
            <h2>Közi, Sus legendarias presentaciones en Chile</h2>
            <p>
              La calidad de los materiales superó todas mis expectativas. Cada detalle estaba cuidadosamente pensado, desde el diseño hasta la confección, ¡no puedo esperar para ver las nuevas colecciones!
            </p>
          </div>
        </article>

        <article className="post">
          <img src="/assets/img/blog/blog2.webp" alt="Imagen post2" />
          <div className="contenido">
            <h2>Mana-sama, El creador del Gothic Lolita</h2>
            <p>
              Mana, guitarrista de Malice Mizer, es reconocido mundialmente como el creador del estilo Elegant Gothic Lolita (EGL) a través de su marca Moi-même-Moitié fundada en 1999. Su diseño fusiona moda victoriana con elementos góticos, creando un estilo andrógino único. La marca popularizó el uso de cruces, encajes y el característico "azul Moitié", influenciando permanentemente la moda alternativa global
            </p>
          </div>
        </article>

        <article className="post">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgbRxZrFLoGj_rYOVGeJbt6jn9PP5mIs4ww&s" alt="Imagen post3" />
          <div className="contenido">
            <h2>El renacimiento del VKei en la era digital</h2>
            <p>
              Contrario a lo que muchos pensaban, el Visual Kei no desapareció sino que evolucionó. Nuevas bandas como The Gazette, Versailles y Dadaroma han mantenido viva la escena, adaptándose a las plataformas digitales y redes sociales. La estética VKei ha influenciado modas occidentales y subculturas globales, demostrando que la expresión artística sin límites trasciende fronteras. Festivales como V-ROCK Festival continúan reuniendo a тысячи de fans alrededor del mundo.
            </p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default blogsContent;