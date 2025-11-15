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
          <img src="https://res.cloudinary.com/dg2qk2fzs/image/upload/v1763179042/d3fec056e62d232db45b83ece39b4c19_grbveg.jpg" alt="Imagen post2" />
          <div className="contenido">
            <h2>Winter, integrante de aespa</h2>
            <p>
              Winter, es reconocida mundialmente como pionera del estilo futurista en el K-Pop a través de los conceptos de SM Entertainment. Su enfoque fusiona moda tecnológica con elementos de alta costura, creando una estética digital única. La artista ha popularizado el uso de siluetas arquitectónicas, materiales innovadores y colores neón, influenciando significativamente la moda contemporánea global. Su evolución constante entre su avatar virtual y presentaciones en vivo demuestra una versatilidad que inspira a nuevas generaciones de artistas internacionales.
            </p>
          </div>
        </article>

        <article className="post">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAgbRxZrFLoGj_rYOVGeJbt6jn9PP5mIs4ww&s" alt="Imagen post3" />
          <div className="contenido">
            <h2>dui, El renacimiento del VKei en la era digital</h2>
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